import React, { useState } from "react";
import classes from "./activityCard.module.css";

function ActivityCard({ openEditModal, activity, deleteActivity, updateActivity }) {
    return (
        <div className={classes.cardContainer}>
            <div className={classes.cardContent} onClick={openEditModal}>
                <h4 className={`${classes.title}`}>
                    {activity.name}
                </h4>
                <div className={`${classes.dataContainer}`}>
                    <p className={`${classes.data}`} id={classes.activity}>
                        ${activity.cost}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ActivityCard;
