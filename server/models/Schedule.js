import mongoose from "mongoose";

// расписание
// 2) день недели
// 3) номер урока
// 4) номер класса (например, 5 класс), у которого будет урок по данному предмету
// 5) предмет
// 6) учитель -  тот самый из наших прошлых моделей
// 7)  буква класса
// 8) номер кабинета

const ScheduleSchema = new mongoose.Schema({
  dayOfWeek: { type: String, required: true },
  lessonNumber: { type: Number, required: true },
  classNumber: { type: Number, required: true },
  subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher", required: true },
  classLetter: { type: String, required: true },
  classroomNumber: { type: Number, required: true },
  date: { type: Date, required: true },
});

export default mongoose.model("Schedule", ScheduleSchema);
