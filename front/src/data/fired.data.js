import React from "react";
import { postDataToTable } from "../api/data.api.post";
import { TextField, Grid, Paper, Typography, Card } from "@mui/material";

const FiredData = () => {
    const[firedData, setFiredData] = React.useState({
        date_of_fired: '',
        unique_card: '',
        identify_code: ''
    });

    const handleFiredChange = (e) => {
        const{name, value} = e.target;
        setFiredData({
            ...firedData,
            [name]: value
        });
    };

    const handleFiredSubmit = async(e) => {
        e.preventDefault();
        try {
            const responce = await postDataToTable(firedData);
            console.log('Data submitted to table `Fired`', responce[14]);
            setFiredData({
                date_of_fired: '',
                unique_card: '',
                identify_code: ''
            });
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
                            Звільнені співробітники
                        </Typography>
                        <form onSubmit={handleFiredSubmit}>
                            <TextField 
                                type='text' 
                                placeholder="Дата звільнення" 
                                name='date_of_fired' 
                                value={firedData.date_of_fired} 
                                onChange={handleFiredChange}
                                sx={{
                                    padding: 1,
                                }}
                            />
                            <TextField 
                                type='text' 
                                placeholder="Унікальний номер карти" 
                                name='unique_card' 
                                value={firedData.unique_card} 
                                onChange={handleFiredChange}
                                sx={{
                                    padding: 1,
                                }}
                            />
                            <TextField 
                                type='text' 
                                placeholder="Ідентифікаційний код" 
                                name='identify_code' 
                                value={firedData.identify_code} 
                                onChange={handleFiredChange}
                                sx={{
                                    padding: 1,
                                }}
                            />
                        </form>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
};

export default FiredData;