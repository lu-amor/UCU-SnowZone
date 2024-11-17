import React, { useState } from "react";
import classes from "./instructorCard.module.css";

function InstructorCard({ openEditModal, instructor }) {
    return (
        <div className={classes.cardContainer}>
            <div className={classes.cardContent} onClick={openEditModal}>
                <h4 className={`${classes.title}`}>
                    {instructor.apellido}, {instructor.nombre}
                </h4>
                <div className={`${classes.dataContainer}`}>
                    <p className={`${classes.data}`} id={classes.instructor}>
                        {instructor.mail}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default InstructorCard;
