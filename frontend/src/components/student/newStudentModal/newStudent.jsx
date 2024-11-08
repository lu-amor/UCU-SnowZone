import React, { useState } from 'react';

const NewStudentModal = ({ closeModal, addStudent }) => {
    const [CI, setCI] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newStudent = { CI, name, surname, birthdate, phone, email };
        await addStudent(newStudent);
        closeModal();
    };

    return (
        <div className="modal is-active">
            <div className="modal-background" onClick={closeModal}></div>
            <div className="modal-content">
                <div className="box has-background-warning-light">
                    <p className="subtitle is-4 has-text-weight-bold">New Student</p>
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
                            <label className="label">Surname:</label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="text"
                                    value={surname}
                                    onChange={(e) => setSurname(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="field is-grouped">
                            <label className="label">Birthdate:</label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="date"
                                    value={birthdate}
                                    onChange={(e) => setBirthdate(e.target.value)}
                                />
                            </div>
                            <label className="label">Id. number:</label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="text"
                                    value={CI}
                                    onChange={(e) => setCI(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Phone:</label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Email:</label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
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

export default NewStudentModal;