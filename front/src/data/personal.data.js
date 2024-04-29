import React from 'react';
import { postDataToTable } from '../api/data.api.post';
import { TextField, Grid, Paper, Typography, Card } from "@mui/material";

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
                <Grid item xs={10} md={4}>
                    <Card sx={{
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
                            Персональна інформація
                        </Typography>
                        <form onSubmit={handlePersonalSubmit}>
                            <TextField 
                                type='text' 
                                name='unique_card' 
                                placeholder="Уінкальна карта" 
                                value={personalInfoData.unique_card} 
                                onChange={handlePersonalChange}
                                sx={{
                                    padding: 1,
                                }}
                            />
                            <TextField 
                                type='text' 
                                name='serial_num_of_passport' 
                                placeholder="Серійний номер паспорта" 
                                value={personalInfoData.serial_num_of_passport} 
                                onChange={handlePersonalChange}
                                sx={{
                                    padding: 1,
                                }}
                            />
                            <TextField 
                                type='text' 
                                name='issued_by' 
                                placeholder="Ким виданий" 
                                value={personalInfoData.issued_by} 
                                onChange={handlePersonalChange}
                                sx={{
                                    padding: 1,
                                }}
                            />
                            <TextField 
                                type='text' 
                                name='place_of_living' 
                                placeholder="Місце проживання" 
                                value={personalInfoData.place_of_living} 
                                onChange={handlePersonalChange}
                                sx={{
                                    padding: 1,
                                }}
                            />
                            <TextField 
                                type='text' 
                                name='mobile_phone_number' 
                                placeholder="Мобільний номер" 
                                value={personalInfoData.mobile_phone_number} 
                                onChange={handlePersonalChange}
                                sx={{
                                    padding: 1,
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