import React from "react"

const StudentList = ({students}) => {
    return <div>
        <h2>Students</h2>
        <table>
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>  
                {students.map((student) => (
                    <tr key={student.id}>
                    <td>{student.nombre}</td>
                    <td>{student.apellido}</td>
                    <td>{student.mail}</td>
                    <td>
                        <button>Update</button>
                        <button>Delete</button>
                    </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
}

export default StudentList