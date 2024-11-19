import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./navBar.module.css";
import Icon from '@mdi/react';
import { mdiExitToApp, mdiMenu } from '@mdi/js';

function AuthNavBarS({ navItem }) {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', updateWindowWidth);
    return () => window.removeEventListener('resize', updateWindowWidth);
  }, []);

  const goHome = () => navigate("/homeStudent");
  const goClasses = () => navigate("/classesS");
  const goActivities = () => navigate("/activitiesS");
  const goStudents = () => navigate("/studentsS");
  const goInstructors = () => navigate("/instructorsS");
  const goShifts = () => navigate("/shiftsS");
  const goLogout = () => navigate("/login");

  return (
    <div className={classes.navBar}>
      <div className={classes.logoContainer} onClick={goHome}>
        <img
          src="/UCU SnowZone logo & texto.png"
          alt="Logo"
          style={{ alignSelf: "center", height: "90px", width: "100%", cursor: "pointer" }}
        />
      </div>

      {windowWidth > 1000 ? (
          <div className={classes.navBarOptions}>
            <button onClick={goClasses} className={classes.underlineButton}>
            {navItem === "classes" ? (
                <strong className={classes.buttonSelected}>
                  Clases
                </strong>
              ) : (
                <span>Clases</span>
              )}
            </button>
            <button onClick={goActivities} className={classes.underlineButton}>
              {navItem === "activities" ? (
                <strong className={classes.buttonSelected}>
                  Actividades
                </strong>
              ) : (
                <span>Actividades</span>
              )}
            </button>
            <button onClick={goShifts} className={classes.underlineButton}>
              {navItem === "shifts" ? (
                <strong className={classes.buttonSelected}>
                  Turnos
                </strong>
              ) : (
                <span>Turnos</span>
              )}
            </button>
            <button onClick={goInstructors} className={classes.underlineButton}>
              {navItem === "instructors" ? (
                <strong className={classes.buttonSelected}>
                  Instructores
                </strong>
              ) : (
                <span>Instructores</span>
              )}
            </button>
            <button onClick={goStudents} className={classes.underlineButton}>
              {navItem === "students" ? (
                <strong className={classes.buttonSelected}>
                  Alumnos
                </strong>
              ) : (
                <span>Alumnos</span>
              )}
            </button>
          </div>
        ) : (
        <>
          <Icon path={mdiMenu} size={1.5} className={classes.menuIcon} onClick={toggleDropdown} />
          {showDropdown && (
            <div className={classes.dropdownMenu}>
              <button onClick={goClasses}>Clases</button>
              <button onClick={goActivities}>Actividades</button>
              <button onClick={goShifts}>Turnos</button>
              <button onClick={goInstructors}>Instructores</button>
              <button onClick={goStudents}>Alumnos</button>
            </div>
          )}
        </>
      )}

      <Icon path={mdiExitToApp} size={1.5} className={`mr-4 ${classes.exit}`} onClick={goLogout} />
    </div>
  );
}

export default AuthNavBarS;
