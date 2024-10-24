import React, {useState} from "react";
import classes from "./classesPage.module.css";
import ClassCardStudents from "../../components/class/classCard/classCardStudents";
import AuthNavBar from "../../components/navBar/navBar";

const classesPageStudents = ({classesArray}) => {
    return (
        <>
            <AuthNavBar navItem="classes" />
            <div className={`${classes.content}`}>
                <h1 className={`${classes.header} mb-5`}>Classes</h1>
                <div className={`${classes.cardsContainer}`}>
                    {classesArray.map((clase) => {
                        return (
                            <ClassCardStudents
                            key={clase.id}
                            clase={clase}
                            />
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default classesPageStudents;