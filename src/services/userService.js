import axios from "axios";

export const UserService = {
    async login(email, password) {
        const response = await axios.post(`http://localhost:4444/auth/login`,
            {
                "email": email,
                "password": password,
            }
        )
        console.log(response.data)
        return response.data
    },
    async getAll() {
        const response = await axios.get(`http://localhost:4444/users/all`)
        return response.data;
    },
    async getLessonById(id) {
        const response = await axios.get(`http://localhost:4020/users?id=${id}`)
        return response.data;
    },
};
