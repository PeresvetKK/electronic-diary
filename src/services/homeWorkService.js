import axios from "axios";

export const HomeWorkService = {
    async getHomeWork(classId, startDate, endDate) {
        const response = await axios.get(`http://localhost:4444/homeWork/${classId}/${startDate}/${endDate}`);
        return response.data;
    },

    async getCurrentDayHomeWork(classId, subject) {
        const response = await axios.get(`http://localhost:4444/homeWork/${classId}/${subject}`);
        return response.data.homeworkList;
    },

    async editHomeWork(homeworkId, updated) {
        const response = await axios.put(`http://localhost:4444/editHomeWork/`, {
            "homeworkId": homeworkId,
            "updated": {
                "homework": updated
            }
        });
        return response.data;
    },

    async createHomeWork(homework, classId, date, subject) {
        const response = await axios.post(`http://localhost:4444/homeWork/create`, {
            "homework": homework,
            "classId": classId,
            "date": date,
            "subject": subject
        });
        return response.data;
    },

    async deleteHomeWork(homeWorkId) {
        const response = await axios.delete(`http://localhost:4444/homeWork/${homeWorkId}`);
        return response.data;
    },
};
