import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../../UI/button/Button';
import Input from '../../UI/input/Input/Input';
import './InfoUrok.scss'
import { ApproveSVG, EditSVG, TrashSVG } from '../../../resources/svg';
import { HomeWorkService } from '../../../services/homeWorkService';
import { getFormatDate } from '../../../hooks/getFormatDate';
import CommentSection from './CommentSection/CommentSection.jsx';
import HomeWorkSection from './HomeWorkSection/HomeWorkSection.jsx';

const InfoUrok = ({ urokInfo }) => {
    const navigate = useNavigate()
    const goBack = () => navigate(-1)
    const location = useLocation();
    const urlParams = location.state.urok;

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
            <HomeWorkSection urokInfo={urokInfo} urlParams={urlParams} />
            {/* <CommentSection urlParams={urlParams} /> */}
            <div></div>
            <div className="info-urok__close" onClick={goBack}>
                <Button classNameElement="btn-red">
                    Закрыть
                </Button>
            </div>
        </div>
    )
}

export default InfoUrok