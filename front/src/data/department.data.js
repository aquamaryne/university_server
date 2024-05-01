import React from "react";
import { postDataToTable } from "../api/data.api.post";
import { TextField, Grid, Paper, Typography, Card } from "@mui/material";

const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for(let i = 0; i < 6; i++){
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const randomColor = getRandomColor();

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
                <Grid item xs={2} style={{ marginTop: '-7.5%'}}>
                    <Card  elevation={3} sx={{
                        padding: '20px',
                        border: 1.9,
                        borderRadius: 0,
                        marginLeft: '10px',
                        transition: 'background-color 0.3s ease-in-out, transform 0.1s ease-in-out, box-shadow 0.3s ease-in-out',
                        '&:hover': {
                            transition: 'translateX(5px)',
                            boxShadow: `-4px 4px 0px ${randomColor}`,
                            borderColor: randomColor,
                        },
                    }}>

                    <Typography variant="h6" 
                        sx={{ 
                            marginBottom: '20px',
                            fontSize: 30,
                            fontFamily: 'monospace',
                            color: 'indigo',
                            marginRight: '2rem',
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
                                variant="filled"
                                color="warning"
                                sx={{
                                    border: 1,
                                    marginLeft: 1,
                                    marginBottom: 1,
                                    backgroundColor: 'white',
                                    transition: 'transform 0.3s ease-in-out',
                                    '&:hover': {
                                        borderColor: randomColor,
                                        transform: 'translateX(3px) scale(1.02)',
                                    }
                                }}
                            />
                        </form>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
};

export default DepartmentData;