import React from "react";
import NavBarS from "../../components/navBar/navBarS";
import classes from "./home.module.css";

const HomeStudent = () => {
    return (
        <>
            <NavBarS />
            <div className={classes.content}>
                <h1 className={`${classes.title}`}>Inicio</h1>
                <p className={`${classes.paragraph}`} style={{fontWeight: "bold"}}>
                    Bienvenido al sistema de gestión de UCU SnowZone.
                </p>
                <p className={`${classes.paragraph}`}>
                    Utilice la barra de navegación para acceder a las diferentes secciones del sistema.
                </p>
            </div>
        </>
    );
};

export default HomeStudent;