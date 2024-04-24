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
            <Grid container alignItems="center">
                <Grid item>
                    <Paper sx={{
                        padding: '2px'
                    }}>
                        <Typography>Сім'я</Typography>
                        <form onSubmit={handleFamilySubmit}>
                            <TextField type='text' name="count_of_children" placeholder="Кількість дітей" value={familyData.count_of_children} onChange={handleFamilyChange}/>
                            <TextField type='text' name="children_name" placeholder="Ім'я дітей" value={familyData.children_name} onChange={handleFamilyChange}/>
                            <TextField type='text' name="year_of_birth_children" placeholder="Дата народження дитини" value={familyData.year_of_birth_children}/>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
};

export default FamilyData;