import React, {useState} from "react";
import classes from "./activitiesPage.module.css";
import ActivityCard from "../../components/activity/activityCard/activityCard";
import AuthNavBar from "../../components/navBar/navBar";
import EditActivityModal from "../../components/activity/editActivityModal/editActivity";
import NewActivityModal from "../../components/activity/newActivityModal/newActivity";

const activitiesPage = ({activitiesArray, addActivity, updateActivity, deleteActivity}) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [isNewModalOpen, setIsNewModalOpen] = useState(false);

    return (
        <>
            <AuthNavBar navItem="activities" />
            <div className={`${classes.content}`}>
                <h1 className={`${classes.header}`}>Actividades</h1>
                <div className={`${classes.buttonContainer}`}>
                    <button
                        id="addActivityButton"
                        className={`button is-primary ${classes.addActivityButton}`}
                        onClick={() => setIsNewModalOpen(true)}>Nueva Actividad</button>
                </div>
                <div className={`${classes.cardsContainer}`}>
                    {activitiesArray.map((activity) => {
                        return (
                            <ActivityCard
                            key={activity.id}
                            activity={activity}
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
                    deleteActivity={deleteActivity}
                    selectedActivity={selectedActivity}
                />
            )}
            {isNewModalOpen && (
                <NewActivityModal
                    addActivity={addActivity}
                    closeModal={() => setIsNewModalOpen(false)}
                />
            )}
        </>
    );
};

export default activitiesPage;