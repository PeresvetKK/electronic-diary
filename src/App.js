import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import News from "./pages/News/News";
import Journal from "./pages/Journal/Journal";
import NotFound from './pages/NotFound/NotFound';
import LoginPage from './pages/Login-Registration/LoginPage/LoginPage';
import RegisterPage from './pages/Login-Registration/RegistrationPage/RegistrationPage';
import UrokDetail from "./components/UrokDetail/UrokDetail";

function App() {
    // получает информацию - авторизован или нет
    const { isAuth, email } = useAuth();
	return (
        <div className="reactRoot">
            <BrowserRouter>
                <Routes> 
                    {!isAuth
                    ? <>
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="/register" element={<RegisterPage/>}/>
                    </>
                    : null}
                    <Route path="/" element={<Loyout/>}>
                        <Route index element={<Main/>}/>
                        <Route path="edit-lesson/:id" element={<UrokDetail/>}/>
                        <Route path="news" element={<News/>}/>
                        <Route path="journal" element={<Journal/>}/>
                        <Route path="*" element={<NotFound />}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
	);
}

export default App;
