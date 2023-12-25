import Form from './Form'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom';
import {setUser} from '../../store/slices/userSlice';
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {useState} from 'react';
import Loader from '../Loader/Loader';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false)
    
    const handleLogin = (email, password) => {
        setLoader(true)
        setTimeout(() => {
            const auth = getAuth();
            signInWithEmailAndPassword(auth, email, password)
                .then(({user}) => {
                    dispatch(setUser({
                        email: user.email,
                        id: user.uid,
                        token: user.accessToken, 
                    }))
                    // для переадресации пользователя
                    navigate('/');
                })
                .catch(() => {
                    setLoader(false);
                })     
        }, "2000");
        
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