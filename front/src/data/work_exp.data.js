import React from "react";
import { postDataToTable } from "../api/data.api.post";
import { TextField } from "@mui/material";

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
            <form onSubmit={handleWorkExpSubmit}>
                <TextField type='text' name='global_work_exp' value={workExperience.global_work_exp} onChange={handleWorkExpChange}/>
                <TextField type='text' name='global_science_exp' value={workExperience.global_science_exp} onChange={handleWorkExpChange}/>
                <TextField type='text' name='science_at_this_university' value={workExperience.science_at_this_university} onChange={handleWorkExpChange}/>
                <TextField type='text' name='continuous_work_exp' value={workExperience.continuous_work_exp} onChange={handleWorkExpChange}/>
            </form>
        </div>
    )
};

export default WorkExpData;