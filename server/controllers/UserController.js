import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {validationResult} from "express-validator";

import UserSchema from '../models/User.js';
import AdminSchema from '../models/Admin.js'
import TeacherSchema from '../models/Teacher.js';
import StudentSchema from '../models/Student.js';

// Создание нового пользователя
export const register = async (req, res) => {
    try {
        // Хеширование пароля перед сохранением в базе данных
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // Проверка типа пользователя
        if(req.body.userType == 'Teacher'){
            // Создание нового учителя с использованием TeacherSchema
            const teacher = new TeacherSchema({
                lastName: req.body.lastName,
                firstName: req.body.firstName,
                lastLastName: req.body.lastLastName,
            });

            // Сохранение учителя в базе данных
            teacher.save().then((savedTeacher) => {
                // Отправка ответа с данными пользователя
                res.json(teacher);

                // Создание нового пользователя с использованием UserSchema
                const user = new UserSchema({
                  email: req.body.email,
                  code: savedTeacher._id, // Использование идентификатора учителя в качестве кода
                  passwordHash, // Используется хешированный пароль
                  userType: 'Teacher',
                });
              
                // Сохранение пользователя в базе данных
                user.save().then((savedUser) => {
                    // Отправка ответа с данными пользователя
                    res.json(user);
                    console.log('Учитель и пользователь сохранены:', savedTeacher, savedUser);
                }).catch((error) => {
                  console.error('Ошибка при сохранении пользователя:', error);
                });
            }).catch((error) => {
                console.error('Ошибка при сохранении учителя:', error);
            });
        }else if(req.body.userType == 'Student'){
             // Создание нового учителя с использованием TeacherSchema
             const student = new StudentSchema({
                lastName: req.body.lastName,
                firstName: req.body.firstName,
                lastLastName: req.body.lastLastName,
                numberClass: req.body.numberClass,
                letterClass: req.body.letterClass,
            });

            // Сохранение учителя в базе данных
            student.save().then((savedStudent) => {
                // Отправка ответа с данными пользователя
                res.json(student);

                // Создание нового пользователя с использованием UserSchema
                const user = new UserSchema({
                  email: req.body.email,
                  code: savedStudent._id, // Использование идентификатора учителя в качестве кода
                  passwordHash, // Используется хешированный пароль
                  userType: 'Student',
                });
              
                // Сохранение пользователя в базе данных
                user.save().then((savedUser) => {
                    // Отправка ответа с данными пользователя
                    res.json(user);
                    console.log('Учитель и пользователь сохранены:', savedStudent, savedUser);
                }).catch((error) => {
                  console.error('Ошибка при сохранении пользователя:', error);
                });
            }).catch((error) => {
                console.error('Ошибка при сохранении ученика:', error);
            });
        }else if(req.body.userType == 'Admin'){
            // Создание нового учителя с использованием TeacherSchema
            const admin = new AdminSchema({
               lastName: req.body.lastName,
               firstName: req.body.firstName,
               lastLastName: req.body.lastLastName,
           });

           // Сохранение учителя в базе данных
           admin.save().then((savedAdmin) => {
               // Отправка ответа с данными пользователя
               res.json(admin);

               // Создание нового пользователя с использованием UserSchema
               const user = new UserSchema({
                 email: req.body.email,
                 code: savedAdmin._id, // Использование идентификатора учителя в качестве кода
                 passwordHash, // Используется хешированный пароль
                 userType: 'Admin',
               });
             
               // Сохранение пользователя в базе данных
               user.save().then((savedUser) => {
                   // Отправка ответа с данными пользователя
                   res.json(user);
                   console.log('Администратор сохранен:', savedAdmin, savedUser);
               }).catch((error) => {
                 console.error('Ошибка при сохранении пользователя:', error);
               });
           }).catch((error) => {
               console.error('Ошибка при сохранении ученика:', error);
           });
       }
    } 
    catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const login = async(req, res) => {
    try {
        // Поиск пользователя по электронной почте в базе данных
        const user = await UserSchema.findOne({email: req.body.email});
        let roler;


        if(user.userType == "Teacher"){
            roler = await TeacherSchema.findOne({_id: user.code})
        }else if(user.userType == "Student"){
            roler = await StudentSchema.findOne({_id: user.code})
        }else if(user.userType == "Admin"){
            roler = await AdminSchema.findOne({_id: user.code})
        }

        // Проверка наличия пользователя в базе данных
        if(!user){
            return res.status(404).json({
                message: "Пользователь не найден"
            });
        }

        // Проверка соответствия введенного пароля хешу пароля пользователя
        const isValidPassword = await bcrypt.compare(req.body.password, user._doc.passwordHash);
        if(!isValidPassword){
            return res.status(404).json({
                message: "Пороль не подходит"
            });
        }

        // Создание JWT токена для аутентификации пользователя
        const token = jwt.sign(
            {
            _id: user._id,
            }, 'secret123', // Секретный ключ для подписи токена (лучше использовать переменную окружения)
            {
                // время жизни токена
                expiresIn: '30d',
            },
        )

        // Исключение хеша пароля из данных пользователя перед отправкой на клиент
        const {passwordHash, ...userData} = user._doc;

        // Отправка успешного ответа с данными пользователя и токеном
        res.json({
            ...userData,
            token,
            userData: roler,
        });

    } catch (error) {
        console.log(error)
        res.status(404).json({
            message: 'Не удалось авторизоваться'
        })
    }
}

export const getMe = async(req, res) => {
    try {
        // Поиск пользователя по его идентификатору (полученному из токена аутентификации)
        const user = await UserSchema.findById(req.userId);

        // Проверка наличия пользователя в базе данных
        if(!user){
            return res.status(404).json({
                message: 'Пользователь не найден',
            });
        }

        // Исключение хеша пароля из данных пользователя перед отправкой на клиент
        const {passwordHash, ...userData} = user._doc;

        // Отправка успешного ответа с данными пользователя (без хеша пароля)
        res.json(userData);
    } catch (error) {
        console.log(error)
        res.status(404).json({
            message: 'Нет доступа'
        })
    }
}

export const usersAll = async(req, res) => {
    try{
        res.json(
            {
                "users": 
                [
                    {
                        "id": 1,
                        "name": "Колтырин Пересвет",
                        "role": "Ученик",
                        "imageLink": "",
                        "schedule": [
                            {
                                "dateName": "Понедельник",
                                "date": "10.03.2023",
                                "title": "Сегодня",
                                "id": 1,
                                "lessons": [
                                    {
                                        "urokCount": "1",
                                        "urokStart": "8:30",
                                        "urokStop": "9:10",
                                        "lesson": "Русский язык",
                                        "lessonType": "",
                                        "lessonClass": "",
                                        "ocenka": "5",
                                        "peremenaLength": "10",
                                        "dz": "стр. 25, упр. 48 - 52",
                                        "date": "10.03.2023"
                                    },
                                    {
                                        "urokCount": "2",
                                        "urokStart": "9:20",
                                        "urokStop": "10:00",
                                        "lesson": "Русский язык",
                                        "lessonType": "Контрольная",
                                        "lessonClass": "schudle-block-lesson__control",
                                        "ocenka": "3",
                                        "peremenaLength": "20",
                                        "dz": "стр. 25, упр. 48 - 52",
                                        "date": "10.03.2023"
                                    },
                                    {
                                        "urokCount": "3",
                                        "urokStart": "10:20",
                                        "urokStop": "11:00",
                                        "lesson": "Русский язык",
                                        "lessonType": "",
                                        "lessonClass": "",
                                        "ocenka": "5",
                                        "peremenaLength": "20",
                                        "dz": "стр. 25, упр. 48 - 52",
                                        "date": "10.03.2023"
                                    },
                                    {
                                        "urokCount": "4",
                                        "urokStart": "11:20",
                                        "urokStop": "12:00",
                                        "lesson": "Русский язык",
                                        "lessonType": "",
                                        "lessonClass": "",
                                        "ocenka": "",
                                        "peremenaLength": "20",
                                        "dz": "",
                                        "date": "10.03.2023"
                                    },
                                    {
                                        "urokCount": "5",
                                        "urokStart": "12:20",
                                        "urokStop": "13:00",
                                        "lesson": "Русский язык",
                                        "lessonType": "",
                                        "lessonClass": "",
                                        "ocenka": "",
                                        "peremenaLength": "20",
                                        "dz": "",
                                        "date": "10.03.2023"
                                    },
                                    {
                                        "urokCount": "6",
                                        "urokStart": "13:20",
                                        "urokStop": "14:00",
                                        "lesson": "Русский язык",
                                        "lessonType": "",
                                        "lessonClass": "",
                                        "ocenka": "",
                                        "peremenaLength": "20",
                                        "dz": "",
                                        "date": "10.03.2023"
                                    },
                                    {
                                        "urokCount": "7",
                                        "urokStart": "14:20",
                                        "urokStop": "15:00",
                                        "lesson": "Русский язык",
                                        "lessonType": "",
                                        "lessonClass": "",
                                        "ocenka": "",
                                        "peremenaLength": "",
                                        "dz": "",
                                        "date": "10.03.2023"
                                    }
                                ]
                            },
                            {
                                "dateName": "Вторник",
                                "date": "11.06.2023",
                                "title": "Завтра",
                                "id": 2,
                                "lessons": [
                                    {
                                        "urokCount": "1",
                                        "urokStart": "8:30",
                                        "urokStop": "9:10",
                                        "lesson": "Математика",
                                        "lessonType": "Контрольная",
                                        "lessonClass": "schudle-block-lesson__control",
                                        "ocenka": "",
                                        "peremenaLength": "10",
                                        "dz": "подготовиться к контрольной работе",
                                        "date": "11.03.2023"
                                    },
                                    {
                                        "urokCount": "2",
                                        "urokStart": "9:20",
                                        "urokStop": "10:00",
                                        "lesson": "Математика",
                                        "lessonType": "",
                                        "lessonClass": "",
                                        "ocenka": "",
                                        "peremenaLength": "20",
                                        "dz": "",
                                        "date": "11.03.2023"
                                    },
                                    {
                                        "urokCount": "3",
                                        "urokStart": "10:20",
                                        "urokStop": "11:00",
                                        "lesson": "Математика",
                                        "lessonType": "",
                                        "lessonClass": "",
                                        "ocenka": "",
                                        "peremenaLength": "20",
                                        "dz": "",
                                        "date": "11.03.2023"
                                    },
                                    {
                                        "urokCount": "4",
                                        "urokStart": "11:20",
                                        "urokStop": "12:00",
                                        "lesson": "Математика",
                                        "lessonType": "",
                                        "lessonClass": "",
                                        "ocenka": "",
                                        "peremenaLength": "20",
                                        "dz": "",
                                        "date": "11.03.2023"
                                    },
                                    {
                                        "urokCount": "5",
                                        "urokStart": "12:20",
                                        "urokStop": "13:00",
                                        "lesson": "Математика",
                                        "lessonType": "",
                                        "lessonClass": "",
                                        "ocenka": "",
                                        "peremenaLength": "20",
                                        "dz": "",
                                        "date": "11.03.2023"
                                    },
                                    {
                                        "urokCount": "6",
                                        "urokStart": "13:20",
                                        "urokStop": "14:00",
                                        "lesson": "Математика",
                                        "lessonType": "",
                                        "lessonClass": "",
                                        "ocenka": "",
                                        "peremenaLength": "20",
                                        "dz": "",
                                        "date": "11.03.2023"
                                    },
                                    {
                                        "urokCount": "7",
                                        "urokStart": "14:20",
                                        "urokStop": "15:00",
                                        "lesson": "математика",
                                        "lessonType": "",
                                        "lessonClass": "",
                                        "ocenka": "",
                                        "peremenaLength": "",
                                        "dz": "",
                                        "date": "11.03.2023"
                                    }
                                ]
                            },
                            {
                                "dateName": "Среда",
                                "date": "12.06.2023",
                                "title": "",
                                "id": "",
                                "lessons": [
                                    {
                                        "urokCount": "1",
                                        "urokStart": "8:30",
                                        "urokStop": "9:10",
                                        "lesson": "Русский язык",
                                        "lessonType": "",
                                        "lessonClass": "",
                                        "ocenka": "4",
                                        "peremenaLength": "10",
                                        "dz": "стр. 25, упр. 48 - 52",
                                        "date": "12.03.2023"
                                    },
                                    {
                                        "urokCount": "2",
                                        "urokStart": "9:20",
                                        "urokStop": "10:00",
                                        "lesson": "Русский язык",
                                        "lessonType": "Контрольная",
                                        "lessonClass": "schudle-block-lesson__control",
                                        "ocenka": "",
                                        "peremenaLength": "20",
                                        "dz": "стр. 25, упр. 48 - 52",
                                        "date": "12.03.2023"
                                    },
                                    {
                                        "urokCount": "3",
                                        "urokStart": "10:20",
                                        "urokStop": "11:00",
                                        "lesson": "Русский язык",
                                        "lessonType": "",
                                        "lessonClass": "",
                                        "ocenka": "",
                                        "peremenaLength": "20",
                                        "dz": "стр. 25, упр. 48 - 52",
                                        "date": "12.03.2023"
                                    },
                                    {
                                        "urokCount": "4",
                                        "urokStart": "11:20",
                                        "urokStop": "12:00",
                                        "lesson": "Русский язык",
                                        "lessonType": "",
                                        "lessonClass": "",
                                        "ocenka": "5",
                                        "peremenaLength": "20",
                                        "dz": "",
                                        "date": "12.03.2023"
                                    },
                                    {
                                        "urokCount": "5",
                                        "urokStart": "12:20",
                                        "urokStop": "13:00",
                                        "lesson": "Русский язык",
                                        "lessonType": "",
                                        "lessonClass": "",
                                        "ocenka": "5",
                                        "peremenaLength": "20",
                                        "dz": "",
                                        "date": "12.03.2023"
                                    },
                                    {
                                        "urokCount": "6",
                                        "urokStart": "13:20",
                                        "urokStop": "14:00",
                                        "lesson": "Русский язык",
                                        "lessonType": "",
                                        "lessonClass": "",
                                        "ocenka": "",
                                        "peremenaLength": "20",
                                        "dz": "",
                                        "date": "12.03.2023"
                                    },
                                    {
                                        "urokCount": "7",
                                        "urokStart": "14:20",
                                        "urokStop": "15:00",
                                        "lesson": "Русский язык",
                                        "lessonType": "",
                                        "lessonClass": "",
                                        "ocenka": "",
                                        "peremenaLength": "",
                                        "dz": "",
                                        "date": "12.03.2023"
                                    }
                                ]
                            }
                        ],
                        "dopZanyatiya": [
                            {
                                "date": "5 марта",
                                "predmet": "Русский язык"
                            },
                            {
                                "date": "7 марта",
                                "predmet": "Геометрия"
                            },
                            {
                                "date": "5 марта",
                                "predmet": "Русский язык"
                            },
                            {
                                "date": "8 марта",
                                "predmet": "Информатика"
                            }
                        ],
                        "gradeData": [
                            12,
                            19,
                            3,
                            5
                        ]
                    },
                    {
                        "id": 2,
                        "name": "Колтырин Пересвет",
                        "role": "Учитель",
                        "imageLink": "",
                        "schedule": [
                            {
                                "dateName": "Понедельник",
                                "date": "10.03.2023",
                                "title": "Сегодня",
                                "id": 1,
                                "lessons": [
                                    {
                                        "urokCount": "1",
                                        "urokStart": "8:30",
                                        "urokStop": "9:10",
                                        "lesson": "Математика",
                                        "lessonType": "",
                                        "lessonClass": "",
                                        "cabinet": "210",
                                        "classLesson": "5 \"А\"",
                                        "peremenaLength": "10",
                                        "dz": "стр. 25, упр. 48 - 52",
                                        "date": "10.03.2023"
                                    },
                                    {
                                        "urokCount": "2",
                                        "urokStart": "9:20",
                                        "urokStop": "10:00",
                                        "lesson": "Геометрия",
                                        "lessonType": "Контрольная",
                                        "lessonClass": "schudle-block-lesson__control",
                                        "cabinet": "400",
                                        "classLesson": "11 \"Н\"",
                                        "peremenaLength": "20",
                                        "dz": "стр. 25, упр. 48 - 52",
                                        "date": "10.03.2023"
                                    },
                                    {
                                        "urokCount": "3",
                                        "urokStart": "10:20",
                                        "urokStop": "11:00",
                                        "lesson": "Информатика",
                                        "lessonType": "",
                                        "lessonClass": "",
                                        "cabinet": "400",
                                        "classLesson": "10 \"Н\"",
                                        "peremenaLength": "20",
                                        "dz": "подготовка к кр",
                                        "date": "10.03.2023"
                                    },
                                    {
                                        "urokCount": "4",
                                        "urokStart": "11:20",
                                        "urokStop": "12:00",
                                        "lesson": "Математика",
                                        "lessonType": "",
                                        "lessonClass": "",
                                        "cabinet": "314",
                                        "classLesson": "8 \"Б\"",
                                        "peremenaLength": "20",
                                        "dz": "не задано",
                                        "date": "10.03.2023"
                                    },
                                    {
                                        "urokCount": "5",
                                        "urokStart": "12:20",
                                        "urokStop": "13:00",
                                        "lesson": "Математика",
                                        "lessonType": "контрольная",
                                        "lessonClass": "schudle-block-lesson__control",
                                        "cabinet": "113",
                                        "classLesson": "8 \"Н\"",
                                        "peremenaLength": "20",
                                        "dz": "не задано",
                                        "date": "10.03.2023"
                                    },
                                    {
                                        "urokCount": "6",
                                        "urokStart": "13:20",
                                        "urokStop": "14:00",
                                        "lesson": "",
                                        "lessonType": "",
                                        "lessonClass": "",
                                        "cabinet": "",
                                        "classLesson": "",
                                        "peremenaLength": "20",
                                        "dz": "",
                                        "date": ""
                                    },
                                    {
                                        "urokCount": "7",
                                        "urokStart": "14:20",
                                        "urokStop": "15:00",
                                        "lesson": "",
                                        "lessonType": "",
                                        "lessonClass": "",
                                        "cabinet": "",
                                        "classLesson": "",
                                        "peremenaLength": "",
                                        "dz": "",
                                        "date": ""
                                    }
                                ]
                            },
                            {
                                "dateName": "Вторник",
                                "date": "11.03.2023",
                                "title": "Завтра",
                                "id": 2,
                                "lessons": [
                                    {
                                        "urokCount": "1",
                                        "urokStart": "8:30",
                                        "urokStop": "9:10",
                                        "lesson": "Математика",
                                        "lessonType": "Контрольная",
                                        "lessonClass": "schudle-block-lesson__control",
                                        "cabinet": "308",
                                        "classLesson": "8 \"А\"",
                                        "peremenaLength": "10",
                                        "dz": "",
                                        "date": ""
                                    },
                                    {
                                        "urokCount": "2",
                                        "urokStart": "9:20",
                                        "urokStop": "10:00",
                                        "lesson": "Математика",
                                        "lessonType": "",
                                        "lessonClass": "",
                                        "cabinet": "110",
                                        "classLesson": "9 \"Н\"",
                                        "peremenaLength": "20",
                                        "dz": "",
                                        "date": ""
                                    },
                                    {
                                        "urokCount": "3",
                                        "urokStart": "10:20",
                                        "urokStop": "11:00",
                                        "lesson": "Математика",
                                        "lessonType": "",
                                        "lessonClass": "",
                                        "cabinet": "230",
                                        "classLesson": "6 \"Б\"",
                                        "peremenaLength": "20",
                                        "dz": "",
                                        "date": ""
                                    },
                                    {
                                        "urokCount": "4",
                                        "urokStart": "11:20",
                                        "urokStop": "12:00",
                                        "lesson": "Математика",
                                        "lessonType": "",
                                        "lessonClass": "",
                                        "cabinet": "314",
                                        "classLesson": "8 \"Б\"",
                                        "peremenaLength": "20",
                                        "dz": "не задано",
                                        "date": "10.03.2023"
                                    },
                                    {
                                        "urokCount": "5",
                                        "urokStart": "12:20",
                                        "urokStop": "13:00",
                                        "lesson": "Математика",
                                        "lessonType": "контрольная",
                                        "lessonClass": "schudle-block-lesson__control",
                                        "cabinet": "113",
                                        "classLesson": "8 \"Н\"",
                                        "peremenaLength": "20",
                                        "dz": "не задано",
                                        "date": "10.03.2023"
                                    },
                                    {
                                        "urokCount": "6",
                                        "urokStart": "13:20",
                                        "urokStop": "14:00",
                                        "lesson": "",
                                        "lessonType": "",
                                        "lessonClass": "",
                                        "cabinet": "",
                                        "classLesson": "",
                                        "peremenaLength": "20",
                                        "dz": "",
                                        "date": ""
                                    },
                                    {
                                        "urokCount": "7",
                                        "urokStart": "14:20",
                                        "urokStop": "15:00",
                                        "lesson": "",
                                        "lessonType": "",
                                        "lessonClass": "",
                                        "cabinet": "",
                                        "classLesson": "",
                                        "peremenaLength": "",
                                        "dz": "",
                                        "date": ""
                                    }
                                ]
                            },
                            {
                                "dateName": "Среда",
                                "date": "12.03.2023",
                                "title": "",
                                "id": "",
                                "lessons": [
                                    {
                                        "urokCount": "1",
                                        "urokStart": "8:30",
                                        "urokStop": "9:10",
                                        "lesson": "Математика",
                                        "lessonType": "Контрольная",
                                        "lessonClass": "schudle-block-lesson__control",
                                        "cabinet": "308",
                                        "classLesson": "8 \"А\"",
                                        "peremenaLength": "10",
                                        "dz": "",
                                        "date": ""
                                    },
                                    {
                                        "urokCount": "2",
                                        "urokStart": "9:20",
                                        "urokStop": "10:00",
                                        "lesson": "Математика",
                                        "lessonType": "",
                                        "lessonClass": "",
                                        "cabinet": "110",
                                        "classLesson": "9 \"Н\"",
                                        "peremenaLength": "20",
                                        "dz": "",
                                        "date": ""
                                    },
                                    {
                                        "urokCount": "3",
                                        "urokStart": "10:20",
                                        "urokStop": "11:00",
                                        "lesson": "Математика",
                                        "lessonType": "",
                                        "lessonClass": "",
                                        "cabinet": "230",
                                        "classLesson": "6 \"Б\"",
                                        "peremenaLength": "20",
                                        "dz": "",
                                        "date": ""
                                    },
                                    {
                                        "urokCount": "4",
                                        "urokStart": "11:20",
                                        "urokStop": "12:00",
                                        "lesson": "Математика",
                                        "lessonType": "",
                                        "lessonClass": "",
                                        "cabinet": "314",
                                        "classLesson": "8 \"Б\"",
                                        "peremenaLength": "20",
                                        "dz": "не задано",
                                        "date": "10.03.2023"
                                    },
                                    {
                                        "urokCount": "5",
                                        "urokStart": "12:20",
                                        "urokStop": "13:00",
                                        "lesson": "Математика",
                                        "lessonType": "контрольная",
                                        "lessonClass": "schudle-block-lesson__control",
                                        "cabinet": "113",
                                        "classLesson": "8 \"Н\"",
                                        "peremenaLength": "20",
                                        "dz": "не задано",
                                        "date": "10.03.2023"
                                    },
                                    {
                                        "urokCount": "6",
                                        "urokStart": "13:20",
                                        "urokStop": "14:00",
                                        "lesson": "",
                                        "lessonType": "",
                                        "lessonClass": "",
                                        "cabinet": "",
                                        "classLesson": "",
                                        "peremenaLength": "20",
                                        "dz": "",
                                        "date": ""
                                    },
                                    {
                                        "urokCount": "7",
                                        "urokStart": "14:20",
                                        "urokStop": "15:00",
                                        "lesson": "",
                                        "lessonType": "",
                                        "lessonClass": "",
                                        "cabinet": "",
                                        "classLesson": "",
                                        "peremenaLength": "",
                                        "dz": "",
                                        "date": ""
                                    }
                                ]
                            }
                            
                        ],
                        "dopZanyatiya": [
                            {
                                "date": "5 марта",
                                "predmet": "Русский язык"
                            },
                            {
                                "date": "5 марта",
                                "predmet": "Русский язык"
                            },
                            {
                                "date": "5 марта",
                                "predmet": "Русский язык"
                            },
                            {
                                "date": "5 марта",
                                "predmet": "Русский язык"
                            }
                        ]
                    }
                ]
            }
        )
    }catch (error){
        console.log(err)
        res.status(404).json({
            message: 'Нет доступа'
        })
    }
}