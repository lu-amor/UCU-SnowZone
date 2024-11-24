import React from "react";
import NavBar from "../../components/navBar/navBar";
import classes from "./home.module.css";

const Home = () => {
    return (
        <>
            <NavBar />
            <div className={classes.content}>
                <h1 className={`${classes.title}`}>Inicio</h1>
                <p className={`${classes.paragraph}`} style={{fontWeight: "bold"}}>
                    Bienvenido al sistema de gestión de UCU SnowZone.
                </p>
                <p className={`${classes.paragraph}`}>
                    Aquí puedes gestionar toda la información relacionada con las clases, actividades, estudiantes, instructores y turnos de UCU SnowZone.
                </p>
                <p className={`${classes.paragraph}`}>
                    Usa la barra de navegación para acceder a las diferentes secciones del sistema.
                </p>
            </div>
        </>
    );
};

export default Home;