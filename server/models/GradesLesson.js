import mongoose from "mongoose";

const LessonGradeSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student', // Ссылка на модель ученика
    required: true
  },
  grade: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  date: { type: Date, required: true },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Schedule', // Ссылка на модель предмета
    required: true
  },
  comment: {
    type: String,
    required: true,
    default: ""
  }
});

export default mongoose.model('LessonGrade', LessonGradeSchema);
