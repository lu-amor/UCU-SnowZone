import React, {useState} from "react";
import classes from "./studentsPage.module.css";
import StudentCard from "../../components/student/studentCard/studentCard";
import AuthNavBarS from "../../components/navBar/navBarS";

const StudentsPageS = ({studentsArray}) => {

    return (
        <>
            <AuthNavBarS navItem="students" />
            <div className={`${classes.content}`}>
                <h1 className={`${classes.header} mb-4`}>Students</h1>
                <div className={`${classes.cardsContainer}`}>
                    {studentsArray.map((student) => {
                        return (
                            <StudentCard
                            key={student.id}
                            student={student}
                            />
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default StudentsPageS;