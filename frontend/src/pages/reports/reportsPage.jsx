import React, { useState } from "react";
import classes from "./reportsPage.module.css";
import AuthNavBar from "../../components/navBar/navBar";

const reportsPage = ({ reportsArray }) => {
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);

    const renderContent = () => {
        if (!reportsArray || !Array.isArray(reportsArray) || reportsArray.length < 3) {
            return <div>Cargando datos...</div>;
        }

        switch (selectedTabIndex) {
            case 0: // Income per activity
                return (
                    <table className={`table is-fullwidth is-striped`}>
                        <thead>
                            <tr className={`is-info`}>
                                <th className={`has-text-white`} style={{ fontSize: "1.3rem", paddingLeft: "2rem" }}>Actividad</th>
                                <th className={`has-text-white`} style={{ fontSize: "1.3rem", textAlign: "right", paddingRight: "2rem" }}>Ingresos</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reportsArray[0].map((report, index) => (
                                <tr key={index}>
                                    <td style={{ fontSize: "1rem", paddingLeft: "2rem" }}>{report.actividad}</td>
                                    <td style={{ fontSize: "1rem", textAlign: "right", paddingRight: "2rem" }}>{report.ingresosTotales}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                );
            case 1: // Students per activity
                return (
                    <table className={`table is-fullwidth is-striped`}>
                        <thead>
                            <tr className={`is-info`}>
                                <th className={`has-text-white`} style={{ fontSize: "1.3rem", paddingLeft: "2rem" }}>Actividad</th>
                                <th className={`has-text-white`} style={{ fontSize: "1.3rem", textAlign: "right", paddingRight: "2rem" }}>Cant. alumnos</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reportsArray[1].map((report, index) => (
                                <tr key={index}>
                                    <td style={{ fontSize: "1rem", paddingLeft: "2rem" }}>{report.Actividad}</td>
                                    <td style={{ fontSize: "1rem", textAlign: "right", paddingRight: "2rem" }}>{report.CantidadAlumnos}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                );
            case 2: // Classes per shift
                return (
                    <table className={`table is-fullwidth is-striped`}>
                        <thead>
                            <tr className={`is-info`}>
                                <th className={`has-text-white`} style={{ fontSize: "1.3rem", paddingLeft: "2rem" }}>Turno</th>
                                <th className={`has-text-white`} style={{ fontSize: "1.3rem", textAlign: "right", paddingRight: "2rem" }}>Cant. clases</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reportsArray[2].map((report, index) => (
                                <tr key={index}>
                                    <td style={{ fontSize: "1rem", paddingLeft: "2rem" }}>{report.hora_inicio} - {report.hora_fin}</td>
                                    <td style={{ fontSize: "1rem", textAlign: "right", paddingRight: "2rem" }}>{report.ClasesDictadas}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <AuthNavBar navItem="reports" />
            <div className={`${classes.content}`}>
                <h1 className={`${classes.header}`}>Reportes</h1>
            </div>
            <div className={`${classes.reportsContainer}`}>
                <div className="tabs is-right is-small is-boxed">
                    <ul>
                        <li className={selectedTabIndex === 0 ? "is-active" : ""}>
                            <a onClick={() => setSelectedTabIndex(0)}>
                                <span>Ingresos por actividad</span>
                            </a>
                        </li>
                        <li className={selectedTabIndex === 1 ? "is-active" : ""}>
                            <a onClick={() => setSelectedTabIndex(1)}>
                                <span>Alumnos por actividad</span>
                            </a>
                        </li>
                        <li className={selectedTabIndex === 2 ? "is-active" : ""}>
                            <a onClick={() => setSelectedTabIndex(2)}>
                                <span>Clases por turno</span>
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