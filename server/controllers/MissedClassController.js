
import StudentSchema from '../models/Student.js';
import MissedClassSchema from '../models/MissedClass.js';

export const createMissed = async (req, res) => {
    try {
        const { studentId, date, subjectId} = req.body;
        const currentDate = new Date(date.split('.').reverse().join('-') + 'T00:00:00.000Z');
        // Создаем объект пропущенного занятия
        const missedClass = new MissedClassSchema({
          student: studentId,
          date: currentDate,
          subject: subjectId,
        });
    
        // Сохраняем пропущенное занятие в базе данных
        const savedMissedClass = await missedClass.save();
    
        res.status(201).json({ missedClass: savedMissedClass });
      } catch (error) {
        console.error("Ошибка при создании пропущенного занятия:", error);
        res.status(500).json({ error: "Внутренняя ошибка сервера" });
      }
}