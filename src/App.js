import React from "react";
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
import { BrowserRouter, Route, Routes } from "react-router-dom";
import News from "./pages/News/News";
import Journal from "./pages/Journal/Journal";

function App() {
	return (
        <div className="reactRoot">
            <BrowserRouter>
                <Header></Header>
                <SideBar></SideBar>
                <Routes>
                    <Route path="/" element={<Main/>}/>
                    <Route path="/news" element={<News/>}/>
                    <Route path="/journal" element={<Journal/>}/>
                </Routes>
            </BrowserRouter>
        </div>
	);
}

export default App;
