import React, { useState, useEffect } from 'react';
import Icon from '@mdi/react';
import { mdiDelete } from '@mdi/js'

const EditClassModal = ({ selectedClass, instructors, turnos, studentsArray, closeModal, updateClass, deleteClass, inscriptionsArray, addInscription, updateInscription, deleteInscription }) => {
    const [ci_instructor, setInstructor] = useState('');
    const [id_turno, setShift] = useState('');
    const [students, setStudents] = useState([]);
    const [inscriptos, setInscriptos] = useState([]);
    const [activeTab, setActiveTab] = useState('todos');

    useEffect(() => {
        if (selectedClass) {
            setInstructor(selectedClass.instructor);
            setShift(selectedClass.id_turno);
            const turno = turnos.find(turno => turno.hora_inicio === selectedClass.hora_inicio && turno.hora_fin === selectedClass.hora_fin);
            setShift(turno ? turno.id : '');
            setStudents(selectedClass.students);
        }
    }, [selectedClass]);
    
    useEffect(() => {
        const inscriptos = inscriptionsArray.filter(inscription => inscription.id_clase === selectedClass.id);
        const students = studentsArray.filter(student => 
            !inscriptos.some(inscription => inscription.id_alumno === student.ci)
        );
        setStudents(students);
        setInscriptos(inscriptos);
    }, [inscriptionsArray, selectedClass]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedClass = { ...selectedClass, ci_instructor, id_turno};
        console.log(updatedClass);
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

    const handleDelete = () => {
        deleteClass(selectedClass);
        closeModal();
    };

    return (
        <div className="modal is-active">
            <div className="modal-background" onClick={closeModal}></div>
            <div className="modal-content">
                <div className="box has-background-warning-light">
                    <p className="subtitle is-4 has-text-weight-bold">
                        Edit class - {selectedClass.descripcion} - {selectedClass.grupal ? 'Grupal' : 'Individual'}
                    </p>
                    <form onSubmit={handleSubmit}>
                        <div className="field is-grouped">
                            <div className="field">
                                <label className="label">Instructor</label>
                                <div className="control">
                                    <div className="select">
                                        <select value={ci_instructor} onChange={(e) => setInstructor(e.target.value)}>
                                            <option value="" disabled>{selectedClass ? `${selectedClass.nombre} ${selectedClass.apellido}` : 'Seleccione un instructor'}</option>
                                            {instructors.map((instructor) => (
                                                <option key={instructor.ci} value={instructor.ci}>{instructor.nombre} {instructor.apellido}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Shift</label>
                                <div className="control">
                                    <div className="select">
                                    <select value={id_turno} onChange={(e) => setShift(e.target.value)}>
                                            <option value="" disabled>Seleccionar turno</option>
                                            {turnos.map((turno) => (
                                                <option key={turno.id} value={turno.id}>{turno.hora_inicio} - {turno.hora_fin}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="field">
                                <button 
                                    type="button" 
                                    className={`button is-primary is-justify-self-flex-end mt-5`} 
                                    onClick={() => {
                                        handleDelete(selectedClass);
                                        closeModal();
                                    }}
                                    > <Icon path={mdiDelete} size={1.5} color='#ffffff' />
                                </button>
                            </div>
                        </div>

                        <div className="tabs is-boxed is-right">
                            <ul>
                                <li className={activeTab === 'todos' ? 'is-active' : ''} onClick={() => setActiveTab('todos')}>
                                    <a>Unenrolled</a>
                                </li>
                                <li className={activeTab === 'inscriptos' ? 'is-active' : ''} onClick={() => setActiveTab('inscriptos')}>
                                    <a>Enrolled</a>
                                </li>
                            </ul>
                        </div>

                        <div className="field">
                            {activeTab === 'todos' && students.length > 0 && (
                                <div className="box">
                                    {students.map((student) => (
                                        <div key={student.ci} className="field is-grouped is-grouped-multiline">
                                            <p>{student.ci} - {student.nombre} {student.apellido}</p>
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
                                    {inscriptos.map((student) => (
                                        <div key={student.id_alumno} className="field is-grouped is-grouped-multiline">
                                            <p>{student.id_alumno} - {student.nombre} {student.apellido}</p>
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

export default EditClassModal;