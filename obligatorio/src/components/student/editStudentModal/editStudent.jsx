import React, { useState, useEffect } from 'react';
import Icon from '@mdi/react';
import { mdiDelete } from '@mdi/js'

const EditStudentModal = ({ selectedStudent, closeModal, updateStudent, deleteStudent }) => {
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (selectedStudent) {
            setPhone(selectedStudent.phone);
            setEmail(selectedStudent.email);
        }
    }, [selectedStudent]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedStudent = { ...selectedStudent, phone, email};
        await updateStudent(updatedStudent);
        closeModal();
    };

    return (
        <div className="modal is-active">
            <div className="modal-background" onClick={closeModal}></div>
            <div className="modal-content">
                <div className="box has-background-warning-light">
                    <p className="subtitle is-4 has-text-weight-bold">Edit student</p>
                    <form onSubmit={handleSubmit}>
                        <div className="field">
                            <label className="label">{selectedStudent.name} {selectedStudent.surname}</label>
                        </div>
                        <div className="field is-grouped">
                            <label className="label">CI: {selectedStudent.id}</label>
                            <label className="label">Birthdate: {selectedStudent.birthdate}</label>
                        </div>
                        <div className="field">
                            <label className="label">Phone: {selectedStudent.phone}</label>
                            <div className="control">
                                <input type="tel" className="input is-success" value={phone} onChange={(e) => setPhone(e.target.value)} />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Email: {selectedStudent.email}</label>
                            <div className="control">
                                <input type="email" className="input is-success" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                        </div>
                        <div className="field">
                            <button 
                                type="button" 
                                className={`button is-primary is-justify-self-flex-end`} 
                                onClick={() => {
                                    deleteStudent();
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

export default EditStudentModal;