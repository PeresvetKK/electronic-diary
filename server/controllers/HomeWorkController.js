import SubjectSchema from '../models/Subject.js';
import HomeWorkSchema from '../models/HomeWork.js';

export const createHomeWork = async (req, res) => {
    try {
        const { homework, classNumber, classLetter, dueDate, subject } = req.body;
    
        // Поиск предмета в базе данных по названию
        const existingSubject = await SubjectSchema.findOne({ name: subject});
    
        if (!existingSubject) {
          return res.status(404).json({ error: "Предмет не найден" });
        }
    
        // Создание нового домашнего задания с использованием предмета
        const newHomeWork = new HomeWorkSchema({
          homework,
          classNumber,
          classLetter,
          dueDate,
          subject: existingSubject._id,
        });
    
        // Сохранение домашнего задания в базе данных
        const savedHomeWork = await newHomeWork.save();
    
        res.status(201).json({ homework: savedHomeWork });
      } catch (error) {
        console.error("Ошибка при создании домашнего задания:", error);
        res.status(500).json({ error: "Внутренняя ошибка сервера" });
      }
}

export const getHomeWork = async (req, res) => {
    try {
        let { classNumber, classLetter } = req.params;
        classNumber = parseInt(classNumber)
        // Поиск домашнего задания по номеру и букве класса
        const homeWorkList = await HomeWorkSchema.find({
            classNumber: parseInt(classNumber), // Преобразуем в число, если необходимо
            classLetter,
        }).populate('subject'); // Подключаем предмет к результатам запроса

        res.status(200).json({ homeworkList: homeWorkList });
    } catch (error) {
        console.error("Ошибка при получении домашнего задания:", error);
        res.status(500).json({ error: "Внутренняя ошибка сервера" });
    }
}

export const editHomeWork = async (req, res) => {
    try {
        const { homeworkId, updated } = req.body;

        const updatedHomeWork = await HomeWorkSchema.findByIdAndUpdate(
            homeworkId,
            updated,
            { new: true } // Возвращать обновленный документ
        );

        res.status(200).json({ updatedHomework: updatedHomeWork });
    } catch (error) {
        console.error("Ошибка при изменении домашнего задания:", error);
        res.status(500).json({ error: "Внутренняя ошибка сервера" });
    }
}