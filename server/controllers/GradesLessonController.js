import LessonGradeSchema from '../models/GradesLesson.js';

export const createGrade = async (req, res) => {
    try {
        const { studentId, grade, date, subjectId, comment } = req.body;

        const currentDate = new Date(date.split('.').reverse().join('-') + 'T00:00:00.000Z');

        // Создаем новую оценку
        const newGrade = new LessonGradeSchema({
            student: studentId,
            grade,
            date: currentDate,
            subject: subjectId,
            comment,
        });

        // Сохраняем оценку в базе данных
        const savedGrade = await newGrade.save();

        res.status(201).json({ grade: savedGrade });
    } catch (error) {
        console.error("Ошибка при создании оценки:", error);
        res.status(500).json({ error: "Внутренняя ошибка сервера" });
    }
};

export const getGrades = async (req, res) => {
    try {
        const {studentIds, subjectId} = req.body;

        // Поиск оценок в базе данных по параметрам
        const grades = await LessonGradeSchema.find({
            student: { $in: studentIds },
            subject: subjectId
        });

        res.status(200).json({ grades });
    } catch (error) {
        console.error("Ошибка при получении оценок:", error);
        res.status(500).json({ error: "Внутренняя ошибка сервера" });
    }
};
