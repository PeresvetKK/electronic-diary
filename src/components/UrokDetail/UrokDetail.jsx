import React, {useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import './UrokDetail.scss'
import Button from '../UI/button/Button'
import TabContent from '../Tabs/TabContent/TabContent'
import Tabs from '../Tabs/Tabs'
import Input from '../UI/input/Input/Input'
import FileInput from '../UI/input/FileInput/FileInput'

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
    const initialValues = {
        lessonTitle: '',
        houmwork: "",
    };
    const [values, setValues] = useState(initialValues);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({
        ...values,
        [name]: value,
        });
    };
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
                            <div className="inf-urok">
                            <div className="inf-urok-box">
                                    <p className="inf-urok-box__title">Тема урока:</p>
                                    <Input 
                                        placeholder={'Введите тему урока'} 
                                        type='text'
                                        value={values.lessonTitle}
                                        onChange={handleInputChange}
                                        name="lessonTitle"
                                    />
                                </div>
                                <div className="inf-urok-box">
                                    <p className="inf-urok-box__title">Домашнее задание:</p>
                                    <Input 
                                        placeholder={'Введите домашнее задание'} 
                                        type='text'
                                        value={values.houmwork}
                                        onChange={handleInputChange}
                                        name="houmwork"
                                    />
                                </div>
                            </div>  
                            
                        </TabContent>

                        <TabContent>
                            выставление оценок
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