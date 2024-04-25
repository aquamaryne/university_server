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
            <Grid container alignItems='center' sx={{ padding: 1 }}>
                <Grid item xs={10} md={4}>
                    <Paper sx={{
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
                            Стать
                        </Typography>
                        <form onSubmit={handleSexSubmit}>
                            <TextField 
                                type='text' 
                                name='sex_name' 
                                placeholder="Стать" 
                                value={sexData.sex_name} 
                                onChange={handleSexChange}
                                sx={{
                                    padding: 1,
                                }}
                            />
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )


};

export default SexData;