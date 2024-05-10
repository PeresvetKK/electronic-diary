import axios from "axios";

export const ClassPeoplesService = {
    async getPeoples(classNumber, classLetter) {
        const response = await axios.get(`http://localhost:4444/students/getStudents/${classNumber}/${classLetter}`)
        return response.data
    },
};