import React from 'react';
import { postDataToTable } from '../../../api/data.api.post';
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

const PersonalData = () => {
    const[personalInfoData, setPersonalInfoData] = React.useState({
        unique_card: '',
        serial_num_of_passport: '',
        issued_by: '',
        place_of_living: '',
        mobile_phone_number: ''
    });

    const handlePersonalChange = (e) => {
        const {name, value} = e.target;
        setPersonalInfoData({
            ...personalInfoData,
            [name]: value
        });
    };

    const handlePersonalSubmit = async (e) =>{
        e.preventDefault();
        try {
            const responce = await postDataToTable(personalInfoData);
            console.log('Data submitted to table `Personal Info`', responce[12]);
            setPersonalInfoData({
                unique_card: '',
                serial_num_of_passport: '',
                issued_by: '',
                place_of_living: '',
                mobile_phone_number: ''
            })
        } catch (error) {
            console.error(error);
        }
    };

    return(
        <div>
            <Grid container alignItems='center' sx={{ padding: 1 }}>
                <Grid item xs={4} md={2} style={{ marginTop: '-10%', marginLeft: '54%'}}>
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
                                marginRight: '2rem',
                                marginLeft: '3rem',
                            }}
                        >
                            Персональна інформація
                        </Typography>
                        <form onSubmit={handlePersonalSubmit}>
                            <TextField 
                                type='text' 
                                name='unique_card' 
                                placeholder="Уінкальна карта" 
                                value={personalInfoData.unique_card} 
                                onChange={handlePersonalChange}
                                variant="filled"
                                color="warning"
                                sx={{
                                    border: 1,
                                    marginLeft: 1,
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
                                name='serial_num_of_passport' 
                                placeholder="Серійний номер паспорта" 
                                value={personalInfoData.serial_num_of_passport} 
                                onChange={handlePersonalChange}
                                variant="filled"
                                color="warning"
                                sx={{
                                    border: 1,
                                    marginLeft: 1,
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
                                name='issued_by' 
                                placeholder="Ким виданий" 
                                value={personalInfoData.issued_by} 
                                onChange={handlePersonalChange}
                                variant="filled"
                                color="warning"
                                sx={{
                                    border: 1,
                                    marginLeft: 1,
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
                                name='place_of_living' 
                                placeholder="Місце проживання" 
                                value={personalInfoData.place_of_living} 
                                onChange={handlePersonalChange}
                                variant="filled"
                                color="warning"
                                sx={{
                                    border: 1,
                                    marginLeft: 1,
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
                                name='mobile_phone_number' 
                                placeholder="Мобільний номер" 
                                value={personalInfoData.mobile_phone_number} 
                                onChange={handlePersonalChange}
                                variant="filled"
                                color="warning"
                                sx={{
                                    border: 1,
                                    marginLeft: 1,
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
};

export default PersonalData;