import React from "react";
import classes from "./activitiesPage.module.css";
import ActivityCardTS from "../../components/activity/activityCard/activityCardTS";
import AuthNavBarS from "../../components/navBar/navBarS";

const ActivitiesPageS = ({activitiesArray}) => {
    return (
        <>
            <AuthNavBarS navItem="activities" />
            <div className={`${classes.content}`}>
                <h1 className={`${classes.header} mb-4`}>Actividades</h1>
                <div className={`${classes.cardsContainer}`}>
                    {activitiesArray.map((activity) => {
                        return (
                            <ActivityCardTS
                            key={activity.id}
                            activity={activity}
                            />
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default ActivitiesPageS;