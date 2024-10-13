import React, { useState } from "react";
import classes from "./classCard.module.css";
import Icon from '@mdi/react';
import { mdiCheckCircle } from '@mdi/js'
import { mdiRadioboxBlank } from '@mdi/js';

function ClassCard({ openEditModal, clase, deleteClass, updateClass }) {
    const [taught, setTaught] = useState(clase.taught);

    const handleTaughtBtn = () => {
        clase.taught = !clase.taught;
        setTaught(clase.taught);
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
                        {clase.activity}
                    </p>
                    <div className={`${classes.time}`}>
                        <p className={`${classes.data}`} id={classes.from}>
                            {clase.from}
                        </p>
                        <p className={`${classes.data}`}>
                            -
                        </p>
                        <p className={`${classes.data}`} id={classes.to}>
                            {clase.to}
                        </p>
                    </div>
                    <p className={`${classes.data}`} id={classes.instructor}>
                        {clase.instructor}
                    </p>
                </div>
            </div>
            <button onClick={handleTaughtBtn} className={`${classes.buttonTaught}`}>{taught ? <Icon path={mdiRadioboxBlank} size={1} color="white" /> : <Icon path={mdiCheckCircle} size={1} color="white" />}</button>
        </div>
    );
}

export default ClassCard;
