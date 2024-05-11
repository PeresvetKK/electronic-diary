import React, {useState} from 'react'
import { useLocation } from 'react-router-dom'
import './UrokDetail.scss'
import InfoUrok from './InfoUrok/InfoUrok'
import { getTimesLessons } from '../../hooks/getTimesLessons.js'
import { ApproveSVG, CloseSVG, EditSVG } from '../../resources/svg'
import Input from '../UI/input/Input/Input.jsx';
import { ScheduleService } from '../../services/scheduleService.js';
import { getDayOfWeek } from '../../hooks/getDayOfWeek.js'
import { getFormatDate } from '../../hooks/getFormatDate.js'

const UrokDetail = () => {
    
    const location = useLocation();
    const urok = location.state.urok;

    const [editedTheme, setEditedTheme] = useState(false);
    const [uroktopic, setUrokTopic] = useState(urok.topic);
    const [inputUrokTopic, setInputUrokTopic] = useState(urok.topic);

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

    return (
        <section className='urok-detail'>
            <div className='urok-detail__title'>
                <p className='urok-detail__date'>
                    <span>{getDayOfWeek(urok.dayOfWeek)}</span>
                    {getFormatDate(urok.date)}
                </p>
                <div className="urok-detail__text">{urok.subjectName} {urok.classNumber}{urok.classLetter} ({getTimesLessons(urok.lessonNumber)})</div>
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
                        {uroktopic}
                        <span onClick={() => setEditedTheme(true)}>
                            <EditSVG />
                        </span>
                    </p>
                )}
            </div>
            <InfoUrok urokInfo={urok}/>
            
        </section>
    )
}

export default UrokDetail