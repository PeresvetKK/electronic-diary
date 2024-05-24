import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../../UI/button/Button';
import Input from '../../UI/input/Input/Input';
import './InfoUrok.scss'

import HomeWorkSection from './HomeWorkSection/HomeWorkSection.jsx';

const InfoUrok = ({ urokInfo }) => {
    

    return (
        <div className="infourok-main">
            <div className="infourok-main-item">
                <p className="infourok-main-item__title">Материалы к уроку</p>
                <div className="infourok-main-box">
                    <p className="infourok-main-box__title">Вы пока не добавили ни одного материала к уроку</p>
                </div>
                <Button classNameElement="btn-blue material-add">
                    + Добавить материалы
                </Button>
            </div>
            <HomeWorkSection urokInfo={urokInfo}/>
            {/* <CommentSection urlParams={urlParams} /> */}
            
        </div>
    )
}

export default InfoUrok