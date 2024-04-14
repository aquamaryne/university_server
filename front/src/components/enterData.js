import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography'
import { Snackbar } from '@mui/material';
import { Alert } from '@mui/material';
import "../css/form.css";

const EnterDataForm = () => {
    const [clicked, setClicked] = useState(false);
    const [formData, setFormData] = useState({});
    const [notification, setNotification] = useState({ open: false, message: '', severity: 'success'});


    const handleClick = () => {
        setClicked(prevClicked => !prevClicked);
    };

    const handleSubmit = () => {
        handleSave();
    };

    const handleCloseNotifiaction = () => {
        setNotification({...notification, open: false});
    };

    //api for POST data in db
    const handleSave = async () => {
        try{
            const responce = await fetch(`http://localhost:3001/employeers`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if(!responce.ok){
                throw new Error('Error to send req');
            }
            setNotification({open: true, message: 'Дані були успішно внесені', severity: 'success'});
            setFormData({});
        } catch(error){
            console.error('Error saving data', error);
            setNotification({open: true, message: 'Помилка при внесені даних', severity: 'error'})
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }))
    }

    return(
        <div>
            <Button onClick={handleClick}>
                <Typography>Внесееня даних</Typography>
            </Button>  
            {clicked && (
                <div>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                                <TextField 
                                    fullWidth
                                    label="Ім'я"
                                    name='name'
                                    value={formData.fname}
                                    onChange={handleChange}
                                    variant="outlined"
                                    size="small"
                                    color="primary"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField 
                                    fullWidth
                                    label="Прізвище"
                                    name='name'
                                    value={formData.sname}
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
        <Snackbar open={notification.open} autoHideDuration={600} onClose={handleCloseNotifiaction}>
            <Alert elevation={6} variant='filled' onClose={handleCloseNotifiaction} severity={notification.severity}>
                {notification.message};
            </Alert>
        </Snackbar>
    </div> 
    )
};

export default EnterDataForm;