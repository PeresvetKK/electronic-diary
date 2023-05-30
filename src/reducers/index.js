import {combineReducers} from 'redux';
// создаёт store, второй - подключить redux-thunk
import {createStore, applyMiddleware} from 'redux';
import reposReducer from './reposReducer';
import { composeWithDevTools} from 'redux-devtools-extension';
// решает проблему асинхронности
import thunk from 'redux-thunk';

// корневой редюсер
const rootReducer = combineReducers({
    // перечисляем все рюдусеры
    repos: reposReducer,

})

// создаем сам store
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))