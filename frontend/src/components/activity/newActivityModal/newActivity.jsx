import React, { useState, useEffect } from 'react';

const NewActivityModal = ({ closeModal, addActivity }) => {
    const [descripcion, setDescripcion] = useState('');
    const [costo, setCosto] = useState(0);
    const [min_edad, setMinEdad] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (descripcion.trim() === '' || costo <= 0 || min_edad < 0 || min_edad > 100) {
            alert('Valores inválidos');
            return;
        }
        await addActivity(descripcion, costo, min_edad);
        closeModal();
    };

    return (
        <div className="modal is-active">
            <div className="modal-background" onClick={closeModal}></div>
            <div className="modal-content">
                <div className="box has-background-warning-light">
                    <p className="subtitle is-4 has-text-weight-bold">Nueva actividad</p>
                    <form onSubmit={handleSubmit}>
                        <div className="field">
                            <label className="label">Nombre:</label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="text"
                                    value={descripcion}
                                    onChange={(e) => setDescripcion(e.target.value)}
                                    required
                                />
                            </div>
                            <label className="label">Costo:</label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="number"
                                    value={costo}
                                    onChange={(e) => setCosto(e.target.value)}
                                    required
                                />
                            </div>
                            <label className="label">Min Edad:</label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="number"
                                    value={min_edad}
                                    onChange={(e) => setMinEdad(e.target.value)}
                                    required
                                />
                            </div>
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

export default NewActivityModal;