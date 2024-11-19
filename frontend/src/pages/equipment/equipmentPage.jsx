import React, {useState, useEffect} from "react";
import AuthNavBar from "../../components/navBar/navBar";
import classes from "./equipmentPage.module.css";
import EquipmentCard from "../../components/equipment/equipmentCard/equipmentCard";
import EditEquipmentModal from "../../components/equipment/editEquipmentModal/editEquipment";
import NewEquipmentModal from "../../components/equipment/newEquipmentModal/newEquipment";

const EquipmentPage = ({ equipmentArray, addEquipment, updateEquipment, deleteEquipment, actividades}) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedEquipment, setSelectedEquipment] = useState(null);
    const [isNewModalOpen, setIsNewModalOpen] = useState(false);
    return (
        <>
            <AuthNavBar navItem="equipment" />
            <div className={`${classes.content}`}>
                <h1 className={`${classes.header}`}>Equipamiento</h1>
                <div className={`${classes.buttonContainer}`}>
                    <button
                        id="addEquipmentButton"
                        className={`button is-primary ${classes.addEquipmentButton}`}
                        onClick={() => setIsNewModalOpen(true)}>Nuevo Equipamiento</button>
                </div>
                <div className={`${classes.cardsContainer}`}>
                    {equipmentArray.map((equipment) => {
                        return (
                            <EquipmentCard
                            key={equipment.id}
                            equipment={equipment}
                            openEditModal={() => {
                                setSelectedEquipment(equipment);
                                setIsEditModalOpen(true);
                            }}
                            />
                        );
                    })}
                </div>
            </div>
            {isEditModalOpen && (
                <EditEquipmentModal
                    closeModal={() => setIsEditModalOpen(false)}
                    updateEquipment={updateEquipment}
                    deleteEquipment={deleteEquipment}
                    selectedEquipment={selectedEquipment}
                />
            )}
            {isNewModalOpen && (
                <NewEquipmentModal
                    addEquipment={addEquipment}
                    actividades={actividades}
                    closeModal={() => setIsNewModalOpen(false)}
                />
            )}
        </>
    );
};

export default EquipmentPage;