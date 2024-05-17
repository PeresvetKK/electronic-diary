import axios from "axios";

export const UserService = {
    async login(email, password) {
        const response = await axios.post(`http://localhost:4444/auth/login`, {
            "email": email,
            "password": password,
        });
        return response.data;
    },
    async getAll() {
        const response = await axios.get(`http://localhost:4444/users/all`);
        return response.data;
    },
    async getLessonById(id) {
        const response = await axios.get(`http://localhost:4444/${id}`);
        return response.data;
    },
    async registedTeacher(data) {
        const response = await axios.post(`http://localhost:4444/auth/register`, {
            "email": data.email,
            "password": data.password,
            "userType": data.userType,
            "firstName": data.firstName,
            "lastName": data.lastName,
            "lastLastName": data.lastLastName,
            "classId": null
        });
        return response.data;
    },
    async registedStudent(data) {
        const response = await axios.post(`http://localhost:4444/auth/register`, {
            "email": data.email,
            "password": data.password,
            "userType": data.userType,
            "firstName": data.firstName,
            "lastName": data.lastName,
            "lastLastName": data.lastLastName,
            "classId": null
        });
        return response.data;
    },
    async getAllUsersByRole(userType) {
        const response = await axios.get(`http://localhost:4444/auth/users/${userType}`);
        return response.data;
    },
    async assignClassToTeacher(teacherId, classId) {
        const response = await axios.put(`http://localhost:4444/assign-class-to-teacher`, {
            "teacherId": teacherId,
            "classId": classId,
        });
        return response.data;
    },
    async assignClassToStudents(studentIds, classId) {
        const response = await axios.put(`http://localhost:4444/assign-class-to-students`, {
            "studentIds": studentIds,
            "classId": classId,
        });
        return response.data;
    },
};
