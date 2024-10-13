import React, { useState, useEffect } from 'react';
import Icon from '@mdi/react';
import { mdiDelete } from '@mdi/js'

const EditClassModal = ({ selectedClass, instructors, shifts, closeModal, updateClass, deleteClass }) => {
    const [instructor, setInstructor] = useState('');
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
    };

    return (
        <div className="modal is-active">
            <div className="modal-background" onClick={closeModal}></div>
            <div className="modal-content">
                <div className="box has-background-warning-light">
                    <p className="subtitle is-4 has-text-weight-bold">Edit class</p>
                    <form onSubmit={handleSubmit}>
                        <div className="field">
                            <label className="label">{selectedClass.activity}</label>
                        </div>
                        <div className="field">
                            <label className="label">Instructor: {selectedClass.instructor}</label>
                            <div className="control">
                                <div className="select">
                                    <select 
                                        id="selectedClass-instructor" 
                                        value={instructor} 
                                        onChange={(e) => setInstructor(e.target.value)}
                                    >
                                        {instructors.map((instructor) => (
                                            <option key={instructor.id} className="has-background-success-light">{instructor.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Shift: {selectedClass.from} - {selectedClass.to}</label>
                            <div className="control">
                                <div className="select">
                                    <select 
                                        id="selectedClass-shift" 
                                        value={shift} 
                                        onChange={(e) => setShift(e.target.value)}
                                    >
                                        {shifts.map((shift) => (
                                            <option key={shift.id} className="has-background-success-light">{shift.from} - {shift.to}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="field">
                            <button 
                                type="button" 
                                className={`button is-primary is-justify-self-flex-end`} 
                                onClick={() => {
                                    deleteClass();
                                    closeModal();
                                }}
                                > <Icon path={mdiDelete} size={1.5} color='#ffffff' />
                            </button>
                        </div>
                        <div className={`field is-grouped is-justify-content-flex-end`}>
                            <div className="control">
                                <button type="button" className={`button is-danger has-text-white  `} onClick={closeModal}>Cancelar</button>
                            </div>
                            <div className="control">
                                <button type="submit" className={`button is-success has-text-white  `}>Aceptar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditClassModal;