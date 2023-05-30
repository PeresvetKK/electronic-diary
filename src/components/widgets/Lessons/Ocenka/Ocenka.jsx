import React from 'react'
import classes from './Ocenka.scss'

const Ocenka = ({ children, ocenka, ...props }) => {
    return (
        !ocenka == ''
            ? <div className="schudle-block-lesson__score">
                {ocenka}
              </div>
            : null
    )
}

export default Ocenka