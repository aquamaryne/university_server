import React, { useState } from "react";
import { postDataToTable } from "../api/data.api.post";
import "../css/education.css";
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

const EducationData = () => {
    const[educationData, setEducationData] = useState({
        diploma: '',
        number_of_diploma: '',
        name_of_the_high_university: '',
        name_of_the_middle_university: '',
        status_of_education: '',
        academic_title: '',
    });

    const handleEducationChange = (e) => {
        const { name, value } = e.target;
        setEducationData({
            ...educationData,
            [name]: value
        })
    };

    const handleEducationSubmit = async (e) => {
        e.preventDefault();
        try {
            const responce = await postDataToTable(educationData);
            console.log('Data submitted to table `Education`', responce[1]);
            setEducationData({
                diploma: '',
                number_of_diploma: '',
                name_of_the_high_university: '',
                name_of_the_middle_university: '',
                status_of_education: '',
                academic_title: '',
            })
        } catch (error) {
            console.error(error);
        }
    };

    return(
        <div>
            <Grid container alignItems='center' sx={{ padding: 1 }}>
                <Grid item xs={4} md={2} style={{ marginLeft: '18%', marginTop: '-22.5%' }}>
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
                                marginRight: '3rem',
                                marginLeft: '3rem',
                            }}
                        >
                            Освіта
                        </Typography>
                        <form onSubmit={handleEducationSubmit} style={{ marginLeft: '2rem' }}>
                            <TextField 
                                type='text' 
                                name='diploma' 
                                placeholder="Диплом" 
                                onChange={handleEducationChange} 
                                value={educationData.diploma}
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
                                name='number_of_diploma' 
                                placeholder="Номер диплома" o
                                nChange={handleEducationChange} 
                                value={educationData.number_of_diploma}
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
                                name='name_of_the_high_university' 
                                placeholder="Назва вищого навчального закладу" 
                                onChange={handleEducationChange} 
                                value={educationData.name_of_the_high_university}
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
                                name='name_of_the_middle_university' 
                                placeholder="Назва середнього навчального закладу" 
                                onChange={handleEducationChange} 
                                value={educationData.name_of_the_middle_university}
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
                                name='status_of_education' 
                                placeholder="Статус освіти" 
                                onChange={handleEducationChange} 
                                value={educationData.status_of_education}
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
                                name='academic_title' 
                                placeholder="Академічне звання" 
                                onChange={handleEducationChange} 
                                value={educationData.academic_title}
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

export default EducationData;