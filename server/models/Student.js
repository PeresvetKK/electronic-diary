import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
    code: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    lastLastName: { type: String },
    class: { type: mongoose.Schema.Types.ObjectId, ref: "Class" }, // Ссылка на класс
});

export default mongoose.model('Student', StudentSchema);