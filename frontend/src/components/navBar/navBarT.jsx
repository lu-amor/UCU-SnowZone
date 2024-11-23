import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./navBar.module.css";
import Icon from '@mdi/react';
import { mdiExitToApp, mdiMenu } from '@mdi/js';

function AuthNavBarTS({ navItem }) {
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

  const goHome = () => navigate("/homeTeacher");
  const goClasses = () => navigate("/classesT");
  const goActivities = () => navigate("/activitiesT");
  const goStudents = () => navigate("/studentsT");
  const goInstructors = () => navigate("/instructorsT");
  const goShifts = () => navigate("/shiftsT");
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
                  Classes
                </strong>
              ) : (
                <span>Classes</span>
              )}
            </button>
            <button onClick={goActivities} className={classes.underlineButton}>
              {navItem === "activities" ? (
                <strong className={classes.buttonSelected}>
                  Activities
                </strong>
              ) : (
                <span>Activities</span>
              )}
            </button>
            <button onClick={goShifts} className={classes.underlineButton}>
              {navItem === "shifts" ? (
                <strong className={classes.buttonSelected}>
                  Shifts
                </strong>
              ) : (
                <span>Shifts</span>
              )}
            </button>
            <button onClick={goInstructors} className={classes.underlineButton}>
              {navItem === "instructors" ? (
                <strong className={classes.buttonSelected}>
                  Instructors
                </strong>
              ) : (
                <span>Instructors</span>
              )}
            </button>
            <button onClick={goStudents} className={classes.underlineButton}>
              {navItem === "students" ? (
                <strong className={classes.buttonSelected}>
                  Students
                </strong>
              ) : (
                <span>Students</span>
              )}
            </button>
          </div>
        ) : (
        <>
          <Icon path={mdiMenu} size={1.5} className={classes.menuIcon} onClick={toggleDropdown} />
          {showDropdown && (
            <div className={classes.dropdownMenu}>
              <button onClick={goClasses}>Classes</button>
              <button onClick={goActivities}>Activities</button>
              <button onClick={goShifts}>Shifts</button>
              <button onClick={goInstructors}>Instructors</button>
              <button onClick={goStudents}>Students</button>
            </div>
          )}
        </>
      )}

      <Icon path={mdiExitToApp} size={1.5} className={`mr-4 ${classes.exit}`} onClick={goLogout} />
    </div>
  );
}

export default AuthNavBarTS;
