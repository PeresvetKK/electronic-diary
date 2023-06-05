import React from 'react'
import s from './Login.module.scss';
import Login from '../../../components/Login/Login'
import { Typewriter } from 'react-simple-typewriter'

const LoginPage = () => {
  const handleType = (count) => {
    // access word count number
  }

  const handleDone = () => {
  }

  return (
    <div className={s.aut}>
      <h1 className={s.aut__title} style={{fontWeight: 'normal' }}>
        {' '}
        <span style={{ color: 'var(--black)', fontWeight: 'bold' }}>
          {/* Style will be inherited from the parent element */}
          <Typewriter
            words={['Российский Электронный Дневник']}
            loop={5}
            cursor
            cursorStyle='_'
            typeSpeed={180}
            deleteSpeed={50}
            delaySpeed={1000}
            onLoopDone={handleDone}
            onType={handleType}
          />
        </span>
      </h1>
      <Login />
    </div>
  )
}

export default LoginPage