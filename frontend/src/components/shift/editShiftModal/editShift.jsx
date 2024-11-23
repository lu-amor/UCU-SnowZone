import React, { useState, useEffect } from 'react';
import Icon from '@mdi/react';
import { mdiDelete } from '@mdi/js'

const EditShiftModal = ({ selectedShift, closeModal, updateShift, deleteShift }) => {
    const [hora_inicio, setHoraInicio] = useState('');
    const [hora_fin, setHoraFin] = useState('');

    useEffect(() => {
        if (selectedShift) {
            setHoraInicio(selectedShift.hora_inicio);
            setHoraFin(selectedShift.hora_fin);
        }
    }, [selectedShift]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedShift = { ...selectedShift, hora_inicio, hora_fin};
        await updateShift(updatedShift);
        closeModal();
    };

    return (
        <div className="modal is-active">
            <div className="modal-background" onClick={closeModal}></div>
            <div className="modal-content">
                <div className="box has-background-warning-light">
                    <p className="subtitle is-4 has-text-weight-bold">Edit shift</p>
                    <form onSubmit={handleSubmit}>
                        <div className="field is-grouped">
                            <label className="label">From: {selectedShift.hora_inicio}</label>
                            <div className="control">
                                <input type="time" className="input is-success" value={hora_inicio} onChange={(e) => setHoraInicio(e.target.value)} />
                            </div>
                            <label className="label">To: {selectedShift.hora_fin}</label>
                            <div className="control">
                                <input type="time" className="input is-success" value={hora_fin} onChange={(e) => setHoraFin(e.target.value)} />
                            </div>
                        </div>
                        <div className="field">
                            <button 
                                type="button" 
                                className={`button is-primary is-justify-self-flex-end`} 
                                onClick={() => {
                                    deleteShift(selectedShift);
                                    closeModal();
                                }}
                                > <Icon path={mdiDelete} size={1.5} color='#ffffff' />
                            </button>
                        </div>
                        <div className={`field is-grouped is-justify-content-flex-end`}>
                            <div className="control">
                                <button type="button" className={`button is-danger has-text-white `} onClick={closeModal}>Cancelar</button>
                            </div>
                            <div className="control">
                                <button type="submit" className={`button is-success has-text-white `}>Aceptar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditShiftModal;