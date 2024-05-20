import SchoolClassSchema from '../models/SchoolClass.js';
import StudentSchema from '../models/Student.js';
import ScheduleSchema from '../models/Schedule.js';
import LessonGradeSchema from '../models/LessonGrade.js';

export const getClassJournal = async (req, res) => {
    try {
        const { classId, subjectId } = req.params;

        // Получаем информацию о классе
        const schoolClass = await SchoolClassSchema.findById(classId).populate('students').exec();
        if (!schoolClass) {
            return res.status(404).json({ error: "Класс не найден" });
        }

        // Получаем расписание для указанного класса и предмета
        const schedules = await ScheduleSchema.find({ class: classId, subjectName: subjectId }).exec();
        if (!schedules.length) {
            return res.status(404).json({ error: "Расписание не найдено" });
        }

        // Получаем оценки для указанного предмета и класса
        const grades = await LessonGradeSchema.find({
            subject: { $in: schedules.map(s => s._id) },
            student: { $in: schoolClass.students.map(s => s._id) }
        }).exec();

        // Формируем структуру данных для ответа
        const students = schoolClass.students.map(student => ({
            _id: student._id,
            fullName: `${student.lastName} ${student.firstName}`,
            grades: schedules.map(schedule => {
                const grade = grades.find(g => g.student.equals(student._id) && g.subject.equals(schedule._id));
                return {
                    date: schedule.date,
                    grade: grade ? grade.grade : null,
                };
            }),
            averageGrade: null // будем считать ниже
        }));

        // Рассчитываем средний балл для каждого ученика
        students.forEach(student => {
            const totalGrades = student.grades.reduce((sum, g) => sum + (g.grade || 0), 0);
            const gradeCount = student.grades.filter(g => g.grade !== null).length;
            student.averageGrade = gradeCount ? (totalGrades / gradeCount).toFixed(2) : 'N/A';
        });

        res.status(200).json({
            subject: subjectId,
            classNumber: schoolClass.classNumber,
            classLetter: schoolClass.classLetter,
            students
        });
    } catch (error) {
        console.error("Ошибка при получении данных журнала класса:", error);
        res.status(500).json({ error: "Внутренняя ошибка сервера" });
    }
};
