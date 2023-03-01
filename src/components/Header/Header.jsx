import React from 'react';
import classes from './Header.scss';

const Header = () => {
    return (
        <header class='header'>
            <div className="header__left">
                <div className="header__settings">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.32,9.55l-1.89-.63.89-1.78A1,1,0,0,0,20.13,6L18,3.87a1,1,0,0,0-1.15-.19l-1.78.89-.63-1.89A1,1,0,0,0,13.5,2h-3a1,1,0,0,0-.95.68L8.92,4.57,7.14,3.68A1,1,0,0,0,6,3.87L3.87,6a1,1,0,0,0-.19,1.15l.89,1.78-1.89.63A1,1,0,0,0,2,10.5v3a1,1,0,0,0,.68.95l1.89.63-.89,1.78A1,1,0,0,0,3.87,18L6,20.13a1,1,0,0,0,1.15.19l1.78-.89.63,1.89a1,1,0,0,0,.95.68h3a1,1,0,0,0,.95-.68l.63-1.89,1.78.89A1,1,0,0,0,18,20.13L20.13,18a1,1,0,0,0,.19-1.15l-.89-1.78,1.89-.63A1,1,0,0,0,22,13.5v-3A1,1,0,0,0,21.32,9.55ZM20,12.78l-1.2.4A2,2,0,0,0,17.64,16l.57,1.14-1.1,1.1L16,17.64a2,2,0,0,0-2.79,1.16l-.4,1.2H11.22l-.4-1.2A2,2,0,0,0,8,17.64l-1.14.57-1.1-1.1L6.36,16A2,2,0,0,0,5.2,13.18L4,12.78V11.22l1.2-.4A2,2,0,0,0,6.36,8L5.79,6.89l1.1-1.1L8,6.36A2,2,0,0,0,10.82,5.2l.4-1.2h1.56l.4,1.2A2,2,0,0,0,16,6.36l1.14-.57,1.1,1.1L17.64,8a2,2,0,0,0,1.16,2.79l1.2.4ZM12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14Z" /></svg>
                </div>
                <div className="header__calendar">
                    <svg width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 11C7 10.4477 7.44772 10 8 10C8.55228 10 9 10.4477 9 11C9 11.5523 8.55228 12 8 12C7.44772 12 7 11.5523 7 11Z" fill="#000000"/>
                        <path d="M7 16C7 15.4477 7.44772 15 8 15C8.55228 15 9 15.4477 9 16C9 16.5523 8.55228 17 8 17C7.44772 17 7 16.5523 7 16Z" fill="#000000"/>
                        <path d="M11 11C11 10.4477 11.4477 10 12 10C12.5523 10 13 10.4477 13 11C13 11.5523 12.5523 12 12 12C11.4477 12 11 11.5523 11 11Z" fill="#000000"/>
                        <path d="M11 16C11 15.4477 11.4477 15 12 15C12.5523 15 13 15.4477 13 16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16Z" fill="#000000"/>
                        <path d="M15 11C15 10.4477 15.4477 10 16 10C16.5523 10 17 10.4477 17 11C17 11.5523 16.5523 12 16 12C15.4477 12 15 11.5523 15 11Z" fill="#000000"/>
                        <path d="M15 16C15 15.4477 15.4477 15 16 15C16.5523 15 17 15.4477 17 16C17 16.5523 16.5523 17 16 17C15.4477 17 15 16.5523 15 16Z" fill="#000000"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M8 2C8.55228 2 9 2.44772 9 3V4H15V3C15 2.44772 15.4477 2 16 2C16.5523 2 17 2.44772 17 3V4C19.7614 4 22 6.23858 22 9V17C22 19.7614 19.7614 22 17 22H7C4.23858 22 2 19.7614 2 17V9C2 6.23858 4.23858 4 7 4V3C7 2.44772 7.44772 2 8 2ZM7 6C5.34315 6 4 7.34315 4 9V17C4 18.6569 5.34315 20 7 20H17C18.6569 20 20 18.6569 20 17V9C20 7.34315 18.6569 6 17 6C17 6.55229 16.5523 7 16 7C15.4477 7 15 6.55229 15 6H9C9 6.55229 8.55228 7 8 7C7.44772 7 7 6.55229 7 6Z" fill="#000000"/>
                    </svg>
                </div>
            </div>
            <div className="header__right">
                <div className="header__userbox userbox">
                    <div className="userbox__textbox">
                        <p className="userbox__name text-s font-m">Колтырин Пересвет</p>
                        <p className="userbox__role text-xs">Администратор</p>
                    </div>
                    <a href="#" className="userbox__icon">
                        <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"/>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
                            <g id="SVGRepo_iconCarrier"> <rect width="24" height="24" fill="white"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z" fill="#F2F2F2"/> </g>
                        </svg>
                        {/* <picture>
                            <source srcset='/images/circle.svg' media="(max-width: 800px)"/>
                            <img src="640.jpg" alt="Абстрактное изображение"/>
                        </picture> */}
                    </a>
                </div>
            </div>
        </header>
    )
}

export default Header