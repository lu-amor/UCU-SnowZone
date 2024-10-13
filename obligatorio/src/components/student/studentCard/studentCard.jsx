import React, { useState } from "react";
import classes from "./studentCard.module.css";

function StudentCard({ openEditModal, student, deleteStudent, updateStudent }) {
    return (
        <div className={classes.cardContainer}>
            <div className={classes.cardContent} onClick={openEditModal}>
                <h4 className={`${classes.title}`}>
                    {student.surname} {student.name}
                </h4>
                <div className={`${classes.dataContainer}`}>
                    <p className={`${classes.data}`} id={classes.student}>
                        {student.email}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default StudentCard;
