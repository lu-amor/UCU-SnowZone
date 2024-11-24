import React from "react";
import NavBarS from "../../components/navBar/navBarS";
import classes from "./home.module.css";

const HomeStudent = () => {
    return (
        <>
            <NavBarS />
            <div className={classes.content}>
                <h1 className={`${classes.title}`}>Home</h1>
                <p className={`${classes.paragraph}`} style={{fontWeight: "bold"}}>
                    Welcome to the UCU SnowZone management system.
                </p>
                <p className={`${classes.paragraph}`}>
                    Use the navigation bar to access the different sections of the system.
                </p>
            </div>
        </>
    );
};

export default HomeStudent;