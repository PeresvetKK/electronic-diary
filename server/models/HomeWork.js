import mongoose from "mongoose";

const HomeworkSchema = new mongoose.Schema({
  homework: {
    type: String,
    required: true,
  },
  classNumber: {
    type: Number,
    required: true,
  },
  classLetter: {
    type: String,
    required: true,
  },
  date: { type: Date, required: true },
  subject: {type: mongoose.Schema.Types.ObjectId, ref: "Schedule"},
});

export default mongoose.model("Homework", HomeworkSchema);
