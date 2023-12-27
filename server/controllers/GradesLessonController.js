import SubjectSchema from '../models/Subject.js';
import StudentSchema from '../models/Student.js';
import LessonGradeSchema from '../models/GradesLesson.js';

export const createGrade = async (req, res) => {
    try {
        const { studentId, grade, date, subjectId, lessonNumber } = req.body;

        // Создаем новую оценку
        const newGrade = new LessonGradeSchema({
            student: studentId,
            grade,
            date,
            subject: subjectId,
            lessonNumber,
        });

        // Сохраняем оценку в базе данных
        const savedGrade = await newGrade.save();

        res.status(201).json({ grade: savedGrade });
    } catch (error) {
        console.error("Ошибка при создании оценки:", error);
        res.status(500).json({ error: "Внутренняя ошибка сервера" });
    }
}