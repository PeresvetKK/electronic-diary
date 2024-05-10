import axios from "axios";

export const GradesService = {
    async getGrades(peopleList, subjectId) {
        const peopleIDS = peopleList.map(item => item.code);
        const response = await axios.post(`http://localhost:4444/students/getGrades`,
            {
                studentIds: peopleList,
                subjectId: subjectId
            }
        )
        return response.data
    },
};
