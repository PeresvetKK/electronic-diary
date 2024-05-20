import React, { useEffect, useState } from 'react';
import './ClassPage.scss';
import { useNavigate, useParams } from 'react-router-dom';
import GoBack from '../../../components/UI/goBack/GoBack';
import WhiteBox from '../../../components/UI/whiteBox/WhiteBox';
import PageTitle from '../../../components/UI/pageTitle/PageTitle';
import { TrashSVG } from '../../../resources/svg';
import { classService } from '../../../services/classService';
import Button from '../../../components/UI/button/Button';
import Modal from '../../../components/Modal/Modal';
import useModal from '../../../hooks/useModal';
import { UserService } from '../../../services/userService';
import AddStudentForm from '../../../components/Forms/AddStudentForm';

const ClassPage = () => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    const { id } = useParams();
    const [classInfo, setClassInfo] = useState([]);
    const [studentList, setStudentList] = useState([]);
    const [newStudents, setNewStudent] = useState([]);

    const fetchStudents = async () => {
        const response = await classService.getClassById(id);
        setClassInfo([response]);
        setStudentList(response.students);
    };

    useEffect(() => {
        fetchStudents();
    }, [id]);

    const removeStudent = async (studentId) => {
        const response = await classService.removeStudentFromClass(classInfo[0]._id, studentId);
        setStudentList(response.students);
    };

    useEffect(() => {
        const fetchNewStudents = async () => {
            const response = await UserService.getAllUsersByRole('Student');
            setNewStudent(response);
        };
        fetchNewStudents();
    }, []);

    const { isShowing, toggle } = useModal();
    return (
        <div className="class-page">
            <GoBack onClick={() => goBack()} />
            {classInfo.length > 0
                ? <WhiteBox>
                    <PageTitle>{`${classInfo[0].classNumber} ${classInfo[0].classLetter}`}</PageTitle>
                    <div className="class-page-row">
                        <p className="class-page__text">
                            Классный руководитель:
                            {`${classInfo[0].classTeacher.lastName} ${classInfo[0].classTeacher.firstName} ${classInfo[0].classTeacher.lastLastName}`}
                        </p>
                    </div>
                    <div className="class-page-box">
                        <p className="class-page__text">
                            Список учеников:
                        </p>
                        {studentList.length > 0 && studentList.map((student) => (
                            <div className='class-page-item' key={student._id}>
                                <div className="class-page-item__remove" onClick={() => removeStudent(student._id)}>
                                    <TrashSVG />
                                </div>
                                {`${student.lastName} ${student.firstName} ${student.lastLastName}`}
                            </div>
                        ))}
                        <Button onClick={toggle}>Добавить ученика</Button>
                        <Modal
                            isShowing={isShowing}
                            hide={toggle}
                        >
                            <AddStudentForm newStudents={newStudents} classId={id} toggle={toggle} fetchStudents={fetchStudents} />
                        </Modal>
                    </div>
                </WhiteBox>
                : <div>загрузка</div>
            }
        </div>
    );
};

export default ClassPage;
