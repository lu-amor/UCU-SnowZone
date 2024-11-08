import React, { useState, useEffect } from 'react';
import Icon from '@mdi/react';
import { mdiDelete } from '@mdi/js'

const EditInstructorModal = ({ selectedInstructor, closeModal, updateInstructor, deleteInstructor }) => {
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (selectedInstructor) {
            setPhone(selectedInstructor.phone);
            setEmail(selectedInstructor.email);
        }
    }, [selectedInstructor]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedInstructor = { ...selectedInstructor, phone, email};
        await updateInstructor(updatedInstructor);
        closeModal();
    };

    return (
        <div className="modal is-active">
            <div className="modal-background" onClick={closeModal}></div>
            <div className="modal-content">
                <div className="box has-background-warning-light">
                    <p className="subtitle is-4 has-text-weight-bold">Edit instructor</p>
                    <form onSubmit={handleSubmit}>
                        <div className="field">
                            <label className="label">{selectedInstructor.name} {selectedInstructor.surname}</label>
                        </div>
                        <div className="field is-grouped">
                            <label className="label">CI: {selectedInstructor.id}</label>
                            <label className="label">Birthdate: {selectedInstructor.birthdate}</label>
                        </div>
                        <div className="field">
                            <label className="label">Phone: {selectedInstructor.phone}</label>
                            <div className="control">
                                <input type="tel" className="input is-success" value={phone} onChange={(e) => setPhone(e.target.value)} />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Email: {selectedInstructor.email}</label>
                            <div className="control">
                                <input type="email" className="input is-success" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                        </div>
                        <div className="field">
                            <button 
                                type="button" 
                                className={`button is-primary is-justify-self-flex-end`} 
                                onClick={() => {
                                    deleteInstructor();
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

export default EditInstructorModal;