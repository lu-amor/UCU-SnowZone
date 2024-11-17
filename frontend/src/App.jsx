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

  useEffect(() => {
    fetchStudents()
  }, []);
  const fetchStudents = async () => {
    const response = await fetch("http://127.0.0.1:5000/students")
    const data = await response.json()
    setStudentsArray(data.students)
  };

  const classesArray = [
    {id: 1, activity: "Actividad 1", from: "09:00", to: "11:00", instructor: 'instructor 1', taught: false, grupal: true, students: ['student 1', 'student 2']},
    {id: 2, activity: "Actividad 2", from: "13:00", to: "15:00", instructor: 'instructor 2', taught: true, grupal: true, students: ['student 1', 'student 2']},
    {id: 3, activity: "Actividad 3", from: "15:00", to: "17:00", instructor: 'instructor 3', taught: false, grupal: false, students: ['student 1']},
  ];

  const activitiesArray = [
    {id: 1, name: "Actividad 1", cost: 25},
    {id: 2, name: "Actividad 2", cost: 50},
    {id: 3, name: "Actividad 3", cost: 100},
  ];

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

        <Route path="/classes" element={<ClassesPage classesArray={classesArray} instructors={instructorsArray} shifts={shiftsArray} students={studentsArray} activities={activitiesArray}/>}></Route>
        <Route path="/classesT" element={<ClassesPageTeacher classesArray={classesArray} instructors={instructorsArray} shifts={shiftsArray} students={studentsArray}/>}></Route>
        <Route path="/classesS" element={<ClassesPageStudents classesArray={classesArray}/>}></Route>

        <Route path="/activities" element={<ActivitiesPage activitiesArray={activitiesArray}/>}></Route>
        <Route path="/activitiesT" element={<ActivitiesPageT activitiesArray={activitiesArray}/>}></Route>
        <Route path="/activitiesS" element={<ActivitiesPageS activitiesArray={activitiesArray}/>}></Route>

        <Route path="/students" element={<StudentsPage studentsArray={studentsArray}/>}></Route>
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

export default App