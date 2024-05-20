import axios from "axios";

export const classService = {
    async getAllClasses() {
        const response = await axios.get(`http://localhost:4444/classes`);
        return response.data;
    },

    async createClass(classData) {
        const response = await axios.post(`http://localhost:4444/classes/create`, classData);
        return response.data;
    },

    async getClassById(classId) {
        const response = await axios.get(`http://localhost:4444/classes/${classId}`);
        return response.data;
    },

    async deleteClass(classId) {
        const response = await axios.delete(`http://localhost:4444/classes/delete/${classId}`);
        return response.data;
    },
   async addStudentsToClass(classId, studentIds) {
    const response = await axios.post(`http://localhost:4444/classes/${classId}/addStudents`, {
        studentIds: studentIds
    });
    return response.data;
},

    async removeStudentFromClass(classId, studentId) {
        const response = await axios.delete(`http://localhost:4444/classes/${classId}/removeStudent/${studentId}`);
        return response.data;
    },

    async getClassesForTeacher(teacherId) {
        const response = await axios.get(`http://localhost:4444/classes/teacher/${teacherId}`);
        return response.data;
    }
};
