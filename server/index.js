import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import checkAuth from './utils/checkAuth.js';

import {register, login, getMe, usersAll} from './controllers/UserController.js'
import {createSchedule, getStudentSchedule, getTeacherSchedule} from './controllers/ScheduleController.js';

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
app.post('/schedule/getSchedule', getStudentSchedule)
app.post('/schedule/getTeacherSchedule', getTeacherSchedule)

// временно посылаю массив данных для отображения
app.get('/users/all', usersAll);

app.listen(4444, (err) => {
    // если сервер не смог запуститься
    if (err) {
        return console.log(err);
    }
    
    console.log('Server OK');
})

