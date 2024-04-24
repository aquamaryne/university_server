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
            <Grid container alignItems="center">
                <Grid item>
                    <Paper sx={{
                        padding: '2px'
                    }}>
                        <Typography>Робітники</Typography>
                        <form onSubmit={handleEmployeerSubmit}>
                            <TextField type='text' name='fname' placeholder="Ім'я" value={employeerData.fname} onChange={handleEmployeerChange}/>
                            <TextField type='text' name='sname' placeholder="Прізвище" value={employeerData.sname} onChange={handleEmployeerChange}/>
                            <TextField type='text' name='fatherly' placeholder="По батькові" value={employeerData.fatherly} onChange={handleEmployeerChange}/>
                            <TextField type='text' name='date_of_birth' placeholder="Дата народження" value={employeerData.date_of_birth} onChange={handleEmployeerChange}/>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

export default EmployeerData;