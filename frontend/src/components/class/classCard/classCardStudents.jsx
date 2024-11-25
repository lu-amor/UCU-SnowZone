import React, { useState } from "react";
import classes from "./classCard.module.css";

function ClassCardStudents ({ clase }) {
    return (
        <div className={classes.cardContainer}>
            <div className={classes.cardContent}>
                <h4 className={`${classes.title}`}>
                    {clase.id}
                </h4>
                <div className={`${classes.dataContainer}`}>
                    <p className={`${classes.data}`} id={classes.activity}>
                        {clase.activity}
                    </p>
                    <div className={`${classes.time}`}>
                        <p className={`${classes.data}`} id={classes.from}>
                            {clase.from}
                        </p>
                        <p className={`${classes.data}`}>
                            -
                        </p>
                        <p className={`${classes.data}`} id={classes.to}>
                            {clase.to}
                        </p>
                    </div>
                    <p className={`${classes.data}`} id={classes.instructor}>
                        {clase.nombre} {clase.apellido}
                    </p>
                    <p className={`${classes.data}`} id={classes.grupal}>
                        {clase.grupal ? "Grupal" : "Individual"}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ClassCardStudents;
