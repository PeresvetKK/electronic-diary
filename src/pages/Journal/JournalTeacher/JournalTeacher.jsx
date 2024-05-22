import React, { useEffect, useState } from 'react';
import './JournalTeacher.scss';
import WhiteBox from '../../../components/UI/whiteBox/WhiteBox';
import PageTitle from '../../../components/UI/pageTitle/PageTitle';
import GoBack from '../../../components/UI/goBack/GoBack';
import { useNavigate, useParams } from 'react-router-dom';
import { journalService } from '../../../services/journalService';
import { getFormatDate } from '../../../hooks/getFormatDate';
import Modal from '../../../components/Modal/Modal';
import useModal from '../../../hooks/useModal';
import { useForm } from 'react-hook-form';
import { FormControlLabel, Input, MenuItem, Radio, RadioGroup, TextField } from '@mui/material';
import Form from '../../../components/UI/form/Form';
import Button from '../../../components/UI/button/Button';


const Journal = () => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    const [grade, setGrade] = useState({})
    const {classId, subjectId} = useParams();
    const [classInfo, setClassInfo] = useState({})
    const { isShowing, toggle } = useModal();
    const { 
        register,
        formState: {
            errors,
            isValid,
        },
        handleSubmit,
        reset,
    } = useForm({ mode: 'onBlur'});

    const fetchData = async () => {
        const response = await journalService.getClassJournal(classId, subjectId)
        setClassInfo(response)
        console.log(response)
    }
    useEffect(() => {
        fetchData();
    }, [])
   
    useEffect(() => {
        console.log('Обновленный объект grade:', grade);
        if (grade.gradeData) {
            createNewGrade();
        }
    }, [grade]);
    

    const openModalGrade = (studentId, gradeCount, gradeId, lessonId, classID) => {
        console.log('можно выставить оценку')
        // помещаю в объект нужные данные
        setGrade({
            classId: classID,
            subjectId: lessonId,
            studentId,
            gradeId,
            grade: gradeCount
        })
        // открывает модальное окно
        toggle()
    }
    const createNewGrade = async () => {
        try {
            var response;
            if(grade.grade == null){
                response = await journalService.addGrade(grade);
            }else{
                response = await journalService.updateGrade(grade);
            }
            console.log(response);
            updateClassJournal();
        } catch (error) {
            console.error('Ошибка при создании оценки:', error);
        }
    };
    const updateClassJournal = async () => {
        try {
            const data = await journalService.fetchClassJournal(grade.classId, classInfo.subject);
            setClassInfo(data);
            setGrade({});
        } catch (error) {
            console.error('Ошибка при обновлении журнала класса:', error);
        }
    };
    const onSubmit = async (data) => {
        let gradeData = {
            grade: data.grade,
            date: new Date().toISOString(),
            comment: data.comment
        }
        setGrade(prevGrade => ({
            ...prevGrade,
            gradeData
        }));
        reset();
        toggle();
    }
    return (
        <section className="section journal">
            <GoBack onClick={() => goBack()}/>
            {Object.keys(classInfo).length == 0
                ?<WhiteBox>
                    <PageTitle>Загрузка</PageTitle>
                </WhiteBox>

                :<WhiteBox>
                    <div className="journal-header">
                        <PageTitle>Журнал {`${classInfo.subject} ${classInfo.classNumber} ${classInfo.classLetter}`}</PageTitle>   
                    </div>
                    <div className="journal-main">
                        <div className="journal-coll journal-students">
                            <p className="journal-coll__title">Список учащихся</p>
                            <div className="journal-coll-list">
                                {classInfo.students.map((student) => (
                                    <p className="journal-coll-list__item" key={student._id}>{student.fullName}</p>
                                ))}
                            </div>
                        </div>    

                        <div className="journal-coll journal-lessons">
                            {/* Проходимся по каждому месяцу */}
                            {classInfo.lessonsByMonth.map((month, monthNumber) => (
                                <div key={monthNumber} className='journal-lessons-box'>
                                    <p className="journal-lessons-month">{month.month.split(' ')[0]}</p>
                                    <div className="journal-lessons-days">
                                        {/* Проходимся по каждому уроку */}
                                        {month.lessons.map((lesson, index) => (
                                            <div key={index} className="journal-lessons-days__item">
                                                <div className="journal-lessons-days__day">{getFormatDate(lesson.date).split('.')[0]}</div>
                                                <div className="journal-lessons-day-students">
                                                    {/* Проходимся по каждой оценке */}
                                                    {lesson.grades.map((grade, gradeIndex) => (
                                                        lesson.isCurrentMonth == true && lesson.isFutureDate == false
                                                            ?<div key={gradeIndex} className="journal-lessons-urok__student" onClick={() => openModalGrade(grade.studentId, grade.grade, grade.gradeId, lesson.id, classId)}>
                                                                {grade.grade !== null ? grade.grade : ''}
                                                            </div>
                                                            :<div key={gradeIndex} className="journal-lessons-urok__student disabled">
                                                                {grade.grade !== null ? grade.grade : ''}
                                                            </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            
                        </div> 

                        <div className="journal-coll journal-sr">
                            <p className="journal-coll__title">Ср.</p>
                            <div className="journal-coll-list">
                                {classInfo.students.map((student) => (
                                    <p className="journal-coll-list__item" key={student._id}>{student.averageGrade}</p>
                                ))}
                            </div>
                        </div>    
                    </div>  
                    <Modal
                        isShowing={isShowing}
                        hide={toggle}
                    >
                        <Form  onSubmit={handleSubmit(onSubmit)}>
                            <TextField
                                type="text"
                                fullWidth
                                defaultValue=""
                                label="Комментарий"
                                {...register('comment')}
                                error={!!errors?.comment}
                                helperText={errors?.comment?.message}
                            />
                            <div className="grade-box">
                                <p className="grade-text">Оценка</p>
                                <div className="form-row grade-form-row">    
                                    <label htmlFor="field-rain">
                                        <input
                                            {...register("grade")}
                                            type="radio"
                                            value="1"
                                            id="grade-1"
                                        />
                                        1
                                    </label>
                                    <label htmlFor="field-rain">
                                        <input
                                            {...register("grade")}
                                            type="radio"
                                            value="2"
                                            id="grade-2"
                                        />
                                        2
                                    </label>
                                    <label htmlFor="field-rain">
                                        <input
                                            {...register("grade")}
                                            type="radio"
                                            value="3"
                                            id="grade-3"
                                        />
                                        3
                                    </label>
                                    <label htmlFor="field-rain">
                                        <input
                                            {...register("grade")}
                                            type="radio"
                                            value="4"
                                            id="grade-4"
                                        />
                                        4
                                    </label>
                                    <label htmlFor="field-rain">
                                        <input
                                            {...register("grade")}
                                            type="radio"
                                            value="5"
                                            id="grade-5"
                                        />
                                        5
                                    </label>
                                    <label htmlFor="field-rain">
                                        <input
                                            {...register("grade")}
                                            type="radio"
                                            value="Н"
                                            id="grade-N"
                                        />
                                        Н
                                    </label>
                                </div>
                            </div>
                            <Button classNameElement="btn-blue" type="submit" dasabled={isValid ? 'false' : 'true'}>Сохранить</Button>
                        </Form>
                    </Modal>
            
                </WhiteBox>
                }
        </section>
    )
}

export default Journal