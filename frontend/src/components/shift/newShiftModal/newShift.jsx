import React, { useState } from 'react';

const EditShiftModal = ({ closeModal, addShift }) => {
    const [hora_inicio, setHoraInicio] = useState('');
    const [hora_fin, setHoraFin] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (hora_fin <= hora_inicio) {
            alert('La hora de fin debe ser después de la hora de inicio.');
            return;
        }
        await addShift(hora_inicio, hora_fin);
        closeModal();
    };

    return (
        <div className="modal is-active">
            <div className="modal-background" onClick={closeModal}></div>
            <div className="modal-content">
                <div className="box has-background-warning-light">
                    <p className="subtitle is-4 has-text-weight-bold">New shift</p>
                    <form onSubmit={handleSubmit}>
                        <div className="field is-grouped">
                            <label className="label">From:</label>
                            <div className="control">
                                <input type="time" className="input is-success" value={hora_inicio} onChange={(e) => setHoraInicio(e.target.value)} />
                            </div>
                            <label className="label">To:</label>
                            <div className="control">
                                <input type="time" className="input is-success" value={hora_fin} onChange={(e) => setHoraFin(e.target.value)} />
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

export default EditShiftModal;