import React, { useState } from "react";
import classes from "./studentCard.module.css";

function StudentCard({ openEditModal, student }) {
    return (
        <div className={classes.cardContainer}>
            <div className={classes.cardContent} onClick={openEditModal}>
                <h4 className={`${classes.title}`}>
                    {student.apellido}, {student.nombre}
                </h4>
                <div className={`${classes.dataContainer}`}>
                    <p className={`${classes.data}`} id={classes.student}>
                        {student.mail}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default StudentCard;
