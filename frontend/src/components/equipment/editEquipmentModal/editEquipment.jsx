import React, { useState, useEffect } from 'react';
import Icon from '@mdi/react';
import { mdiDelete } from '@mdi/js'

const EditEquipmentModal = ({ selectedEquipment, closeModal, updateEquipment, deleteEquipment }) => {
    const [costo, setCosto] = useState(0);
    const [cant_disponibles, setCant_disponibles] = useState(0);

    useEffect(() => {
        if (selectedEquipment) {
            setCosto(selectedEquipment.costo);
            setCant_disponibles(selectedEquipment.cant_disponibles);
        }
    }, [selectedEquipment]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedEquipment = { ...selectedEquipment, costo, cant_disponibles};
        await updateEquipment(updatedEquipment);
        closeModal();
    };

    return (
        <div className="modal is-active">
            <div className="modal-background" onClick={closeModal}></div>
            <div className="modal-content">
                <div className="box has-background-warning-light">
                    <p className="subtitle is-4 has-text-weight-bold">Edit Equipment</p>
                    <form onSubmit={handleSubmit}>
                        <div className="field">
                            <label className="label">{selectedEquipment.id} - {selectedEquipment.descripcion} - {selectedEquipment.actividad} - {selectedEquipment.tamanio}</label>
                        </div>
                        <div className="field">
                            <label className="label">Cant_disponibles: {selectedEquipment.cant_disponibles}</label>
                            <div className="control">
                                <input type="number" className="input is-success" value={cant_disponibles} onChange={(e) => setCant_disponibles(e.target.value)} />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Costo: {selectedEquipment.costo}</label>
                            <div className="control">
                                <input type="number" className="input is-success" value={costo} onChange={(e) => setCosto(e.target.value)} />
                            </div>
                        </div>
                        <div className="field">
                            <button 
                                type="button" 
                                className={`button is-primary is-justify-self-flex-end`} 
                                onClick={() => {
                                    deleteEquipment(selectedEquipment);
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

export default EditEquipmentModal;