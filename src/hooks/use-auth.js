import {useSelector} from "react-redux";

export function useAuth(){
    const {email, token, id, userType, userName, userNumberClass, userLetterClass} = useSelector(state => state.user);

    return {
        isAuth: !!email,
        email,
        token,
        id,
        userType,
        userName,
        userNumberClass,
        userLetterClass
    };
}
