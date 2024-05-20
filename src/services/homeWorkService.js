import axios from "axios";

export const HomeWorkService = {
    async getHomeWork(classId, startDate, endDate) {
        const response = await axios.get(`http://localhost:4444/homeWork/${classId}/${startDate}/${endDate}`);
        return response.data.homeworkList; // Возвращаем список домашнего задания
    },

    async getCurrentDayHomeWork(classId, subject) {
        const response = await axios.get(`http://localhost:4444/homeWork/${classId}/${subject}`);
        return response.data.homeworkList; // Возвращаем список домашнего задания
    },

    async editHomeWork(homeworkId, updatedHomework) {
        const response = await axios.put(`http://localhost:4444/homeWork/edit`, {
            homeworkId,
            updated: updatedHomework
        });
        return response.data.updatedHomework; // Возвращаем обновленное домашнее задание
    },

    async createHomeWork(homework, classId, date, subject) {
        const response = await axios.post(`http://localhost:4444/homeWork/create`, {
            "homework": homework,
            "classId": classId,
            "date": date,
            "subject": subject
        });
        return response.data.homework;
    },

    async deleteHomeWork(homeworkId) {
        const response = await axios.delete(`http://localhost:4444/homeWork/${homeworkId}`);
        return response.data; // Возвращаем сообщение об успешном удалении
    },
};
