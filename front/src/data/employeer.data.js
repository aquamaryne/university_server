import React, { useState } from "react";
import { postDataToTable } from "../api/data.api.post";
import { TextField, Grid, Paper, Typography } from "@mui/material";

const EmployeerData = () => {
    const[employeerData, setEmployeerData] = useState({
        fname: '',
        sname: '',
        fatherly: '',
        date_of_birth: ''
    });

    const handleEmployeerChange = (e) => {
        const { name, value } = e.target;
        setEmployeerData(({
            ...employeerData,
            [name]: value
        }));
    };
    
    const handleEmployeerSubmit = async (e) => {
        e.preventDefault();
        try {
            const responce = await postDataToTable(employeerData);
            console.log('Data submitted to table `Employeers`', responce[0]);
            setEmployeerData({
                fname: '',
                sname: '',
                fatherly: '',
                date_of_birth: '',
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
                            Робітники
                        </Typography>
                        <form onSubmit={handleEmployeerSubmit} style={{ marginLeft: '2rem', marginTop: '-10px' }}>
                            <TextField 
                                type='text' 
                                name='fname' 
                                placeholder="Ім'я" 
                                value={employeerData.fname} 
                                onChange={handleEmployeerChange}
                                sx={{
                                    padding: 1,
                                }}
                            />
                            <TextField 
                                type='text' 
                                name='sname' 
                                placeholder="Прізвище" 
                                value={employeerData.sname} 
                                onChange={handleEmployeerChange}
                                sx={{
                                    padding: 1,
                                }}
                            />
                            <TextField 
                                type='text' 
                                name='fatherly' 
                                placeholder="По батькові" 
                                value={employeerData.fatherly} 
                                onChange={handleEmployeerChange}
                                sx={{
                                    padding: 1,
                                }}
                            />
                            <TextField 
                                type='text' 
                                name='date_of_birth' 
                                placeholder="Дата народження" 
                                value={employeerData.date_of_birth} 
                                onChange={handleEmployeerChange}
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
}

export default EmployeerData;