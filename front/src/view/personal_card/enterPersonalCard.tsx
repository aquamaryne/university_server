import React from "react";
import { Typography, Select, TextField, Grid, Box, Button, MenuItem, FormControl, InputLabel, SelectChangeEvent } from "@mui/material";
import { postDataToTable } from "../../api/data.api.post";

interface FormData {
    name: string;
    surname: string;
    fatherly: string;
    date_of_birth: string;
    age: number;
    achieve: string;
    sex: string;
    position: string;
    department: string;
    domains: string;
    diploma: string;
    number_of_diploma: string;
    name_of_the_high_university: string;
    name_of_the_middle_university: string;
    status_of_education: string;
    academic_title: string;
    family_status: string;
    count_of_children: number;
    children_name: string;
    year_of_birth_children: number;
    date_of_fired: Date;
    unique_card: string;
    identify_code: number;
    language: string;
    accounting_group: string;
    accounting_category: string;
    depot: string;
    military_rank: string;
    military_accounting_specialty: string;
    num: number;
    suitability_for_military_service: string;
    name_of_the_military_office_at_the_place_of_residence: string;
    serial_num_of_passport: number;
    issued_by: string;
    place_of_living: string;
    mobile_phone_number: number;
    data_of_entry: string;
    type_of_study: string;
    position_where_work_now: string;
    number_of_order: number;
    global_work_exp: number;
    global_science_exp: number;
    science_at_this_university: number;
    continuous_work_exp: string;
    academic: string;
    member_of: string;
};

interface OptionData {
    id: string;
    label: string;
};


const EnterPersonalCard: React.FC = () => {
    const [formData, setFormData] = React.useState<FormData>({
        name: '',
        surname: '',
        fatherly: '',
        date_of_birth: '',
        age: 0,
        achieve: '',
        sex: '',
        position: '',
        department: '',
        domains: '',
        diploma: '',
        number_of_diploma: '',
        name_of_the_high_university: '',
        name_of_the_middle_university: '',
        status_of_education: '',
        academic_title: '',
        family_status: '',
        count_of_children: 0,
        children_name: '',
        year_of_birth_children: 0,
        date_of_fired: new Date(),
        unique_card: '',
        identify_code: 0,
        language: '',
        accounting_group: '',
        accounting_category: '',
        depot: '',
        military_rank: '',
        military_accounting_specialty: '',
        num: 0,
        suitability_for_military_service: '',
        name_of_the_military_office_at_the_place_of_residence: '',
        serial_num_of_passport: 0,
        issued_by: '',
        place_of_living: '',
        mobile_phone_number: 0,
        data_of_entry: '',
        type_of_study: '',
        position_where_work_now: '',
        number_of_order: 0,
        global_work_exp: 0,
        global_science_exp: 0,
        science_at_this_university: 0,
        continuous_work_exp: '',
        academic: '',
        member_of: '',
    });

    const [educationOptions, setEducationOptions] = React.useState<OptionData[]>([]);

    React.useEffect(() => {
        const fetchOptions = async () => {
            try{
                const responce = await fetch('http://localhost:3001/sex');
                const data = await responce.json();
                setEducationOptions(data);
            } catch (error){
                console.error(`Error fetching options ${error}`);
            }
        }

        fetchOptions();
    }, []);

    const handleChange = (e: SelectChangeEvent<string>) => {
       const { name, value } = e.target as HTMLInputElement;
       setFormData({
        ...formData,
        [name]: value,
       });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            const responce = await postDataToTable(formData);
            console.log(`Form submitted ${responce}`)
        }  catch (error) {
            console.error(`Error submitting form ${error}`)
        }
    }

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h4">Форма вводу даних</Typography>

            {/* Basic Info */}
            {/* <TextField label="Name" name="name" value={formData.name} onChange={handleChange} fullWidth />
            <TextField label="Surname" name="surname" value={formData.surname} onChange={handleChange} fullWidth />
            <TextField label="Fatherly" name="fatherly" value={formData.fatherly} onChange={handleChange} fullWidth />
            <TextField label="Date of Birth" name="date_of_birth" type="date" value={formData.date_of_birth} onChange={handleChange} fullWidth InputLabelProps={{ shrink: true }} />
            <TextField label="Age" name="age" type="number" value={formData.age} onChange={handleChange} fullWidth /> */}

            {/* Achievement */}
            {/* <TextField label="Achievements" name="achieve" value={formData.achieve} onChange={handleChange} fullWidth /> */}

            {/* Sex */}
            <FormControl fullWidth>
                <InputLabel id="sex-label">Стать</InputLabel>
                <Select labelId="sex-label" name="sex" value={formData.sex} onChange={handleChange}>
                {educationOptions.map((option) => (
                    <MenuItem
                        sx={{
                            fontFamily: '"Arial", "Roboto", "Helvetica", "sans-serif"',
                            color: 'white',
                            backgroundColor: 'black',
                        }} 
                        key={option.id} 
                        value={option.id}>
                            {option.label}
                    </MenuItem>
                ))}
                </Select>
            </FormControl>

            {/* Position */}
            {/* <FormControl fullWidth>
                <InputLabel id="position-label">Position</InputLabel>
                <Select labelId="position-label" name="position" value={formData.position} onChange={handleChange}>
                {positionOptions.map((option) => (
                    <MenuItem key={option.id} value={option.id}>{option.label}</MenuItem>
                ))}
                </Select>
            </FormControl> */}

            {/* Department */}
            {/* <FormControl fullWidth>
                <InputLabel id="department-label">Department</InputLabel>
                <Select labelId="department-label" name="department" value={formData.department} onChange={handleChange}>
                {departmentOptions.map((option) => (
                    <MenuItem key={option.id} value={option.id}>{option.label}</MenuItem>
                ))}
                </Select>
            </FormControl> */}

            {/* Other fields... */}

            <Button variant="contained" type="submit">Submit</Button>
        </Box>
    );
}

export default EnterPersonalCard;