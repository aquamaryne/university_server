import React, { ReactNode } from "react";
import {
    TextField,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Button,
    MenuItem,
    Select,
    InputLabel,
    Checkbox,
    Grid,
    SelectChangeEvent,
} from "@mui/material";
interface FormData {
    card_num: string;
    fname: string;
    sname: string;
    fatherly: string;
    date_of_birth: number | string;
    department: string;
    domain: string;
    position: string;
    education: string;
};

const EnterDataToForm: React.FC = () => {
    const[formData, setFormData] = React.useState<FormData>({
        card_num: "",
        fname: "",
        sname: "",
        fatherly: "",
        date_of_birth: "",
        department: "",
        domain: "",
        position: "",
        education: "",
    });

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>
    ) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name!]:value
        })
    }

    const handleCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData({
            ...formData,
            [name!]: checked,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Submited Data: ', formData);
        alert("Data send!");
    };

    return(
        <form onSubmit={handleSubmit} style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
            <h2>Введіть дані</h2>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="Особова картка №"
                    variant="outlined"
                    name="cardNumber"
                    value={formData.card_num}
                    onChange={handleInputChange}
                />
                </Grid>
                <Grid item xs={12} sm={4}>
                <TextField
                    fullWidth
                    label="Прізвище"
                    variant="outlined"
                    name="lastName"
                    value={formData.sname}
                    onChange={handleInputChange}
                />
                </Grid>
                <Grid item xs={12} sm={4}>
                <TextField
                    fullWidth
                    label="Ім'я"
                    variant="outlined"
                    name="firstName"
                    value={formData.fname}
                    onChange={handleInputChange}
                />
                </Grid>
                <Grid item xs={12} sm={4}>
                <TextField
                    fullWidth
                    label="По батькові"
                    variant="outlined"
                    name="middleName"
                    value={formData.fatherly}
                    onChange={handleInputChange}
                />
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Рік народження"
                    variant="outlined"
                    type="number"
                    name="birthYear"
                    value={formData.date_of_birth}
                    onChange={handleInputChange}
                />
                </Grid>
                <Grid item xs={12} sm={6}>
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel>Підрозділ</InputLabel>
                        <Select
                            name="department"
                            value={formData.department}
                            onChange={(e: SelectChangeEvent<string>, child: ReactNode) => {
                                console.log(e.target.value)
                            }} 
                        >
                        <MenuItem value="department1">Підрозділ 1</MenuItem>
                        <MenuItem value="department2">Підрозділ 2</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel>Посада</InputLabel>
                        <Select
                            name="position"
                            value={formData.position}
                            onChange={(e: SelectChangeEvent<string>, child: ReactNode) => {
                                console.log(e.target.value)
                            }}                         >
                        <MenuItem value="position1">Посада 1</MenuItem>
                        <MenuItem value="position2">Посада 2</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Освіта"
                        variant="outlined"
                        name="education"
                        value={formData.education}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                    Зберегти
                </Button>
                </Grid>
            </Grid>
        </form>
    )
}

export default EnterDataToForm;