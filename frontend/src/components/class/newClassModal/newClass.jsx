import React, { useState, useEffect } from 'react';

const NewClassModal = ({ instructors, activities, turnos, closeModal, addClass }) => {
    const [ci_instructor, setInstructor] = useState('');
    const [id_turno, setTurno] = useState('');
    const [id_actividad, setActividad] = useState('');
    const [grupal, setGrupal] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (grupal === true) {
            setGrupal(1);
        } else {
            setGrupal(0);
        }
        await addClass(ci_instructor, id_actividad, id_turno, grupal);
        closeModal();
    };

    return (
        <div className="modal is-active">
            <div className="modal-background" onClick={closeModal}></div>
            <div className="modal-content">
                <div className="box has-background-warning-light">
                    <p className="subtitle is-4 has-text-weight-bold">New class</p>
                    <form onSubmit={handleSubmit}>
                        <div className="field">
                            <div className="field is-grouped">
                                <label className="label">Instructor</label>
                                <div className="control">
                                    <div className="select">
                                        <select value={ci_instructor} onChange={(e) => setInstructor(e.target.value)}>
                                            <option value="" disabled>Select an instructor</option>
                                            {instructors.map((instructor) => (
                                                <option key={instructor.ci} value={instructor.ci}>{instructor.nombre} {instructor.apellido}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="field is-grouped">
                                <label className="label">Actividad</label>
                                <div className="control">
                                    <div className="select">
                                        <select value={id_actividad} onChange={(e) => setActividad(e.target.value)}>
                                            <option value="" disabled>Seleccionar actividad</option>
                                            {activities.map((actividad) => (
                                                <option key={actividad.id} value={actividad.id}>{actividad.descripcion}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="field is-grouped">
                                <label className="label">Turno</label>
                                <div className="control">
                                    <div className="select">
                                        <select value={id_turno} onChange={(e) => setTurno(e.target.value)}>
                                            <option value="" disabled>Seleccionar turno</option>
                                            {turnos.map((turno) => (
                                                <option key={turno.id} value={turno.id}>{turno.hora_inicio} - {turno.hora_fin}</option>
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
