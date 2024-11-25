import React, { useState, useEffect } from 'react';
import Icon from '@mdi/react';
import { mdiDelete } from '@mdi/js'

const EditInstructorModal = ({ selectedInstructor, closeModal, updateInstructor, deleteInstructor }) => {
    const [mail, setMail] = useState('');
    const [tel, setTel] = useState('');

    useEffect(() => {
        if (selectedInstructor) {
            setMail(selectedInstructor.mail);
            setTel(selectedInstructor.tel);
        }
    }, [selectedInstructor]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedInstructor = { ...selectedInstructor, mail, tel};
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
                            <label className="label">{selectedInstructor.nombre} {selectedInstructor.apellido}</label>
                        </div>
                        <div className="field is-grouped">
                            <label className="label">Cédula: {selectedInstructor.ci}</label>
                            <label className="label">F. Nacimiento: {selectedInstructor.f_nac.split('00:00')[0].split(', ')[1]}</label>
                        </div>
                        <div className="field">
                            <label className="label">Tel: {selectedInstructor.tel}</label>
                            <div className="control">
                                <input type="tel" className="input is-success" value={tel} onChange={(e) => setTel(e.target.value)} />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Mail: {selectedInstructor.mail}</label>
                            <div className="control">
                                <input type="mail" className="input is-success" value={mail} onChange={(e) => setMail(e.target.value)} />
                            </div>
                        </div>
                        <div className="field">
                            <button 
                                type="button" 
                                className={`button is-primary is-justify-self-flex-end`} 
                                onClick={() => {
                                    deleteInstructor(selectedInstructor);
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