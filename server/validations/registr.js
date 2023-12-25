import { body } from "express-validator";

// при помощи body узнаем, есть ли какая-то информация в теле сообщения

// есть ли email, password, avatar
export const registrValidation = [
    body('password', 'Пароль должен быть минимум 5 символов').isLength({min: 5}),
    body('username', 'Укажите ФИО (не мение 3 символов)').isLength({min: 3}),
];