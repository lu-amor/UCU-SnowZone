import React, { useState } from "react";
import classes from "./reportsPage.module.css";
import AuthNavBar from "../../components/navBar/navBar";

const reportsPage = ({ reportsArray }) => {
    const [selectedTab, setSelectedTab] = useState('Income per activity');

    const renderContent = () => {
        const selectedReport = reportsArray.find(report => report.type === selectedTab);
        if (!selectedReport) return null;

        const sortedData = [...selectedReport.data].sort((a, b) => {
            switch (selectedTab) {
                case 'Income per activity':
                    return b.income - a.income;
                case 'Students per activity':
                    return b.students - a.students;
                case 'Classes per shift':
                    return b.classes - a.classes;
                default:
                    return 0;
            }
        });

        switch (selectedTab) {
            case 'Income per activity':
                return (
                    <table className={`table is-fullwidth is-striped`}>
                        <thead>
                            <tr className={`is-info`}>
                                <th className={`has-text-white`} style={{ fontSize: '1.3rem', paddingLeft: '2rem' }}>Activity</th>
                                <th className={`has-text-white`} style={{ fontSize: '1.3rem', textAlign: 'right', paddingRight: '2rem' }}>Income</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedData.map((report, index) => (
                                <tr key={index}>
                                    <td style={{ fontSize: '1rem', paddingLeft: '2rem' }}>{report.activity}</td>
                                    <td style={{ fontSize: '1rem', textAlign: 'right', paddingRight: '2rem' }}>{report.income}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                );
            case 'Students per activity':
                return (
                    <table className={`table is-fullwidth is-striped`}>
                        <thead>
                            <tr className={`is-info`}>
                            <th className={`has-text-white`} style={{ fontSize: '1.3rem', paddingLeft: '2rem' }}>Activity</th>
                            <th className={`has-text-white`} style={{ fontSize: '1.3rem', textAlign: 'right', paddingRight: '2rem' }}>No. Students</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedData.map((report, index) => (
                                <tr key={index}>
                                    <td style={{ fontSize: '1rem', paddingLeft: '2rem' }}>{report.activity}</td>
                                    <td style={{ fontSize: '1rem', textAlign: 'right', paddingRight: '2rem' }}>{report.students}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                );
            case 'Classes per shift':
                return (
                    <table className={`table is-fullwidth is-striped`}>
                        <thead>
                            <tr className={`is-info`}>
                            <th className={`has-text-white`} style={{ fontSize: '1.3rem', paddingLeft: '2rem' }}>Shift</th>
                            <th className={`has-text-white`} style={{ fontSize: '1.3rem', textAlign: 'right', paddingRight: '2rem' }}>No. Classes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedData.map((report, index) => (
                                <tr key={index}>
                                    <td style={{ fontSize: '1rem', paddingLeft: '2rem' }}>{report.shift}</td>
                                    <td style={{ fontSize: '1rem', textAlign: 'right', paddingRight: '2rem' }}>{report.classes}</td>
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
                <h1 className={`${classes.header}`}>Reports</h1>
            </div>
            <div className={`${classes.reportsContainer}`}>
                <div className="tabs is-right is-small is-boxed">
                    <ul>
                        <li className={selectedTab === 'Income per activity' ? 'is-active' : ''}>
                            <a onClick={() => setSelectedTab('Income per activity')}>
                                <span>Income per activity</span>
                            </a>
                        </li>
                        <li className={selectedTab === 'Students per activity' ? 'is-active' : ''}>
                            <a onClick={() => setSelectedTab('Students per activity')}>
                                <span>Students per activity</span>
                            </a>
                        </li>
                        <li className={selectedTab === 'Classes per shift' ? 'is-active' : ''}>
                            <a onClick={() => setSelectedTab('Classes per shift')}>
                                <span>Classes per shift</span>
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