import React from "react";
import { postDataToTable } from "../api/data.api.post";
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
                <Grid item xs={4} md={2} style={{ marginTop: '-40%', marginLeft: '72%'}}>
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
                            Звільнені співробітники
                        </Typography>
                        <form onSubmit={handleFiredSubmit}>
                            <TextField 
                                type='text' 
                                placeholder="Дата звільнення" 
                                name='date_of_fired' 
                                value={firedData.date_of_fired} 
                                onChange={handleFiredChange}
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
                                placeholder="Унікальний номер карти" 
                                name='unique_card' 
                                value={firedData.unique_card} 
                                onChange={handleFiredChange}
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
                                placeholder="Ідентифікаційний код" 
                                name='identify_code' 
                                value={firedData.identify_code} 
                                onChange={handleFiredChange}
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
    );
};

export default FiredData;