import React, { useState, useEffect } from 'react';
import Input from '../../../UI/input/Input/Input';
import Button from '../../../UI/button/Button';
import { ApproveSVG, EditSVG, TrashSVG } from '../../../../resources/svg';
import { HomeWorkService } from '../../../../services/homeWorkService';
import { getFormatDate } from '../../../../hooks/getFormatDate';
import './HomeWorkSection.scss';

const HomeworkSection = ({ urokInfo }) => {
    const [homeWorkArray, setHomeWorkArray] = useState([]);
    const [editedHomeWork, setEditedHomeWork] = useState(null);
    const [valueInputHomeWork, setValueInputHomeWork] = useState('');
    const [createdId, setCreatedId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await HomeWorkService.getCurrentDayHomeWork(
                    urokInfo.class._id,
                    urokInfo._id
                );
                setHomeWorkArray(data);
            } catch (error) {
                console.error('Ошибка при получении данных:', error);
            }
        };
        fetchData();
    }, [urokInfo._id, urokInfo.class.classLetter, urokInfo.class.classNumber]);

    const handleDelete = async (idHomeWork) => {
        try {
            await HomeWorkService.deleteHomeWork(idHomeWork);
            const newArray = homeWorkArray.filter((item) => item._id !== idHomeWork);
            setHomeWorkArray(newArray);
        } catch (error) {
            console.error('Ошибка при удалении домашнего задания:', error);
        }
    };

    const handleEdit = (id) => {
        setEditedHomeWork(id);
    };

    const changeItemHomeWork = async (idHomeWork, value) => {
        try {
            await HomeWorkService.editHomeWork(idHomeWork, value);
            const newArrayHomeWork = homeWorkArray.map((item) =>
                item._id === idHomeWork ? { ...item, homework: value } : item
            );
            setHomeWorkArray(newArrayHomeWork);
            setEditedHomeWork(null);
            setValueInputHomeWork('');
        } catch (error) {
            console.error('Ошибка при обновлении домашнего задания:', error);
        }
    };

    const addHomeWork = () => {
        const newHomeWorkArray = [
            {
                _id: 'emptyId',
                homework: '',
                class: urokInfo.class._id,
                date: getFormatDate(urokInfo.date),
                subject: urokInfo._id,
            },
            ...homeWorkArray,
        ];
        setHomeWorkArray(newHomeWorkArray);
        setEditedHomeWork('emptyId');
        setCreatedId('emptyId');
    };

    const createdItemHomeWork = async (homework, classId, date, subjectId) => {
        try {
            const data = await HomeWorkService.createHomeWork(homework, classId, date, subjectId);
            const newHomeWork = data;
            const updatedHomeWorkArray = homeWorkArray.filter((item) => item._id !== 'emptyId');
            setHomeWorkArray([newHomeWork, ...updatedHomeWorkArray]);
        } catch (error) {
            console.error('Ошибка при создании домашнего задания:', error);
        }
    };

    const createdHomeWork = (idHomeWork, value) => {
        createdItemHomeWork(value, urokInfo.class._id, getFormatDate(urokInfo.date), urokInfo._id);
        setEditedHomeWork(null);
        setCreatedId(null);
        setValueInputHomeWork('');
    };

    return (
        <div className="infourok-main-item">
            <p className="infourok-main-item__title">Домашнее задание</p>
            <div className="infourok-main-box">
                {homeWorkArray.length <= 0
                    ? <p className="infourok-main-box__title">Вы пока не добавили ни одного домашнего задания</p>
                    : <div className='homework-items'>
                        {homeWorkArray.map((item, index) => (
                            editedHomeWork === item._id
                                ? <div className="homework-item" id={item._id} key={item._id}>
                                    <div className="homework-item-header">
                                        <p className="homework-item-header__title">Задание {index + 1}</p>
                                        <div className="homework-item-header-funct">
                                            {createdId == null
                                                ? <div className="homework-item-header-funct__edit"
                                                    onClick={() => changeItemHomeWork(item._id, valueInputHomeWork)}
                                                >
                                                    <ApproveSVG />
                                                </div>
                                                : <div className="homework-item-header-funct__create"
                                                    onClick={() => createdHomeWork(item._id, valueInputHomeWork)}
                                                >
                                                    <ApproveSVG />
                                                </div>
                                            }
                                            <div className="homework-item-header-funct__delete" onClick={() => handleDelete(item._id)}>
                                                <TrashSVG />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="homework-item-main">
                                        <p className="homework-item-main__text">
                                            <Input
                                                value={valueInputHomeWork}
                                                onChange={(e) => setValueInputHomeWork(e.target.value)}
                                                placeholder="Введите текст задания" />
                                        </p>
                                    </div>
                                </div>
                                : <div className="homework-item" id={item._id} key={item._id}>
                                    <div className="homework-item-header">
                                        <p className="homework-item-header__title">Задание {index + 1}</p>
                                        <div className="homework-item-header-funct">
                                            <div className="homework-item-header-funct__edit" onClick={() => handleEdit(item._id)}>
                                                <EditSVG />
                                            </div>
                                            <div className="homework-item-header-funct__delete" onClick={() => handleDelete(item._id)}>
                                                <TrashSVG />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="homework-item-main">
                                        <p className="homework-item-main__text">{item.homework}</p>
                                    </div>
                                </div>
                        ))}
                    </div>
                }
            </div>
            <Button classNameElement="btn-blue material-add"
                onClick={() => addHomeWork()}
            >
                + Создать домашнее задание
            </Button>
        </div>
    );
};

export default HomeworkSection;
