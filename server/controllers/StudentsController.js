import StudentSchema from '../models/Student.js';

export const getStudents = async (req, res) => {
    try {
        const { classNumber, classLetter } = req.params;

        // Поиск студентов в базе данных по номеру и букве класса
        const students = await StudentSchema.find({
            numberClass: classNumber,
            letterClass: classLetter,
        });

        res.status(200).json({students});
    } catch (error) {
        console.error("Ошибка при получении студентов:", error);
        res.status(500).json({ error: "Внутренняя ошибка сервера" });
    }
};
