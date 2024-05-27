import React, {useState} from 'react';
import './RegistedUser.scss';
import { useForm } from 'react-hook-form';
import WhiteBox from '../../../components/UI/whiteBox/WhiteBox';
import PageTitle from '../../../components/UI/pageTitle/PageTitle';
import Button from '../../../components/UI/button/Button';
import { FormControlLabel, Input, MenuItem, Radio, RadioGroup, TextField } from '@mui/material';
import Form from '../../../components/UI/form/Form';
import { UserService } from '../../../services/userService';
import { useNavigate } from 'react-router-dom';
import GoBack from '../../../components/UI/goBack/GoBack';

const RegistedUser = () => {
    const navigate = useNavigate()
    const goBack = () => navigate(-1)
    const [userType, setUserType] = useState(''); 

    const { 
        register,
        formState: {
            errors,
            isValid,
        },
        handleSubmit,
        reset,
    } = useForm({ mode: 'onBlur'});

    const onSubmit = async (data) => {
        if(data.userType === 'Student'){
            const resultData = await UserService.registedStudent(data)
        }else{
            const resultData = await UserService.registedTeacher(data)
        }
        reset();
    }
    
    return (
        <div className='admin-adduser'>
            <GoBack onClick={() => goBack()}/>
            <WhiteBox>
                <PageTitle>Добавить пользователя</PageTitle>
                <Form  onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        type='email'
                        fullWidth
                        defaultValue=""
                        label="Email"
                        {...register('email', {
                            // объект валидации
                            required: 'Некорректное значение',
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "Entered value does not match email format",
                            },
                        })}
                        error={!!errors?.email}
                        helperText={errors?.email?.message}
                    />
                    <TextField
                        type="password"
                        fullWidth
                        defaultValue=""
                        label="Пароль"
                        {...register('password', {
                            // объект валидации
                            required: 'Некорректное значение',
                            minLength: {
                                value: 8,
                                message: "Минимальная длина 8 символов",
                            },
                        })}
                        error={!!errors?.password}
                        helperText={errors?.password?.message}
                    />
                    <TextField
                        type="text"
                        fullWidth
                        defaultValue=""
                        label="Фамилия"
                        {...register('lastName', {
                            // объект валидации
                            required: 'Некорректное значение',
                            minLength: {
                                value: 3,
                                message: 'Минимальная длина 3 символа'
                            }
                        })}
                        error={!!errors?.lastName}
                        helperText={errors?.lastName?.message}
                    />
                    <TextField
                        type="text"
                        fullWidth
                        defaultValue=""
                        label="Имя"
                        {...register('firstName', {
                            // объект валидации
                            required: 'Некорректное значение',
                            minLength: {
                                value: 3,
                                message: 'Минимальная длина 3 символа'
                            }
                        })}
                        error={!!errors?.firstName}
                        helperText={errors?.firstName?.message}
                    />
                    <TextField
                        type="text"
                        fullWidth
                        defaultValue=""
                        label="Отчество"
                        {...register('lastLastName', {
                            // объект валидации
                            required: 'Некорректное значение',
                            minLength: {
                                value: 3,
                                message: 'Минимальная длина 3 символа'
                            }
                        })}
                        error={!!errors?.lastLastName}
                        helperText={errors?.lastLastName?.message}
                    />
                    <div className="form-row">    
                    <FormControlLabel 
                        control={
                            <Radio
                                {...register('userType', { required: true })}
                                value="Teacher"
                                id="teacher-radio"
                                checked={userType === 'Teacher'}
                                onChange={() => setUserType('Teacher')}
                            />} 
                        label="Учитель"
                    />
                    <FormControlLabel 
                        control={
                            <Radio
                                {...register('userType', { required: true })}
                                value="Student"
                                id="student-radio"
                                checked={userType === 'Student'}
                                onChange={() => setUserType('Student')}
                            />} 
                        label="Учащийся"
                    />
                        {errors?.userType && <p className="form-error">Выберите тип пользователя</p>}
                    </div>

                    <Button type="submit" dasabled={isValid ? 'false' : 'true'}>Создать пользователя</Button>
                </Form>
            </WhiteBox>
        </div>
    )
}

export default RegistedUser