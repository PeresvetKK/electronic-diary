// выносим название типа в переменную
const SET_REPOS = 'SET_REPOS'; 
const SET_IS_FETCHING = 'SET_IS_FETCHING';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';

// дефолтное состояние
const defaultState = {
    // полученные репозитории
    items: [],
    // true, когда данные получаются с API git hub
    isFetching: true,
    currentPage: 1,
    perPage: 10,
    totalCount: 0
};
// редюсер, отвечающий за репозитории принимает состояние и action
export default function reposReducer(state = defaultState, action) {
    switch (action.type) {
        // обрабатывает данный action
        case SET_REPOS:
            return {
                ...state,
                items: action.payload.items,
                totalCount: action.payload.total_count,
                isFetching: false,
            }
        case SET_IS_FETCHING:
            return {
                ...state,
                isFetching: action.payload
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload
            }
        default:
            return state;
    }
}
// функция, которая возвращает action, т.е. объект, у которого есть поле type и
// какие-либо данные если захотим изменить значение count в редюсере, нам
// необходимо будет вызвать функцию setCount, в которую параметром мы передадим
// число, на которое хотим заменить значение. Функция вернет action, в котором
// payload будет = тому числу, которое мы передадим в параметры
export const setRepos = (repos) => ({type:SET_REPOS, payload:repos})
// меняет поле isFetching, true, если данные в процессе подгразки
export const setIsFetching = (bool) => ({type:SET_IS_FETCHING, payload:bool})
export const setCurrentPage = (page) => ({type:SET_CURRENT_PAGE, payload:page})
