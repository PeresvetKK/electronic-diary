import React from 'react'
import classes from './Peremena.scss'

const Peremena = (props) => {
  return (
    <div className="schudle-block__item_peremena">
        <svg id="Layer_1" enable-background="new 0 0 24 24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="m14.5 5.3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.2 12 .6-2.5 2.1 2v5c0 .5.4 1 1 1s1-.5 1-1v-5.6c0-.6-.2-1.1-.6-1.4l-1.5-1.4.6-3c1.1 1.2 2.6 2.1 4.4 2.4.6.1 1.1-.4 1.1-1 0-.5-.4-.9-.9-1-1.5-.3-2.8-1.1-3.4-2.3l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-4 1.7c-.8.2-1.2.9-1.2 1.7v2.4c0 .6.4 1 1 1s1-.4 1-1v-2.4l1.8-.7-1.6 8.1-4-.8c-.5-.1-1.1.2-1.2.8 0 .5.3 1 .8 1.2l4.2.8c1 .2 2.1-.5 2.3-1.5z"/>
        </svg>
        <p className="peremena-item">Перемена {props.peremenaLength} минут</p>
    </div>
  )
}

export default Peremena