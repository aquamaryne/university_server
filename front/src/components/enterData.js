import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography'

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
                                <TextField 
                                    fullWidth
                                    label="Имя"
                                    name='name'
                                    onChange={"_"}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField 
                                    fullWidth
                                    label="Фамилия"
                                    name='name'
                                    onChange={"_"}
                                />
                            </Grid>
                        </Grid>
                        <Button type='save'>Сохранити</Button>
                    </form>
                </div>
            )}
        </div> 
    )
};

export default EnterDataForm;