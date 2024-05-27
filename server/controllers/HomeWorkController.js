import HomeWorkSchema from '../models/HomeWork.js';
import SchoolClassSchema from '../models/SchoolClass.js';
import LessonSchema from '../models/Lesson.js';

export const createHomeWork = async (req, res) => {
    try {
        const { homework, classId, date, subject } = req.body;
        const currentDate = new Date(date.split('.').reverse().join('-') + 'T00:00:00.000Z');

        // Проверяем, существует ли класс с указанным ID
        const schoolClass = await SchoolClassSchema.findById(classId);
        if (!schoolClass) {
            return res.status(404).json({ error: "Класс не найден" });
        }

        // Проверяем, существует ли расписание с указанным ID
        const existingSchedule = await LessonSchema.findById(subject);
        if (!existingSchedule) {
            return res.status(404).json({ error: "Расписание не найдено" });
        }

        // Создание нового домашнего задания с использованием предмета и класса
        const newHomeWork = new HomeWorkSchema({
            homework,
            date: currentDate,
            subject: existingSchedule._id,
            class: schoolClass._id,
        });

        // Сохранение домашнего задания в базе данных
        const savedHomeWork = await newHomeWork.save();

        // Популяризируем класс и расписание
        const populatedHomeWork = await savedHomeWork.populate([{ path: 'class' }, { path: 'subject' }]);

        res.status(201).json({ homework: populatedHomeWork });
    } catch (error) {
        console.error("Ошибка при создании домашнего задания:", error);
        res.status(500).json({ error: "Внутренняя ошибка сервера" });
    }
};

export const getCurrentDayHomeWork = async (req, res) => {
    try {
        const { classId, subject } = req.params;

        // Проверяем, существует ли класс с указанным ID
        const schoolClass = await SchoolClassSchema.findById(classId);
        if (!schoolClass) {
            return res.status(404).json({ error: "Класс не найден" });
        }

        // Формируем объект запроса
        const query = {
            class: classId,
            subject
        };

        // Выполняем запрос к базе данных
        const homeWorkList = await HomeWorkSchema.find(query).populate('class').populate('subject');

        res.status(200).json({ homeworkList: homeWorkList });
    } catch (error) {
        console.error("Ошибка при получении домашнего задания:", error);
        res.status(500).json({ error: "Внутренняя ошибка сервера" });
    }
}

export const getHomeWork = async (req, res) => {
    try {
        const { classId, startDate, endDate } = req.params;
        // Проверяем, существует ли класс с указанным ID
        const schoolClass = await SchoolClassSchema.findById(classId);
        if (!schoolClass) {
            return res.status(404).json({ error: "Класс не найден" });
        }

        // Проверяем, присутствуют ли поля начальной и конечной даты в запросе
        const query = { class: classId };
        if (startDate && endDate) {
            // Если поля начальной и конечной даты присутствуют, парсим их в объекты Date
            const start = new Date(startDate.split('.').reverse().join('-') + 'T00:00:00.000Z');
            const end = new Date(endDate.split('.').reverse().join('-') + 'T23:59:59.999Z');

            // Добавляем поле даты в запрос в базу данных в диапазоне от начальной до конечной даты
            query.date = { $gte: start, $lte: end };
        }

        // Поиск домашнего задания по ID класса и интервалу даты
        const homeWorkList = await HomeWorkSchema.find(query).populate('class').populate('subject');

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
        ).populate('class').populate('subject');

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