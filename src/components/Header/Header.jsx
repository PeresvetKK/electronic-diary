import {useDispatch, useSelector} from 'react-redux';
import {removeUser} from '../../store/slices/userSlice';

import './Header.scss';
import defLogo from '../../resources/images/default-photo.png';
import Button from '../UI/button/Button';


const Header = ({isAuth, children, ...props}) => {
    const dispatch = useDispatch();
    const {userType, userName, userNumberClass, userLetterClass} = useSelector(state => state.user);


    return (
        <header className='header'>
            <div className="header__left">
                <div className="header__settings">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.32,9.55l-1.89-.63.89-1.78A1,1,0,0,0,20.13,6L18,3.87a1,1,0,0,0-1.15-.19l-1.78.89-.63-1.89A1,1,0,0,0,13.5,2h-3a1,1,0,0,0-.95.68L8.92,4.57,7.14,3.68A1,1,0,0,0,6,3.87L3.87,6a1,1,0,0,0-.19,1.15l.89,1.78-1.89.63A1,1,0,0,0,2,10.5v3a1,1,0,0,0,.68.95l1.89.63-.89,1.78A1,1,0,0,0,3.87,18L6,20.13a1,1,0,0,0,1.15.19l1.78-.89.63,1.89a1,1,0,0,0,.95.68h3a1,1,0,0,0,.95-.68l.63-1.89,1.78.89A1,1,0,0,0,18,20.13L20.13,18a1,1,0,0,0,.19-1.15l-.89-1.78,1.89-.63A1,1,0,0,0,22,13.5v-3A1,1,0,0,0,21.32,9.55ZM20,12.78l-1.2.4A2,2,0,0,0,17.64,16l.57,1.14-1.1,1.1L16,17.64a2,2,0,0,0-2.79,1.16l-.4,1.2H11.22l-.4-1.2A2,2,0,0,0,8,17.64l-1.14.57-1.1-1.1L6.36,16A2,2,0,0,0,5.2,13.18L4,12.78V11.22l1.2-.4A2,2,0,0,0,6.36,8L5.79,6.89l1.1-1.1L8,6.36A2,2,0,0,0,10.82,5.2l.4-1.2h1.56l.4,1.2A2,2,0,0,0,16,6.36l1.14-.57,1.1,1.1L17.64,8a2,2,0,0,0,1.16,2.79l1.2.4ZM12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14Z" /></svg>
                </div>
                {isAuth && <Button className="btn-red btn" onClick={() => dispatch(removeUser())}>Выйти</Button>}
            </div>
            <div className="header__right">
                <div className="header__userbox userbox">
                    <div className="userbox__textbox">
                        <p className="userbox__name text-s font-m">{userName}</p>
                        <p className="userbox__role text-xs">
                            {userType == 'Student' ? `ученик ${userNumberClass}${userLetterClass} класса` : "учитель"}
                        </p>
                    </div>
                    <a href="#" className="userbox__icon">
                        {/* {userData.imageLink != '' */}
                            {/* ? <picture>
                                <img src={userData.imageLink} alt={userData.name}/>
                            </picture> */}
                            {/*:*/} <picture>
                                <img src={defLogo} alt={userName}/>
                            </picture>
                        {/* } */}
                    </a>
                </div>
            </div>
        </header>
    )
}

export default Header