import React, {useState} from "react";
import classes from "./classesPage.module.css";
import ClassCard from "../../components/class/classCard/classCard";
import AuthNavBarT from "../../components/navBar/navBarT";
import EditClassTeacherModal from "../../components/class/editClassModal/editClassTeacher";

const classesPageTeacher = ({classesArray, updateClass}) => {
    const [selectedClass, setSelectedClass] = useState(null);

    return (
        <>
            <AuthNavBarT navItem="classes" />
            <div className={`${classes.content}`}>
                <h1 className={`${classes.header} mb-5`}>Clases</h1>
                <div className={`${classes.cardsContainer}`}>
                    {classesArray.map((clase) => {
                        return (
                            <ClassCard
                            key={clase.id}
                            clase={clase}
                            updateClass={updateClass}
                            />
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default classesPageTeacher;