import React, {useState} from "react";
import classes from "./classesPage.module.css";
import ClassCard from "../../components/class/classCard/classCard";
import AuthNavBar from "../../components/navBar/navBar";
import EditClassModal from "../../components/class/editClassModal/editClass";
import NewClassModal from "../../components/class/newClassModal/newClass";

const classesPage = ({classesArray, instructors, shifts, activities, studentsArray, addClass, updateClass, deleteClass}) => {
    const [classList, setClassList] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedClass, setSelectedClass] = useState(null);
    const [isNewModalOpen, setIsNewModalOpen] = useState(false);

    return (
        <>
            <AuthNavBar navItem="classes" />
            <div className={`${classes.content}`}>
                <h1 className={`${classes.header}`}>Classes</h1>
                <div className={`${classes.buttonContainer}`}>
                    <button
                        id="addClassButton"
                        className={`button is-primary ${classes.addClassButton}`}
                        onClick={() => setIsNewModalOpen(true)}>add Class</button>
                </div>
                <div className={`${classes.cardsContainer}`}>
                    {classesArray.map((clase) => {
                        return (
                            <ClassCard
                            key={clase.id}
                            clase={clase}
                            deleteClass={deleteClass}
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
                <EditClassModal
                    closeModal={() => setIsEditModalOpen(false)}
                    updateClass={updateClass}
                    selectedClass={selectedClass}
                    instructors={instructors}
                    shifts={shifts}
                    studentsArray={studentsArray}
                />
            )}
            {isNewModalOpen && (
                <NewClassModal
                    closeModal={() => setIsNewModalOpen(false)}
                    addClass={addClass}
                    instructors={instructors}
                    shifts={shifts}
                    studentsArray={studentsArray}
                    activities={activities}
                />
            )}
        </>
    );
};

export default classesPage;