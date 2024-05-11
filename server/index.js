import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import checkAuth from './utils/checkAuth.js';

import { register, login, getMe, usersAll } from './controllers/UserController.js'
import { createSchedule, getStudentSchedule, getTeacherSchedule, editLessonTopic } from './controllers/ScheduleController.js';
import { createHomeWork, getHomeWork, editHomeWork, getCurrentDayHomeWork, deleteHomeWork } from './controllers/HomeWorkController.js';
import { createCommentForClass, getCommentsForClass, editCommentForClass, deleteCommentForClass } from './controllers/CommentForClassController.js';
import { createCommentForStudent, getCommentsForStudent, editCommentForStudent, deleteCommentForStudent } from './controllers/CommentForStudentController.js';
import { createMissed } from './controllers/MissedClassController.js';
import { createGrade, getGrades } from './controllers/GradesLessonController.js';
import { getAllClasses, getClassById, addStudentToClass, removeStudentFromClass, getClassesForTeacher, createClass, deleteClass } from './controllers/SchoolClassController.js';

mongoose
    .connect('mongodb+srv://koltyrin2309:2OSn7uc83diRJASg@cluster0.hmtdahv.mongodb.net/')
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err))

const app = express();
app.use(cors())
app.use(express.json());

// регистрация, авторизация, авторизован ли
app.post('/auth/register', register);
app.post('/auth/login', login,)
app.get('/auth/me', checkAuth, getMe)

// администратор
// расписание создать
app.post('/schedule/newSchedule', createSchedule)

// ученик
// расписание на интервал даты
app.get('/schedule/getSchedule/:classId/:startDate/:endDate', getStudentSchedule)

// получить дз на интервал
app.get('/homeWork/:classId/:startDate/:endDate', getHomeWork)

// учитель
// расписание на интервал даты
app.get('/schedule/getTeacherSchedule/:teacherId/:startDate/:endDate', getTeacherSchedule)
// Изменение темы урока
app.put('/schedule/editLessonTopic', editLessonTopic);

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


// пропуски
app.post("/missed/create", createMissed);

// оценка
app.post('/students/createGrades', createGrade);
app.post('/students/getGrades/', getGrades);

// Потом по id урока найти все оценки и комментарии для всех учеников
// временно посылаю массив данных для отображения
app.get('/users/all', usersAll);

// Комментарии для класса
app.post('/comments/class', createCommentForClass);
app.get('/comments/class/:scheduleId', getCommentsForClass);
app.put('/comments/class/:commentId', editCommentForClass);
app.delete('/comments/class/:commentId', deleteCommentForClass);

// Комментарии для студента
app.post('/comments/student', createCommentForStudent);
app.get('/comments/student/:studentId/:scheduleId', getCommentsForStudent);
app.put('/comments/student/:commentId', editCommentForStudent);
app.delete('/comments/student/:commentId', deleteCommentForStudent);

// Классы
app.get('/classes', getAllClasses);
app.post('/clases/create', createClass);
app.get('/classes/:classId', getClassById);
app.delete('/classes/delete/:classId', deleteClass);
app.post('/classes/:classId/addStudent/:studentId', addStudentToClass);
app.delete('/classes/:classId/removeStudent/:studentId', removeStudentFromClass);
app.get('/classes/teacher/:teacherId', getClassesForTeacher);

app.listen(4444, (err) => {
    // если сервер не смог запуститься
    if (err) {
        return console.log(err);
    }

    console.log('Server OK');
})
