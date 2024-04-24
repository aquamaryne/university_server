import React from "react";
import { postDataToTable } from "../api/data.api.post";
import { TextField, Grid, Paper, Typography } from "@mui/material";

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
            <Grid container alignItems="center">
                <Grid item>
                    <Paper sx={{
                        padding: '2px'
                    }}>
                        <Typography>Стаж роботи</Typography>
                        <form onSubmit={handleWorkExpSubmit}>
                            <TextField type='text' placeholder="Загальний стаж роботи" name='global_work_exp' value={workExperience.global_work_exp} onChange={handleWorkExpChange}/>
                            <TextField type='text' placeholder="Загальний науковий стаж" name='global_science_exp' value={workExperience.global_science_exp} onChange={handleWorkExpChange}/>
                            <TextField type='text' placeholder="Науковий стаж в цьому університеті" name='science_at_this_university' value={workExperience.science_at_this_university} onChange={handleWorkExpChange}/>
                            <TextField type='text' placeholder="Продовження наукового стажу" name='continuous_work_exp' value={workExperience.continuous_work_exp} onChange={handleWorkExpChange}/>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
};

export default WorkExpData;