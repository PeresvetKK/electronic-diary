import React from 'react';
import { useSelector } from 'react-redux';
import './JournalTeacher.scss';


const Journal = () => {
    const userInfo = useSelector(state => state.user);
    console.log(userInfo)
    return (
        <section className="section journal">
           
        </section>
    )
}

export default Journal