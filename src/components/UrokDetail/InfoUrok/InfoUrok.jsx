import React, {useState} from 'react'
import s from './InfoUrok.module.scss'
import Input from '../../UI/input/Input/Input';
const InfoUrok = () => {
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
        <div className={s['inf-urok']}>
            <div className={s['inf-urok-box']}>
                <p className={s['inf-urok-box__title']}>Тема урока:</p>
                <Input
                    placeholder={'Введите тему урока'}
                    type='text'
                    value={values.lessonTitle}
                    onChange={handleInputChange}
                    name="lessonTitle"
                    auto-complite="off"
                />
            </div>
            <div className={s['inf-urok-box']}>
                <p className={s['inf-urok-box__title']}>Домашнее задание:</p>
                <Input
                    placeholder={'Введите домашнее задание'}
                    type='text'
                    value={values.houmwork}
                    onChange={handleInputChange}
                    name="houmwork"
                    auto-complite="off"
                />
            </div>
        </div>
    )
}

export default InfoUrok