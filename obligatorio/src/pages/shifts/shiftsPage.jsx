import React, {useState} from "react";
import classes from "./shiftsPage.module.css";
import ShiftCard from "../../components/shift/shiftCard/shiftCard";
import AuthNavBar from "../../components/navBar/navBar";
import EditShiftModal from "../../components/shift/editShiftModal/editShift";
import NewShiftModal from "../../components/shift/newShiftModal/newShift";

const shiftsPage = ({shiftsArray, addShift, updateShift, deleteShift}) => {
    const [shiftList, setShiftList] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedShift, setSelectedShift] = useState(null);
    const [isNewModalOpen, setIsNewModalOpen] = useState(false);

    return (
        <>
            <AuthNavBar navItem="shifts" />
            <div className={`${classes.content}`}>
                <h1 className={`${classes.header}`}>Shifts</h1>
                <div className={`${classes.buttonContainer}`}>
                    <button
                        id="addShiftButton"
                        className={`button is-medium is-primary ${classes.addShiftButton}`}
                        onClick={() => setIsNewModalOpen(true)}>add Shift</button>
                </div>
                <div className={`${classes.cardsContainer}`}>
                    {shiftsArray.map((shift) => {
                        return (
                            <ShiftCard
                            key={shift.id}
                            shift={shift}
                            deleteShift={deleteShift}
                            updateShift={updateShift}
                            openEditModal={() => {
                                setSelectedShift(shift);
                                setIsEditModalOpen(true);
                            }}
                            />
                        );
                    })}
                </div>
            </div>
            {isEditModalOpen && (
                <EditShiftModal
                    closeModal={() => setIsEditModalOpen(false)}
                    updateShift={updateShift}
                    selectedShift={selectedShift}
                />
            )}
            {isNewModalOpen && (
                <NewShiftModal
                    addShift={addShift}
                    closeModal={() => setIsNewModalOpen(false)}
                />
            )}
        </>
    );
};

export default shiftsPage;