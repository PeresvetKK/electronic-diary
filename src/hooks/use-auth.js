import {useSelector} from "react-redux";

export function useAuth(){
    const {email, token, id, userType, userName, userNumberClass, userLetterClass} = useSelector(state => state.user);
 
    console.log({email, token, id, userType, userName, userNumberClass, userLetterClass})
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
