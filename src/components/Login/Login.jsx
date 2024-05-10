import Form from './Form'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom';
import {setUser} from '../../store/slices/userSlice';
import {useState} from 'react';
import Loader from '../Loader/Loader';
import { UserService } from '../../services/userService';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false)
    
    const handleLogin = (email, password) => {
        setLoader(true)
        UserService.login(email, password).then(result => {
            dispatch(setUser({
                email: result.email,
                id: result.code,
                token: result.token,
                userType: result.userType,
                userFirstName: result.userData.firstName,  
                userLastName: result.userData.lastName,  
                userLastLastName: result.userData.lastLastName,  
                userNumberClass: result.userData.numberClass,
                userLetterClass: result.userData.letterClass,
            }))
            
            // для переадресации пользователя
            navigate('/');
        })   
    }
    return (
        <>
            <Form
                title="Войти"
                handleClick={handleLogin}
            />
            {loader && <Loader/>}
        </>
    )
}

export default Login