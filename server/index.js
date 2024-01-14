import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import checkAuth from './utils/checkAuth.js';

import {register, login, getMe, usersAll} from './controllers/UserController.js'
import {createSchedule, getStudentSchedule, getTeacherSchedule} from './controllers/ScheduleController.js';
import {createHomeWork, getHomeWork, editHomeWork} from './controllers/HomeWorkController.js';
import {createMissed} from './controllers/MissedClassController.js';
import {createGrade, getGrades} from './controllers/GradesLessonController.js';
import { getStudents } from './controllers/StudentsController.js';

mongoose
.connect('mongodb+srv://koltyrin02:jSjiSdcFw9h1kBBA@cluster0.adbonz9.mongodb.net/blog')
.then(() => console.log('DB ok'))
.catch((err) => console.log('DB error', err))

const app = express();
app.use(cors())
app.use(express.json());

// регистрация, авторизация, авторизован ли
app.post('/auth/register', register);
app.post('/auth/login', login,)
app.get('/auth/me', checkAuth, getMe)

// расписание
app.post('/schedule/newSchedule', createSchedule)
app.get('/schedule/getSchedule/:classNumber/:classLetter/:startDate/:endDate', getStudentSchedule)
app.get('/schedule/getTeacherSchedule/:lastName/:firstName/:lastLastName/:startDate/:endDate', getTeacherSchedule)

// домашнее задание
app.post('/homeWork/create', createHomeWork)
app.get('/homeWork/:classNumber/:classLetter', getHomeWork)
app.put("/editHomeWork", editHomeWork);


// пропуски
app.post("/missed/create", createMissed);

// оценка
app.post('/students/createGrades', createGrade);
app.post('/students/getGrades', getGrades);

// получить список класса. По букве и цифре класса искать всех учеников. 
app.get('/students/getStudents/:classNumber/:classLetter', getStudents)
// Потом по id урока найти все оценки и комментарии для всех учеников
// временно посылаю массив данных для отображения
app.get('/users/all', usersAll);

app.listen(4444, (err) => {
    // если сервер не смог запуститься
    if (err) {
        return console.log(err);
    }
    
    console.log('Server OK');
})

