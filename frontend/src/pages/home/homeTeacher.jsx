import React from "react";
import NavBarT from "../../components/navBar/navBarT";
import classes from "./home.module.css";

const HomeTeacher = () => {
    return (
        <div>
            <NavBarT />
            <div className={classes.content}>
                <h1 className={`${classes.title}`}>Inicio</h1>
                <p className={`${classes.paragraph}`} style={{fontWeight: "bold"}}>
                    Bienvenido al sistema de gestión UCU SnowZone.
                </p>
                <p className={`${classes.paragraph}`}>
                    Utilice la barra de navegación para acceder a las diferentes secciones del sistema.
                </p>
            </div>
        </div>
    );
};

export default HomeTeacher;