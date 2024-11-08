import React from "react";
import NavBar from "../../components/navBar/navBar";
import classes from "./home.module.css";

const Home = () => {
    return (
        <div>
            <NavBar />
            <div className={classes.content}>
                <h1 className={`${classes.title}`}>Home</h1>
                <p className={`${classes.paragraph}`} style={{fontWeight: "bold"}}>
                    Welcome to the UCU SnowZone management system.
                </p>
                <p className={`${classes.paragraph}`}>
                    Here you can manage all the information related to the classes, activities, students, instructors, and shifts of the UCU SnowZone.
                </p>
                <p className={`${classes.paragraph}`}>
                    Use the navigation bar to access the different sections of the system.
                </p>
            </div>
        </div>
    );
};

export default Home;