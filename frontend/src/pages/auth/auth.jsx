import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import classes from "./auth.module.css";

const AuthPage = () => {
    const navigate = useNavigate();

    const goAdmin = () => navigate("/home");
    const goInstructor = () => navigate("/homeTeacher");
    const goStudent = () => navigate("/homeStudent");

return (
    <div className={classes.auth}>
        <img src="../../UCU SnowZone logo & texto.png" alt="UCU Logo" style={{width: 200, alignSelf: "center", justifySelf: "center"}} />
        <p className={classes.paragraph}>
            Bienvenido al sistema de gestión de UCU SnowZone.
        </p>
        <p className={classes.paragraph}>
            Seleccione su rol para ingresar al sistema.
        </p>
        <div className={classes.buttonsContainer}>
            <button className="button is-success has-text-white" onClick={goAdmin}>Admin</button>
            <button className="button is-success has-text-white" onClick={goInstructor}>Instructor</button>
            <button className="button is-success has-text-white" onClick={goStudent}>Student</button>
        </div>
    </div>
);
};

export default AuthPage;
