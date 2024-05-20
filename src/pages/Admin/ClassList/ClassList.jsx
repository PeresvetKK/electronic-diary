import React, { useEffect, useState } from 'react';
import './ClassList.scss';
import { classService } from '../../../services/classService';
import WhiteBox from '../../../components/UI/whiteBox/WhiteBox';
import ClassItem from '../../../components/UI/classItem/ClassItem';
import GoBack from '../../../components/UI/goBack/GoBack';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../../../components/UI/pageTitle/PageTitle';
import { TrashSVG } from '../../../resources/svg';

const ClassList = () => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1)

    const [classList, setClassList] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const data = await classService.getAllClasses()
            console.log(data)
            setClassList(data)
        }
        fetchData();
    }, [])

    const deleteClass = async(id) => {
        const response = await classService.deleteClass(id)
        setClassList(response)
    }

    return (
        <div className='class-list'>
            <GoBack onClick={() => goBack()}/>
            <WhiteBox>
                <PageTitle>Список классов</PageTitle>
                <div className="class-list-box">
                    {classList.length > 0
                        ? classList.map(item => (
                            <ClassItem key={item._id} classInfo={item}>
                                <div className="class-list-item__delete" onClick={() => deleteClass(item._id)}>
                                    <TrashSVG/>
                                </div>
                            </ClassItem>
                        ))
                        // TODO заменить на скелетон
                        : <p className='class-list__empty'>Вы не добавили ни одного класса</p>
                    }
                </div>
            </WhiteBox>
        </div>
    )
}

export default ClassList