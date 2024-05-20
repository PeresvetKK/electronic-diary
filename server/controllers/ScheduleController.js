import TeacherSchema from '../models/Teacher.js';
import ScheduleSchema from '../models/Schedule.js';
import SchoolClassSchema from '../models/SchoolClass.js';

export const createSchedule = async (req, res) => {
    try {
        const { teacherId, subject, classId, dayOfWeek, lessonNumber, classroomNumber, date, topic } = req.body;

        // Проверяем, существует ли учитель с указанным ID
        const existingTeacher = await TeacherSchema.findById(teacherId);
        if (!existingTeacher) {
            return res.status(404).json({ error: "Учитель не найден" });
        }

        // Проверяем, существует ли класс с указанным ID
        const schoolClass = await SchoolClassSchema.findById(classId);
        if (!schoolClass) {
            return res.status(404).json({ error: "Класс не найден" });
        }

        // Парсим дату из строки в объект Date
        const lessonDate = new Date(date.split('.').reverse().join('-') + 'T00:00:00.000Z');

        // Создаем объект урока с использованием существующего учителя, предмета и класса
        const lesson = new ScheduleSchema({
            dayOfWeek,
            lessonNumber,
            class: classId,
            subjectName: subject,
            teacher: existingTeacher._id,
            classroomNumber,
            date: lessonDate,
            topic,
        });

        // Сохраняем урок в базе данных
        const savedLesson = await lesson.save();

        // Популяризируем класс
        const populatedLesson = await ScheduleSchema.findById(savedLesson._id).populate('class');

        res.status(201).json({ lesson: populatedLesson });
    } catch (error) {
        console.error("Ошибка при создании урока:", error);
        res.status(500).json({ error: "Ошибка сервера" });
    }
};

export const getStudentSchedule = async (req, res) => {
    try {
        const { classId, startDate, endDate } = req.params;
        
        // Проверяем, существует ли класс с указанным ID
        const schoolClass = await SchoolClass.findById(classId);
        if (!schoolClass) {
            return res.status(404).json({ error: "Класс не найден" });
        }

        const query = { classNumber: schoolClass.classNumber, classLetter: schoolClass.classLetter };
        if (startDate && endDate) {
            const start = new Date(startDate.split('.').reverse().join('-') + 'T00:00:00.000Z');
            const end = new Date(endDate.split('.').reverse().join('-') + 'T23:59:59.999Z');

            query.date = { $gte: start, $lte: end };
        }

        const studentSchedule = await ScheduleSchema.find(query).populate("teacher", "lastName firstName lastLastName");

        res.json({ studentSchedule });
    } catch (error) {
        console.error("Ошибка при получении расписания для ученика:", error);
        res.status(500).json({ error: "Ошибка сервера" });
    }
};

export const getTeacherSchedule = async (req, res) => {
    try {
        const { teacherId, startDate, endDate } = req.params;

        const existingTeacher = await TeacherSchema.findById(teacherId);
        if (!existingTeacher) {
            return res.status(404).json({ error: "Учитель не найден" });
        }

        const start = new Date(startDate.split('.').reverse().join('-') + 'T00:00:00.000Z');
        const end = new Date(endDate.split('.').reverse().join('-') + 'T23:59:59.999Z');

        const teacherSchedule = await ScheduleSchema.find({
            teacher: existingTeacher._id,
            date: { $gte: start, $lte: end }
        }).populate("teacher", "lastName firstName lastLastName").populate("class");

        res.json({ teacherSchedule });
    } catch (error) {
        console.error("Ошибка при получении расписания для учителя:", error);
        res.status(500).json({ error: "Ошибка сервера" });
    }
};

export const editLessonTopic = async (req, res) => {
    try {
        const { lessonId, newTopic } = req.body;

        const updatedLesson = await ScheduleSchema.findByIdAndUpdate(
            lessonId,
            { topic: newTopic },
            { new: true }
        );

        res.status(200).json({ updatedLesson });
    } catch (error) {
        console.error("Ошибка при изменении темы урока:", error);
        res.status(500).json({ error: "Внутренняя ошибка сервера" });
    }
};
