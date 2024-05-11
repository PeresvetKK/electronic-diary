import CommentForStudentSchema from '../models/CommentForStudent.js';

export const createCommentForStudent = async (req, res) => {
    try {
        const { studentId, scheduleId, commentText } = req.body;
        const newComment = new CommentForStudentSchema({
            studentId,
            scheduleId,
            commentText,
        });
        const savedComment = await newComment.save();
        res.status(201).json({ comment: savedComment });
    } catch (error) {
        console.error("Ошибка при создании комментария для ученика:", error);
        res.status(500).json({ error: "Ошибка сервера" });
    }
};

export const getCommentsForStudent = async (req, res) => {
    try {
        const { studentId, scheduleId } = req.params;
        const comments = await CommentForStudentSchema.find({ studentId, scheduleId }).sort({ createdAt: 'desc' });
        res.status(200).json({ comments });
    } catch (error) {
        console.error("Ошибка при получении комментариев для ученика:", error);
        res.status(500).json({ error: "Ошибка сервера" });
    }
};

export const editCommentForStudent = async (req, res) => {
    try {
        const { commentId } = req.params;
        const { commentText } = req.body;
        const updatedComment = await CommentForStudentSchema.findByIdAndUpdate(
            commentId,
            { commentText },
            { new: true }
        );
        res.status(200).json({ updatedComment });
    } catch (error) {
        console.error("Ошибка при редактировании комментария для ученика:", error);
        res.status(500).json({ error: "Ошибка сервера" });
    }
};

export const deleteCommentForStudent = async (req, res) => {
    try {
        const { commentId } = req.params;
        await CommentForStudentSchema.findByIdAndDelete(commentId);
        res.status(200).json({ message: "Комментарий успешно удален" });
    } catch (error) {
        console.error("Ошибка при удалении комментария для ученика:", error);
        res.status(500).json({ error: "Ошибка сервера" });
    }
};
