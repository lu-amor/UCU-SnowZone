import React from "react";
import classes from "./shiftsPage.module.css";
import ShiftCardTS from "../../components/shift/shiftCard/shiftCardTS";
import AuthNavBarS from "../../components/navBar/navBarS";

const ShiftsPageS = ({shiftsArray }) => {
    return (
        <>
            <AuthNavBarS navItem="shifts" />
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

export default ShiftsPageS;