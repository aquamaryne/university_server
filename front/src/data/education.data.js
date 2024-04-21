import React, { useState } from "react";
import { postDataToTable } from "../api/data.api.post";
import "../css/education.css";

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
                <input type='text' name='diploma' placeholder="Диплом" onChange={handleEducationChange}>{educationData.diploma}</input>
                <input type='text' name='number_of_diploma' placeholder="Номер диплома" onChange={handleEducationChange}>{educationData.number_of_diploma}</input>
                <input type='text' name='name_of_the_high_university' placeholder="Назва вищого навчального закладу" onChange={handleEducationChange}>{educationData.name_of_the_high_university}</input>
                <input type='text' name='name_of_the_middle_university' placeholder="Назва середнього навчального закладу" onChange={handleEducationChange}>{educationData.name_of_the_middle_university}</input>
                <input type='text' name='status_of_education' placeholder="Статус освіти" onChange={handleEducationChange}>{educationData.status_of_education}</input>
                <input type='text' name='academic_title' placeholder="Академічне звання" onChange={handleEducationChange}>{educationData.academic_title}</input>
                <button type='submit'>Зберегти</button>
            </form>
        </div>
    )
}

export default EducationData;