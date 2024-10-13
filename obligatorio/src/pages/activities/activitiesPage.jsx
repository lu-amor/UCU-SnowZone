import React, {useState} from "react";
import classes from "./activitiesPage.module.css";
import ActivityCard from "../../components/activity/activityCard/activityCard";
import AuthNavBar from "../../components/navBar/navBar";
import EditActivityModal from "../../components/activity/editActivityModal/editActivity";
import NewActivityModal from "../../components/activity/newActivityModal/newActivity";

const activitiesPage = ({activitiesArray, addActivity, updateActivity, deleteActivity}) => {
    const [activityList, setActivityList] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [isNewModalOpen, setIsNewModalOpen] = useState(false);

    return (
        <>
            <AuthNavBar navItem="activities" />
            <div className={`${classes.content}`}>
                <h1 className={`${classes.header}`}>Activities</h1>
                <div className={`${classes.buttonContainer}`}>
                    <button
                        id="addActivityButton"
                        className={`button is-medium is-primary ${classes.addActivityButton}`}
                        onClick={() => setIsNewModalOpen(true)}>add Activity</button>
                </div>
                <div className={`${classes.cardsContainer}`}>
                    {activitiesArray.map((activity) => {
                        return (
                            <ActivityCard
                            key={activity.id}
                            activity={activity}
                            deleteActivity={deleteActivity}
                            updateActivity={updateActivity}
                            openEditModal={() => {
                                setSelectedActivity(activity);
                                setIsEditModalOpen(true);
                            }}
                            />
                        );
                    })}
                </div>
            </div>
            {isEditModalOpen && (
                <EditActivityModal
                    closeModal={() => setIsEditModalOpen(false)}
                    updateActivity={updateActivity}
                    selectedActivity={selectedActivity}
                />
            )}
            {isNewModalOpen && (
                <NewActivityModal
                    closeModal={() => setIsNewModalOpen(false)}
                />
            )}
        </>
    );
};

export default activitiesPage;