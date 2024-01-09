import axios from "axios";

export const HomeWorkService = {
    async getHomeWork(classNumber, classLetter) {
        const response = await axios.get(`http://localhost:4444/homeWork/${classNumber}/${classLetter}`)
        return response.data
    },
};
