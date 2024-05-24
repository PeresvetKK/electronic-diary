import axios from "axios";

export const ScheduleService = {
    async getSchedule(classId, startDate, endDate) {
        const response = await axios.get(`http://localhost:4444/schedule/getSchedule/${classId}/${startDate}/${endDate}`);
        return response.data;
    },

    async getLessonDetails(classNumber, classLetter, lessonId) {
        const response = await axios.get(`http://localhost:4444/schedule/lesson/${classNumber}/${classLetter}/${lessonId}`);
        return response.data;
    },

    async getTeacherSchedule(teacherId, startDate, endDate) {
        const response = await axios.get(`http://localhost:4444/schedule/getTeacherSchedule/${teacherId}/${startDate}/${endDate}`);
        return response.data;
    },

    async editLessonTopic(lessonId, newTopic) {
        const response = await axios.put("http://localhost:4444/schedule/editLessonTopic", {
            lessonId,
            newTopic,
        });
        return response.data;
    },

    async createCommentForClass(scheduleId, comment) {
        const response = await axios.post("http://localhost:4444/comments/class", {
            scheduleId,
            comment,
        });
        return response.data;
    },

    async getCommentsForClass(scheduleId) {
        const response = await axios.get(`http://localhost:4444/comments/class/${scheduleId}`);
        return response.data;
    },

    async editCommentForClass(commentId, updatedComment) {
        const response = await axios.put(`http://localhost:4444/comments/class/${commentId}`, {
            updatedComment,
        });
        return response.data;
    },

    async deleteCommentForClass(commentId) {
        const response = await axios.delete(`http://localhost:4444/comments/class/${commentId}`);
        return response.data;
    },

    async createCommentForStudent(studentId, scheduleId, comment) {
        const response = await axios.post("http://localhost:4444/comments/student", {
            studentId,
            scheduleId,
            comment,
        });
        return response.data;
    },

    async getCommentsForStudent(studentId, scheduleId) {
        const response = await axios.get(`http://localhost:4444/comments/student/${studentId}/${scheduleId}`);
        return response.data;
    },

    async editCommentForStudent(commentId, updatedComment) {
        const response = await axios.put(`http://localhost:4444/comments/student/${commentId}`, {
            updatedComment,
        });
        return response.data;
    },

    async deleteCommentForStudent(commentId) {
        const response = await axios.delete(`http://localhost:4444/comments/student/${commentId}`);
        return response.data;
    },
};
