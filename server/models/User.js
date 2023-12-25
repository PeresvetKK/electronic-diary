import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    // поле, которое будет хранить ссылку на соответствующий документ в коллекции учителей или учеников
    code: { type: mongoose.Schema.Types.ObjectId, refPath: 'userType' },
    // хэш пароля
    passwordHash: {
        type: String,
        required: true,
    },
    // тип роли
    userType: {
        type: String,
        required: true,
        enum: ['Teacher', 'Student']
    },
},{
    timestamps: true,
});  

export default mongoose.model('User', UserSchema);