import mongoose from "mongoose";

const MissedClassSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
  lessonNumber: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("MissedClass", MissedClassSchema);