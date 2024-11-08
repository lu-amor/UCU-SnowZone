import React from "react";
import classes from "./shiftCard.module.css";

function ShiftCard({ shift }) {
    return (
        <div className={classes.cardContainer}>
            <div className={classes.cardContent}>
                <h4 className={`${classes.title}`}>
                    {shift.from} - {shift.to}
                </h4>
            </div>
        </div>
    );
}

export default ShiftCard;