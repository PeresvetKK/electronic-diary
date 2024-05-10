import HomeWorkSchema from '../models/HomeWork.js';

export const createHomeWork = async (req, res) => {
    try {
        const { homework, classNumber, classLetter, date, subject } = req.body;
        // Если поля начальной и конечной даты присутствуют, парсим их в объекты Date
        const currentDate = new Date(date.split('.').reverse().join('-') + 'T00:00:00.000Z');

        // Создание нового домашнего задания с использованием предмета
        const newHomeWork = new HomeWorkSchema({
          homework,
          classNumber,
          classLetter,
          date: currentDate,
          subject: subject,
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
        let {classNumber, classLetter, startDate, endDate} = req.params;
        classNumber = parseInt(classNumber)
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

        // Поиск домашнего задания по номеру, букве класса и интервалу даты
        const homeWorkList = await HomeWorkSchema.find(query)

        res.status(200).json({ homeworkList: homeWorkList });
    } catch (error) {
        console.error("Ошибка при получении домашнего задания:", error);
        res.status(500).json({ error: "Внутренняя ошибка сервера" });
    }
}

export const getCurrentDayHomeWork = async (req, res) => {
    try {
        let {classNumber, classLetter, subject} = req.params;
        classNumber = parseInt(classNumber);

        // Формируем объект запроса
        const query = {
            classNumber,
            classLetter,
            subject
        };
        // Выполняем запрос к базе данных
        const homeWorkList = await HomeWorkSchema.find(query)

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
export const deleteHomeWork = async (req, res) => {
    try {
        const { homeworkId } = req.params;
        // Используем метод findByIdAndRemove для удаления домашнего задания по его ID
        await HomeWorkSchema.findByIdAndRemove(homeworkId);
        res.status(200).json({ message: "Домашнее задание успешно удалено" });
    } catch (error) {
        console.error("Ошибка при удалении домашнего задания:", error);
        res.status(500).json({ error: "Внутренняя ошибка сервера" });
    }
}