import React from "react";
import { postDataToTable } from "../api/data.api.post";

const FiredData = () => {
    const[firedData, setFiredData] = React.useState({
        date_of_fired: '',
        unique_card: '',
        identify_code: ''
    });

    const handleFiredChange = (e) => {
        const{name, value} = e.target;
        setFiredData({
            ...firedData,
            [name]: value
        });
    };

    const handleFiredSubmit = async(e) => {
        e.preventDefault();
        try {
            const responce = await postDataToTable(firedData);
            console.log('Data submitted to table `Fired`', responce[14]);
            setFiredData({
                date_of_fired: '',
                unique_card: '',
                identify_code: ''
            });
        } catch (error) {
            console.error(error);
        }
    };

    return(
        <div>
            <form onSubmit={handleFiredSubmit}>
                <input type='text' name='date_of_fired' value={firedData.date_of_fired} onChange={handleFiredChange}></input>
                <input type='text' name='unique_card' value={firedData.unique_card} onChange={handleFiredChange}></input>
                <input type='text' name='identify_code' value={firedData.identify_code} onChange={handleFiredChange}></input>
            </form>
        </div>
    );
};

export default FiredData;