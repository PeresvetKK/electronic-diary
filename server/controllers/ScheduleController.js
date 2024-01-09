import TeacherSchema from '../models/Teacher.js';
import SubjectSchema from '../models/Subject.js';
import ScheduleSchema from '../models/Schedule.js';

export const createSchedule = async (req, res) => {
    try {
        // Получаем данные об учителе из запроса
        const   lastName = req.body.teacher.lastName,
                firstName = req.body.teacher.firstName,
                lastLastName = req.body.teacher.lastLastName;

        // Ищем учителя в базе данных на основе предоставленных данных
        const existingTeacher = await TeacherSchema.findOne({
            lastName,
            firstName,
            lastLastName,
        });

        if (!existingTeacher) {
            return res.status(404).json({ error: "Учитель не найден" });
        }

        let predmet;
        // Проверяем наличие предмета в базе данных
        const existingSubject = await SubjectSchema.findOne({
            name: req.body.subject,
        });

        if (existingSubject) {
            // Используем существующий предмет
            predmet = existingSubject._id;
        } else {
            // Создаем новый предмет
            const newSubject = new SubjectSchema({ name: req.body.subject });
            const savedPredmet = await newSubject.save();
            predmet = savedPredmet._id;
        }

        // Парсим дату из строки в объект Date
        const lessonDate = new Date(req.body.date.split('.').reverse().join('-') + 'T00:00:00.000Z');

        // Создаем объект урока с использованием существующего учителя, предмета и даты
        const lesson = new ScheduleSchema({
            dayOfWeek: req.body.dayOfWeek,
            lessonNumber: req.body.lessonNumber,
            classNumber: req.body.classNumber,
            subject: predmet,
            teacher: existingTeacher._id,
            classLetter: req.body.classLetter,
            classroomNumber: req.body.classroomNumber,
            date: lessonDate, // Добавляем дату
        });

        // Сохраняем урок в базе данных
        const savedLesson = await lesson.save();

        console.log("Урок добавлен в расписание:", savedLesson);
        res.status(201).json({ lesson: savedLesson }); // Используйте статус 201 для созданных ресурсов
    } catch (error) {
        console.error("Ошибка при создании урока:", error);
        res.status(500).json({ error: "Ошибка сервера" });
    }
};

export const getStudentSchedule = async (req, res) => {
    try {
        // Получаем номер и букву класса из запроса
        const { classNumber, classLetter, startDate, endDate } = req.params;

        // Проверяем, присутствуют ли поля начальной и конечной даты в запросе
        const query = {
            classNumber,
            classLetter
        };

        if (startDate && endDate) {
            // Если поля начальной и конечной даты присутствуют, парсим их в объекты Date
            const start = new Date(startDate.split('.').reverse().join('-') + 'T00:00:00.000Z');
            const end = new Date(endDate.split('.').reverse().join('-') + 'T23:59:59.999Z');

            // Добавляем поле даты в запрос в базу данных в диапазоне от начальной до конечной даты
            query.date = { $gte: start, $lte: end };
        }

        // Ищем расписание для ученика
        const studentSchedule = await ScheduleSchema.find(query)
            .populate("subject") // Загружаем данные по предмету
            .populate("teacher", "lastName firstName lastLastName"); // Загружаем данные по учителю

        res.json({ studentSchedule });
    } catch (error) {
        console.error("Ошибка при получении расписания для ученика:", error);
        res.status(500).json({ error: "Ошибка сервера" });
    }
}

// Получение расписания для учителя
export const getTeacherSchedule = async (req, res) => {
    try {
        const { lastName, firstName, lastLastName, startDate, endDate } = req.params;
  
        // Парсим даты из строкового формата в объекты Date
        const start = new Date(startDate.split('.').reverse().join('-') + 'T00:00:00.000Z');
        const end = new Date(endDate.split('.').reverse().join('-') + 'T23:59:59.999Z');
  
        // Ищем учителя в базе данных
        const existingTeacher = await TeacherSchema.findOne({
            lastName,
            firstName,
            lastLastName,
        });
  
        if (!existingTeacher) {
            return res.status(404).json({ error: "Учитель не найден" });
        }
  
        // Ищем расписание для учителя в заданный промежуток времени
        const teacherSchedule = await ScheduleSchema.find({
            teacher: existingTeacher._id,
            date: { $gte: start, $lte: end } // Фильтруем расписание по диапазону дат
        })
        .populate("subject") // Загружаем данные по предмету
        .populate("teacher", "lastName firstName lastLastName"); // Загружаем данные по учителю
  
        res.json({ teacherSchedule });
    } catch (error) {
        console.error("Ошибка при получении расписания для учителя:", error);
        res.status(500).json({ error: "Ошибка сервера" });
    }
};