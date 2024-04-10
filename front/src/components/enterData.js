import React, { useEffect, useState } from 'react';
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

    const handleClick = () => {
        setClicked(prevClicked => !prevClicked);
    };

    return(
        <div>
            <Button onClick={handleClick} sx={buttonStyles(clicked)}>
                <Typography>Внесееня даних</Typography>
            </Button>  
            {clicked && (
                <div>
                    <form>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <ModernTextField 
                                    fullWidth
                                    label="Ім'я"
                                    name='name'
                                    onChange={() => {}}
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
                                    onChange={() => {}}
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