import mongoose from "mongoose";

const LessonGradeSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student', // Ссылка на модель ученика
    required: true
  },
  grade: {
    type: String,
    required: true,
    enum: ['1', '2', '3', '4', '5', 'Н'], // Возможные значения для оценки
  },
  date: { type: Date, required: true },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson', // Ссылка на модель предмета
    required: true
  },
  comment: {
    type: String,
    default: ""
  }
});

export default mongoose.model('LessonGrade', LessonGradeSchema);
