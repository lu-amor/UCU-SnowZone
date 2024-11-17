import React, { useState, useEffect } from 'react';
import Icon from '@mdi/react';
import { mdiDelete } from '@mdi/js'

const EditStudentModal = ({ selectedStudent, closeModal, updateStudent, deleteStudent }) => {
    const [mail, setMail] = useState('');
    const [tel, setTel] = useState('');

    useEffect(() => {
        if (selectedStudent) {
            setMail(selectedStudent.mail);
            setTel(selectedStudent.tel);
        }
    }, [selectedStudent]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedStudent = { ...selectedStudent, mail, tel};
        await updateStudent(updatedStudent);
        closeModal();
    };

    const handleDelete = () => {
        deleteStudent(selectedStudent);
        closeModal();
    }

    return (
        <div className="modal is-active">
            <div className="modal-background" onClick={closeModal}></div>
            <div className="modal-content">
                <div className="box has-background-warning-light">
                    <p className="subtitle is-4 has-text-weight-bold">Edit student</p>
                    <form onSubmit={handleSubmit}>
                        <div className="field">
                            <label className="label">{selectedStudent.nombre} {selectedStudent.apellido}</label>
                        </div>
                        <div className="field is-grouped">
                            <label className="label">CI: {selectedStudent.ci}</label>
                            <label className="label">Birthdate: {selectedStudent.f_nac.split('00:00')[0].split(', ')[1]}</label>
                        </div>
                        <div className="field">
                            <label className="label">Tel: {selectedStudent.tel}</label>
                            <div className="control">
                                <input type="tel" className="input is-success" value={tel} onChange={(e) => setTel(e.target.value)} />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Mail: {selectedStudent.mail}</label>
                            <div className="control">
                                <input type="mail" className="input is-success" value={mail} onChange={(e) => setMail(e.target.value)} />
                            </div>
                        </div>
                        <div className="field">
                            <button 
                                type="button" 
                                className={`button is-primary is-justify-self-flex-end`} 
                                onClick={() => {
                                    handleDelete();
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