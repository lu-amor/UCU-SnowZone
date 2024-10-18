import React, { useState, useEffect } from 'react';

const NewClassModal = ({ instructors, activities, shifts, studentsArray, closeModal, updateClass }) => {
    const [instructor, setInstructor] = useState('');
    const [shift, setShift] = useState('');
    const [students, setStudents] = useState([]);
    const [activity, setActivity] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [activeTab, setActiveTab] = useState('todos');
    const [activityType, setActivityType] = useState('Grupal');

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
        const newClass = { activity, instructor, shift, students };
        await newClass(newClass);
        closeModal();
    };

    const addStudent = (student) => {
        if (!students.some(s => s.id === student.id)) {
            setStudents([...students, student]);
        }
    };

    const removeStudent = (studentId) => {
        setStudents(students.filter(s => s.id !== studentId));
    };

    return (
        <div className="modal is-active">
            <div className="modal-background" onClick={closeModal}></div>
            <div className="modal-content">
                <div className="box has-background-warning-light">
                    <p className="subtitle is-4 has-text-weight-bold">New class</p>
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
                                <label className="label">Activity</label>
                                <div className="control">
                                    <div className="select">
                                        <select value={activity} onChange={(e) => setActivity(e.target.value)}>
                                            <option value="" disabled>Select an activity</option>
                                            {activities.map((activity) => (
                                                <option key={activity.id} value={activity.id}>{activity.name}</option>
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
                        <div className="field radios">
                            <label className="radio">
                                Group
                                <input
                                    type="radio"
                                    name="activityType"
                                    value="Grupal"
                                    checked={activityType === 'Grupal'}
                                    onChange={(e) => setActivityType(e.target.value)}
                                    style={{ marginLeft: '5px' }}
                                />
                            </label>
                            <label className="radio">
                                Individual
                                <input
                                    type="radio"
                                    name="activityType"
                                    value="Individual"
                                    checked={activityType === 'Individual'}
                                    onChange={(e) => setActivityType(e.target.value)}
                                    style={{ marginLeft: '5px' }}
                                />
                            </label>
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
                                    <p className="subtitle is-6">Alumnos disponibles</p>
                                    {filteredStudents.map((student) => (
                                        <div key={student.id} className="field is-grouped is-grouped-multiline">
                                            <p>{student.name}</p>
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
                                    <p className="subtitle is-6">Alumnos inscriptos</p>
                                    {studentsArray.map((student) => (
                                        <div key={student.id} className="field is-grouped is-grouped-multiline">
                                            <p>{student.name}</p>
                                            <button
                                                type="button"
                                                className="button is-small is-danger"
                                                onClick={() => removeStudent(student.id)}
                                                style={{marginLeft: 'auto'}}
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className={`field is-grouped is-justify-content-flex-end`}>
                            <div className="control">
                                <button type="button" className={`button is-danger has-text-white`} onClick={closeModal}>Cancelar</button>
                            </div>
                            <div className="control">
                                <button type="submit" className={`button is-success has-text-white`}>Aceptar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NewClassModal;
