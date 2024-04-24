import React from 'react';
import { postDataToTable } from '../api/data.api.post';
import { TextField, Grid, Paper, Typography } from "@mui/material";

const SexData = () => {
    const[sexData, setSexData] = React.useState({
        sex_name: ''
    });

    const handleSexChange = (e) => {
        const {name, value} = e.target;
        setSexData({
            ...sexData,
            [name]: value
        });
    };

    const handleSexSubmit = async (e) => {
        e.preventDefault();
        try {
            const responce = await postDataToTable(sexData);
            console.log('Data submitted to table `Sex`', responce[3]);
            setSexData({
                sex_name: ''
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
                        <Typography>Стать</Typography>
                        <form onSubmit={handleSexSubmit}>
                            <TextField type='text' name='sex_name' placeholder="Стать" value={sexData.sex_name} onChange={handleSexChange}/>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )


};

export default SexData;