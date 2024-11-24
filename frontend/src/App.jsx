import { useState, useEffect } from 'react'
import './App.css'
import Home from './pages/home/home'
import HomeTeacher from './pages/home/homeTeacher'
import HomeStudent from './pages/home/homeStudent'
import AuthPage from './pages/auth/auth'

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
import EquipmentPage from './pages/equipment/equipmentPage'

function App() {
  const [studentsArray, setStudentsArray] = useState([]);
  const [activitiesArray, setActivitiesArray] = useState([]);
  const [classesArray, setClassesArray] = useState([]);
  const [shiftsArray, setShiftsArray] = useState([]);
  const [instructorsArray, setInstructorsArray] = useState([]);
  const [reportsArray, setReportsArray] = useState([]);
  const [equipmentArray, setEquipmentArray] = useState([]);

  useEffect(() => {
    fetchStudents()
    fetchActivities()
    fetchClasses()
    fetchShifts()
    fetchInstructors()
    fetchEquipment()
    fetchReports()
  }, []);

  /* -------------------------- Funciones alumnos ------------------------------------*/

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

  async function updateStudentAW ( student ) {
    try {
      await fetch(`http://127.0.0.1:5000/students/${ student.ci }`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify( student ),
      });
    } catch (error) {
      console.error("Error updating data: ", error);
    }
  }

  const updateStudent = (student) => {
    updateStudentAW( student ).then(() => {
      setStudentsArray([
      ...studentsArray.map((currentStudent) =>
        currentStudent.ci === student.ci ? student : currentStudent
      ),
    ])});
  };

  async function deleteStudentAW( student ) {
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

  /* -------------------------- Funciones Turnos ------------------------------------*/
  const fetchShifts = async () => {
    const response = await fetch("http://127.0.0.1:5000/shifts")
    const data = await response.json()
    setShiftsArray(data.shifts)
  };

  async function postShiftAW ( shift ) {
    try {
      const response = await fetch("http://127.0.0.1:5000/shifts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify( shift ),
      });

      const newShift = await response.json();
      return newShift; 
    } catch (error) {
      console.log("Error posting data: ", error);
    }
  }

  const addShift = async (hora_inicio, hora_fin) => {
    const existingShift = shiftsArray.find(
      (shift) => shift.hora_inicio === hora_inicio && shift.hora_fin === hora_fin
    );

    if (existingShift) {
      alert("Shift with the same start and end time already exists.");
      return;
    }

    const newShift = {
      hora_inicio: hora_inicio,
      hora_fin: hora_fin,
    };
    const shift = await postShiftAW(newShift);
    setShiftsArray([...shiftsArray, shift]);
  };

  async function updateShiftAW ( shift ) {
    try {
      await fetch(`http://127.0.0.1:5000/shifts/${ shift.id }`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify( shift ),
      });
    } catch (error) {
      console.error("Error updating data: ", error);
    }
  }

  const updateShift = (shift) => {
    updateShiftAW( shift ).then(() => {
      setShiftsArray([
      ...shiftsArray.map((currentShift) =>
        currentShift.id === shift.id ? shift : currentShift
      ),
    ])});
  };

  async function deleteShiftAW( shift ) {
    try {
      await fetch(`http://127.0.0.1:5000/shifts/${ shift.id }`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error deleting data: ", error);
    }
  }

  const deleteShift = (shift) => {
    deleteShiftAW( shift ).then(() => {
      setShiftsArray([
      ...shiftsArray.filter((currentShift) => currentShift.id !== shift.id),
    ])});
  };
  
  /* -------------------------- Funciones actividades ------------------------------------*/
  const fetchActivities = async () => {
    const response = await fetch("http://127.0.0.1:5000/activities")
    const data = await response.json()
    setActivitiesArray(data.activities)
  };

  async function postActivityAW ( newActivity ) {
    try {
      const response = await fetch("http://127.0.0.1:5000/activities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify( newActivity ),
      });
      const newPostedActivity = await response.json();
      return newPostedActivity;
    } catch (error) {
      console.log("Error posting data: ", error);
    }
  }

  const addActivity = async (descripcion, costo, min_edad) => {
    const newActivity = {
      descripcion: descripcion,
      costo: costo,
      min_edad: min_edad
    };
    const activity = await postActivityAW(newActivity);
    setActivitiesArray([...activitiesArray, activity]);
  };

  async function updateActivityAW ( activity ) {
    try {
      await fetch(`http://127.0.0.1:5000/activities/${ activity.id }`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify( activity ),
      });
    } catch (error) {
      console.error("Error updating data: ", error);
    }
  }

  const updateActivity = (activity) => {
    updateActivityAW( activity ).then(() => {
      setActivitiesArray([
      ...activitiesArray.map((currentActivity) =>
        currentActivity.id === activity.id ? activity : currentActivity
      ),
    ])});
  };

  async function deleteActivityAW( activity ) {
    try {
      await fetch(`http://127.0.0.1:5000/activities/${ activity.id }`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error deleting data: ", error);
    }
  }

  const deleteActivity = (activity) => {
    deleteActivityAW( activity ).then(() => {
      setActivitiesArray([
      ...activitiesArray.filter((currentActivity) => currentActivity.id !== activity.id),
    ])});
  };

  /* -------------------------- Funciones clases ------------------------------------*/

  const fetchClasses = async () => {
    const response = await fetch("http://127.0.0.1:5000/classes")
    const data = await response.json()
    setClassesArray(data.clases)
  };

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

  /* -------------------------- Funciones instructores ------------------------------------*/

  const fetchInstructors = async () => {
    const response = await fetch("http://127.0.0.1:5000/instructors")
    const data = await response.json()
    setInstructorsArray(data.instructors)
  };

  async function postInstructorAW ( instructor ) {
    try {
      const response = await fetch("http://127.0.0.1:5000/instructors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify( instructor ),
      });

      const newInstructor = await response.json();
      return newInstructor; 
    } catch (error) {
      console.log("Error posting data: ", error);
    }
  }

  const addInstructor = async (ci, nombre, apellido, f_nac, mail, tel ) => {
    const newInstructor = {
      ci: ci,
      nombre: nombre,
      apellido: apellido,
      f_nac: f_nac,
      mail: mail,
      tel: tel
    };
    const instructor = await postInstructorAW(newInstructor);
    setStudentsArray([...instructorsArray, instructor]);
  };

  async function updateInstructorAW ( instructor ) {
    try {
      await fetch(`http://127.0.0.1:5000/students/${ instructor.ci }`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify( instructor ),
      });
    } catch (error) {
      console.error("Error updating data: ", error);
    }
  }

  const updateInstructor = (instructor) => {
    updateInstructorAW( instructor ).then(() => {
      setInstructorsArray([
      ...instructorsArray.map((currentInstructor) =>
        currentInstructor.ci === instructor.ci ? instructor : currentInstructor
      ),
    ])});
  };

  async function deleteInstructorAW( instructor ) {
    try {
      await fetch(`http://127.0.0.1:5000/instructors/${ instructor.ci }`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error deleting data: ", error);
    }
  }

  const deleteInstructor = (instructor) => {
    deleteInstructorAW( instructor ).then(() => {
      setInstructorsArray([
      ...instructorsArray.filter((currentInstructor) => currentInstructor.ci !== instructor.ci),
    ])});
  };

  /* -------------------------- Funciones equipamiento ------------------------------------*/
  const fetchEquipment = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/equipamiento");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setEquipmentArray(data.equipment);
    } catch (error) {
      console.error("Error fetching equipment: ", error);
    }
  };

  async function postEquipmentAW ( equipment ) {
    try {
      const response = await fetch("http://127.0.0.1:5000/equipamiento", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify( equipment ),
      });

      const newEquipment = await response.json();
      return newEquipment; 
    } catch (error) {
      console.log("Error posting data: ", error);
    }
  }

  const addEquipment = async ( id_actividad, descripcion, tamanio, costo, cant_disponibles ) => {
    const newEquipment = {
      id_actividad: id_actividad,
      descripcion: descripcion,
      tamanio: tamanio,
      costo: costo,
      cant_disponibles: cant_disponibles
    };
    console.log(newEquipment);
    const equipment = await postEquipmentAW(newEquipment);
    setEquipmentArray([...equipmentArray, equipment]);
  };

  async function updateEquipmentAW ( equipment ) {
    try {
      await fetch(`http://127.0.0.1:5000/equipamiento/${ equipment.id }`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify( equipment ),
      });
    } catch (error) {
      console.error("Error updating data: ", error);
    }
  }

  const updateEquipment = (equipment) => {
    updateEquipmentAW( equipment ).then(() => {
      setEquipmentArray([
      ...equipmentArray.map((currentEquipment) =>
        currentEquipment.id === equipment.id ? equipment : currentEquipment
      ),
    ])});
  };

  async function deleteEquipmentAW( equipment ) {
    try {
      await fetch(`http://127.0.0.1:5000/equipamiento/${ equipment.id }`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error deleting data: ", error);
    }
  }

  const deleteEquipment = (equipment) => {
    deleteEquipmentAW( equipment ).then(() => {
      setEquipmentArray([
      ...equipmentArray.filter((currentEquipment) => currentEquipment.id !== equipment.id),
    ])});
  };

  /* -------------------------- Funciones reportes ------------------------------------*/
  const fetchReports = async () => {
    try {
      const responseReport1 = await fetch("http://127.0.0.1:5000/reports/incomePerActivity");
      const dataReport1 = await responseReport1.json();
  
      const responseReport2 = await fetch("http://127.0.0.1:5000/reports/studentsPerActivity");
      const dataReport2 = await responseReport2.json();
  
      const responseReport3 = await fetch("http://127.0.0.1:5000/reports/classesPerShift");
      const dataReport3 = await responseReport3.json();
  
      setReportsArray([dataReport1.report, dataReport2.report, dataReport3.report]);
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };  

  return (
    <Routes>
      <Route path="/*" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<AuthPage />}></Route>

        <Route path="/home" element={<Home />}></Route>
        <Route path="/homeTeacher" element={<HomeTeacher />}></Route>
        <Route path="/homeStudent" element={<HomeStudent />}></Route>

        <Route path="/classes" element={<ClassesPage classesArray={classesArray} activities={activitiesArray} instructors={instructorsArray} shifts={shiftsArray} students={studentsArray} addClass={addClass}/>}></Route>
        <Route path="/classesT" element={<ClassesPageTeacher classesArray={classesArray} instructors={instructorsArray} shifts={shiftsArray} students={studentsArray}/>}></Route>
        <Route path="/classesS" element={<ClassesPageStudents classesArray={classesArray}/>}></Route>

        <Route path="/activities" element={<ActivitiesPage activitiesArray={activitiesArray} addActivity={addActivity} updateActivity={updateActivity} deleteActivity={deleteActivity}/>}></Route>
        <Route path="/activitiesT" element={<ActivitiesPageT activitiesArray={activitiesArray}/>}></Route>
        <Route path="/activitiesS" element={<ActivitiesPageS activitiesArray={activitiesArray}/>}></Route>

        <Route path="/students" element={<StudentsPage studentsArray={studentsArray} addStudent={addStudent} deleteStudent={deleteStudent} updateStudent={updateStudent}/>}></Route>
        <Route path="/studentsT" element={<StudentsPageT studentsArray={studentsArray}/>}></Route>
        <Route path="/studentsS" element={<StudentsPageS studentsArray={studentsArray}/>}></Route>

        <Route path="/instructors" element={<InstructorsPage instructorsArray={instructorsArray} addInstructor={addInstructor} updateInstructor={updateInstructor} deleteInstructor={deleteInstructor}/>}></Route>
        <Route path="/instructorsT" element={<InstructorsPageT instructorsArray={instructorsArray}/>}></Route>
        <Route path="/instructorsS" element={<InstructorsPageS instructorsArray={instructorsArray}/>}></Route>

        <Route path="/shifts" element={<ShiftsPage shiftsArray={shiftsArray} addShift={addShift} updateShift={updateShift} deleteShift={deleteShift}/>}></Route>
        <Route path="/shiftsT" element={<ShiftsPageT shiftsArray={shiftsArray}/>}></Route>
        <Route path="/shiftsS" element={<ShiftsPageS shiftsArray={shiftsArray}/>}></Route>

        <Route path="/reports" element={<ReportsPage reportsArray={reportsArray}/>}></Route>
        <Route path="/equipment" element={<EquipmentPage equipmentArray={equipmentArray} actividades={activitiesArray} addEquipment={addEquipment} updateEquipment={updateEquipment} deleteEquipment={deleteEquipment}/>}></Route>
    </Routes>
  )
};

export default App;