import {createSlice} from '@reduxjs/toolkit';

// начальное состояние
const initialState = {
    email: null,
    token: null,
    id: null,
    userType: null,
    userName: null,
    userNumberClass: null,
    userLetterClass: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // сюда отдаем наши данные при авторизации
        setUser(state, action) {
            state.email = action.payload.email;
            state.token = action.payload.token;
            state.id = action.payload.id;
            state.userType = action.payload.userType;
            state.userName = `${action.payload.userLastName} ${action.payload.userFirstName} ${action.payload.userLastLastName}`;
            state.userNumberClass = action.payload.userNumberClass;
            state.userLetterClass = action.payload.userLetterClass;
        },
        // выход из профиля
        removeUser(state) {
            state.email = null;
            state.token = null;
            state.id = null;
            state.userType = null;
            state.userName = null;
            state.userNumberClass = null;
            state.userLetterClass = null;
        },
    },
});

export const {setUser, removeUser} = userSlice.actions;

export default userSlice.reducer;
