import React, { useEffect, useState } from 'react';

function UserTable() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('https://dummyjson.com/users')
            .then(response => response.json())
            .then(data => {
                console.log('Fetched data:', data); // Log fetched data
                setData(data.users);
            });
    }, []);

    // If there's no data or data is not an array, don't render anything
    if (!Array.isArray(data) || data.length === 0) {
        return null;
    }

    // Get the keys from the first item in the data array to use as column names
    let columnNames = Object.keys(data[0]);

    // Add subkeys for 'hair' and 'address' to columnNames
    columnNames = columnNames.reduce((acc, columnName) => {
        if (columnName === 'hair' || columnName === 'address' || columnName === 'bank' || columnName === 'company' ) {
            const subKeys = Object.keys(data[0][columnName]);
            const newKeys = subKeys.map(subKey => {
                if (typeof data[0][columnName][subKey] === 'object' && data[0][columnName][subKey] !== null) {
                    const subSubKeys = Object.keys(data[0][columnName][subKey]);
                    return subSubKeys.map(subSubKey => `${columnName}.${subKey}.${subSubKey}`);
                }
                return `${columnName}.${subKey}`;
            });
            return [...acc, ...newKeys.flat()];
        }
        return [...acc, columnName];
    }, []);

    console.log('Column names:', columnNames); // Log column names

    return (
        <div>
            <h1 style={{textAlign: "center"}}>ReactJS Task - 4</h1>
          <br/>
        <table style={{borderCollapse: 'collapse'}}>
            <thead>
                <tr>
                    {columnNames.map((columnName, index) => (
                        <th key={index} style={{border: '1px solid black', padding: '5px'}}>{columnName}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        {columnNames.map((columnName, index) => {
                            const keys = columnName.split('.');
                            let value = item;
                            for (const key of keys) {
                                value = value[key];
                            }
                            return (
                                <td key={index} style={{border: '1px solid black', padding: '5px'}}>
                                    {/* Check if the property is an object */}
                                    {typeof value === 'object' && value !== null ?
                                        // Convert object to string
                                        JSON.stringify(value)
                                        :
                                        keys[0] === 'image' ?
                                            // Render image
                                            <img src={value} alt="" style={{width: '50px', height: '50px'}}/>
                                            :
                                            value
                                    }
                                </td>
                            );
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    );
}

export default UserTable;
