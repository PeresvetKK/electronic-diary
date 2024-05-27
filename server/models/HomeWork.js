import mongoose from "mongoose";

const HomeworkSchema = new mongoose.Schema({
  homework: {
    type: String,
    required: true,
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SchoolClass",
    required: true,
  },
  date: { 
    type: Date, 
    required: true 
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lesson",
    required: true,
  },
});

export default mongoose.model("Homework", HomeworkSchema);