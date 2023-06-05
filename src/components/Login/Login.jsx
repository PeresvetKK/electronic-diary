import Form from './Form'
import { useDispatch } from 'react-redux'
import {useNavigate} from 'react-router-dom';
import {setUser} from '../../store/slices/userSlice';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handleLogin = (email, password) => {
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
            .catch(console.error)
    }

    return (
        <div>
            <Form
                title="login"
                handleClick={handleLogin}
            />
        </div>
    )
}

export default Login