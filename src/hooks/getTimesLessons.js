export const getTimesLessons = (lessonNumber) => {
    lessonNumber = Number(lessonNumber)
    switch (lessonNumber) {
        case 1:
            return "08:00 - 08:40";
        case 2:
            return "08:50 - 09:30";
        case 3:
            return "09:50 - 10:30";
        case 4:
            return "10:50 - 11:30";
        case 5:
            return "11:40 - 12:10";
        case 6:
            return "12:20 - 13:00";
        default:
            return 'none';
    }
}