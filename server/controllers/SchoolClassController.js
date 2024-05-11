import SchoolClassSchema from "../models/SchoolClass.js";
import StudentSchema from "../models/Student.js";
import ScheduleSchema from "../models/Schedule.js";

// добавить класс
export const createClass = async (req, res) => {
    try {
        const { classNumber, classLetter, students, classTeacher } = req.body;

        // Проверяем, существует ли учитель с указанным ID
        const existingTeacher = await TeacherSchema.findById(classTeacher);
        if (!existingTeacher) {
            return res.status(404).json({ error: "Учитель не найден" });
        }

        // Проверяем, существуют ли студенты с указанными ID
        const existingStudents = await StudentSchema.find({ _id: { $in: students } });
        if (!existingStudents || existingStudents.length !== students.length) {
            return res.status(404).json({ error: "Один или несколько учеников не найдены" });
        }

        // Создаем новый класс
        const newClass = new SchoolClass({
            classNumber,
            classLetter,
            students,
            classTeacher
        });

        // Сохраняем новый класс в базе данных
        const savedClass = await newClass.save();

        res.status(201).json({ class: savedClass });
    } catch (error) {
        console.error("Ошибка при создании класса:", error);
        res.status(500).json({ error: "Внутренняя ошибка сервера" });
    }
};

// удалить класс
export const deleteClass = async (req, res) => {
    try {
        const { classId } = req.params;

        // Проверяем, существует ли класс с указанным ID
        const existingClass = await SchoolClassSchema.findById(classId);
        if (!existingClass) {
            return res.status(404).json({ error: "Класс не найден" });
        }

        // Удаляем класс из базы данных
        await existingClass.remove();

        res.status(200).json({ message: "Класс успешно удален" });
    } catch (error) {
        console.error("Ошибка при удалении класса:", error);
        res.status(500).json({ error: "Внутренняя ошибка сервера" });
    }
};

// Получить все классы
export const getAllClasses = async (req, res) => {
    try {
        const classes = await SchoolClassSchema.find().populate("students").populate("classTeacher");
        res.status(200).json(classes);
    } catch (error) {
        res.status(500).json({ message: "Ошибка при получении классов", error: error.message });
    }
};

// Получить информацию о конкретном классе
export const getClassById = async (req, res) => {
    const { id } = req.params;
    try {
        const schoolClass = await SchoolClassSchema.findById(id).populate("students").populate("classTeacher");
        if (!schoolClass) {
            return res.status(404).json({ message: "Класс не найден" });
        }
        res.status(200).json(schoolClass);
    } catch (error) {
        res.status(500).json({ message: "Ошибка при получении информации о классе", error: error.message });
    }
};

// Добавить ученика в класс
export const addStudentToClass = async (req, res) => {
    const { classId, studentId } = req.params;
    try {
        const schoolClass = await SchoolClassSchema.findById(classId);
        const student = await StudentSchema.findById(studentId);

        if (!schoolClass) {
            return res.status(404).json({ message: "Класс не найден" });
        }
        if (!student) {
            return res.status(404).json({ message: "Ученик не найден" });
        }
        if (schoolClass.students.includes(studentId)) {
            return res.status(400).json({ message: "Ученик уже добавлен в класс" });
        }

        schoolClass.students.push(studentId);
        await schoolClass.save();

        res.status(200).json({ message: "Ученик успешно добавлен в класс", schoolClass });
    } catch (error) {
        res.status(500).json({ message: "Ошибка при добавлении ученика в класс", error: error.message });
    }
};

// Удалить ученика из класса
export const removeStudentFromClass = async (req, res) => {
    const { classId, studentId } = req.params;
    try {
        const schoolClass = await SchoolClassSchema.findById(classId);
        if (!schoolClass) {
            return res.status(404).json({ message: "Класс не найден" });
        }

        schoolClass.students.pull(studentId);
        await schoolClass.save();

        res.status(200).json({ message: "Ученик успешно удален из класса", schoolClass });
    } catch (error) {
        res.status(500).json({ message: "Ошибка при удалении ученика из класса", error: error.message });
    }
};

// Получить классы, в которых ведет уроки учитель
export const getClassesForTeacher = async (req, res) => {
    const { teacherId } = req.params;
    try {
        const scheduleEntries = await ScheduleSchema.find({ teacher: teacherId }).select("classNumber classLetter");
        const uniqueClasses = Array.from(new Set(scheduleEntries.map(entry => `${entry.classNumber}-${entry.classLetter}`)));
        const classesInfo = [];

        for (const uniqueClass of uniqueClasses) {
            const [classNumber, classLetter] = uniqueClass.split("-");
            const schoolClass = await SchoolClassSchema.findOne({ classNumber, classLetter }).populate("students").populate("classTeacher");
            if (schoolClass) {
                classesInfo.push(schoolClass);
            }
        }

        res.status(200).json(classesInfo);
    } catch (error) {
        res.status(500).json({ message: "Ошибка при получении классов для учителя", error: error.message });
    }
};

