import axios from "axios";

export const classService = {
    async getAllClasses() {
        const response = await axios.get(`http://localhost:4444/classes`);
        return response.data;
    },

};
