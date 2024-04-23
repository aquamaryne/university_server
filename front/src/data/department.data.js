import React from "react";
import { postDataToTable } from "../api/data.api.post";
import { TextField } from "@mui/material";

const DepartmentData = () => {
    const[departmentData, setDepartmentData] = React.useState({
        department_name: ''
    });

    const handleDepartmentChange = (e) => {
        const {name, value} = e.target;
        setDepartmentData({
            ...departmentData,
            [name]: value
        });
    };

    const handleDepartmentSubmit = async (e) => {
        e.preventDefault();
        try {
            const responce = await postDataToTable(departmentData);
            console.log('Data submitted to table `Positions`', responce[5]);
            setDepartmentData({
                department_name: ''
            })
        } catch (error) {
            console.error(error);
        }
    };

    return(
        <div>
            <form onSubmit={handleDepartmentSubmit}>
                <TextField type='text' name="department_name" value={departmentData.department_name} onChange={handleDepartmentChange}/>
            </form>
        </div>
    )
};

export default DepartmentData;