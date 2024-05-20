import React, { useEffect, useState } from 'react';
import './JournalTeacher.scss';
import WhiteBox from '../../../components/UI/whiteBox/WhiteBox';
import PageTitle from '../../../components/UI/pageTitle/PageTitle';
import GoBack from '../../../components/UI/goBack/GoBack';
import { useNavigate, useParams } from 'react-router-dom';
import { classService } from '../../../services/classService';


const Journal = () => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    const {classId, subjectId} = useParams();
    const [classInfo, setClassInfo] = useState({})
    const fetchData = async () => {
        const response = await classService.getClassById(classId)
        setClassInfo(response)
        console.log(response)
    }
    useEffect(() => {
        fetchData();
    }, [])
    return (
        <section className="section journal">
            <GoBack onClick={() => goBack()}/>
            <WhiteBox>
                <PageTitle></PageTitle>
            </WhiteBox>
        </section>
    )
}

export default Journal