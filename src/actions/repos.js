import axios from "axios";
import {setIsFetching, setRepos} from '../../reducers/reposReducer';

export const getRepos = (searchQuery = 'stars:%3E1', currentPage, perPage) => {
    return async (dispatch) => {
        if(searchQuery == ''){
            searchQuery = 'stars:%3E1'
        }
        // до выполнения запроса будет лоадер
        // ответ сервера
        const response = await axios.get(`https://api.github.com/search/repositories?q=${searchQuery}&sort=stars&per_page${perPage}&page=${currentPage}`) 
        // через диспетчера помещаем данные в setRepos в поле Payload
        dispatch(setRepos(response.data))
    }
}

export const getCurrentRepo = async (username, repoName, setRepo) => {
    const response = await axios.get(`https://api.github.com/repos/${username}/${repoName}`)
    setRepo(response.data)
}