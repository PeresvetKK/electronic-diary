import mongoose from "mongoose";

const TeacherSchema = new mongoose.Schema({
    code: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    lastLastName: { type: String },
    classTeacherOf: { type: mongoose.Schema.Types.ObjectId, ref: "SchoolClass" }, // Ссылка на класс, где учитель является классным руководителем
});

export default mongoose.model('Teacher', TeacherSchema);
