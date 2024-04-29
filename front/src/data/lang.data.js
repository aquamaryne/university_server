import React from "react";
import { postDataToTable } from "../api/data.api.post";
import { TextField, Grid, Paper, Typography, Card } from "@mui/material";

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
                            Знання мови
                        </Typography>
                        <form onSubmit={handleLangSubmit}>
                            <TextField 
                                type='text' 
                                name='first_lang_name' 
                                placeholder="Іноземна мова" 
                                value={langData.first_lang_name} 
                                onChange={handleLangChange}
                                sx={{
                                    padding: 1,
                                }}
                            />
                            <TextField 
                                type='text' 
                                name='second_lang_name' 
                                placeholder="Друга іноземна мова" 
                                value={langData.second_lang_name} 
                                onChange={handleLangChange}
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

export default LangData;