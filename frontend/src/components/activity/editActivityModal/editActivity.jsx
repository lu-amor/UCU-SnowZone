import React, { useState, useEffect } from 'react';
import Icon from '@mdi/react';
import { mdiDelete } from '@mdi/js'

const EditActivityModal = ({ selectedActivity, closeModal, updateActivity, deleteActivity }) => {
    const [costo, setCosto] = useState(0);
    const [min_edad, setMinEdad] = useState(0);

    useEffect(() => {
        if (selectedActivity) {
            setCosto(selectedActivity.costo);
            setMinEdad(selectedActivity.min_edad);
        }
    }, [selectedActivity]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedActivity = { ...selectedActivity, costo, min_edad };
        await updateActivity(updatedActivity);
        closeModal();
    };

    return (
        <div className="modal is-active">
            <div className="modal-background" onClick={closeModal}></div>
            <div className="modal-content">
                <div className="box has-background-warning-light">
                    <p className="subtitle is-4 has-text-weight-bold">Edit activity - {selectedActivity.descripcion}</p>
                    <form onSubmit={handleSubmit}>
                        <div className="field">
                            <label className="label">Costo:</label>
                            <div className="control">
                                <input type="number" className="input is-success" value={costo} onChange={(e) => setCosto(e.target.value)} />
                            </div>
                            <label className="label mt-4">Min Edad:</label>
                            <div className="control">
                                <input type="number" className="input is-success" value={min_edad} onChange={(e) => setMinEdad(e.target.value)} />
                            </div>
                        </div>
                        <div className="field">
                            <button 
                                type="button" 
                                className={`button is-primary is-justify-self-flex-end`} 
                                onClick={() => {
                                    deleteActivity(selectedActivity);
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