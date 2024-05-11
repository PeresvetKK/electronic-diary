import CommentForClassSchema from '../models/CommentForClass.js';

export const createCommentForClass = async (req, res) => {
    try {
        const { scheduleId, commentText } = req.body;
        const newComment = new CommentForClassSchema({
            scheduleId,
            commentText,
        });
        const savedComment = await newComment.save();
        res.status(201).json({ comment: savedComment });
    } catch (error) {
        console.error("Ошибка при создании комментария для класса:", error);
        res.status(500).json({ error: "Ошибка сервера" });
    }
};

export const getCommentsForClass = async (req, res) => {
    try {
        const { scheduleId } = req.params;
        const comments = await CommentForClassSchema.find({ scheduleId }).sort({ createdAt: 'desc' });
        res.status(200).json({ comments });
    } catch (error) {
        console.error("Ошибка при получении комментариев для класса:", error);
        res.status(500).json({ error: "Ошибка сервера" });
    }
};

export const editCommentForClass = async (req, res) => {
    try {
        const { commentId } = req.params;
        const { commentText } = req.body;
        const updatedComment = await CommentForClassSchema.findByIdAndUpdate(
            commentId,
            { commentText },
            { new: true }
        );
        res.status(200).json({ updatedComment });
    } catch (error) {
        console.error("Ошибка при редактировании комментария для класса:", error);
        res.status(500).json({ error: "Ошибка сервера" });
    }
};

export const deleteCommentForClass = async (req, res) => {
    try {
        const { commentId } = req.params;
        await CommentForClassSchema.findByIdAndDelete(commentId);
        res.status(200).json({ message: "Комментарий успешно удален" });
    } catch (error) {
        console.error("Ошибка при удалении комментария для класса:", error);
        res.status(500).json({ error: "Ошибка сервера" });
    }
};
