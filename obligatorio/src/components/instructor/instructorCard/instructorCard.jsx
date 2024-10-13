import React, { useState } from "react";
import classes from "./instructorCard.module.css";

function InstructorCard({ openEditModal, instructor, deleteInstructor, updateInstructor }) {
    return (
        <div className={classes.cardContainer}>
            <div className={classes.cardContent} onClick={openEditModal}>
                <h4 className={`${classes.title}`}>
                    {instructor.surname} {instructor.name}
                </h4>
                <div className={`${classes.dataContainer}`}>
                    <p className={`${classes.data}`} id={classes.instructor}>
                        {instructor.email}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default InstructorCard;
