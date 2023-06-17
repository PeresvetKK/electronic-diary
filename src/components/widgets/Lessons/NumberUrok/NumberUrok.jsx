import React from 'react'
import classes from './NumberUrok.scss'

const NumberUrok = ({children, ...props}) => {
    return (
        <div className="schudle-block__lesson schudle-block__timeurok" style={props.style}>
            {props.urokCount &&
                <p className="schudle-block__lesson_count">{props.urokCount} урок</p>
            }
            <div className="schudle-block__time">
                <p className="schudle-block__time_start">{props.urokStart}</p>
                —
                <p className="schudle-block__time_stop">{props.urokStop}</p>
            </div>
        </div>
    )
}

export default NumberUrok