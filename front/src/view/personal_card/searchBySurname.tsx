import { 
    TextField, 
    Typography, 
    Box, 
    Button, 
    CircularProgress, 
    Table, 
    List, 
    Paper, 
    TableContainer,
    TableRow,
    TableHead,
    TableCell,
    TableBody
} from "@mui/material";
import React from "react";

const alphabet = 'АБВГҐДЕЄЖЗІЇЙКЛМНОПРСТУФХЦЧШЩЮЯ'.split('');

const SearchBySurname: React.FC = () => {
    const [selectedLetter, setSelectedLetter] = React.useState<string | null>(null);
    const [searchQuery, setSearchQuery] = React.useState<string>("");
    const [sname, setSname] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState<boolean>(false);

    const fetchSname = async(queryType: 'letter' | 'search' | 'all', value: string='') => {
        setLoading(true);
        let url = "http://localhost:3001/employeers"

        if(queryType === 'letter'){
            url += `?letter=${value}`;
        } else if (queryType === 'search'){
            url += `?query=${value}`;
        }

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
        fetchSname('letter', letter);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
        setSelectedLetter(null);
        if(query.length > 0){
            fetchSname('search', query);
        } else {
            fetchSname('all');
        }
    }

    React.useEffect(() => {
        fetchSname('all');
    }, []);

    return (
        <Box sx={{ p: 2 }}>

            <Box justifyContent={'center'} sx={{ display: 'flex', flexWrap: 'wrap', mt: 2 }}>
                {alphabet.map((letter) => (
                    <Button
                    key={letter}
                        variant={selectedLetter === letter ? "contained" : "outlined"}
                        onClick={() => handleLetterClick(letter)}
                        sx={{
                            m: 0.5,
                            px: 2, 
                            py: 1, 
                            borderRadius: '8px', 
                            minWidth: '50px', 
                            minHeight: '50px', 
                            color: selectedLetter === letter ? 'white' : '#1976d2', 
                            borderColor: '#1976d2', 
                            '&:hover': {
                                bgcolor: selectedLetter === letter ? '#1565c0' : '#e3f2fd', 
                                borderColor: '#1565c0', 
                                boxShadow: selectedLetter === letter ? '0px 4px 12px rgba(0, 0, 0, 0.1)' : 'none',
                            },
                        }}
                    >
                        {letter}
                    </Button>
                ))}
            </Box>

            <TextField 
                label='Введіть прізвище'
                variant="standard"
                value={searchQuery}
                onChange={handleSearchChange}
                margin="normal"
                sx={{
                    width: '20%',
                    marginLeft: 2.5,
                }}
            />

            <Box sx={{ mt: 4, p: 2}}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#222', textAlign: 'center' }}>
                    Результат пошуку
                </Typography>
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                        <CircularProgress />
                    </Box>
                ) : sname.length > 0 ? (
                    <TableContainer 
                        component={Paper} 
                        sx={{ 
                            mt: 2, bgcolor: '#f9f9f9',
                            backgroundColor: '#f9f9f9',
                            maxHeight: 500,
                            overflowY: 'auto',
                        }}
                    >
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold', color: '#555', border: '1px solid #ddd', textAlign: 'center' }}>
                                        Фамилия
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', color: '#555', border: '1px solid #ddd', textAlign: 'center' }}>
                                        Имя
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', color: '#555', border: '1px solid #ddd', textAlign: 'center' }}>
                                        Отчество
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {sname.map((surname) => (
                                    <TableRow key={surname.id}>
                                        <TableCell sx={{ padding: '10px', color: '#333', border: '1px solid #ddd' }}>
                                            {surname.sname}
                                        </TableCell>
                                        <TableCell sx={{ padding: '10px', color: '#333', border: '1px solid #ddd' }}>
                                            {surname.fname}
                                        </TableCell>
                                        <TableCell sx={{ padding: '10px', color: '#333', border: '1px solid #ddd' }}>
                                            {surname.fatherly}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
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