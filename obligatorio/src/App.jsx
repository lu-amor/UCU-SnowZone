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

  return (
    <Routes>
      <Route path="/*" element={<Navigate replace to="/login" />} />
      
        <Route path="/login" element={<AuthPage />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/classes" element={<ClassesPage />}></Route>
        <Route path="/activities" element={<ActivitiesPage />}></Route>
        <Route path="/students" element={<StudentsPage />}></Route>
        <Route path="/instructors" element={<InstructorsPage />}></Route>
        <Route path="/shifts" element={<ShiftsPage />}></Route>
        <Route path="/reports" element={<ReportsPage />}></Route>
    </Routes>
  )
}

export default App
