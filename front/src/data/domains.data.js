import React from "react";
import { postDataToTable } from "../api/data.api.post";
import Button from '@mui/material/Button';
import { TextField } from "@mui/material";

const DomainsData = () => {
    const[domainsData, setDomainsData] = React.useState({
        domain_name: '',
    });

    const handleDomainChange = (e) => {
        const{name, value} = e.target;
        setDomainsData({
            ...domainsData,
            [name]: value
        });
    };

    const handleDomainSubmit = async(e) => {
        e.preventDefault();
        try {
            const responce = await postDataToTable(domainsData);
            console.log('Data submitted to table `Domains`', responce[6]);
            setDomainsData({
                domain_name: '',
            })
        } catch (error) {
            console.error(error);
        }
    };

    return(
        <div>
            <form onSubmit={handleDomainSubmit}>
                <TextField 
                    type='text' 
                    name="domain_name" 
                    label="Посада"
                    value={domainsData.domain_name} 
                    onChange={handleDomainChange} 
                />
                <Button type="submit" variant="contained" color="primary">
                    Зберегти
                </Button>
            </form>
        </div>
    )
};

export default DomainsData;