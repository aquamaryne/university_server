import React from "react";
import { postDataToTable } from "../api/data.api.post";
import { TextField, Grid, Paper, Typography } from "@mui/material";

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
            <Grid container alignItems="center">
                <Grid item>
                    <Paper sx={{
                        padding: '2px'
                    }}>
                        <Typography>Посада</Typography>
                        <form onSubmit={handlePositionSubmit}>
                            <TextField type="text" name="position_name" placeholder="Ім'я посади" value={positionsData.position_name} onChange={handlePositionChange}/>
                            <TextField type="text" name="data_of_entry" placeholder="Дата вступу на посаду" value={positionsData.data_of_entry} onChange={handlePositionChange}/>
                            <TextField type="text" name="type_of_study" placeholder="Тип навчання" value={positionsData.type_of_study} onChange={handlePositionChange}/>
                            <TextField type="text" name="position_where_work_now" placeholder="Посада де працює зараз" value={positionsData.position_where_work_now} onChange={handlePositionChange}/>
                            <TextField type="text" name="number_of_order" placeholder="Номер договору" value={positionsData.number_of_order} onChange={handlePositionChange}/>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
};

export default PositionsData;