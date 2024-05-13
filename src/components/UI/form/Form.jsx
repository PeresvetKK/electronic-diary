import React from 'react'
import './Form.scss';

const Form = ({children, ...props}) => {
  return(
    <form className='form' {...props}>
        {children}
    </form>
  )
}


export default Form