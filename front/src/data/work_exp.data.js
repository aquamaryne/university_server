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

const WorkExpData = () => {
    const[workExperience, setWorkExperience] = React.useState({
        global_work_exp: '',
        global_science_exp: '',
        science_at_this_university: '',
        continuous_work_exp: ''
    });

    const handleWorkExpChange = (e) => {
        const {name, value} = e.target;
        setWorkExperience({
            ...workExperience,
            [name]: value
        });
    };

    const handleWorkExpSubmit = async(e) => {
        e.preventDefault();
        try {
            const responce = await postDataToTable(workExperience);
            console.log('Data submitted to table `Work Expience`', responce[7]);
            setWorkExperience({
                global_work_exp: '',
                global_science_exp: '',
                science_at_this_university: '',
                continuous_work_exp: ''
            });
        } catch (error) {
            console.error(error);
        }
    };

    return(
        <div>
            <Grid container alignItems='center' sx={{ padding: 1 }}>
                <Grid item xs={4} md={2} style={{ marginTop: '-22%', marginLeft: '18%'}}>
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
                            Стаж роботи
                        </Typography>
                        <form onSubmit={handleWorkExpSubmit}>
                            <TextField 
                                type='text' 
                                label="Загальний стаж роботи" 
                                name='global_work_exp' 
                                value={workExperience.global_work_exp} 
                                onChange={handleWorkExpChange}
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
                            <TextField 
                                type='text' 
                                placeholder="Загальний науковий стаж" 
                                name='global_science_exp' 
                                value={workExperience.global_science_exp} 
                                onChange={handleWorkExpChange}
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
                            <TextField 
                                type='text' 
                                placeholder="Науковий стаж в цьому університеті" 
                                name='science_at_this_university' 
                                value={workExperience.science_at_this_university} 
                                onChange={handleWorkExpChange}
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
                            <TextField 
                                type='text' 
                                placeholder="Продовження наукового стажу" 
                                name='continuous_work_exp' 
                                value={workExperience.continuous_work_exp} 
                                onChange={handleWorkExpChange}
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

export default WorkExpData;