export const getPeremenaSize = (lessonNumber) => {
    switch (Number(lessonNumber)) {
        case 1:
            return 10;
        case 2:
            return 20;
        case 3:
            return 10;
        case 4:
            return 15;
        case 5:
            return 20;
        case 6:
            return 10;
        case 7:
            return 10;
        default:
            return 'none';
    }
}