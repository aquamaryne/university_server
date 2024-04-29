import React, { useState } from "react";
import { postDataToTable } from "../api/data.api.post";
import "../css/education.css";
import { TextField, Grid, Paper, Typography } from "@mui/material";

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
                <Grid item xs={10} md={4} style={{ marginLeft: '35%', marginTop: '-13.5%' }}>
                    <Paper sx={{
                        padding: '20px',
                        border: 1,
                        borderRadius: 2,
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
                                marginRight: '10rem',
                                marginLeft: '10rem',
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
                                sx={{
                                    padding: 1,
                                }}
                            />
                            <TextField 
                                type='text' 
                                name='number_of_diploma' 
                                placeholder="Номер диплома" o
                                nChange={handleEducationChange} 
                                value={educationData.number_of_diploma}
                                sx={{
                                    padding: 1,
                                }}
                            />
                            <TextField 
                                type='text' 
                                name='name_of_the_high_university' 
                                placeholder="Назва вищого навчального закладу" 
                                onChange={handleEducationChange} 
                                value={educationData.name_of_the_high_university}
                                sx={{
                                    padding: 1,
                                }}
                            />
                            <TextField 
                                type='text' 
                                name='name_of_the_middle_university' 
                                placeholder="Назва середнього навчального закладу" 
                                onChange={handleEducationChange} 
                                value={educationData.name_of_the_middle_university}
                                sx={{
                                    padding: 1,
                                }}
                            />
                            <TextField 
                                type='text' 
                                name='status_of_education' 
                                placeholder="Статус освіти" 
                                onChange={handleEducationChange} 
                                value={educationData.status_of_education}
                                sx={{
                                    padding: 1,
                                }}
                            />
                            <TextField 
                                type='text' 
                                name='academic_title' 
                                placeholder="Академічне звання" 
                                onChange={handleEducationChange} 
                                value={educationData.academic_title}
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
}

export default EducationData;