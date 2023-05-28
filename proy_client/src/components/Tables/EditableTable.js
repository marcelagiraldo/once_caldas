import React, { useState } from 'react';

export function EditableTable() {
    const [tableData, setTableData] = useState([
        { id: 1, name: 'John', age: 25 },
        { id: 2, name: 'Jane', age: 30 },
        { id: 3, name: 'Bob', age: 40 },
    ]);

    const handleNameChange = (id, event) => {
        const updatedData = tableData.map((row) => {
        if (row.id === id) {
            return { ...row, name: event.target.value };
        }
        return row;
        });
        setTableData(updatedData);
    };

    const handleAgeChange = (id, event) => {
        const updatedData = tableData.map((row) => {
        if (row.id === id) {
            return { ...row, age: event.target.value };
        }
        return row;
        });
        setTableData(updatedData);
    };

    const handleDeleteRow = (id) => {
        const updatedData = tableData.filter((row) => row.id !== id);
        setTableData(updatedData);
    };

    return (
        <div>
        <table>
            {/* <thead>
            <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Actions</th>
            </tr>
            </thead> */}
            <tbody>
            {tableData.map((row) => (
                <tr key={row.id}>
                <td>
                    <input
                    type="text"
                    placeholder=''
                    value={row.name}
                    onChange={(event) => handleNameChange(row.id, event)}
                    />
                </td>
                <td>
                    <input
                    type="text"
                    value={row.age}
                    onChange={(event) => handleAgeChange(row.id, event)}
                    />
                </td>
                <td>
                    <button onClick={() => handleDeleteRow(row.id)}>Delete</button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
}


