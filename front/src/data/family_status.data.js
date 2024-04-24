import React from "react";
import { postDataToTable } from "../api/data.api.post";
import { TextField, Grid, Paper, Typography } from "@mui/material";

const FamilyStatusData = () => {
    const[familyStatusData, setFamilyStatusData] = React.useState({
        status: ''
    });

    const handleFamilyStatusChange = (e) => {
        const{name, value} = e.target;
        setFamilyStatusData({
            ...familyStatusData,
            [name]: value
        });
    };

    const handleFamilyStatusSubmit = async(e) => {
        e.preventDefault();
        try {
            const responce = await postDataToTable(familyStatusData);
            console.log('Data submitted to table `Family Status`', responce[5]);
            setFamilyStatusData({
                status: ''
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
                        <Typography>Сімейний статус</Typography>
                        <form onSubmit={handleFamilyStatusSubmit}>
                            <TextField type='text' placeholder="Сіменйний статус" name='status' value={familyStatusData.status} onChange={handleFamilyStatusChange}/>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
};

export default FamilyStatusData;