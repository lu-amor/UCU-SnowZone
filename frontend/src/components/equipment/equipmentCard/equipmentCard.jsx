import React, { useState } from "react";
import classes from "./equipmentCard.module.css";

function EquipmentCard({ openEditModal, equipment }) {
    return (
        <div className={classes.cardContainer}>
            <div className={classes.cardContent} onClick={openEditModal}>
                <h4 className={`${classes.title}`}>
                    {equipment.id}
                </h4>
                <div className={`${classes.dataContainer}`}>
                    <p className={`${classes.data}`} id={classes.activity}>
                        {equipment.descripcion} - {equipment.tamanio}
                    </p>
                    <p className={`${classes.data}`} id={classes.activity}>
                        {equipment.actividad}
                    </p>
                    <div className={`${classes.time}`}>
                        <p className={`${classes.data} has-text-centered`}>
                            {equipment.size}
                        </p>
                        <p className={`${classes.data} has-text-centered`}>
                            ${equipment.costo}
                        </p>
                        <p className={`${classes.data} has-text-centered`}>
                            Cant. disponibles: {equipment.cant_disponibles}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EquipmentCard;
