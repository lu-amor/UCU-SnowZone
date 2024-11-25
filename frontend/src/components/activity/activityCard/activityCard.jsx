import React, { useState } from "react";
import classes from "./activityCard.module.css";

function ActivityCard({ openEditModal, activity }) {
    return (
        <div className={classes.cardContainer}>
            <div className={classes.cardContent} onClick={openEditModal}>
                <h4 className={`${classes.title}`}>
                    {activity.descripcion}
                </h4>
                <div className={`${classes.dataContainer}`}>
                    <p className={`${classes.data}`} id={classes.activity}>
                        ${activity.costo}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ActivityCard;
