import React, {useState} from "react";
import classes from "./studentsPage.module.css";
import StudentCard from "../../components/student/studentCard/studentCard";
import AuthNavBar from "../../components/navBar/navBar";
import EditStudentModal from "../../components/student/editStudentModal/editStudent";
import NewStudentModal from "../../components/student/newStudentModal/newStudent";

const studentsPage = ({studentsArray, addStudent, updateStudent, deleteStudent}) => {
    const [studentList, setStudentList] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [isNewModalOpen, setIsNewModalOpen] = useState(false);

    return (
        <>
            <AuthNavBar navItem="students" />
            <div className={`${classes.content}`}>
                <h1 className={`${classes.header}`}>Students</h1>
                <div className={`${classes.buttonContainer}`}>
                    <button
                        id="addStudentButton"
                        className={`button is-medium is-primary ${classes.addStudentButton}`}
                        onClick={() => setIsNewModalOpen(true)}>add Student</button>
                </div>
                <div className={`${classes.cardsContainer}`}>
                    {studentsArray.map((student) => {
                        return (
                            <StudentCard
                            key={student.id}
                            student={student}
                            deleteStudent={deleteStudent}
                            updateStudent={updateStudent}
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
                    updateStudent={updateStudent}
                    selectedStudent={selectedStudent}
                />
            )}
            {isNewModalOpen && (
                <NewStudentModal
                    closeModal={() => setIsNewModalOpen(false)}
                />
            )}
        </>
    );
};

export default studentsPage;