import SchoolClassSchema from "../models/SchoolClass.js";
import StudentSchema from "../models/Student.js";
import TeacherSchema from "../models/Teacher.js";

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
        const newClass = new SchoolClassSchema({
            classNumber,
            classLetter,
            students,
            classTeacher
        });

        // Сохраняем новый класс в базе данных
        const savedClass = await newClass.save();

        // Обновляем данные учителя
        existingTeacher.classTeacherOf = savedClass._id;
        await existingTeacher.save();

        // Обновляем данные студентов
        await StudentSchema.updateMany(
            { _id: { $in: students } },
            { $set: { class: savedClass._id } }
        );

        res.status(201).json({ class: savedClass });
    } catch (error) {
        console.error("Ошибка при создании класса:", error);
        res.status(500).json({ error: "Внутренняя ошибка сервера" });
    }
};

// получить все классы
export const getAllClasses = async (req, res) => {
    try {
        const classes = await SchoolClassSchema.find().populate('classTeacher').populate('students');
        res.json(classes);
    } catch (error) {
        console.error("Ошибка при получении классов:", error);
        res.status(500).json({ error: "Внутренняя ошибка сервера" });
    }
};

// получить класс по id
export const getClassById = async (req, res) => {
    try {
        const classId = req.params.classId;
        const classData = await SchoolClassSchema.findById(classId).populate('classTeacher').populate('students');

        if (!classData) {
            return res.status(404).json({ error: "Класс не найден" });
        }

        res.json(classData);
    } catch (error) {
        console.error("Ошибка при получении класса:", error);
        res.status(500).json({ error: "Внутренняя ошибка сервера" });
    }
};

// удалить класс
export const deleteClass = async (req, res) => {
    try {
        const classId = req.params.classId;

        // Найти класс
        const existingClass = await SchoolClassSchema.findById(classId).populate('classTeacher').populate('students');
        if (!existingClass) {
            return res.status(404).json({ message: "Класс не найден" });
        }

        // Обнулить значение classTeacherOf у учителя
        if (existingClass.classTeacher) {
            await TeacherSchema.findByIdAndUpdate(existingClass.classTeacher._id, { classTeacherOf: null });
        }

        // Обнулить значение class у всех учеников
        if (existingClass.students.length > 0) {
            await StudentSchema.updateMany({ _id: { $in: existingClass.students } }, { class: null });
        }

        // Удалить класс
        await SchoolClassSchema.findByIdAndDelete(classId);

        // Получить обновленный список всех классов
        const classes = await SchoolClassSchema.find().populate('classTeacher').populate('students');
        
        res.json({ message: "Класс успешно удален", classes });
    } catch (error) {
        console.error("Ошибка при удалении класса:", error);
        res.status(500).json({ error: "Внутренняя ошибка сервера" });
    }
};

// добавить учеников в класс
export const addStudentsToClass = async (req, res) => {
    try {
        const { classId } = req.params;
        const { studentIds } = req.body; // Массив ID учеников

        const existingClass = await SchoolClassSchema.findById(classId);
        if (!existingClass) {
            return res.status(404).json({ message: "Класс не найден" });
        }

        const existingStudents = await StudentSchema.find({ _id: { $in: studentIds } });
        if (existingStudents.length !== studentIds.length) {
            return res.status(404).json({ message: "Один или несколько учеников не найдены" });
        }

        existingClass.students.push(...studentIds);
        await existingClass.save();

        await StudentSchema.updateMany(
            { _id: { $in: studentIds } },
            { $set: { class: classId } }
        );

        const updatedClass = await SchoolClassSchema.findById(classId).populate('students');

        res.json({ message: "Ученики успешно добавлены в класс", students: updatedClass.students });
    } catch (error) {
        console.error("Ошибка при добавлении учеников в класс:", error);
        res.status(500).json({ error: "Внутренняя ошибка сервера" });
    }
};


// удалить ученика из класса
export const removeStudentFromClass = async (req, res) => {
    try {
        const { classId, studentId } = req.params;

        const existingClass = await SchoolClassSchema.findById(classId).populate('students');
        if (!existingClass) {
            return res.status(404).json({ message: "Класс не найден" });
        }

        const existingStudent = await StudentSchema.findById(studentId);
        if (!existingStudent) {
            return res.status(404).json({ message: "Ученик не найден" });
        }

        existingClass.students.pull(studentId);
        await existingClass.save();

        existingStudent.class = null;
        await existingStudent.save();

        // Перезагружаем класс, чтобы вернуть обновленный список студентов
        const updatedClass = await SchoolClassSchema.findById(classId).populate('students');

        res.json({ 
            message: "Ученик успешно удален из класса",
            students: updatedClass.students 
        });
    } catch (error) {
        console.error("Ошибка при удалении ученика из класса:", error);
        res.status(500).json({ error: "Внутренняя ошибка сервера" });
    }
};

// получить все классы учителя
export const getClassesForTeacher = async (req, res) => {
    try {
        const teacherId = req.params.teacherId;
        const classes = await SchoolClassSchema.find({ classTeacher: teacherId });
        res.json(classes);
    } catch (error) {
        console.error("Ошибка при получении классов учителя:", error);
        res.status(500).json({ error: "Внутренняя ошибка сервера" });
    }
};
