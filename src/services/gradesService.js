import axios from "axios";

export const GradesService = {
    async getGrades(classNumber, classLetter) {
        const response = await axios.get(`http://localhost:4444/schedule/getSchedule/${classNumber}/${classLetter}`)
        return response.data
    },
};
