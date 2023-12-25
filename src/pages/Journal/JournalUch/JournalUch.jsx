import React from 'react';
import Table from '../../../components/Table/Table';
import s from './JournalUch.scss';
import { LeftArrowSVG, RightArrowSVG } from '../../../resources/svg';
import { useContext } from 'react';
import { UserContext } from '../../../components/Loyout/Loyout';
import Row from '../../../components/Table/Row/Row';
import CellText from '../../../components/Table/CellText/CellText';
import Ocenka from '../../../components/widgets/Lessons/Ocenka/Ocenka';
import NumberUrok from '../../../components/widgets/Lessons/NumberUrok/NumberUrok';

const Journal = () => {
    const user = useContext(UserContext)
    const lessonsData = user.schedule
    return (
        <section className="section">
            <div className="journal-header">
                <h1>Дневник 22.05.2023 - 29.05.2023</h1>
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
                            <CellText classNameElement={`journal-score`}>Оценка</CellText>
                            <CellText classNameElement={`journal-comment`}>Комментарий</CellText>
                        </Row>
                        {day.lessons.map((row, index) => (
                            <Row key={index}>
                                <CellText classNameElement={'journal-number'}>{row.urokCount}</CellText>
                                <CellText classNameElement={'journal-time'}>
                                    <NumberUrok
                                        urokStart={row.urokStart} 
                                        urokStop={row.urokStop}
                                    />
                                </CellText>
                                <CellText classNameElement={`journal-predmet`}>{row.lesson}</CellText>
                                <CellText classNameElement={`journal-houmwork`}>{row.dz}</CellText>
                                <CellText classNameElement={`journal-score`}><Ocenka ocenka={row.ocenka}></Ocenka></CellText>
                                <CellText classNameElement={`journal-comment`}></CellText>
                            </Row>
                        ))}
                    </Table>
                ))}
            </div>
        </section>
    )
}

export default Journal