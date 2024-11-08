import React, { useState } from "react";
import classes from "./activityCard.module.css";

function ActivityCardTS({activity}) {
    return (
        <div className={classes.cardContainer}>
            <div className={classes.cardContent}>
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

export default ActivityCardTS;
