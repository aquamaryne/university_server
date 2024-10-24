import { TextField, Typography, Box, Button, CircularProgress, ListItem, List, Paper } from "@mui/material";
import React from "react";

const alphabet = 'АБВГҐДЕЄЖЗІЇЙКЛМНОПРСТУФХЦЧШЩЮЯ'.split('');

const SearchBySurname: React.FC = () => {
    const [selectedLetter, setSelectedLetter] = React.useState<string | null>(null);
    const [searchQuery, setSearchQuery] = React.useState<string>("");
    const [sname, setSname] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState<boolean>(false);

    const fetchSname = async(url: string) => {
        setLoading(true);
        try{
            const responce = await fetch(url);
            if(!responce.ok){
                throw new Error('Error while loading data');
            }
            const data = await responce.json();
            setSname(data);
        } catch(error){
            console.error("Error while loading data", error);
            setSname([]);
        }
        setLoading(false);
    };

    const handleLetterClick = (letter: string) => {
        setSelectedLetter(letter);
        setSearchQuery("");
        fetchSname(`http://localhost:3001/employeers?letter=${letter}`);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
        setSelectedLetter(null);
        if(query.length > 0){
            fetchSname(`http://localhost:3001/employeers?letter=${query}`);
        } else {
            fetchSname(`http://localhost:3001/employeers`);
        }
    }

    React.useEffect(() => {
        fetchSname(`http://localhost:3001/employeers`);
    }, []);

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h4" gutterBottom>Пошук по прізвищу</Typography>
            <TextField 
                label='Введіть прізвище'
                variant="outlined"
                value={searchQuery}
                onChange={handleSearchChange}
                fullWidth
                margin="normal"
            />

            <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 2 }}>
                { alphabet.map((letter) => (
                    <Button
                        key={letter}
                        variant={selectedLetter === letter ? "contained" : "outlined"}
                        onClick={() => handleLetterClick(letter)}
                        sx={{ m: 0.5 }}
                    >
                        {letter}
                    </Button>
                ))}
            </Box>

            <Box sx={{ mt: 4, p: 2, bgcolor: '#f0f0f0', borderRadius: '8px', boxShadow: 2 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#222' }}>
                    Результат пошуку
                </Typography>
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                        <CircularProgress />
                    </Box>
                ) : sname.length > 0 ? (
                    <List>
                        {sname.map((surname) => (
                            <ListItem key={surname.id} sx={{ borderBottom: '1px solid #ddd', padding: '10px 0', bgcolor: '#fff' }}>
                                <Typography variant="body1" sx={{ color: '#333' }}>
                                    {surname.sname}
                                </Typography>
                            </ListItem>
                        ))}
                    </List>
                ) : (
                    <Typography variant="body1" sx={{ color: '#777', mt: 2 }}>
                        Нема результату
                    </Typography>
                )}
            </Box>
        </Box>
    )
}

export default SearchBySurname;