import SchoolClassSchema from '../models/SchoolClass.js';
import StudentSchema from '../models/Student.js';
import ScheduleSchema from '../models/Schedule.js';
import LessonGradeSchema from '../models/GradesLesson.js';
import dayjs from 'dayjs';
import 'dayjs/locale/ru.js';

dayjs.locale('ru');

export const getClassJournal = async (req, res) => {
    try {
        const { classId, subjectId } = req.params;

        // Получаем информацию о классе
        const schoolClass = await SchoolClassSchema.findById(classId).populate('students').exec();
        if (!schoolClass) {
            return res.status(404).json({ error: "Класс не найден" });
        }

        // Получаем расписание для указанного класса и предмета
        const schedules = await ScheduleSchema.find({ class: classId, subjectName: subjectId }).exec();
        if (!schedules.length) {
            return res.status(404).json({ error: "Расписание не найдено" });
        }

        // Получаем оценки для указанного предмета и класса
        const grades = await LessonGradeSchema.find({ subject: { $in: schedules.map(s => s._id) }, student: { $in: schoolClass.students.map(s => s._id) }}).exec();

        // Текущая дата
        const currentDate = dayjs();

        // Группируем уроки по месяцам и добавляем оценки к урокам
        const lessonsByMonth = {};
        schedules.forEach(schedule => {
            const monthYear = dayjs(schedule.date).format('MMMM YYYY');
            if (!lessonsByMonth[monthYear]) {
                lessonsByMonth[monthYear] = [];
            }

            // Добавляем оценки к каждому уроку
            const lessonGrades = schoolClass.students.map(student => {
                const gradeEntry = grades.find(g => g.student.equals(student._id) && g.subject.equals(schedule._id));
                return {
                    studentId: student._id,
                    studentName: `${student.lastName} ${student.firstName}`,
                    grade: gradeEntry ? gradeEntry.grade : null,
                    gradeId: gradeEntry ? gradeEntry._id : null // Добавляем ID оценки
                };
            });

            lessonsByMonth[monthYear].push({
                date: schedule.date,
                id: schedule._id,
                isCurrentMonth: dayjs(schedule.date).month() === currentDate.month() && dayjs(schedule.date).year() === currentDate.year(),
                isFutureDate: dayjs(schedule.date).isAfter(currentDate, 'day'),
                grades: lessonGrades
            });
        });

        // Преобразуем объект lessonsByMonth в массив и сортируем его по дате
        const lessonsByMonthArray = Object.keys(lessonsByMonth)
            .map(key => ({
                month: key,
                lessons: lessonsByMonth[key].sort((a, b) => dayjs(a.date).isBefore(dayjs(b.date)) ? -1 : 1)
            }))
            .sort((a, b) => dayjs(a.lessons[0].date).isBefore(dayjs(b.lessons[0].date)) ? -1 : 1);

        // Формируем список студентов с их средней оценкой
        const students = schoolClass.students.map(student => {
            const studentGrades = grades.filter(g => g.student.equals(student._id)).map(g => parseFloat(g.grade));
            const totalGrades = studentGrades.reduce((sum, g) => sum + (isNaN(g) ? 0 : g), 0);
            const gradeCount = studentGrades.filter(g => !isNaN(g)).length;
            const averageGrade = gradeCount ? (totalGrades / gradeCount).toFixed(2) : 'N/A';

            return {
                _id: student._id,
                fullName: `${student.lastName} ${student.firstName}`,
                averageGrade
            };
        });

        res.status(200).json({ subject: schedules[0].subjectName, classNumber: schoolClass.classNumber, classLetter: schoolClass.classLetter, lessonsByMonth: lessonsByMonthArray, students });
    } catch (error) {
        console.error("Ошибка при получении данных журнала класса:", error);
        res.status(500).json({ error: "Внутренняя ошибка сервера" });
    }
};

export const addGrade = async (req, res) => {
    try {
        const { studentId, subjectId } = req.params;
        const { grade, date, comment } = req.body;

        // Проверяем, что все обязательные поля присутствуют
        if (!grade || !date) {
            return res.status(400).json({ error: "Все поля (grade, date, comment) обязательны" });
        }
        var commentariy;
        if (!comment){
            commentariy = ""
        }else{
            commentariy = comment
        }

        // Проверяем, что оценка валидна
        if (!['1', '2', '3', '4', '5', 'Н'].includes(grade)) {
            return res.status(400).json({ error: "Недопустимое значение оценки" });
        }

        // Проверяем, что студент существует
        const student = await StudentSchema.findById(studentId);
        if (!student) {
            return res.status(404).json({ error: "Студент не найден" });
        }

        // Проверяем, что предмет существует
        const subject = await ScheduleSchema.findById(subjectId);
        if (!subject) {
            return res.status(404).json({ error: "Предмет не найден" });
        }

        // Создаем новую оценку
        const newGrade = new LessonGradeSchema({
            student: studentId,
            grade,
            date,
            subject: subjectId,
            comment: commentariy
        });

        await newGrade.save();

        res.status(201).json(newGrade);
    } catch (error) {
        console.error("Ошибка при добавлении оценки:", error);
        res.status(500).json({ error: "Внутренняя ошибка сервера" });
    }
};

export const updateGrade = async (req, res) => {
    try {
        const { classId, subjectId, studentId, gradeId } = req.params;
        const { grade, comment } = req.body;

        const existingGrade = await LessonGradeSchema.findOne({ _id: gradeId, student: studentId, subject: subjectId }).exec();

        if (!existingGrade) {
            return res.status(404).json({ error: "Оценка не найдена." });
        }

        existingGrade.grade = grade;
        existingGrade.comment = comment;

        await existingGrade.save();

        res.status(200).json({ message: "Оценка обновлена успешно.", grade: existingGrade });
    } catch (error) {
        console.error("Ошибка при обновлении оценки:", error);
        res.status(500).json({ error: "Внутренняя ошибка сервера" });
    }
};