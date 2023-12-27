import TeacherSchema from '../models/Teacher.js';
import SubjectSchema from '../models/Subject.js';
import ScheduleSchema from '../models/Schedule.js';

// Добавление нового урока в расписание
export const createSchedule = async (req, res) => {
    try {
        // Получаем данные об учителе из запроса
        const   lastName = req.body.teacher.lastName,
                firstName = req.body.teacher.firstName,
                lastLastName = req.body.teacher.lastLastName;

        // Ищем учителя в базе данных на основе предоставленных данных
        const existingTeacher = await TeacherSchema.findOne({
            lastName,
            firstName,
            lastLastName,
        });

        if (!existingTeacher) {
            return res.status(404).json({ error: "Учитель не найден" });
        }

        let predmet;
        // Проверяем наличие предмета в базе данных
        const existingSubject = await SubjectSchema.findOne({
            name: req.body.subject,
        });

        if (existingSubject) {
            // Используем существующий предмет
            predmet = existingSubject._id;
        } else {
            // Создаем новый предмет
            const newSubject = new SubjectSchema({ name: req.body.subject });
            const savedPredmet = await newSubject.save();
            predmet = savedPredmet._id;
        }

        // Создаем объект урока с использованием существующего учителя и предмета
        const lesson = new ScheduleSchema({
            dayOfWeek: req.body.dayOfWeek,
            lessonNumber: req.body.lessonNumber,
            classNumber: req.body.classNumber,
            subject: predmet,
            teacher: existingTeacher._id,
            classLetter: req.body.classLetter,
            classroomNumber: req.body.classroomNumber,
        });

        // Сохраняем урок в базе данных
        const savedLesson = await lesson.save();

        console.log("Урок добавлен в расписание:", savedLesson);
        res.json({ lesson: savedLesson });
    } catch (error) {
        console.error("Ошибка при создании урока:", error);
        res.status(500).json({ error: "Ошибка сервера" });
    }
}

// Получение расписания для ученика
export const getStudentSchedule = async (req, res) => {
    try {
        // Получаем номер и букву класса из запроса
        const { classNumber, classLetter } = req.body;

        // Ищем расписание для ученика
        const studentSchedule = await ScheduleSchema.find({
            classNumber,
            classLetter,
        })
        .populate("subject") // Загружаем данные по предмету
        .populate("teacher", "lastName firstName lastLastName"); // Загружаем данные по учителю

        res.json({studentSchedule});
    } catch (error) {
        console.error("Ошибка при получении расписания для ученика:", error);
        res.status(500).json({ error: "Ошибка сервера" });
    }
}

// Получение расписания для учителя
export const getTeacherSchedule = async (req, res) => {
    try {
      // Получаем ФИО учителя из запроса
      const { lastName, firstName, lastLastName } = req.body;
  
      // Ищем учителя в базе данных на основе предоставленных данных
      const existingTeacher = await TeacherSchema.findOne({
        lastName,
        firstName,
        lastLastName,
      });
  
      if (!existingTeacher) {
        return res.status(404).json({ error: "Учитель не найден" });
      }
  
      // Ищем расписание для учителя
      const teacherSchedule = await ScheduleSchema.find({ teacher: existingTeacher._id })
        .populate("subject") // Загружаем данные по предмету
        .populate("teacher", "lastName firstName lastLastName"); // Загружаем данные по учителю
  
      res.json({ teacherSchedule });
    } catch (error) {
      console.error("Ошибка при получении расписания для учителя:", error);
      res.status(500).json({ error: "Ошибка сервера" });
    }
};