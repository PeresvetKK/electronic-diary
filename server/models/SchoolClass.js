import mongoose from "mongoose";

const SchoolClassSchema = new mongoose.Schema({
    classNumber: { type: Number, required: true },
    classLetter: { type: String, required: true },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
    classTeacher: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" }, // Ссылка на классного руководителя
});

export default mongoose.model("SchoolClass", SchoolClassSchema);
