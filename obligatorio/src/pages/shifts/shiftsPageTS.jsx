import React, {useState} from "react";
import classes from "./shiftsPage.module.css";
import ShiftCardTS from "../../components/shift/shiftCard/shiftCardTS";
import AuthNavBar from "../../components/navBar/navBar";

const shiftsPage = ({shiftsArray }) => {
    const [shiftList, setShiftList] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedShift, setSelectedShift] = useState(null);
    const [isNewModalOpen, setIsNewModalOpen] = useState(false);

    return (
        <>
            <AuthNavBar navItem="shifts" />
            <div className={`${classes.content}`}>
                <h1 className={`${classes.header} mb-4`}>Shifts</h1>
                <div className={`${classes.cardsContainer}`}>
                    {shiftsArray.map((shift) => {
                        return (
                            <ShiftCardTS
                            key={shift.id}
                            shift={shift}
                            />
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default shiftsPage;