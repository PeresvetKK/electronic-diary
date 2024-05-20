import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { classService } from '../../services/classService';
import { Button, MenuItem, TextField } from '@mui/material';

const AddStudentForm = ({ newStudents, classId, toggle, fetchStudents }) => {
    const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm({ mode: 'onBlur' });
    const [selectedStudent, setSelectedStudents] = useState({
        users: []
    });

    const handleFieldChange = event => {
        setSelectedStudents(formState => ({
            ...formState,
            [event.target.name]:
                event.target.type === "checkbox"
                    ? event.target.checked
                    : event.target.value
        }));
    };

    const onSubmit = async (data) => {
        try {
            const studentIds = selectedStudent.users;
            const response = await classService.addStudentsToClass(classId, studentIds);
            fetchStudents(); // Обновить список учеников после добавления
            reset();
            toggle(); // Закрыть модальное окно после успешного добавления
        } catch (error) {
            console.error("Ошибка при добавлении учеников в класс:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
                select
                name="users"
                id="users"
                variant="outlined"
                label="Ученики"
                SelectProps={{
                    multiple: true,
                    value: selectedStudent.users,
                    onChange: handleFieldChange
                }}
                error={!!errors.users}
                helperText={errors.users ? "Необходимо выбрать учеников" : ""}
            >
                {newStudents.map((item) => (
                    <MenuItem key={item._id} value={item._id}>
                        {`${item.lastName} ${item.firstName} ${item.lastLastName}`}
                    </MenuItem>
                ))}
            </TextField>
            <Button type="submit" disabled={!isValid}>Добавить</Button>
        </form>
    );
};
export default AddStudentForm;
