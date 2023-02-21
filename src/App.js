import React from "react";
import './fonts/Roboto/Roboto-Black.ttf';
import './fonts/Roboto/Roboto-Bold.ttf';
import './fonts/Roboto/Roboto-Light.ttf';
import './fonts/Roboto/Roboto-Medium.ttf';
import './fonts/Roboto/Roboto-Regular.ttf';
import './fonts/Roboto/Roboto-Thin.ttf';
import '../src/style/App.scss';

import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import SideBar from "./components/SideBar/SideBar";

function App() {
	return (
        <div class="reactRoot">
            <Header></Header>
            <SideBar></SideBar>
            <Main></Main>
        </div>
	);
}

export default App;
