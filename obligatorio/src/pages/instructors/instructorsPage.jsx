import React, {useState} from "react";
import classes from "./instructorsPage.module.css";
import InstructorCard from "../../components/instructor/instructorCard/instructorCard";
import AuthNavBar from "../../components/navBar/navBar";
import EditInstructorModal from "../../components/instructor/editInstructorModal/editInstructor";
import NewInstructorModal from "../../components/instructor/newInstructorModal/newInstructor";

const instructorsPage = ({instructorsArray, addInstructor, updateInstructor, deleteInstructor}) => {
    const [instructorList, setInstructorList] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedInstructor, setSelectedInstructor] = useState(null);
    const [isNewModalOpen, setIsNewModalOpen] = useState(false);

    return (
        <>
            <AuthNavBar navItem="instructors" />
            <div className={`${classes.content}`}>
                <h1 className={`${classes.header}`}>Instructors</h1>
                <div className={`${classes.buttonContainer}`}>
                    <button
                        id="addInstructorButton"
                        className={`button is-medium is-primary ${classes.addInstructorButton}`}
                        onClick={() => setIsNewModalOpen(true)}>add Instructor</button>
                </div>
                <div className={`${classes.cardsContainer}`}>
                    {instructorsArray.map((instructor) => {
                        return (
                            <InstructorCard
                            key={instructor.id}
                            instructor={instructor}
                            deleteInstructor={deleteInstructor}
                            updateInstructor={updateInstructor}
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
                    selectedInstructor={selectedInstructor}
                />
            )}
            {isNewModalOpen && (
                <NewInstructorModal
                    closeModal={() => setIsNewModalOpen(false)}
                />
            )}
        </>
    );
};

export default instructorsPage;