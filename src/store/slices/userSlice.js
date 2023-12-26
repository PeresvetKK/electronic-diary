import {createSlice} from '@reduxjs/toolkit';

// начальное состояние
const initialState = {
    email: null,
    token: null,
    id: null,
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
            state.userFirstName = action.payload.userFirstName;
            state.userLastName = action.payload.userLastName;
            state.userLastLastName = action.payload.userLastLastName;
            state.userNumberClass = action.payload.userNumberClass;
            state.userLetterClass = action.payload.userLetterClass;
        },
        // выход из профиля
        removeUser(state) {
            state.email = null;
            state.token = null;
            state.id = null;
        },
    },
});

export const {setUser, removeUser} = userSlice.actions;

export default userSlice.reducer;
