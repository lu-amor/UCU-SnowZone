import React, {useState} from "react";
import classes from "./classesPage.module.css";
import ClassCardTeacher from "../../components/class/classCard/classCardTeacher";
import AuthNavBarT from "../../components/navBar/navBarT";

const classesPageTeacher = ({classesArray, instructors, shifts, studentsArray, updateClass}) => {
    const [classList, setClassList] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedClass, setSelectedClass] = useState(null);

    return (
        <>
            <AuthNavBarT navItem="classes" />
            <div className={`${classes.content}`}>
                <h1 className={`${classes.header} mb-5`}>Classes</h1>
                <div className={`${classes.cardsContainer}`}>
                    {classesArray.map((clase) => {
                        return (
                            <ClassCardTeacher
                            key={clase.id}
                            clase={clase}
                            updateClass={updateClass}
                            openEditModal={() => {
                                setSelectedClass(clase);
                            }}
                            />
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default classesPageTeacher;