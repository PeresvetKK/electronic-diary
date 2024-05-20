import mongoose from "mongoose";

const ScheduleSchema = new mongoose.Schema({
  dayOfWeek: { type: Number, required: true },
  lessonNumber: { type: Number, required: true },
  class: { type: mongoose.Schema.Types.ObjectId, ref: "SchoolClass", required: true }, // Изменено на правильное имя модели
  subjectName: { type: String, required: true },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher", required: true },
  classroomNumber: { type: Number, required: true },
  date: { type: Date, required: true },
  topic: { type: String, required: false },
});

export default mongoose.model("Schedule", ScheduleSchema);
