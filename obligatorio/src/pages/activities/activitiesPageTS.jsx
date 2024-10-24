import React from "react";
import classes from "./activitiesPage.module.css";
import ActivityCardTS from "../../components/activity/activityCard/activityCardTS";
import AuthNavBar from "../../components/navBar/navBar";

const activitiesPage = ({activitiesArray}) => {

    return (
        <>
            <AuthNavBar navItem="activities" />
            <div className={`${classes.content}`}>
                <h1 className={`${classes.header} mb-4`}>Activities</h1>
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

export default activitiesPage;