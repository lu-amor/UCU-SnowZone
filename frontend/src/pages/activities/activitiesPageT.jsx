import React from "react";
import classes from "./activitiesPage.module.css";
import ActivityCardTS from "../../components/activity/activityCard/activityCardTS";
import AuthNavBarT from "../../components/navBar/navBarT";

const ActivitiesPageT = ({activitiesArray}) => {

    return (
        <>
            <AuthNavBarT navItem="activities" />
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

export default ActivitiesPageT;