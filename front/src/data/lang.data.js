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

const LangData = () => {
    const[langData, setLangData] = React.useState({
        first_lang_name: '',
        second_lang_name: ''
    });

    const handleLangChange = (e) => {
        const{name, value} = e.target;
        setLangData({
            ...langData,
            [name]: value
        });
    };

    const handleLangSubmit = async(e) => {
        e.preventDefault();
        try {
            const responce = await postDataToTable(langData);
            console.log('Data submitted to table `Language`', responce[6]);
            setLangData({
                first_lang_name: '',
                second_lang_name: ''
            })
        } catch (error) {
            console.error(error);
        }
    };

    return(
        <div>
            <Grid container alignItems='center' sx={{ padding: 1 }}>
                <Grid item xs={4} md={2} style={{ marginTop: '-14%', marginLeft: '18%'}}>
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
                                fontSize: 25,
                                fontFamily: 'monospace',
                                color: 'indigo',
                                marginRight: '2rem',
                                marginLeft: '3rem',
                            }}
                        >
                            Знання мови
                        </Typography>
                        <form onSubmit={handleLangSubmit}>
                            <TextField 
                                type='text' 
                                name='first_lang_name' 
                                placeholder="Іноземна мова" 
                                value={langData.first_lang_name} 
                                onChange={handleLangChange}
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
                                name='second_lang_name' 
                                placeholder="Друга іноземна мова" 
                                value={langData.second_lang_name} 
                                onChange={handleLangChange}
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

export default LangData;