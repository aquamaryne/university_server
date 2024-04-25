import React from "react";
import { postDataToTable } from "../api/data.api.post";
import { TextField, Grid, Paper, Typography } from "@mui/material";

const FamilyData = () => {
    const[familyData, setFamilyData] = React.useState({
        count_of_children: '',
        children_name: '',
        year_of_birth_children: ''
    });

    const handleFamilyChange = (e) => {
        const { name, value } = e.target;
        setFamilyData({
            ...familyData,
            [name]: value,
        });
    };

    const handleFamilySubmit = async (e) => {
        e.preventDefault();
        try {
            const responce = await postDataToTable(familyData);
            console.log('Data submitted to table `Education`', responce[8]);
            setFamilyData({
                count_of_children: '',
                children_name: '',
                year_of_birth_children: ''
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
                            Сім'я
                        </Typography>
                        <form onSubmit={handleFamilySubmit}>
                            <TextField 
                                type='text' 
                                name="count_of_children" 
                                placeholder="Кількість дітей" 
                                value={familyData.count_of_children} 
                                onChange={handleFamilyChange}
                                sx={{
                                    padding: 1,
                                }}
                            />
                            <TextField 
                                type='text' 
                                name="children_name" 
                                placeholder="Ім'я дітей" 
                                value={familyData.children_name} 
                                onChange={handleFamilyChange}
                                sx={{
                                    padding: 1,
                                }}
                            />
                            <TextField 
                                type='text' 
                                name="year_of_birth_children" 
                                placeholder="Дата народження дитини" 
                                value={familyData.year_of_birth_children}
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

export default FamilyData;