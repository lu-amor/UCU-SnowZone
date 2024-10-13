import React, { useState, useEffect } from 'react';
import Icon from '@mdi/react';
import { mdiDelete } from '@mdi/js'

const EditShiftModal = ({ selectedShift, closeModal, updateShift, deleteShift }) => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');

    useEffect(() => {
        if (selectedShift) {
            setFrom(selectedShift.from);
            setTo(selectedShift.to);
        }
    }, [selectedShift]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedShift = { ...selectedShift, from, to};
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
                            <label className="label">From: {selectedShift.from}</label>
                            <div className="control">
                                <input type="time" className="input is-success" value={from} onChange={(e) => setFrom(e.target.value)} />
                            </div>
                            <label className="label">To: {selectedShift.to}</label>
                            <div className="control">
                                <input type="time" className="input is-success" value={to} onChange={(e) => setTo(e.target.value)} />
                            </div>
                        </div>
                        <div className="field">
                            <button 
                                type="button" 
                                className={`button is-primary is-justify-self-flex-end`} 
                                onClick={() => {
                                    deleteShift();
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