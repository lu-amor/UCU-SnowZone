import React, { useState, useEffect } from 'react';
import Icon from '@mdi/react';
import { mdiDelete } from '@mdi/js'

const EditClassModal = ({ selectedClass, instructors, shifts, studentsArray, closeModal, updateClass, deleteClass }) => {
    const [instructor, setInstructor] = useState('');
    const [shift, setShift] = useState('');
    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [activeTab, setActiveTab] = useState('todos');

    useEffect(() => {
        if (selectedClass) {
            setInstructor(selectedClass.instructor);
            setShift(selectedClass.shift);
            setStudents(selectedClass.students);
        }
    }, [selectedClass]);

    useEffect(() => {
        const filtered = (studentsArray || []).filter(student => {
            const studentName = student.name.toLowerCase();
            const studentSurname = student.surname.toLowerCase();
            const lowerCaseSearchTerm = searchTerm.toLowerCase();

            return (
                studentName.includes(lowerCaseSearchTerm) || 
                studentSurname.includes(lowerCaseSearchTerm)
            );
        });
        setFilteredStudents(filtered);
    }, [searchTerm, studentsArray]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedClass = { ...selectedClass, instructor, shift, students };
        await updateClass(updatedClass);
        closeModal();
    };

    const addStudent = (student) => {
        if (!students.some(s => s.id === student.id)) {
            setStudents([...students, student]);
        }
    };

    const removeStudent = (studentId) => {
        console.log(studentId);
        setStudents(students.filter(s => s.id !== studentId));
    };

    return (
        <div className="modal is-active">
            <div className="modal-background" onClick={closeModal}></div>
            <div className="modal-content">
                <div className="box has-background-warning-light">
                    <p className="subtitle is-4 has-text-weight-bold">
                        Edit class - {selectedClass.activity} - {selectedClass.grupal ? 'Group' : 'Individual'}
                    </p>
                    <form onSubmit={handleSubmit}>
                        <div className="field is-grouped">
                            <div className="field">
                                <label className="label">Instructor</label>
                                <div className="control">
                                    <div className="select">
                                        <select value={instructor} onChange={(e) => setInstructor(e.target.value)}>
                                            <option value="" disabled>Select an instructor</option>
                                            {instructors.map((instructor) => (
                                                <option key={instructor.id} value={instructor.id}>{instructor.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Shift</label>
                                <div className="control">
                                    <div className="select">
                                        <select value={shift} onChange={(e) => setShift(e.target.value)}>
                                            <option value="" disabled>Select a shift</option>
                                            {shifts.map((shift) => (
                                                <option key={shift.id} value={shift.id}>{shift.from} - {shift.to}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="field">
                            <label className="label">Search students</label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="text"
                                    placeholder="Student name or surname"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="tabs is-boxed is-right">
                            <ul>
                                <li className={activeTab === 'todos' ? 'is-active' : ''} onClick={() => setActiveTab('todos')}>
                                    <a>All</a>
                                </li>
                                <li className={activeTab === 'inscriptos' ? 'is-active' : ''} onClick={() => setActiveTab('inscriptos')}>
                                    <a>Enrolled</a>
                                </li>
                            </ul>
                        </div>

                        <div className="field">
                            {activeTab === 'todos' && filteredStudents.length > 0 && (
                                <div className="box">
                                    {filteredStudents.map((student) => (
                                        <div key={student.id} className="field is-grouped is-grouped-multiline">
                                            <p>{student}</p>
                                            <button
                                                type="button"
                                                className="button is-small is-primary"
                                                onClick={() => addStudent(student)}
                                                style={{marginLeft: 'auto'}}
                                            >
                                                Agregar
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {activeTab === 'inscriptos' && students.length > 0 && (
                                <div className="box">
                                    {students.map((student) => (
                                        <div key={student.id} className="field is-grouped is-grouped-multiline">
                                            <p>{student}</p>
                                            <button
                                                type="button"
                                                className="button is-small is-danger"
                                                onClick={() => removeStudent(student.id)}
                                                style={{marginLeft: 'auto'}}
                                            >
                                                Unenroll
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
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