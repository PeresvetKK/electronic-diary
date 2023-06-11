import axios from "axios";

export const UserService = {
    async getAll() {
        const response = await axios.get(`http://localhost:4020/users/`)
        return response.data;
    },
    async getLessonById(id) {
        const response = await axios.get(`http://localhost:4020/users?id=${id}`)
        return response.data[0];
    },
};
