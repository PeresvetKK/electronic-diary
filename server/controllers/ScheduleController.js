import TeacherSchema from '../models/Teacher.js';
import ScheduleSchema from '../models/Schedule.js';

export const createSchedule = async (req, res) => {
    try {
        // Получаем данные об учителе из запроса
        const   lastName = req.body.teacher.lastName,
                firstName = req.body.teacher.firstName,
                lastLastName = req.body.teacher.lastLastName,
                predmet = req.body.subject;

        // Ищем учителя в базе данных на основе предоставленных данных
        const existingTeacher = await TeacherSchema.findOne({
            lastName,
            firstName,
            lastLastName,
        });

        if (!existingTeacher) {
            return res.status(404).json({ error: "Учитель не найден" });
        }

        // Парсим дату из строки в объект Date
        const lessonDate = new Date(req.body.date.split('.').reverse().join('-') + 'T00:00:00.000Z');

        // Создаем объект урока с использованием существующего учителя, предмета и даты
        const lesson = new ScheduleSchema({
            dayOfWeek: req.body.dayOfWeek,
            lessonNumber: req.body.lessonNumber,
            classNumber: req.body.classNumber,
            classLetter: req.body.classLetter,
            subjectName: predmet,
            teacher: existingTeacher._id,
            classroomNumber: req.body.classroomNumber,
            date: lessonDate, // Добавляем дату
            topic: req.body.topic
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

// Получение расписания для ученика
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
        .populate("teacher", "lastName firstName lastLastName"); // Загружаем данные по учителю

        res.json({ teacherSchedule });
    } catch (error) {
        console.error("Ошибка при получении расписания для учителя:", error);
        res.status(500).json({ error: "Ошибка сервера" });
    }
};
// Изменение темы урока
export const editLessonTopic = async (req, res) => {
    try {
        const { lessonId, newTopic } = req.body;
        
        // Находим урок по его ID и обновляем тему
        const updatedLesson = await ScheduleSchema.findByIdAndUpdate(
            lessonId,
            { topic: newTopic },
            { new: true } // Возвращать обновленный документ
        );

        res.status(200).json({ updatedLesson });
    } catch (error) {
        console.error("Ошибка при изменении темы урока:", error);
        res.status(500).json({ error: "Внутренняя ошибка сервера" });
    }
};