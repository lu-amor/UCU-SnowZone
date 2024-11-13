import React, { useState, useEffect } from 'react';
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

function App() {
  const urlActivities = "http://localhost:5000/api/activities";
  const urlClasses = "http://localhost:5000/api/classes";
  const urlStudents = "http://localhost:5000/api/students";
  const urlInstructors = "http://localhost:5000/api/instructors";
  const urlShifts = "http://localhost:5000/api/shifts";
  const urlReports = "http://localhost:5000/api/reports";
  const [activitiesArray, setActivitiesArray] = useState([]);
  const [classesArray, setClassesArray] = useState([]);
  const [studentsArray, setStudentsArray] = useState([]);
  const [instructorsArray, setInstructorsArray] = useState([]);
  const [shiftsArray, setShiftsArray] = useState([]);
  let [reportsArray, setReportsArray] = useState([]);

  const fetchDataAsync = async (url) => {
    try {
      const response = await fetch(url, { method: "GET" });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error to obtain data:", error.message);
    }
  };

  const addDataAsync = async ({url, item}) => {
    try {
      const response = await axios.post(url, 
        item,
        { withCredentials: true }
      );
      console.log(response.data.message);
    } catch (error) {
      console.error("Error to add data:", error.message);
    }
  };

  const updateDataAsync = async ({url, updatedItem}) => {
    try {
      const response = await fetch(`${url}/${updatedItem.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedItem),
      }
      );
      console.log(response.data.message);
    } catch (error) {
      console.error("Error to update data:", error.message);
    }
  };

  const deleteDataAsync = async ({url, item}) => {
    try {
      await fetch(`${url}/${item.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error to delete data:", error.message);
    }
  };

  const addActivity = async (activity) => {
    const newActivityWithId = await addDataAsync({ url: urlActivities, item: activity });
    setActivitiesArray([...activitiesArray, newActivityWithId]);
  };

  const updateActivity = (updatedActivity) => {
    updateDataAsync({ url: urlActivities, updatedItem: updatedActivity });
    setActivitiesArray([
      ...activitiesArray.map((activity) =>
        activity.id === updatedActivity.id ? updatedActivity : activity
      ),
    ]);
  };

  const deleteActivity = (activity) => {
    deleteDataAsync({ url: urlActivities, item: activity }).then(() => {
      setActivitiesArray(activitiesArray.filter((act) => act.id !== activity.id));
    });
  };

  const addClass = async (newClass) => {
    const newClassWithId = await addDataAsync({ url: urlClasses, item: newClass });
    setClassesArray([...classesArray, newClassWithId]);
  }

  const updateClass = (updatedClass) => {
    updateDataAsync({ url: urlClasses, updatedItem: updatedClass });
    setClassesArray([
      ...classesArray.map((classItem) =>
        classItem.id === updatedClass.id ? updatedClass : classItem
      ),
    ]);
  }

  const deleteClass = (classItem) => {
    deleteDataAsync({ url: urlClasses, item: classItem }).then(() => {
      setClassesArray([classesArray.filter((classItem) => classItem.id !== classItem.id)]);
    });
  }

  const addStudent = async (student) => {
    const newStudentWithId = await addDataAsync({ url: urlStudents, item: student });
    setStudentsArray([...studentsArray, newStudentWithId]);
  }

  const updateStudent = (updatedStudent) => {
    updateDataAsync({ url: urlStudents, updatedItem: updatedStudent });
    setStudentsArray([
      ...studentsArray.map((student) =>
        student.id === updatedStudent.id ? updatedStudent : student
      ),
    ]);
  }

  const deleteStudent = (student) => {
    deleteDataAsync({ url: urlStudents, item: student }).then(() => {
      setStudentsArray([studentsArray.filter((student) => student.id !== student.id)]);
    });
  }

  const addInstructor = async (instructor) => {
    const newInstructorWithId = await addDataAsync({ url: urlInstructors, item: instructor });
    setInstructorsArray([...instructorsArray, newInstructorWithId]);
  }

  const updateInstructor = (updatedInstructor) => {
    updateDataAsync({ url: urlInstructors, updatedItem: updatedInstructor });
    setInstructorsArray([
      ...instructorsArray.map((instructor) =>
        instructor.id === updatedInstructor.id ? updatedInstructor : instructor
      ),
    ]);
  }

  const deleteInstructor = (instructor) => {
    deleteDataAsync({ url: urlInstructors, item: instructor }).then(() => {
      setInstructorsArray([...instructorsArray.filter((instructor) => instructor.id !== instructor.id)]);
    });
  }

  const addShift = async (shift) => {
    const newShiftWithId = await addDataAsync({ url: urlShifts, item: shift });
    setShiftsArray([...shiftsArray, newShiftWithId]);
  }

  const updateShift = (updatedShift) => {
    updateDataAsync({ url: urlShifts, updatedItem: updatedShift });
    setShiftsArray([
      ...shiftsArray.map((shift) =>
        shift.id === updatedShift.id ? updatedShift : shift
      ),
    ]);
  }

  const deleteShift = (shift) => {
    deleteDataAsync({ url: urlShifts, item: shift }).then(() => {
      setShiftsArray([...shiftsArray.filter((shift) => shift.id !== shift.id)]);
    });
  }

  useEffect(() => {
    let activitiesPromise = fetchDataAsync(urlActivities);
/*     let classesPromise = fetchDataAsync(urlClasses); */
    let studentsPromise = fetchDataAsync(urlStudents);
    let instructorsPromise = fetchDataAsync(urlInstructors);
/*     let shiftsPromise = fetchDataAsync(urlShifts);
    let reportsPromise = fetchDataAsync(urlReports); */

/*     activitiesPromise.then((data) => {
      setActivitiesArray([...data]);
    });
/*     classesPromise.then((data) => {
      setClassesArray([...data]);
    }); *//*
    studentsPromise.then((data) => {
      setStudentsArray([...data]);
    });
    instructorsPromise.then((data) => {
      setInstructorsArray([...data]);
    }); */
/*     shiftsPromise.then((data) => {
      setShiftsArray([...data]);
    });
    reportsPromise.then((data) => {
      setReportsArray([...data]);
    }); */
  }, []);

  reportsArray = [
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

  console.log(activitiesArray);

  return (
    <Routes>
      <Route path="/*" element={<Navigate replace to="/login" />} />
      
        <Route path="/login" element={<AuthPage />}></Route>
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

export default App;
