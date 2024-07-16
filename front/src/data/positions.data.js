import React from "react";
import { postDataToTable } from "../../../api/data.api.post";
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

const PositionsData = () => {
    const[positionsData, setPositionsData] = React.useState({
        position_name: '',
        data_of_entry: '',
        type_of_study: '',
        position_where_work_now: '',
        number_of_order: ''
    });

    const handlePositionChange = (e) => {
        const{ value, name } = e.target;
        setPositionsData({
            ...positionsData,
            [name]: value,
        });
    };

    const handlePositionSubmit = async (e) => {
        e.preventDefault();
        try {
            const responce = await postDataToTable(positionsData);
            console.log('Data submitted to table `Positions`', responce[4]);
            setPositionsData({
                position_name: '',
                data_of_entry: '',
                type_of_study: '',
                position_where_work_now: '',
                number_of_order: ''
            })
        } catch (error) {
            console.error(error);
        }
    };

    return(
        <div>
            <Grid container alignItems='center' sx={{ padding: 1 }}>
                <Grid item xs={4} md={2} style={{ marginTop: '-44.8%', marginLeft: '36%'}}>
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
                            Посада
                        </Typography>
                        <form onSubmit={handlePositionSubmit}>
                            <TextField 
                                type="text" 
                                name="position_name" 
                                placeholder="Ім'я посади" 
                                value={positionsData.position_name} 
                                onChange={handlePositionChange}
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
                                type="text" 
                                name="data_of_entry" 
                                placeholder="Дата вступу на посаду" 
                                value={positionsData.data_of_entry} 
                                onChange={handlePositionChange}
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
                                type="text" 
                                name="type_of_study" 
                                placeholder="Тип навчання" 
                                value={positionsData.type_of_study} 
                                onChange={handlePositionChange}
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
                                type="text" 
                                name="position_where_work_now" 
                                placeholder="Посада де працює зараз" 
                                value={positionsData.position_where_work_now} 
                                onChange={handlePositionChange}
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
                                type="text" 
                                name="number_of_order" 
                                placeholder="Номер договору" 
                                value={positionsData.number_of_order} 
                                onChange={handlePositionChange}
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

export default PositionsData;