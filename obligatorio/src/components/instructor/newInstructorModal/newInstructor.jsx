import React, { useState, useEffect } from 'react';

const EditInstructorModal = ({ selectedInstructor, closeModal, updateInstructor, deleteInstructor }) => {
/*     const [cost, setCost] = useState(0);

    useEffect(() => {
        if (selectedInstructor) {
            setCost(selectedInstructor.cost);
        }
    }, [selectedInstructor]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedInstructor = { ...selectedInstructor, cost };
        await updateInstructor(updatedInstructor);
        closeModal();
    }; */

    return (
        <div className="modal is-active">
            <div className="modal-background" onClick={closeModal}></div>
            <div className="modal-content">
                <div className="box has-background-warning-light">
                    <p className="subtitle is-4 has-text-weight-bold">New instructor</p>
                    <div className={`field is-grouped is-justify-content-flex-end`}>
                        <div className="control">
                            <button type="button" className={`button is-danger has-text-white`} onClick={closeModal}>Cancelar</button>
                        </div>
                        <div className="control">
                            <button type="submit" className={`button is-success has-text-white`}>Aceptar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditInstructorModal;