import React, {useState} from "react";
import classes from "./classesPage.module.css";
import ClassCard from "../../components/class/classCard/classCard";
import AuthNavBarT from "../../components/navBar/navBarT";
import EditClassTeacherModal from "../../components/class/editClassModal/editClassTeacher";

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
                            <ClassCard
                            key={clase.id}
                            clase={clase}
                            updateClass={updateClass}
                            openEditModal={() => {
                                setSelectedClass(clase);
                                setIsEditModalOpen(true);
                            }}
                            />
                        );
                    })}
                </div>
            </div>
            {isEditModalOpen && (
                <EditClassTeacherModal
                    closeModal={() => setIsEditModalOpen(false)}
                    updateClass={updateClass}
                    selectedClass={selectedClass}
                    instructors={instructors}
                    shifts={shifts}
                    studentsArray={studentsArray}
                />
            )}
        </>
    );
};

export default classesPageTeacher;