import React, { useState } from 'react';

const NewInstructorModal = ({ closeModal, addInstructor }) => {
    const [ci, setci] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [f_nac, setFNac] = useState('');
    const [mail, setMail] = useState('');
    const [tel, setTel] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addInstructor(ci, nombre, apellido, f_nac, mail, tel);
        closeModal();
    };

    return (
        <div className="modal is-active">
            <div className="modal-background" onClick={closeModal}></div>
            <div className="modal-content">
                <div className="box has-background-warning-light">
                    <p className="subtitle is-4 has-text-weight-bold">New Instructor</p>
                    <form onSubmit={handleSubmit}>
                        <div className="field is-grouped is-flex-wrap-wrap">
                            <div className="is-grouped">
                                <label className="label">Nombre:</label>
                                <div className="control">
                                    <input
                                        className="input"
                                        type="text"
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="is-grouped">
                                <label className="label">Apellido:</label>
                                <div className="control">
                                    <input
                                        className="input"
                                        type="text"
                                        value={apellido}
                                        onChange={(e) => setApellido(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="field is-grouped is-flex-wrap-wrap">
                            <div className="is-grouped">
                                <label className="label">F. Nacimiento:</label>
                                <div className="control">
                                    <input
                                        className="input"
                                        type="date"
                                        value={f_nac}
                                        onChange={(e) => setFNac(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="is-grouped">
                                <label className="label">Cédula:</label>
                                <div className="control">
                                    <input
                                        className="input"
                                        type="text"
                                        value={ci}
                                        onChange={(e) => setci(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Tel:</label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="tel"
                                    value={tel}
                                    onChange={(e) => setTel(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Mail:</label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="mail"
                                    value={mail}
                                    onChange={(e) => setMail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className={`field is-grouped is-justify-content-flex-end`}>
                            <div className="control">
                                <button type="button" className={`button is-danger has-text-white`} onClick={closeModal}>
                                    Cancelar
                                </button>
                            </div>
                            <div className="control">
                                <button type="submit" className={`button is-success has-text-white`}>
                                    Aceptar
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NewInstructorModal;
