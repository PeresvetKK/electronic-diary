import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {validationResult} from "express-validator";

import UserSchema from '../models/User.js';
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
        }else{
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
        }else{
            roler = await StudentSchema.findOne({_id: user.code})
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