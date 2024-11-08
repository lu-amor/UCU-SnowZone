import React from "react";
import classes from "./instructorsPage.module.css";
import InstructorCard from "../../components/instructor/instructorCard/instructorCard";
import AuthNavBarT from "../../components/navBar/navBarT";

const InstructorsPageT = ({instructorsArray}) => {
    return (
        <>
            <AuthNavBarT navItem="instructors" />
            <div className={`${classes.content}`}>
                <h1 className={`${classes.header} mb-4`}>Instructors</h1>
                <div className={`${classes.cardsContainer}`}>
                    {instructorsArray.map((instructor) => {
                        return (
                            <InstructorCard
                            key={instructor.id}
                            instructor={instructor}
                            />
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default InstructorsPageT;