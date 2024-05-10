import React, {useContext} from 'react';
import {Link} from 'react-router-dom'
import Table from '../../../components/Table/Table';
import './JournalTeacher.scss';
import NumberUrok from '../../../components/widgets/Lessons/NumberUrok/NumberUrok';
import {UserContext} from '../../../components/Loyout/Loyout';
import {EditSVG, LeftArrowSVG, RightArrowSVG} from '../../../resources/svg';
import Row from '../../../components/Table/Row/Row';
import CellText from '../../../components/Table/CellText/CellText';
import Ocenka from '../../../components/widgets/Lessons/Ocenka/Ocenka';

/*
const [grades, setGrades] = useState([]);
    // присутствие на уроке
    const [listPeoples, setListPeoples] = useState([])
    useEffect(() => {
        const fetchData = () => {
            ClassPeoplesService.getPeoples(classNumber, classLetter)
              .then((data) => {
                setListPeoples(data.students);
                GradesService.getGrades(data.students, id).then((data) => {
                    setGrades(data.grades)
                    setIsFetching(true)
                })    
              })
              
        };
        fetchData();
    }, [classNumber, classLetter])

*/
const Journal = () => {
    const user = useContext(UserContext)
    const lessonsData = user.schedule
    return (
        <section className="section">
            <div className="journal-header">
                <h1>Расписание 22.05.2023 - 29.05.2023</h1>
                <div className='arrows-box'>
                    <LeftArrowSVG/>
                    <RightArrowSVG/>
                </div>
            </div>
            <div className='table-section'>
                {lessonsData.map((day, index) => (
                    <Table key={index} date={day.date} dateName={day.dateName} title={true}>
                        <Row>
                            <CellText classNameElement={`journal-number`}>№</CellText>
                            <CellText classNameElement={`journal-time`}>Время</CellText>
                            <CellText classNameElement={`journal-predmet`}>Предмет</CellText>
                            <CellText classNameElement={`journal-houmwork`}>Домашнее задание</CellText>
                            <CellText classNameElement={`journal-score`}>Класс</CellText>
                            <CellText classNameElement={`journal-score`}>Кабинет</CellText>
                            <CellText classNameElement={`journal-number`}></CellText>
                        </Row>
                        {day.lessons.map((row, index) => (
                            <Row key={index}>
                                <CellText classNameElement={`journal-number`}>{row.urokCount}</CellText>
                                <CellText classNameElement={'journal-time'}>
                                    <NumberUrok
                                         
                                        urokStart={row.urokStart} 
                                        urokStop={row.urokStop}
                                    />
                                </CellText>
                                <CellText classNameElement={`journal-predmet`}>{row.lesson}</CellText>
                                <CellText classNameElement={`journal-houmwork`}>{row.dz}</CellText>
                                <CellText classNameElement={`journal-score`}>{row.classLesson}</CellText>
                                <CellText classNameElement={`journal-score`}>{row.cabinet}</CellText>
                                <CellText classNameElement={`journal-number`}>
                                    {row.lesson != '' && row.lesson != null
                                        ?<Link to={`/edit-lesson/${15}`}>
                                            <EditSVG/>
                                        </Link>
                                        : null
                                    }
                                </CellText>
                            </Row>
                        ))}
                    </Table>
                ))}
            </div>
        </section>
    )
}

export default Journal