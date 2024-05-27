import axios from "axios";

export const ScheduleService = {
  // Создание элемента расписания
  async createScheduleItem(data) {
    const response = await axios.post("http://localhost:4444/schedule", data);
    return response.data;
  },

  // Получение расписания
  async getSchedule() {
    const response = await axios.get("http://localhost:4444/schedule");
    return response.data;
  },

  // Генерация уроков на неделю
  async generateWeeklyLessons() {
    const response = await axios.post("http://localhost:4444/generate-lessons");
    return response.data;
  },

  // Получение уроков учителя по дате
  async getTeacherLessonsByDate(teacherId, date) {
    const response = await axios.get(`http://localhost:4444/lessons/teacher/${teacherId}/${date}`);
    console.log(response.data)
    return response.data;
  },

  // Получение уроков класса по дате
  async getClassLessonsByDate(classId, date) {
    const response = await axios.get(`http://localhost:4444/lessons/class/${classId}/${date}`);
    return response.data;
  },

  // Изменение темы урока
  async editLessonTopic(lessonId, newTopic) {
    const response = await axios.put("http://localhost:4444/lesson/topic", {
      lessonId,
      newTopic,
    });
    return response.data;
  },

  // Получение информации о конкретном уроке
  async getLessonDetails(classNumber, classLetter, lessonId) {
    const response = await axios.get(`http://localhost:4444/lesson/${classNumber}/${classLetter}/${lessonId}`);
    return response.data;
  }
};
