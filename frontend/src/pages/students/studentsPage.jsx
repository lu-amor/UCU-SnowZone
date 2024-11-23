/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, {useState} from "react";
import classes from "./studentsPage.module.css";
import StudentCard from "../../components/student/studentCard/studentCard";
import AuthNavBar from "../../components/navBar/navBar";
import EditStudentModal from "../../components/student/editStudentModal/editStudent";
import NewStudentModal from "../../components/student/newStudentModal/newStudent";

const studentsPage = ({studentsArray, addStudent, updateStudent, deleteStudent}) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [isNewModalOpen, setIsNewModalOpen] = useState(false);

    const sortedStudentsArray = [...studentsArray].sort((a, b) => a.apellido.localeCompare(b.apellido));

    return (
        <>
            <AuthNavBar navItem="students" />
            <div className={`${classes.content}`}>
                <h1 className={`${classes.header}`}>Students</h1>
                <div className={`${classes.buttonContainer}`}>
                    <button
                        id="addStudentButton"
                        className={`button is-primary ${classes.addStudentButton}`}
                        onClick={() => setIsNewModalOpen(true)}>add Student
                    </button>
                </div>
                <div className={`${classes.cardsContainer}`}>
                    {sortedStudentsArray.map((student) => {
                        return (
                            <StudentCard
                                key={student.ci}
                                student={student}
                                openEditModal={() => {
                                    setSelectedStudent(student);
                                    setIsEditModalOpen(true);
                                }}
                            />
                        );
                    })}
                </div>
            </div>
            {isEditModalOpen && (
                <EditStudentModal
                    closeModal={() => setIsEditModalOpen(false)}
                    deleteStudent={deleteStudent}
                    updateStudent={updateStudent}
                    selectedStudent={selectedStudent}
                />
            )}
            {isNewModalOpen && (
                <NewStudentModal
                    addStudent={addStudent}
                    closeModal={() => setIsNewModalOpen(false)}
                />
            )}
        </>
    );
};

export default studentsPage;