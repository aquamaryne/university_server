import React, { useState } from "react";
import { postDataToTable } from "../api/data.api.post";
import { TextField, Grid, Typography, Card } from "@mui/material";

const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for(let i = 0; i < 6; i++){
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const randomColor = getRandomColor();

const EmployeerData = () => {
    const[employeerData, setEmployeerData] = useState({
        fname: '',
        sname: '',
        fatherly: '',
        date_of_birth: ''
    });

    const handleEmployeerChange = (e) => {
        const { name, value } = e.target;
        setEmployeerData(({
            ...employeerData,
            [name]: value
        }));
    };
    
    const handleEmployeerSubmit = async (e) => {
        e.preventDefault();
        try {
            const responce = await postDataToTable(employeerData);
            console.log('Data submitted to table `Employeers`', responce[0]);
            setEmployeerData({
                fname: '',
                sname: '',
                fatherly: '',
                date_of_birth: '',
            })
        } catch (error) {
            console.error(error);
        }
    };


    return(
        <div>
            <Grid container alignItems='center' sx={{ padding: 1 }}>
                <Grid item xs={4} md={2}>
                    <Card sx={{
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
                            Робітники
                        </Typography>
                        <form onSubmit={handleEmployeerSubmit} style={{ marginLeft: '2rem', marginTop: '-10px' }}>
                            <TextField 
                                type='text' 
                                name='fname' 
                                label="Ім'я" 
                                value={employeerData.fname} 
                                onChange={handleEmployeerChange}
                                variant="filled"
                                color="warning"
                                sx={{
                                    border: 1,
                                    marginLeft: -2.5,
                                    marginBottom: 1,
                                    backgroundColor: 'white',
                                    transition: 'transform 0.3s ease-in-out',
                                    '&:hover': {
                                        borderColor: randomColor,
                                        transform: 'translateX(3px) scale(1.02)',
                                    }
                                }}
                            />
                            <TextField 
                                type='text' 
                                name='sname' 
                                label="Прізвище" 
                                value={employeerData.sname} 
                                onChange={handleEmployeerChange}
                                variant="filled"
                                color="warning"
                                sx={{
                                    border: 1,
                                    marginLeft: -2.5,
                                    marginBottom: 1,
                                    backgroundColor: 'white',
                                    transition: 'transform 0.3s ease-in-out',
                                    '&:hover': {
                                        borderColor: randomColor,
                                        transform: 'translateX(3px) scale(1.02)',
                                    }
                                }}
                            />
                            <TextField 
                                type='text' 
                                name='fatherly' 
                                label="По батькові" 
                                value={employeerData.fatherly} 
                                onChange={handleEmployeerChange}
                                variant="filled"
                                color="warning"
                                sx={{
                                    border: 1,
                                    marginLeft: -2.5,
                                    marginBottom: 1,
                                    backgroundColor: 'white',
                                    transition: 'transform 0.3s ease-in-out',
                                    '&:hover': {
                                        borderColor: randomColor,
                                        transform: 'translateX(3px) scale(1.02)',
                                    }
                                }}
                            />
                            <TextField 
                                type='text' 
                                name='date_of_birth' 
                                label="Дата народження" 
                                value={employeerData.date_of_birth} 
                                onChange={handleEmployeerChange}
                                variant="filled"
                                color="warning"
                                sx={{
                                    border: 1,
                                    marginLeft: -2.5,
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
}

export default EmployeerData;