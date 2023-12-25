import express from 'express';
import mongoose from 'mongoose';
import {registrValidation} from './validations/registr.js';
import checkAuth from './utils/checkAuth.js';

import {register, login, getMe} from './controllers/UserController.js'

mongoose
.connect('mongodb+srv://koltyrin02:jSjiSdcFw9h1kBBA@cluster0.adbonz9.mongodb.net/blog')
.then(() => console.log('DB ok'))
.catch((err) => console.log('DB error', err))

const app = express();

// позволяет json, который будет приходить
app.use(express.json());

// регистрация
app.post('/auth/register', register);

// авторизация
app.post('/auth/login', login)

// авторизован ли
app.get('/auth/me', checkAuth, getMe)

app.listen(4444, (err) => {
    // если сервер не смог запуститься
    if (err) {
        return console.log(err);
    }
    
    console.log('Server OK');
})

// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');

// const app = express();
// const PORT = 3000;

// mongoose.connect('mongodb://localhost/school_diary', { useNewUrlParser: true, useUnifiedTopology: true });
// const db = mongoose.connection;

// // Схема для пользователя
// const userSchema = new mongoose.Schema({
//   username: String,
//   password: String,
//   userId: String,
//   userType: String,
// });

// // Модель для пользователя
// const User = mongoose.model('User', userSchema);

// // Схема для ученика
// const studentSchema = new mongoose.Schema({
//   studentCode: String,
//   lastName: String,
//   firstName: String,
//   classNumber: Number,
//   classLetter: String,
// });

// // Модель для ученика
// const Student = mongoose.model('Student', studentSchema);

// // Схема для учителя
// const teacherSchema = new mongoose.Schema({
//   teacherCode: String,
//   lastName: String,
//   firstName: String,
// });

// // Модель для учителя
// const Teacher = mongoose.model('Teacher', teacherSchema);

// app.use(bodyParser.json());

// // Эндпоинт для создания нового пользователя
// app.post('/users', async (req, res) => {
//   const { username, password, userId, userType } = req.body;

//   try {
//     const newUser = new User({ username, password, userId, userType });
//     await newUser.save();
//     res.json(newUser);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // Эндпоинт для удаления пользователя
// app.delete('/users/:userId', async (req, res) => {
//   const { userId } = req.params;

//   try {
//     const deletedUser = await User.findOneAndDelete({ userId });
//     res.json(deletedUser);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // Эндпоинт для получения пользователя
// app.get('/users/:userId', async (req, res) => {
//   const { userId } = req.params;

//   try {
//     const user = await User.findOne({ userId });
//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // Эндпоинт для создания нового ученика
// app.post('/students', async (req, res) => {
//   const { studentCode, lastName, firstName, classNumber, classLetter } = req.body;

//   try {
//     const newStudent = new Student({ studentCode, lastName, firstName, classNumber, classLetter });
//     await newStudent.save();
//     res.json(newStudent);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // Эндпоинт для создания нового учителя
// app.post('/teachers', async (req, res) => {
//   const { teacherCode, lastName, firstName } = req.body;

//   try {
//     const newTeacher = new Teacher({ teacherCode, lastName, firstName });
//     await newTeacher.save();
//     res.json(newTeacher);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // Запуск сервера
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
