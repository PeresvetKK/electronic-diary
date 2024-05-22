import axios from "axios";

export const journalService = {
    async getClassJournal(classId, subjectId) {
        const response = await axios.get(`http://localhost:4444/journal/${classId}/${subjectId}`);
        return response.data;
    },
    async fetchClassJournal(classId, subjectId) {
        console.log(classId)
        console.log(subjectId)
        const response = await axios.get(`http://localhost:4444/journal/${classId}/${subjectId}`);
        return response.data;
    },
    async addGrade(grade) {
        console.log(grade)
        try {
            const response = await axios.post(
                `http://localhost:4444/grade/create/class/${grade.classId}/subject/${grade.subjectId}/student/${grade.studentId}`,
                grade.gradeData
            );
            return response.data;
        } catch (error) {
            console.error('Ошибка при добавлении оценки:', error.response.data);
            throw error;
        }
    },
    async updateGrade(grade) {
        console.log(grade)
        try {
            const response = await axios.put(
                `http://localhost:4444/grade/update/class/${grade.classId}/subject/${grade.subjectId}/student/${grade.studentId}/${grade.gradeId}`, 
                grade.gradeData
            );
            return response.data;
        } catch (error) {
            console.error('Ошибка при обновлении оценки:', error.response.data);
            throw error;
        }
    }
};