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
    async registedTeacher(data) {
        const response = await axios.post(`http://localhost:4444/auth/register`,
            {
                "email": data.email,
                "password": data.password,
                "userType": data.userType,
                "firstName": data.firstName,
                "lastName": data.lastName,
                "lastLastName": data.lastLastName,
                "classId": null
            }
        )
        console.log(response.data)
        return response.data
    },
    async registedStudent(data) {
        const response = await axios.post(`http://localhost:4444/auth/register`,
            {
                "email": data.email,
                "password": data.password,
                "userType": data.userType,
                "firstName": data.firstName,
                "lastName": data.lastName,
                "lastLastName": data.lastLastName,
                "classId": null
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
