import mongoose from "mongoose";

const LessonSchema = new mongoose.Schema({
  scheduleItem: { type: mongoose.Schema.Types.ObjectId, ref: "Schedule", required: true },
  date: { type: Date, required: true },
  topic: { type: String, required: false },
});

export default mongoose.model("Lesson", LessonSchema);
