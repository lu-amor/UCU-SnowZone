import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./navBar.module.css";
import Icon from '@mdi/react';
import { mdiExitToApp, mdiMenu } from '@mdi/js';

function AuthNavBar({ navItem }) {
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

  const goHome = () => navigate("/home");
  const goClasses = () => navigate("/classes");
  const goActivities = () => navigate("/activities");
  const goStudents = () => navigate("/students");
  const goInstructors = () => navigate("/instructors");
  const goShifts = () => navigate("/shifts");
  const goReports = () => navigate("/reports");
  const goLogout = () => navigate("/login");

  return (
    <div className={classes.navBar}>
      <div className={classes.logoContainer} onClick={goHome}>
        <img
          src="/UCU SnowZone logo & texto.png"
          alt="Logo"
          style={{ alignSelf: "center", height: "100px", width: "100%", cursor: "pointer" }}
        />
      </div>

      {windowWidth > 1000 ? (
          <div className={classes.navBarOptions}>
            <button onClick={goClasses} className={classes.underlineButton}>Classes</button>
            <button onClick={goActivities} className={classes.underlineButton}>Activities</button>
            <button onClick={goShifts} className={classes.underlineButton}>Shifts</button>
            <button onClick={goInstructors} className={classes.underlineButton}>Instructors</button>
            <button onClick={goStudents} className={classes.underlineButton}>Students</button>
            <button onClick={goReports} className={classes.underlineButton}>Reports</button>
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
                <button onClick={goReports}>Reports</button>
              </div>
            )}
          </>
        )}

      <Icon path={mdiExitToApp} size={2} className={classes.exit} onClick={goLogout} />
    </div>
  );
}

export default AuthNavBar;
