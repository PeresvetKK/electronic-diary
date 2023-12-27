import SubjectSchema from '../models/Subject.js';
import StudentSchema from '../models/Student.js';
import MissedClassSchema from '../models/MissedClass.js';

export const createMissed = async (req, res) => {
    try {
        const { studentId, date, subjectId, lessonNumber } = req.body;
    
        // Создаем объект пропущенного занятия
        const missedClass = new MissedClassSchema({
          student: studentId,
          date,
          subject: subjectId,
          lessonNumber,
        });
    
        // Сохраняем пропущенное занятие в базе данных
        const savedMissedClass = await missedClass.save();
    
        res.status(201).json({ missedClass: savedMissedClass });
      } catch (error) {
        console.error("Ошибка при создании пропущенного занятия:", error);
        res.status(500).json({ error: "Внутренняя ошибка сервера" });
      }
}