import React from "react";
import { postDataToTable } from "../api/data.api.post";
import { TextField } from "@mui/material";

const LangData = () => {
    const[langData, setLangData] = React.useState({
        first_lang_name: '',
        second_lang_name: ''
    });

    const handleLangChange = (e) => {
        const{name, value} = e.target;
        setLangData({
            ...langData,
            [name]: value
        });
    };

    const handleLangSubmit = async(e) => {
        e.preventDefault();
        try {
            const responce = await postDataToTable(langData);
            console.log('Data submitted to table `Language`', responce[6]);
            setLangData({
                first_lang_name: '',
                second_lang_name: ''
            })
        } catch (error) {
            console.error(error);
        }
    };

    return(
        <div>
            <form onSubmit={handleLangSubmit}>
                <TextField type='text' name='first_lang_name' value={langData.first_lang_name} onChange={handleLangChange}/>
                <TextField type='text' name='second_lang_name' value={langData.second_lang_name} onChange={handleLangChange}/>
            </form>
        </div>
    );
};

export default LangData;