import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './resources/fonts/Roboto/Roboto-Black.ttf';
import './resources/fonts/Roboto/Roboto-Bold.ttf';
import './resources/fonts/Roboto/Roboto-Light.ttf';
import './resources/fonts/Roboto/Roboto-Medium.ttf';
import './resources/fonts/Roboto/Roboto-Regular.ttf';
import './resources/fonts/Roboto/Roboto-Thin.ttf';
import './style/App.scss';

import Header from "./components/Header/Header";
import Main from "./pages/Main/Main";
import SideBar from "./components/SideBar/SideBar";
import News from "./pages/News/News";
import Journal from "./pages/Journal/Journal";
import LoginPage from './pages/Login-Registration/LoginPage/LoginPage';
import RegisterPage from './pages/Login-Registration/RegistrationPage/RegistrationPage';

function App() {
	return (
        <div className="reactRoot">
            <BrowserRouter>
                <SideBar></SideBar>
                <div className="content">
                    <Header></Header>
                    <div className='main'>
                        <Routes>
                            <Route path="/" element={<Main/>}/>
                            <Route path="/login" element={<LoginPage/>}/>
                            <Route path="/register" element={<RegisterPage/>}/>
                            <Route path="/news" element={<News/>}/>
                            <Route path="/journal" element={<Journal/>}/>
                        </Routes>
                    </div>
                </div>
                
            </BrowserRouter>
        </div>
	);
}

export default App;
