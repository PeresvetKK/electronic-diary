import mongoose from "mongoose";

const ScheduleSchema = new mongoose.Schema({
  dayOfWeek: { type: Number, required: true }, // 1 - Понедельник, 7 - Воскресенье
  lessonNumber: { type: Number, required: true }, // 1 - 8
  class: { type: mongoose.Schema.Types.ObjectId, ref: "SchoolClass", required: true },
  subjectName: { type: String, required: true },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher", required: true },
  classroomNumber: { type: String, required: true },
});

export default mongoose.model("Schedule", ScheduleSchema);
