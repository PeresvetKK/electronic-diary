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
  dueDate: {
    type: String,
    required: true,
  },
  subject: {type: mongoose.Schema.Types.ObjectId, ref: "Subject"},
});

export default mongoose.model("Homework", HomeworkSchema);
