import React, { useState } from "react";
import classes from "./classCard.module.css";
import Icon from '@mdi/react';
import { mdiCheckCircle, mdiRadioboxBlank } from '@mdi/js';

function ClassCardTeacher({ openEditModal, clase, updateClass }) {
    const [dictada, setDictada] = useState(clase.dictada);

    const handleDictadaBtn = async (e) => {
        e.preventDefault();

        // Alternar el estado de `dictada`
        const newDictada = !dictada;
        setDictada(newDictada);

        // Crear un objeto con los datos actualizados
        const updatedClass = { ...clase, dictada: newDictada };

        try {
            // Realizar la actualización en el servidor
            await updateClass(updatedClass);
            console.log("Clase actualizada exitosamente:", updatedClass);
        } catch (error) {
            console.error("Error actualizando la clase:", error);
            // Revertir el cambio en caso de error
            setDictada(clase.dictada);
        }
    };

    return (
        <div className={classes.cardContainer}>
            <div className={classes.cardContent} onClick={openEditModal}>
                <h4 className={`${classes.title}`}>
                    {clase.id}
                </h4>
                <div className={`${classes.dataContainer}`}>
                    <p className={`${classes.data}`} id={classes.activity}>
                        {clase.descripcion}
                    </p>
                    <div className={`${classes.time}`}>
                        <p className={`${classes.data}`} id={classes.from}>
                            {clase.hora_inicio}
                        </p>
                        <p className={`${classes.data}`}>
                            -
                        </p>
                        <p className={`${classes.data}`} id={classes.to}>
                            {clase.hora_fin}
                        </p>
                    </div>
                    <p className={`${classes.data}`} id={classes.instructor}>
                        {clase.apellido} {clase.nombre}
                    </p>
                </div>
            </div>
            <button
                onClick={handleDictadaBtn}
                className={`${classes.buttonDictada}`}
            >
                {dictada ? (
                    <Icon path={mdiCheckCircle} size={1} color="white" />
                ) : (
                    <Icon path={mdiRadioboxBlank} size={1} color="white" />
                )}
            </button>
        </div>
    );
}

export default ClassCardTeacher;