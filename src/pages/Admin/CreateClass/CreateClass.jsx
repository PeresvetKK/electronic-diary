import React from 'react';
import './CreateClass.scss';
import { useForm } from 'react-hook-form';
import WhiteBox from '../../../components/UI/whiteBox/WhiteBox';
import PageTitle from '../../../components/UI/pageTitle/PageTitle';
import Button from '../../../components/UI/button/Button';

const CreateClass = () => {
    // регистрирует поля для формы
    // formState - объект со свойствами(ошибки)
    const {
        register,
        formState:{
            errors,
            isValid,
        },
        handleSubmit,
        reset,
    } = useForm({
        mode: 'onBlur'
    });

    const onSubmit = (data) => {
        console.log(JSON.stringify(data))
        reset();
    }


    return (
        <WhiteBox>
            <PageTitle>Добавить класс</PageTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label className='form-inputbox'>
                    Фамилия
                    <input
                        {...register('lastName', {
                            // объект валидации
                            required: 'Некорректное значение',
                            minLength: {
                                value: 3,
                                message: 'Минимальная длина 3 символа'
                            }
                        })}
                    />
                    {errors?.lastName 
                    && <p class="form-error">{errors?.lastName?.message}</p>}
                </label>
                <Button type="submit" dasabled={isValid ? 'false' : 'true'}>Создать</Button>
            </form>
        </WhiteBox>
    )
}

export default CreateClass