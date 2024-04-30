import React from "react";
import { postDataToTable } from "../api/data.api.post";
import { TextField, Grid, Typography, Card } from "@mui/material";

const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for(let i = 0; i < 6; i++){
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
const randomColor = getRandomColor();

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
                <Grid item xs={4} md={2} style={{ marginLeft: '36%', marginTop: '-43.6%' }}>
                    <Card sx={{
                        padding: '20px',
                        border: 1.9,
                        borderRadius: 0,
                        marginLeft: '10px',
                        transition: 'background-color 0.3s ease-in-out, transform 0.1s ease-in-out, box-shadow 0.3s ease-in-out',
                        '&:hover': {
                            transition: 'translateX(5px)',
                            boxShadow: `-4px 4px 0px ${randomColor}`,
                            borderColor: randomColor,
                        },
                    }}>
                        <Typography variant="h6" 
                            sx={{ 
                                marginBottom: '20px',
                                fontSize: 30,
                                fontFamily: 'monospace',
                                color: 'indigo',
                                marginRight: '2rem',
                                marginLeft: '3rem',
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
                                variant="filled"
                                color="warning"
                                sx={{
                                    border: 1,
                                    marginLeft: 1,
                                    marginBottom: 1,
                                    backgroundColor: 'white',
                                    transition: 'transform 0.3s ease-in-out',
                                    '&:hover': {
                                        borderColor: randomColor,
                                        transform: 'translateX(3px) scale(1.02)',
                                    }
                                }}
                            />
                            <TextField 
                                type='text' 
                                name="children_name" 
                                placeholder="Ім'я дітей" 
                                value={familyData.children_name} 
                                onChange={handleFamilyChange}
                                variant="filled"
                                color="warning"
                                sx={{
                                    border: 1,
                                    marginLeft: 1,
                                    marginBottom: 1,
                                    backgroundColor: 'white',
                                    transition: 'transform 0.3s ease-in-out',
                                    '&:hover': {
                                        borderColor: randomColor,
                                        transform: 'translateX(3px) scale(1.02)',
                                    }
                                }}
                            />
                            <TextField 
                                type='text' 
                                name="year_of_birth_children" 
                                placeholder="Дата народження дитини" 
                                value={familyData.year_of_birth_children}
                                variant="filled"
                                color="warning"
                                sx={{
                                    border: 1,
                                    marginLeft: 1,
                                    marginBottom: 1,
                                    backgroundColor: 'white',
                                    transition: 'transform 0.3s ease-in-out',
                                    '&:hover': {
                                        borderColor: randomColor,
                                        transform: 'translateX(3px) scale(1.02)',
                                    }
                                }}
                            />
                        </form>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
};

export default FamilyData;