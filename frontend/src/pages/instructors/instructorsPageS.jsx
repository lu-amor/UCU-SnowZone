import React, {useState} from "react";
import classes from "./instructorsPage.module.css";
import InstructorCard from "../../components/instructor/instructorCard/instructorCard";
import AuthNavBarS from "../../components/navBar/navBarS";

const InstructorsPageS = ({instructorsArray}) => {
    return (
        <>
            <AuthNavBarS navItem="instructors" />
            <div className={`${classes.content}`}>
                <h1 className={`${classes.header} mb-4`}>Instructores</h1>
                <div className={`${classes.cardsContainer}`}>
                    {instructorsArray.map((instructor) => {
                        return (
                            <InstructorCard
                            key={instructor.ci}
                            instructor={instructor}
                            />
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default InstructorsPageS;