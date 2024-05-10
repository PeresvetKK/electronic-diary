import axios from "axios";

export const HomeWorkService = {
    async getHomeWork(classNumber, classLetter, startDate, endDate) {
        const response = await axios.get(`http://localhost:4444/homeWork/${classNumber}/${classLetter}/${startDate}/${endDate}`)
        return response.data
    },
    async getCurrentDayHomeWork(classNumber, classLetter, subjectId) {
        const response = await axios.get(`http://localhost:4444/homeWork/${classNumber}/${classLetter}/${subjectId}`)
        return response.data.homeworkList
    },
    async putCurrentDayHomeWork(homeWorkId, updated) {
        const response = await axios.put(`http://localhost:4444/editHomeWork/`,{
            "homeworkId": homeWorkId,
            "updated": {
                "homework": updated
            }
        })
        return response.data;
    },
    async postCreatedHomeWorkItem(homework, classNumber, classLetter, date, subject) {
        const response = await axios.post(`http://localhost:4444/homeWork/create`,{
            "homework": homework,
            "classNumber": classNumber,
            "classLetter": classLetter,
            "date": date,
            "subject": subject
        })
        return response.data
    },
    async deleteHomeWork(homeWorkId) {
        const response = await axios.delete(`http://localhost:4444/homeWork/${homeWorkId}`);
        return response.data;
    },
};
