import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './UrokDetail.scss';
import InfoUrok from './InfoUrok/InfoUrok';
import { getTimesLessons } from '../../hooks/getTimesLessons.js';
import { ApproveSVG, CloseSVG, EditSVG } from '../../resources/svg';
import Input from '../UI/input/Input/Input.jsx';
import { ScheduleService } from '../../services/scheduleService.js';
import { getDayOfWeek } from '../../hooks/getDayOfWeek.js';
import { getFormatDate } from '../../hooks/getFormatDate.js';
import GoBack from '../UI/goBack/GoBack.jsx';
import MainLoader from '../Loader/MainLoader/MainLoader.jsx';

const UrokDetail = () => {
    const { classNumber, classLetter, id } = useParams();
    const [urok, setUrok] = useState(null);
    const [editedTheme, setEditedTheme] = useState(false);
    const [urokTopic, setUrokTopic] = useState('');
    const [inputUrokTopic, setInputUrokTopic] = useState('');

    useEffect(() => {
        const fetchLessonDetails = async () => {
            try {
                const lessonDetails = await ScheduleService.getLessonDetails(classNumber, classLetter, id);
                setUrok(lessonDetails);
                setUrokTopic(lessonDetails.topic);
                setInputUrokTopic(lessonDetails.topic);
            } catch (error) {
                console.error('Ошибка при получении информации об уроке:', error);
            }
        };

        fetchLessonDetails();
    }, [classNumber, classLetter, id]);

    const handleEditTheme = async () => {
        try {
            await ScheduleService.editLessonTopic(urok._id, inputUrokTopic);
            setUrokTopic(inputUrokTopic);
            setEditedTheme(false);
            setInputUrokTopic('');
        } catch (error) {
            console.error('Ошибка при редактировании темы урока:', error);
        }
    };

    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    if (!urok) {
        return <MainLoader/>
    }

    return (
        <div className="detail">
            <GoBack onClick={goBack} />
            <section className='urok-detail'>
                <div className='urok-detail__title'>
                    <p className='urok-detail__date'>
                        <span>{getDayOfWeek(urok.scheduleItem.dayOfWeek)}</span>
                        {getFormatDate(urok.date)}
                    </p>
                    <div className="urok-detail__text">
                        {urok.scheduleItem.subjectName} {urok.scheduleItem.class.classNumber}{urok.scheduleItem.class.classLetter} ({getTimesLessons(urok.scheduleItem.lessonNumber)})
                    </div>
                    {editedTheme ? (
                        <p className="urok-detail__text">
                            <Input
                                value={inputUrokTopic}
                                onChange={(e) => setInputUrokTopic(e.target.value)}
                                placeholder="Введите тему урока"
                            />
                            <span onClick={() => setEditedTheme(false)}>
                                <CloseSVG />
                            </span>
                            <span onClick={handleEditTheme}>
                                <ApproveSVG />
                            </span>
                        </p>
                    ) : (
                        <p className="urok-detail__text">
                            {urokTopic}
                            <span onClick={() => setEditedTheme(true)}>
                                <EditSVG />
                            </span>
                        </p>
                    )}
                </div>
                <InfoUrok urokInfo={urok} />
            </section>
        </div>
    );
};

export default UrokDetail;
