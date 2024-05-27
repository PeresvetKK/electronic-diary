import Schedule from "../models/Schedule.js";
import Lesson from "../models/Lesson.js";
import SchoolClass from "../models/SchoolClass.js";
import Teacher from "../models/Teacher.js";
import Student from "../models/Student.js";

// Создание расписания
export const createScheduleItems = async (req, res) => {
  try {
    const scheduleItems = req.body; // Ожидаем массив объектов расписания

    const savedScheduleItems = await Schedule.insertMany(scheduleItems.map(item => ({
      dayOfWeek: item.dayOfWeek,
      lessonNumber: item.lessonNumber,
      class: item.classId,
      subjectName: item.subjectName,
      teacher: item.teacherId,
      classroomNumber: item.classroomNumber,
    })));

    res.status(201).json(savedScheduleItems);
  } catch (error) {
    console.error("Ошибка при создании расписания:", error);
    res.status(500).json({ error: "Внутренняя ошибка сервера" });
  }
};

// Получение расписания
export const getSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.find().populate("class").populate("teacher");

    const daysOfWeek = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

    const scheduleByDay = daysOfWeek.map(day => ({
      day,
      classes: []
    }));

    schedule.forEach(item => {
      const dayIndex = item.dayOfWeek - 1;
      const classInfo = scheduleByDay[dayIndex].classes.find(
        cls => cls.classNumber === item.class.classNumber && cls.classLetter === item.class.classLetter
      );

      const lesson = {
        lessonNumber: item.lessonNumber,
        subjectName: item.subjectName,
        teacher: {
          _id: item.teacher._id,
          firstName: item.teacher.firstName,
          lastName: item.teacher.lastName,
          lastLastName: item.teacher.lastLastName,
        },
        classroomNumber: item.classroomNumber,
      };

      if (classInfo) {
        classInfo.lessons.push(lesson);
      } else {
        scheduleByDay[dayIndex].classes.push({
          classNumber: item.class.classNumber,
          classLetter: item.class.classLetter,
          lessons: [lesson]
        });
      }
    });

    res.json(scheduleByDay);
  } catch (error) {
    console.error("Ошибка при получении расписания:", error);
    res.status(500).json({ error: "Внутренняя ошибка сервера" });
  }
};

// Генерация уроков на неделю
export const generateWeeklyLessons = async (req, res) => {
  try {
    const schedule = await Schedule.find();

    const startDate = new Date(); // текущая дата
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + 7); // дата через неделю

    const lessons = [];

    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      const dayOfWeek = d.getDay() || 7; // 1 - Понедельник, 7 - Воскресенье

      schedule.forEach((item) => {
        if (item.dayOfWeek === dayOfWeek) {
          const newLesson = new Lesson({
            scheduleItem: item._id,
            date: new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())), // Форматирование даты без времени
            topic: "", // Тема урока может быть заполнена позже
          });

          lessons.push(newLesson.save());
        }
      });
    }

    await Promise.all(lessons);

    res.status(201).json({ message: "Уроки на неделю успешно сгенерированы" });
  } catch (error) {
    console.error("Ошибка при генерации уроков:", error);
    res.status(500).json({ error: "Внутренняя ошибка сервера" });
  }
};

// Получение уроков учителя по дате
export const getTeacherLessonsByDate = async (req, res) => {
  try {
    const { teacherId, date } = req.params;

    const parsedDate = new Date(date); // Убедимся, что дата корректно парсится
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({ error: "Неверный формат даты" });
    }

    console.log("Teacher ID:", teacherId);
    console.log("Parsed Date:", parsedDate);

    // Найти все уроки по дате
    const lessons = await Lesson.find({ date: parsedDate }).populate({
      path: "scheduleItem",
      populate: { path: "teacher class" }
    });

    console.log("All lessons found:", lessons);

    // Фильтровать уроки по teacherId
    const filteredLessons = lessons.filter(lesson => {
      return lesson.scheduleItem.teacher._id.toString() === teacherId;
    });

    console.log("Filtered lessons:", filteredLessons);

    res.json(filteredLessons);
  } catch (error) {
    console.error("Ошибка при получении уроков учителя:", error);
    res.status(500).json({ error: "Внутренняя ошибка сервера" });
  }
};


// Получение уроков ученика по дате
export const getClassLessonsByDate = async (req, res) => {
  try {
    const { classId, date } = req.params;

    const lessons = await Lesson.find({ date: new Date(date) })
      .populate({
        path: "scheduleItem",
        match: { class: classId },
        populate: { path: "class teacher" }
      });

    res.json(lessons);
  } catch (error) {
    console.error("Ошибка при получении уроков класса:", error);
    res.status(500).json({ error: "Внутренняя ошибка сервера" });
  }
};

// Изменение темы урока
export const editLessonTopic = async (req, res) => {
  try {
    const { lessonId, newTopic } = req.body;

    const updatedLesson = await Lesson.findByIdAndUpdate(
      lessonId,
      { topic: newTopic },
      { new: true }
    );

    res.status(200).json({ updatedLesson });
  } catch (error) {
    console.error("Ошибка при изменении темы урока:", error);
    res.status(500).json({ error: "Внутренняя ошибка сервера" });
  }
};

// Получение информации о конкретном уроке
export const getLessonDetails = async (req, res) => {
  try {
    const { classNumber, classLetter, lessonId } = req.params;

    // Найти класс по номеру и букве
    const schoolClass = await SchoolClass.findOne({ classNumber, classLetter }).populate('students');
    if (!schoolClass) {
      return res.status(404).json({ error: "Класс не найден" });
    }

    // Найти урок по ID
    const lesson = await Lesson.findById(lessonId).populate({
      path: 'scheduleItem',
      populate: { path: 'teacher class' }
    });
    if (!lesson) {
      return res.status(404).json({ error: "Урок не найден" });
    }

    res.status(200).json(lesson);
  } catch (error) {
    console.error("Ошибка при получении информации об уроке:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
};
