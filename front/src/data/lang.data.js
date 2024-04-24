import React from "react";
import { postDataToTable } from "../api/data.api.post";
import { TextField, Grid, Paper, Typography } from "@mui/material";

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
            <Grid container alignItems="center">
                <Grid item>
                    <Paper sx={{
                        padding: '2px'
                    }}>
                        <Typography>Знання мови</Typography>
                        <form onSubmit={handleLangSubmit}>
                            <TextField type='text' name='first_lang_name' placeholder="Іноземна мова" value={langData.first_lang_name} onChange={handleLangChange}/>
                            <TextField type='text' name='second_lang_name' placeholder="Друга іноземна мова" value={langData.second_lang_name} onChange={handleLangChange}/>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default LangData;