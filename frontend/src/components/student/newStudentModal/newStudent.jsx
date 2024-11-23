import React, { useState } from 'react';

const NewStudentModal = ({ closeModal, addStudent }) => {
    const [ci, setCI] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [f_nac, setF_nac] = useState('');
    const [mail, setMail] = useState('');
    const [tel, setTel] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (ci <= 0 || ci.toString().length < 7) {
            alert("La cédula debe ser un número positivo de al menos 7 dígitos.");
            return;
        }
    
        if (nombre.length > 40 || apellido.length > 40) {
            alert("El nombre y el apellido no pueden tener más de 40 caracteres.");
            return;
        }
    
        if (new Date(f_nac) > new Date()) {
            alert("La fecha de nacimiento no puede ser en el futuro.");
            return;
        }
    
        const telefonoRegex = /^\+598[0-9]{8}$/;
        if (!telefonoRegex.test(tel)) {
            alert("El teléfono debe comenzar con +598 seguido de 8 dígitos.");
            return;
        }
    
        const emailRegex = /^[A-Za-z0-9._%+-]+@(ucu\.edu\.uy|correo\.ucu\.edu\.uy)$/;
        if (!emailRegex.test(mail)) {
            alert("El correo debe ser de los dominios ucu.edu.uy o correo.ucu.edu.uy.");
            return;
        }
        addStudent(parseInt(ci, 10), nombre, apellido, f_nac, mail, tel);
        closeModal();
    };
    

    return (
        <div className="modal is-active">
            <div className="modal-background" onClick={closeModal}></div>
            <div className="modal-content">
                <div className="box has-background-warning-light">
                    <p className="subtitle is-4 has-text-weight-bold">New Student</p>
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
                                        onChange={(e) => setF_nac(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="is-grouped">
                                <label className="label">Cédula:</label>
                                <div className="control">
                                    <input
                                        className="input"
                                        type="number"
                                        value={ci}
                                        onChange={(e) => setCI(parseInt(e.target.value, 10))}

                                    />
                                </div>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Teléfono:</label>
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
                                    type="email"
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

export default NewStudentModal;