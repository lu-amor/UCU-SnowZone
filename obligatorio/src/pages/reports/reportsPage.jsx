import React, { useState } from "react";
import classes from "./reportsPage.module.css";
import AuthNavBar from "../../components/navBar/navBar";

const reportsPage = ({ reportsArray }) => {
    const [selectedTab, setSelectedTab] = useState('Ingresos por actividad');

    const renderContent = () => {
        switch (selectedTab) {
            case 'Ingresos por actividad':
                return <div>Contenido de Ingresos por actividad</div>;
            case 'Alumnos por actividad':
                return <div>Contenido de Alumnos por actividad</div>;
            case 'Clases por turno':
                return <div>Contenido de Clases por turno</div>;
            default:
                return null;
        }
    };

    return (
        <>
            <AuthNavBar navItem="reports" />
            <div className={`${classes.content}`}>
                <h1 className={`${classes.header}`}>Reports</h1>
            </div>
            <div className={`${classes.reportsContainer}`}>
                <div className="tabs is-right is-medium is-boxed">
                    <ul>
                        <li className={selectedTab === 'Ingresos por actividad' ? 'is-active' : ''}>
                            <a onClick={() => setSelectedTab('Ingresos por actividad')}>
                                <span className={`${classes.tab}`}>Ingresos por actividad</span>
                            </a>
                        </li>
                        <li className={selectedTab === 'Alumnos por actividad' ? 'is-active' : ''}>
                            <a onClick={() => setSelectedTab('Alumnos por actividad')}>
                                <span className={`${classes.tab}`}>Alumnos por actividad</span>
                            </a>
                        </li>
                        <li className={selectedTab === 'Clases por turno' ? 'is-active' : ''}>
                            <a onClick={() => setSelectedTab('Clases por turno')}>
                                <span className={`${classes.tab}`}>Clases por turno</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className={`${classes.tabContent}`}>
                    {renderContent()}
                </div>
            </div>
        </>
    );
};

export default reportsPage;