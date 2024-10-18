import './App.css'
import Home from './pages/home/home'
import AuthPage from './pages/auth/auth'
import ClassesPage from './pages/classes/classesPage'
import ActivitiesPage from './pages/activities/activitiesPage'
import StudentsPage from './pages/students/studentsPage'
import InstructorsPage from './pages/instructors/instructorsPage'
import ShiftsPage from './pages/shifts/shiftsPage'
import ReportsPage from './pages/reports/reportsPage'
import { Routes, Route, Navigate } from 'react-router-dom'

function App() {
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

  const studentsArray = [
    {id: 1, name: "Estudiante 1", surname: 'Surname 1', birthdate: '21-05-2004', phone: '111222333', email: 'student1@mail.com'},
    {id: 2, name: "Estudiante 2", surname: 'Surname 2', birthdate: '22-05-2004', phone: '111222333', email: 'student2@mail.com'},
    {id: 3, name: "Estudiante 3", surname: 'Surname 3', birthdate: '23-05-2004', phone: '111222333', email: 'student3@mail.com'},
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
      
        <Route path="/login" element={<AuthPage />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/classes" element={<ClassesPage classesArray={classesArray} instructors={instructorsArray} shifts={shiftsArray} students={studentsArray} activities={activitiesArray}/>}></Route>
        <Route path="/activities" element={<ActivitiesPage activitiesArray={activitiesArray}/>}></Route>
        <Route path="/students" element={<StudentsPage studentsArray={studentsArray}/>}></Route>
        <Route path="/instructors" element={<InstructorsPage instructorsArray={instructorsArray}/>}></Route>
        <Route path="/shifts" element={<ShiftsPage shiftsArray={shiftsArray}/>}></Route>
        <Route path="/reports" element={<ReportsPage reportsArray={reportsArray}/>}></Route>
    </Routes>
  )
}

export default App
