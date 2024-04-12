import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography'
import { styled } from '@mui/system';
import "../css/form.css";


const ModernTextField = styled(TextField)({
    "& .MuiOutlinedInput-root": {
        borderRadius: "0px",
        backgroundColor: "white",
        border: "2px solid black",
        "&:hover fieldset": {
            borderColor: "transparent", // убираем границу при наведении
        },
        "&.Mui-focused fieldset": {
            borderColor: "black", // меняем цвет границы при фокусировке
        },
    },
    "& .MuiInputLabel-root": {
        color: "black",
        fontWeight: "bold",
    },
    "& .MuiInputBase-input": {
        color: "black",
    },
    "& .MuiFormHelperText-root": {
        color: "gray",
    },
    "& .MuiOutlinedInput-notchedOutline": {
        border: "none",
    },
    "& .MuiOutlinedInput-input": {
        padding: "16px",
    },
    transition: "background-color 0.3s, border-color 0.3s, box-shadow 0.3s",
});

const buttonStyles = (clicked) => ({
    border: 2,
    fontFamily: 'Daikon',
    fontWeight: 'bold',
    borderRadius: 0,
    color: clicked ? "white" : "black",
    backgroundColor: clicked ? '#191970' : 'transparent',
    '&:hover': {
        backgroundColor: clicked ? '#191970' : '#191970',
        color: clicked ? 'white' : 'white',
        borderColor: 'orange',
        boxShadow: '-4px 2px 2px 0 purple',
    },
    transition: 'box-shadow 0.3s'
});

const EnterDataForm = () => {
    const [clicked, setClicked] = useState(false);
    const [employeers, setEmployeers] = useState([]);
    const [formData, setFormData] = useState({});

    const handleClick = () => {
        setClicked(prevClicked => !prevClicked);
    };

    const handleSubmit = (event) => {
        handleSave();
    }
    //api for POST data in db
    const handleSave = () => {
        axios.post('http://localhost:3001/employeers', formData) 
            .then(res => {
                setEmployeers(res.data);
                console.log('Data saved successfully:', res.data);
            })
            .catch(err => console.error('Error saving data:', err)); 
    };

    const handleChange = (event) => {
        const { sname, fname, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [sname]: value,
            [fname]: value
        }))
    }

    return(
        <div>
            <Button onClick={handleClick} sx={buttonStyles(clicked)}>
                <Typography>Внесееня даних</Typography>
            </Button>  
            {clicked && (
                <div>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <ModernTextField 
                                    fullWidth
                                    label="Ім'я"
                                    name='name'
                                    onChange={handleChange}
                                    variant="outlined"
                                    size="small"
                                    color="primary"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <ModernTextField 
                                    fullWidth
                                    label="Прізвище"
                                    name='name'
                                    onChange={handleChange}
                                    variant="outlined"
                                    size="small"
                                    color="primary"
                                />
                            </Grid>
                        </Grid>
                    <Button type='save'>Зберегти</Button>
                </form>
            </div>
        )}
    </div> 
    )
};

export default EnterDataForm;