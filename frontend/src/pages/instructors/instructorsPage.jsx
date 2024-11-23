import React, {useState} from "react";
import classes from "./instructorsPage.module.css";
import InstructorCard from "../../components/instructor/instructorCard/instructorCard";
import AuthNavBar from "../../components/navBar/navBar";
import EditInstructorModal from "../../components/instructor/editInstructorModal/editInstructor";
import NewInstructorModal from "../../components/instructor/newInstructorModal/newInstructor";

const instructorsPage = ({instructorsArray, addInstructor, updateInstructor, deleteInstructor}) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedInstructor, setSelectedInstructor] = useState(null);
    const [isNewModalOpen, setIsNewModalOpen] = useState(false);

    const sortedInstructorsArray = [...instructorsArray].sort((a, b) => a.apellido.localeCompare(b.apellido));

    return (
        <>
            <AuthNavBar navItem="instructors" />
            <div className={`${classes.content}`}>
                <h1 className={`${classes.header}`}>Instructores</h1>
                <div className={`${classes.buttonContainer}`}>
                    <button
                        id="addInstructorButton"
                        className={`button is-primary ${classes.addInstructorButton}`}
                        onClick={() => setIsNewModalOpen(true)}>Nuevo Instructor</button>
                </div>
                <div className={`${classes.cardsContainer}`}>
                    {sortedInstructorsArray.map((instructor) => {
                        return (
                            <InstructorCard
                            key={instructor.ci}
                            instructor={instructor}
                            openEditModal={() => {
                                setSelectedInstructor(instructor);
                                setIsEditModalOpen(true);
                            }}
                            />
                        );
                    })}
                </div>
            </div>
            {isEditModalOpen && (
                <EditInstructorModal
                    closeModal={() => setIsEditModalOpen(false)}
                    updateInstructor={updateInstructor}
                    deleteInstructor={deleteInstructor}
                    selectedInstructor={selectedInstructor}
                />
            )}
            {isNewModalOpen && (
                <NewInstructorModal
                    addInstructor={addInstructor}
                    closeModal={() => setIsNewModalOpen(false)}
                />
            )}
        </>
    );
};

export default instructorsPage;