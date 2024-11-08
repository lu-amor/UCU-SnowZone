import React, { useState, useEffect } from 'react';

const EditActivityModal = ({ closeModal, addActivity }) => {
    const [name, setName] = useState('');
    const [cost, setCost] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newActivity = { name, cost };
        await addActivity(newActivity);
        closeModal();
    };

    return (
        <div className="modal is-active">
            <div className="modal-background" onClick={closeModal}></div>
            <div className="modal-content">
                <div className="box has-background-warning-light">
                    <p className="subtitle is-4 has-text-weight-bold">New activity</p>
                    <form onSubmit={handleSubmit}>
                        <div className="field is-grouped">
                            <label className="label">Name:</label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <label className="label">Cost:</label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="number"
                                    value={cost}
                                    onChange={(e) => setCost(e.target.value)}
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

export default EditActivityModal;