import axios from "axios";

export const ScheduldeService = {
    async getSchedule(classNumber, classLetter) {
        const response = await axios.get(`http://localhost:4444/schedule/getSchedule/${classNumber}/${classLetter}`)
        return response.data
    },
    async getTeacherSchedule(lastName, firstName, lastLastName, today, tomorrow){
        const response = await axios.get(`http://localhost:4444/schedule/getTeacherSchedule/${lastName}/${firstName}/${lastLastName}/${today}/${tomorrow}`)
        return response.data
    },
    async editLessonTopic(lessonId, newTopic) {
        const response = await axios.put("http://localhost:4444/schedule/editLessonTopic", {
            lessonId,
            newTopic,
        });
        return response.data;
    },
};