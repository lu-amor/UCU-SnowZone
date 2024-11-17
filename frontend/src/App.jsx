import React, {useState, useEffect} from 'react'
import './App.css'
import Home from './pages/home/home'
import HomeTeacher from './pages/home/homeTeacher'
import HomeStudent from './pages/home/homeStudent'
import AuthPage from './pages/auth/auth'
import ForgotPasswordForm from './pages/auth/ForgotPasswordForm';
import ResetPasswordForm from './pages/auth/ResetPasswordForm';

import ClassesPage from './pages/classes/classesPage'
import ClassesPageTeacher from './pages/classes/classesPageTeacher'
import ClassesPageStudents from './pages/classes/classesPageStudent'

import ActivitiesPage from './pages/activities/activitiesPage'
import ActivitiesPageT from './pages/activities/activitiesPageT'
import ActivitiesPageS from './pages/activities/activitiesPageS'

import StudentsPage from './pages/students/studentsPage'
import StudentsPageS from './pages/students/studentsPageS'
import StudentsPageT from './pages/students/studentsPageT'

import InstructorsPage from './pages/instructors/instructorsPage'
import InstructorsPageT from './pages/instructors/instructorsPageT'
import InstructorsPageS from './pages/instructors/instructorsPageS'

import ShiftsPage from './pages/shifts/shiftsPage'
import ShiftsPageT from './pages/shifts/shiftsPageT'
import ShiftsPageS from './pages/shifts/shiftsPageS'

import ReportsPage from './pages/reports/reportsPage'
import { Routes, Route, Navigate } from 'react-router-dom'
import StudentList from './StudentList'

function App() {
  const [studentsArray, setStudentsArray] = useState([]);
  const [activitiesArray, setActivitiesArray] = useState([]);
  const [classesArray, setClassesArray] = useState([]);

  useEffect(() => {
    fetchStudents()
    fetchActivities()
    // fetchClasses()
  }, []);

  const fetchStudents = async () => {
    const response = await fetch("http://127.0.0.1:5000/students")
    const data = await response.json()
    setStudentsArray(data.students)
  };

  async function postStudentAW ( student ) {
    try {
      const response = await fetch("http://127.0.0.1:5000/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify( student ),
      });

      const newStudent = await response.json();
      return newStudent; 
    } catch (error) {
      console.log("Error posting data: ", error);
    }
  }

  const addStudent = async (ci, nombre, apellido, f_nac, mail, tel ) => {
    const newStudent = {
      ci: ci,
      nombre: nombre,
      apellido: apellido,
      f_nac: f_nac,
      mail: mail,
      tel: tel
    };
    const student = await postStudentAW(newStudent);
    setStudentsArray([...studentsArray, student]);
  };

  async function deleteStudentAW( student ) {
    console.log("Deleting student: ", student);
    try {
      await fetch(`http://127.0.0.1:5000/students/${ student.ci }`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error deleting data: ", error);
    }
  }

  const deleteStudent = (student) => {
    deleteStudentAW( student ).then(() => {
      setStudentsArray([
      ...studentsArray.filter((currentStudent) => currentStudent.ci !== student.ci),
    ])});
  };

  const fetchActivities = async () => {
    const response = await fetch("http://127.0.0.1:5000/activities")
    const data = await response.json()
    setActivitiesArray(data.activities)
  };

/*   const fetchClasses = async () => {
    const response = await fetch("http://127.0.0.1:5000/classes")
    const data = await response.json()
    setClassesArray(data.classes)
  }; */

  async function postClassAW ( newClass ) {
    try {
      const response = await fetch("http://127.0.0.1:5000/classes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify( newClass ),
      });

      const newPostedClass = await response.json();
      return newPostedClass; 
    } catch (error) {
      console.log("Error posting data: ", error);
    }
  }

  const addClass = async (profesor, actividad, turno ) => {
    const newClass = {
      profesor: profesor,
      actividad: actividad,
      turno: turno
    };
    const clase = await postClassAW(newClass);
    setClassesArray([...classesArray, clase]);
  };


  const instructorsArray = [  
    {id: 1, name: "Instructor 1", surname: 'Surname 1', birthdate: '21-05-2004', phone: '111222333', email: 'instructor1@mail.com'},
    {id: 2, name: "Instructor 2", surname: 'Surname 2', birthdate: '22-05-2004', phone: '111222333', email: 'instructor2@mail.com'},
    {id: 3, name: "Instructor 3", surname: 'Surname 3', birthdate: '23-05-2004', phone: '111222333', email: 'instructor3@mail.com'},
  ];

  const shiftsArray = [
    {id: 1, from: "09:00", to: "11:00"},
    {id: 2, from: "11:00", to: "13:00"},
    {id: 3, from: "15:00", to: "17:00"},
  ];

  const reportsArray = [
    {
      type: "Income per activity",
      data: [
        { activity: "Actividad 1", income: 250 },
        { activity: "Actividad 2", income: 500 },
        { activity: "Actividad 3", income: 1000 }
      ]
    },
    {
      type: "Students per activity",
      data: [
        { activity: "Actividad 1", students: 30 },
        { activity: "Actividad 2", students: 45 },
        { activity: "Actividad 3", students: 20 }
      ]
    },
    {
      type: "Classes per shift",
      data: [
        { shift: "09:00 - 11:00", classes: 5 },
        { shift: "11:00 - 13:00", classes: 7 },
        { shift: "15:00 - 17:00", classes: 3 }
      ]
    }
  ];

  return (
    <Routes>
      <Route path="/*" element={<Navigate replace to="/login" />} />
{/*         <Route path="/hola" element={<StudentList students={students}/>} />
 */}        <Route path="/login" element={<AuthPage />}></Route>
        <Route path="/forgot-password" element={<ForgotPasswordForm />} />
        <Route path="/reset-password" element={<ResetPasswordForm />} />

        <Route path="/home" element={<Home />}></Route>
        <Route path="/homeTeacher" element={<HomeTeacher />}></Route>
        <Route path="/homeStudent" element={<HomeStudent />}></Route>

        <Route path="/classes" element={<ClassesPage classesArray={classesArray} activities={activitiesArray} instructors={instructorsArray} shifts={shiftsArray} students={studentsArray} addClass={addClass}/>}></Route>
        <Route path="/classesT" element={<ClassesPageTeacher classesArray={classesArray} instructors={instructorsArray} shifts={shiftsArray} students={studentsArray}/>}></Route>
        <Route path="/classesS" element={<ClassesPageStudents classesArray={classesArray}/>}></Route>

        <Route path="/activities" element={<ActivitiesPage activitiesArray={activitiesArray}/>}></Route>
        <Route path="/activitiesT" element={<ActivitiesPageT activitiesArray={activitiesArray}/>}></Route>
        <Route path="/activitiesS" element={<ActivitiesPageS activitiesArray={activitiesArray}/>}></Route>

        <Route path="/students" element={<StudentsPage studentsArray={studentsArray} addStudent={addStudent} deleteStudent={deleteStudent}/>}></Route>
        <Route path="/studentsT" element={<StudentsPageT studentsArray={studentsArray}/>}></Route>
        <Route path="/studentsS" element={<StudentsPageS studentsArray={studentsArray}/>}></Route>

        <Route path="/instructors" element={<InstructorsPage instructorsArray={instructorsArray}/>}></Route>
        <Route path="/instructorsT" element={<InstructorsPageT instructorsArray={instructorsArray}/>}></Route>
        <Route path="/instructorsS" element={<InstructorsPageS instructorsArray={instructorsArray}/>}></Route>

        <Route path="/shifts" element={<ShiftsPage shiftsArray={shiftsArray}/>}></Route>
        <Route path="/shiftsT" element={<ShiftsPageT shiftsArray={shiftsArray}/>}></Route>
        <Route path="/shiftsS" element={<ShiftsPageS shiftsArray={shiftsArray}/>}></Route>

        <Route path="/reports" element={<ReportsPage reportsArray={reportsArray}/>}></Route>

    </Routes>
  )
}

export default App;
