import mongoose from "mongoose";

// предмет - название предмета
const SubjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
});


export default mongoose.model("Subject", SubjectSchema);