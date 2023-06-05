import React, {useState} from 'react';
import './log-reg.scss';

const Form = ({title, handleClick}) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    return (
        <div className='form-box'>
            <div className="form-box-logo">
                <p style={{color: '#fff'}}>Р</p>
                <p style={{color: 'var(--blue)'}}>Э</p>
                <p style={{color: 'var(--red)'}}>Д</p>
            </div>
            <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Введите E-mail'
            />
            <input
                type='password'
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                placeholder='Введите пароль'
            />   
            <button
                className='btn btn-form'
                onClick={() => handleClick(email, pass)}
            >
                {title}
            </button>
        </div>
    )
}

export default Form