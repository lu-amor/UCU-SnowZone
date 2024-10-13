import React, { useState, useEffect } from 'react';

const EditClassModal = ({ selectedClass, instructors, shifts, closeModal, updateClass, deleteClass }) => {
/*     const [instructor, setInstructor] = useState('');
    const [shift, setShift] = useState('');
    const [students, setStudents] = useState([]);

    useEffect(() => {
        if (selectedClass) {
            setInstructor(selectedClass.instructor);
            setShift(selectedClass.shift);
            setStudents(selectedClass.students);
        }
    }, [selectedClass]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedClass = { ...selectedClass, instructor, shift, students };
        await updateClass(updatedClass);
        closeModal();
    }; */

    return (
        <div className="modal is-active">
            <div className="modal-background" onClick={closeModal}></div>
            <div className="modal-content">
                <div className="box has-background-warning-light">
                    <p className="subtitle is-4 has-text-weight-bold">New class</p>
                    <div className={`field is-grouped is-justify-content-flex-end`}>
                        <div className="control">
                            <button type="button" className={`button is-danger has-text-white`} onClick={closeModal}>Cancelar</button>
                        </div>
                        <div className="control">
                            <button type="submit" className={`button is-success has-text-white`}>Aceptar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditClassModal;