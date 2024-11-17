import React, { useState } from "react";
import classes from "./classCard.module.css";
import Icon from '@mdi/react';
import { mdiCheckCircle } from '@mdi/js'
import { mdiRadioboxBlank } from '@mdi/js';

function ClassCard({ openEditModal, clase }) {
    const [dictada, setDictada] = useState(clase.dictada);

    const handleDictadaBtn = () => {
        clase.dictada = !clase.dictada;
        setDictada(clase.dictada);
        updateClass(clase);
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
            <button onClick={handleDictadaBtn} className={`${classes.buttonDictada}`}>{dictada ? <Icon path={mdiRadioboxBlank} size={1} color="white" /> : <Icon path={mdiCheckCircle} size={1} color="white" />}</button>
        </div>
    );
}

export default ClassCard;
