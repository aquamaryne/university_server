import React from 'react';
import { postDataToTable } from '../api/data.api.post';

const PersonalData = () => {
    const[personalInfoData, setPersonalInfoData] = React.useState({
        unique_card: '',
        serial_num_of_passport: '',
        issued_by: '',
        place_of_living: '',
        mobile_phone_number: ''
    });

    const handlePersonalChange = (e) => {
        const {name, value} = e.target;
        setPersonalInfoData({
            ...personalInfoData,
            [name]: value
        });
    };

    const handlePersonalSubmit = async (e) =>{
        e.preventDefault();
        try {
            const responce = await postDataToTable(personalInfoData);
            console.log('Data submitted to table `Personal Info`', responce[12]);
            setPersonalInfoData({
                unique_card: '',
                serial_num_of_passport: '',
                issued_by: '',
                place_of_living: '',
                mobile_phone_number: ''
            })
        } catch (error) {
            console.error(error);
        }
    };

    return(
        <div>
            <form onSubmit={handlePersonalSubmit}>
                <input type='text' name='unique_card' value={personalInfoData.unique_card} onChange={handlePersonalChange}></input>
                <input type='text' name='serial_num_of_passport' value={personalInfoData.serial_num_of_passport} onChange={handlePersonalChange}></input>
                <input type='text' name='issued_by' value={personalInfoData.issued_by} onChange={handlePersonalChange}></input>
                <input type='text' name='place_of_living' value={personalInfoData.place_of_living} onChange={handlePersonalChange}></input>
                <input type='text' name='mobile_phone_number' value={personalInfoData.mobile_phone_number} onChange={handlePersonalChange}></input>
            </form>
        </div>
    )
};

export default PersonalData;