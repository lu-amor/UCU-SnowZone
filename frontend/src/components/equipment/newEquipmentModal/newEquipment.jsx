import React, { useState } from 'react';

const NewEquipmentModal = ({ closeModal, addEquipment, actividades }) => {
    const [id_actividad, setid_actividad] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [tamanio, setTamanio] = useState('');
    const [costo, setCosto] = useState(0);
    const [cant_disponibles, setCantDisponibles] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addEquipment(id_actividad, descripcion, tamanio, costo, cant_disponibles);
        closeModal();
    };

    return (
        <div className="modal is-active">
            <div className="modal-background" onClick={closeModal}></div>
            <div className="modal-content">
                <div className="box has-background-warning-light">
                    <p className="subtitle is-4 has-text-weight-bold">Nuevo equipamiento</p>
                    <form onSubmit={handleSubmit}>
                        <div className="field">
                            <label className="label">Descripcion:</label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="text"
                                    value={descripcion}
                                    onChange={(e) => setDescripcion(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="field is-grouped">
                            <label className="label">Tamanio:</label>
                            <div className="select">
                                <select value={tamanio} onChange={(e) => setTamanio(e.target.value)}>
                                    <option value="" disabled>Seleccionar talle</option>
                                    <option value="XS">XS</option>
                                    <option value="S">S</option>
                                    <option value="M">M</option>
                                    <option value="L">L</option>
                                    <option value="XL">XL</option>
                                    <option value="XXL">XXL</option>
                                    <option value="XXXL">XXXL</option>
                                </select>
                            </div>
                            <label className="label">Actividad:</label>
                            <div className='select'>
                                <select value={id_actividad} onChange={(e) => setid_actividad(e.target.value)}>
                                    <option value="" disabled>Seleccionar actividad</option>
                                    {actividades.map((actividad) => (
                                        <option key={actividad.id} value={actividad.id}>{actividad.descripcion}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="field is-grouped">
                            <label className="label">Cant. disponibles:</label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="number"
                                    value={cant_disponibles}
                                    onChange={(e) => setCantDisponibles(e.target.value)}
                                    required
                                />
                            </div>
                            <label className="label">Costo:</label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="number"
                                    value={costo}
                                    onChange={(e) => setCosto(e.target.value)}
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

export default NewEquipmentModal;
