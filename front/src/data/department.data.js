import React from "react";
import { postDataToTable } from "../api/data.api.post";
import { TextField, Grid, Paper, Typography } from "@mui/material";

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
            <Grid container alignItems='center' sx={{ padding: 1 }}>
                <Grid item xs={2}>
                    <Paper  elevation={3} sx={{
                        padding: '20px',
                        border: 1,
                    }}>

                    <Typography variant="h6" 
                        sx={{ 
                            marginBottom: '20px',
                            textAlign: 'center',
                            border: 1, 
                            borderWidth: 1,
                            borderColor: '#1f1f1f',
                            borderRadius: 2,
                            color: 'royalblue',
                            backgroundColor: '#2b2b2a',
                            marginRight: '3rem',
                            marginLeft: '3rem',
                        }}
                    >
                        Кафедра
                    </Typography >
                        <form onSubmit={handleDepartmentSubmit} style={{ marginLeft: '0.3rem', marginTop: '-10px'}}>
                            <TextField 
                                type='text' 
                                name="department_name" 
                                placeholder="Ім'я кафедри" 
                                value={departmentData.department_name} 
                                onChange={handleDepartmentChange}
                                sx={{
                                    padding: 1,
                                }}
                            />
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
};

export default DepartmentData;