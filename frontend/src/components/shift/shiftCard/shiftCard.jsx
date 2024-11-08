import React, { useState } from "react";
import classes from "./shiftCard.module.css";

function ShiftCard({ openEditModal, shift, deleteShift, updateShift }) {
    return (
        <div className={classes.cardContainer}>
            <div className={classes.cardContent} onClick={openEditModal}>
                <h4 className={`${classes.title}`}>
                    {shift.from} - {shift.to}
                </h4>
            </div>
        </div>
    );
}

export default ShiftCard;
