import React, { useState } from "react";
import { postDataToTable } from "../api/data.api.post";
import "../css/education.css";
import { Button, TextField } from "@mui/material";

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
            <form onSubmit={handleEducationSubmit}>
                <TextField type='text' name='diploma' placeholder="Диплом" onChange={handleEducationChange} value={educationData.diploma}/>
                <TextField type='text' name='number_of_diploma' placeholder="Номер диплома" onChange={handleEducationChange} value={educationData.number_of_diploma}/>
                <TextField type='text' name='name_of_the_high_university' placeholder="Назва вищого навчального закладу" onChange={handleEducationChange} value={educationData.name_of_the_high_university}/>
                <TextField type='text' name='name_of_the_middle_university' placeholder="Назва середнього навчального закладу" onChange={handleEducationChange} value={educationData.name_of_the_middle_university}/>
                <TextField type='text' name='status_of_education' placeholder="Статус освіти" onChange={handleEducationChange} value={educationData.status_of_education}/>
                <TextField type='text' name='academic_title' placeholder="Академічне звання" onChange={handleEducationChange} value={educationData.academic_title}/>
                <Button type='submit'>Зберегти</Button>
            </form>
        </div>
    )
}

export default EducationData;