import React, { useState, useEffect } from 'react';

const NewClassModal = ({ instructors, activities, turnos, closeModal }) => {
    const [instructor, setInstructor] = useState('');
    const [turno, setTurno] = useState('');
    const [actividad, setActividad] = useState('');
    const [grupal, setGrupal] = useState(true);
    const dictada = false;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newClass = { actividad, instructor, turno, dictada, grupal: grupal ? 1 : 0 };
        await newClass(newClass);
        closeModal();
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
                                <label className="label">Actividad</label>
                                <div className="control">
                                    <div className="select">
                                        <select value={actividad} onChange={(e) => setActividad(e.target.value)}>
                                            <option value="" disabled>Seleccionar actividad</option>
                                            {activities.map((actividad) => (
                                                <option key={actividad.id} value={actividad.id}>{actividad.descripcion}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Turno</label>
                                <div className="control">
                                    <div className="select">
                                        <select value={turno} onChange={(e) => setTurno(e.target.value)}>
                                            <option value="" disabled>Seleccionar turno</option>
                                            {turnos.map((turno) => (
                                                <option key={turno.id} value={turno.id}>{turno.from} - {turno.to}</option>
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
                                    name="grupal"
                                    value={true}
                                    checked={grupal === true}
                                    onChange={() => setGrupal(true)}
                                    style={{ marginLeft: '5px' }}
                                />
                            </label>
                            <label className="radio">
                                Individual
                                <input
                                    type="radio"
                                    name="grupal"
                                    value={false}
                                    checked={grupal === false}
                                    onChange={() => setGrupal(false)}
                                    style={{ marginLeft: '5px' }}
                                />
                            </label>
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
