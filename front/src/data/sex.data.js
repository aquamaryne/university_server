import React from 'react';
import { postDataToTable } from '../api/data.api.post';

const SexData = () => {
    const[sexData, setSexData] = React.useState({
        sex_name: ''
    });

    const handleSexChange = (e) => {
        const {name, value} = e.target;
        setSexData({
            ...sexData,
            [name]: value
        });
    };

    const handleSexSubmit = async (e) => {
        e.preventDefault();
        try {
            const responce = await postDataToTable(sexData);
            console.log('Data submitted to table `Sex`', responce[3]);
            setSexData({
                sex_name: ''
            })
        } catch (error) {
            console.error(error);
        }
    };

    return(
        <div>
            <form onSubmit={handleSexSubmit}>
                <input type='text' name='sex_name' value={sexData.sex_name} onChange={handleSexChange}></input>
            </form>
        </div>
    )


};

export default SexData;