import React, {useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import './UrokDetail.scss'
import Button from '../UI/button/Button'
import TabContent from '../Tabs/TabContent/TabContent'
import Tabs from '../Tabs/Tabs'
import InfoUrok from './InfoUrok/InfoUrok'
import Table from '../Table/Table'
import Row from '../Table/Row/Row'
import CellText from '../Table/CellText/CellText'
import CellInput from '../Table/CellInput/CellInput'

const UrokDetail = () => {
    // для получения информации из url
    const {id} = useParams()
    const navigate = useNavigate()
    const goBack = () => navigate(-1)

    // const [dataLesson, setDataLesson] = useState({})
    // useEffect(() => {
    //     if(!id) return
    //     // как только появился id мы получаем данные с сервера
    //     const fetchData = async () => {
    //         // получаем с сервера пользователя и помещаем в стейт
    //         const data= await UserService.getLessonById(id)
    //         setDataLesson(data)
    //         console.log(data)
    //     }
        
    //     fetchData()
    // }, [id])
    const detiArray = [
        {
            name: "Лукин Владимир Наумович",
            ocenka: '',
            comment: '',
        },
        {
            name: "Доронин Даниил Филиппович",
            ocenka: '',
            comment: '',
        },
        {
            name: "Носов Евдоким Георгьевич",
            ocenka: '',
            comment: '',
        },
        {
            name: "Поляков Адриан Львович",
            ocenka: '',
            comment: '',
        },
        {
            name: "Зуев Аверкий Семёнович",
            ocenka: '',
            comment: '',
        },
        {
            name: "Яковлев Велор Оскарович",
            ocenka: '',
            comment: '',
        },
        {
            name: "Михеев Филипп Русланович",
            ocenka: '',
            comment: '',
        },
        {
            name: "Горшков Августин Рубенович",
            ocenka: '',
            comment: '',
        },
        {
            name: "Кулагин Осип Александрович",
            ocenka: '',
            comment: '',
        },
        {
            name: "Антонов Виктор Христофорович",
            ocenka: '',
            comment: '',
        },
        {
            name: "Герасимов Давид Давидович",
            ocenka: '',
            comment: '',
        },
        {
            name: "Юдин Людвиг Дмитриевич",
            ocenka: '',
            comment: '',
        },
        {
            name: "Данилов Пантелеймон Романович",
            ocenka: '',
            comment: '',
        },
        {
            name: "Игнатов Алан Серапионович",
            ocenka: '',
            comment: '',
        },
        {
            name: "Ильин Климент Михайлович",
            ocenka: '',
            comment: '',
        },
    ]
    return (
        <section className='urok-detail'>
            <div className='urok-detail__title'>
                <p>Урок математики 27.07.2023</p>
                <p>класс: 5 "А"</p>
            </div>
            <div className='block-widget urok-detail-main'>
                <Tabs>
                    <div className="tabs__btns">
                        <Button>Информация об уроке</Button>
                        <Button>Выставление оценок</Button>
                    </div>
                    <div>
                        <TabContent>  
                            <InfoUrok/>
                        </TabContent>

                        <TabContent>
                            <Table>
                                <div className='table-header'>
                                    <Row>
                                        <CellText classNameElement={`cell-fio`}>ФИО</CellText>
                                        <CellText classNameElement={`cell-score`}>Оценка</CellText>
                                        <CellText classNameElement={`cell-comment`}><p>Комментарий</p></CellText>
                                    </Row>
                                </div>
                                {detiArray.map((rebenok, index) => (
                                  <Row key={index}>
                                    <CellText classNameElement={`cell-fio`}>{rebenok.name}</CellText>
                                    <CellInput classNameElement={`cell-score`}></CellInput>
                                    <CellInput classNameElement={`cell-comment`}></CellInput>
                                  </Row>  
                                ))}
                            </Table>
                        </TabContent>
                    </div>
                </Tabs>
            </div>
            <div className='urok-detail-footer'>
                <Button classNameElement={'btn-red btn-big'} onClick={goBack}>Отмена</Button>
                <Button classNameElement={'btn-blue btn-big'} onClick={goBack}>Сохранить</Button>
            </div>
        </section>

    )
}

export default UrokDetail