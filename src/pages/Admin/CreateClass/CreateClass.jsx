import React, { useEffect, useState } from 'react';
import './CreateClass.scss';
import { useForm } from 'react-hook-form';
import WhiteBox from '../../../components/UI/whiteBox/WhiteBox';
import PageTitle from '../../../components/UI/pageTitle/PageTitle';
import Button from '../../../components/UI/button/Button';
import { MenuItem, TextField } from '@mui/material';
import Form from '../../../components/UI/form/Form';
import { UserService } from '../../../services/userService';
import { classService } from '../../../services/classService';
import { useNavigate } from 'react-router-dom';
import GoBack from '../../../components/UI/goBack/GoBack';

const CreateClass = () => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    const classNumberList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    const classLetterList = ["А", "Б", "В", "Г", "Д", "Е", "У", "Н", "Э", "М"];

    // список доступных учеников
    const [studentList, setStudent] = useState([]);
    // список доступных учителей
    const [teacherList, setTeacher] = useState([]);
    // выбранные ученики
    const [selectedStudent, setSelectedStudents] = useState({
        users: []
    });

    const handleFieldChange = event => {
        setSelectedStudents(formState => ({
            ...formState,
            [event.target.name]:
                event.target.type === "checkbox"
                    ? event.target.checked
                    : event.target.value
        }));
    };

    useEffect(() => {
        const fetchTeacher = async () => {
            const data = await UserService.getAllUsersByRole('Teacher');
            setTeacher(data);
        };
        const fetchStudents = async () => {
            const data = await UserService.getAllUsersByRole('Student');
            setStudent(data);
        };
        fetchTeacher();
        fetchStudents();
    }, []);

    const {
        register,
        formState: {
            errors,
            isValid,
        },
        handleSubmit,
        reset,
    } = useForm({ mode: 'onBlur' });

    const onSubmit = async (data) => {
        try {
            data.students = selectedStudent.users;
            console.log(data)
            const response = await classService.createClass(data);
            console.log(response);
            reset();
            // navigate('/classes'); // Перенаправляем на страницу со списком классов после успешного создания
        } catch (error) {
            console.error("Ошибка при создании класса:", error);
        }
    };

    return (
        <div className='admin-adduser'>
            <GoBack onClick={() => goBack()} />
            <WhiteBox>
                <PageTitle>Добавить класс</PageTitle>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        select
                        fullWidth
                        defaultValue=""
                        label="Номер класса"
                        inputProps={register('classNumber', {
                            required: false,
                        })}
                        error={!!errors?.classNumber}
                        helperText={errors?.classNumber?.message}
                    >
                        {classNumberList.map((item) => (
                            <MenuItem key={item} value={item}>
                                {item}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        select
                        fullWidth
                        defaultValue=""
                        label="Буква класса"
                        inputProps={register('classLetter', {
                            required: false,
                        })}
                        error={!!errors?.classLetter}
                        helperText={errors?.classLetter?.message}
                    >
                        {classLetterList.map((item) => (
                            <MenuItem key={item} value={item}>
                                {item}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        select
                        fullWidth
                        defaultValue=""
                        label="Классный руководитель"
                        inputProps={register('classTeacher', {
                            required: true,
                        })}
                        error={!!errors?.classTeacher}
                        helperText={errors?.classTeacher?.message}
                    >
                        {teacherList.map((item) => (
                            <MenuItem key={item._id} value={item._id}>
                                {`${item.lastName} ${item.firstName} ${item.lastLastName}`}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        select
                        name="users"
                        id="users"
                        variant="outlined"
                        label="Ученики"
                        SelectProps={{
                            multiple: true,
                            value: selectedStudent.users,
                            onChange: handleFieldChange
                        }}
                    >
                        {studentList.map((item) => (
                            <MenuItem key={item._id} value={item._id}>
                                {`${item.lastName} ${item.firstName} ${item.lastLastName}`}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Button type="submit" disabled={!isValid}>Создать класс</Button>
                </Form>
            </WhiteBox>
        </div>
    )
}

export default CreateClass;
