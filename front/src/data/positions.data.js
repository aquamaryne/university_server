import React from "react";
import { postDataToTable } from "../api/data.api.post";

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
            <form onSubmit={handlePositionSubmit}>
                <input type="text" name="position_name" value={positionsData.position_name} onChange={handlePositionChange}></input>
                <input type="text" name="data_of_entry" value={positionsData.data_of_entry} onChange={handlePositionChange}></input>
                <input type="text" name="type_of_study" value={positionsData.type_of_study} onChange={handlePositionChange}></input>
                <input type="text" name="position_where_work_now" value={positionsData.position_where_work_now} onChange={handlePositionChange}></input>
                <input type="text" name="number_of_order" value={positionsData.number_of_order} onChange={handlePositionChange}></input>
            </form>
        </div>
    )
};

export default PositionsData;