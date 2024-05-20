import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth } from "./hooks/use-auth";
import './resources/fonts/Roboto/Roboto-Black.ttf';
import './resources/fonts/Roboto/Roboto-Bold.ttf';
import './resources/fonts/Roboto/Roboto-Light.ttf';
import './resources/fonts/Roboto/Roboto-Medium.ttf';
import './resources/fonts/Roboto/Roboto-Regular.ttf';
import './resources/fonts/Roboto/Roboto-Thin.ttf';
import './style/App.scss';

import Loyout from "./components/Loyout/Loyout"; 
import Main from "./pages/Main/Main";
import AdminMain from './pages/Admin/Main/AdminMain';
import News from "./pages/News/News";
import JournalUch from "./pages/Journal/JournalUch/JournalUch";
import JournalTeacher from './pages/Journal/JournalTeacher/JournalTeacher';
import NotFound from './pages/NotFound/NotFound';
import LoginPage from './pages/Login-Registration/LoginPage/LoginPage';
import RegisterPage from './pages/Login-Registration/RegistrationPage/RegistrationPage';
import UrokDetail from "./components/UrokDetail/UrokDetail";

// админ
import RegistedUser from './pages/Admin/RegistedUser/RegistedUser';
import CreateClass from "./pages/Admin/CreateClass/CreateClass";
import ClassList from "./pages/Admin/ClassList/ClassList";
import ClassPage from "./pages/Admin/ClassPage/ClassPage";

function App() {
    // получает информацию - авторизован или нет
    const {isAuth} = useAuth();
    const role = useSelector(state => state.user.userType);
	return (
        <div className="reactRoot">
            <BrowserRouter>
                <Routes> 
                    {!isAuth
                        ?<>
                            <Route path="/login" element={<LoginPage/>}/>
                            <Route path="/register" element={<RegisterPage/>}/>
                        </> 
                        : null
                    }
                    <Route path="/" element={<Loyout/>}>
                        {console.log(role)}
                        {role === "Teacher"
                            &&<>
                                <Route index element={<Main/>}/>
                                <Route path="/edit-lesson/:classNumber/:classLetter/:id" element={<UrokDetail/>}/>
                                <Route path="/journal/:classId/:subjectId" element={<JournalTeacher/>}/>
                             </> 
                        }
                        {role === "Student"
                            &&<>
                                <Route index element={<Main/>}/>
                                <Route path="journal" element={<JournalUch/>}/>
                            </>
                        }
                        {role === "Admin"
                            &&<>
                               <Route index element={<AdminMain/>}/>
                               <Route path="/admin/auth/register" element={<RegistedUser/>}/>
                               <Route path="/admin/clases/create" element={<CreateClass/>}/>
                               <Route path="/admin/classes" element={<ClassList/>}/>
                               <Route path="/admin/classes/:id" element={<ClassPage/>}/>
                            </>
                        }
                        <Route path="news" element={<News/>}/>
                        <Route path="*" element={<NotFound />}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
	);
}

export default App;
