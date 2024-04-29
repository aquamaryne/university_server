import React from "react";
import { postDataToTable } from "../api/data.api.post";
import { TextField, Grid, Paper, Typography, Card } from "@mui/material";

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
            <Grid container alignItems='center' sx={{ padding: 1 }}>
                <Grid item xs={10} md={2}>
                    <Card sx={{
                        padding: '20px',
                        border: 1,
                        borderRadius: 2
                        }}
                    >
                        <Typography
                            variant="h6" 
                            sx={{ 
                                marginBottom: '20px',
                                textAlign: 'center',
                                border: 1, 
                                borderWidth: 1,
                                borderColor: '#1f1f1f',
                                borderRadius: 2,
                                color: 'royalblue',
                                backgroundColor: '#2b2b2a',
                                marginRight: '1rem',
                                marginLeft: '1rem',
                            }}
                        >
                            Сімейний статус
                        </Typography>
                        <form onSubmit={handleFamilyStatusSubmit}>
                            <TextField 
                                type='text' 
                                placeholder="Сіменйний статус" 
                                name='status' 
                                value={familyStatusData.status} 
                                onChange={handleFamilyStatusChange}
                                sx={{
                                    padding: 1,
                                }}
                            />
                        </form>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
};

export default FamilyStatusData;