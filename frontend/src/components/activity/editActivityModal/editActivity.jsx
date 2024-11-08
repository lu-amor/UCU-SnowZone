import React, { useState, useEffect } from 'react';
import Icon from '@mdi/react';
import { mdiDelete } from '@mdi/js'

const EditActivityModal = ({ selectedActivity, costs, closeModal, updateActivity, deleteActivity }) => {
    const [cost, setCost] = useState(0);

    useEffect(() => {
        if (selectedActivity) {
            setCost(selectedActivity.cost);
        }
    }, [selectedActivity]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedActivity = { ...selectedActivity, cost};
        await updateActivity(updatedActivity);
        closeModal();
    };

    return (
        <div className="modal is-active">
            <div className="modal-background" onClick={closeModal}></div>
            <div className="modal-content">
                <div className="box has-background-warning-light">
                    <p className="subtitle is-4 has-text-weight-bold">Edit activity</p>
                    <form onSubmit={handleSubmit}>
                        <div className="field">
                            <label className="label">{selectedActivity.name}</label>
                        </div>
                        <div className="field">
                            <label className="label">{selectedActivity.activity}</label>
                        </div>
                        <div className="field">
                            <label className="label">Cost: {selectedActivity.cost}</label>
                            <div className="control">
                                <input type="number" className="input is-success" value={cost} onChange={(e) => setCost(e.target.value)} />
                            </div>
                        </div>
                        <div className="field">
                            <button 
                                type="button" 
                                className={`button is-primary is-justify-self-flex-end`} 
                                onClick={() => {
                                    deleteActivity();
                                    closeModal();
                                }}
                                > <Icon path={mdiDelete} size={1.5} color='#ffffff' />
                            </button>
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

export default EditActivityModal;