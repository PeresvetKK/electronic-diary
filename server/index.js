import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import checkAuth from './utils/checkAuth.js';

import { register, login, getMe, getUsersByRole, assignClassToTeacher, assignClassToStudents, usersAll } from './controllers/UserController.js'
import {
    createScheduleItems,
    getSchedule,
    generateWeeklyLessons,
    getTeacherLessonsByDate,
    getClassLessonsByDate,
    editLessonTopic,
    getLessonDetails,
  } from "./controllers/ScheduleController.js";
import { createHomeWork, getHomeWork, editHomeWork, getCurrentDayHomeWork, deleteHomeWork } from './controllers/HomeWorkController.js';

import { getAllClasses, getClassById, addStudentsToClass, removeStudentFromClass, getClassesForTeacher, createClass, deleteClass } from './controllers/SchoolClassController.js';
import { addGrade, getClassJournal, updateGrade } from './controllers/JournalController.js';
mongoose
    .connect('mongodb+srv://koltyrin2309:2OSn7uc83diRJASg@cluster0.hmtdahv.mongodb.net/')
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err))

const app = express();
app.use(cors())
app.use(express.json());

// администратор
    app.post('/auth/register', register);
    app.post('/auth/login', login,)
    app.get('/auth/me', checkAuth, getMe)
    app.get('/auth/users/:userType', getUsersByRole);
    // Маршрут для назначения классного руководства учителя
    app.put('/assign-class-to-teacher', assignClassToTeacher);
    // Маршрут для назначения класса студентам
    app.put('/assign-class-to-students', assignClassToStudents);
    // расписание создать
    app.post("/schedule", createScheduleItems);
    // расписание получить
    app.get("/schedule", getSchedule);
    // создать уроки на неделю
    app.post("/generate-lessons", generateWeeklyLessons);

// ученик
    // расписание на интервал даты
    app.get("/lessons/class/:classId/:date", getClassLessonsByDate);
    // получить дз на интервал
    app.get('/homeWork/:classId/:startDate/:endDate', getHomeWork)

// учитель
    // расписание на интервал даты
    app.get("/lessons/teacher/:teacherId/:date", getTeacherLessonsByDate);
    // открыть конкретный урок
    app.get("/lesson/:classNumber/:classLetter/:lessonId", getLessonDetails); 
    // Изменение темы урока
    app.put("/lesson/topic", editLessonTopic);
    // создать дз
    app.post('/homeWork/create', createHomeWork)
    // редактировать дз
    app.put("/homeWork/edit", editHomeWork);
    // получить дз на интервал
    app.get('/homeWork/:classId/:startDate/:endDate', getHomeWork)
    // получить дз для конкретного предмета
    app.get('/homeWork/:classId/:subject', getCurrentDayHomeWork)
    // удалить дз
    app.delete('/homeWork/:homeworkId', deleteHomeWork);
    // отоюражение страницы журнала
    app.get('/journal/:classId/:subjectId', getClassJournal);
    app.post('/grade/create/class/:classId/subject/:subjectId/student/:studentId', addGrade);
    app.put('/grade/update/class/:classId/subject/:subjectId/student/:studentId/:gradeId', updateGrade);

// Классы
    app.get('/classes', getAllClasses);
    app.post('/classes/create', createClass);
    app.get('/classes/:classId', getClassById);
    app.delete('/classes/delete/:classId', deleteClass);
    app.post('/classes/:classId/addStudents', addStudentsToClass);
    app.delete('/classes/:classId/removeStudent/:studentId', removeStudentFromClass);
    app.get('/classes/teacher/:teacherId', getClassesForTeacher);

app.get('/users/all', usersAll);
app.listen(4444, (err) => {
    // если сервер не смог запуститься
    if (err) {
        return console.log(err);
    }

    console.log('Server OK');
})
