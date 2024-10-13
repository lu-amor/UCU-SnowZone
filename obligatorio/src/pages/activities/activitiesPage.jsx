import React, {useState} from "react";
import activities from "./activitiesPage.module.css";
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
            <div className={`${activities.content}`}>
                <h1 className={`${activities.header}`}>Activities</h1>
                <div className={`${activities.buttonContainer}`}>
                    <button
                        id="addActivityButton"
                        className={`button is-medium is-primary ${activities.addActivityButton}`}
                        onClick={() => setIsNewModalOpen(true)}>add Activity</button>
                </div>
                <div className={`${activities.cardsContainer}`}>
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