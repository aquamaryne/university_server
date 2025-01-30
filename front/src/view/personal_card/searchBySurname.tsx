import { 
    TextField, 
    Typography, 
    Box, 
    Button, 
    CircularProgress, 
    Table, 
    Paper, 
    TableContainer,
    TableRow,
    TableHead,
    TableCell,
    TableBody,
    Checkbox,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import React from "react";

const alphabet = 'АБВГҐДЕЄЖЗІЇЙКЛМНОПРСТУФХЦЧШЩЮЯ'.split('');

const SearchBySurname: React.FC = () => {
    const [selectedLetter, setSelectedLetter] = React.useState<string | null>(null);
    const [searchQuery, setSearchQuery] = React.useState<string>("");
    const [sname, setSname] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [selectedCard, setSelectedCards] = React.useState<Set<number>>(new Set());
    const [isPreviewOpen, setIsPreviewOpen] = React.useState(false);

    const printRef = React.useRef<HTMLDivElement>(null);

    const navigate = useNavigate();

    const fetchSname = async(queryType: 'letter' | 'search' | 'all', value: string='') => {
        setLoading(true);
        let url = "http://localhost:3001/employeers/search"

        if(queryType === 'letter' && value){
            url += `?letter=${encodeURIComponent(value)}`;
        } else if (queryType === 'search' && value){
            url += `?query=${encodeURIComponent(value)}`;
        } else {
            url += `?all=true`
        }

        console.log('Query URL', url);

        try{
            const responce = await fetch(url);
            const text = await responce.text();
            console.log("Responce status: ", responce.status)
            if(!responce.ok){
                throw new Error('Error while loading data');
            }

            const data = await JSON.parse(text);
            console.log("Receive data", data);
            setSname(data);
        } catch(error){
            console.error("Error while loading data", error);
            setSname([]);
        } finally {
            setLoading(false);
        }
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

    const handleSelectedCard = (id: number) => {
        const updatedSelected = new Set(selectedCard);
        if(updatedSelected.has(id)){
            updatedSelected.delete(id);
        } else {
            updatedSelected.add(id);
        }

        setSelectedCards(updatedSelected);
    }

    React.useEffect(() => {
        fetchSname('all');
    }, []);

    const handleDuplicate = () => {
        const duplicate = Array.from(selectedCard).map((id) => {
            const original = sname.find((item) => item.id === id);
            console.log("Original item", original);
            
            if(original){
                return {
                    ...original,
                    id: `Duplicate-${Date.now()}-${Math.random()}`,
                };
            }

            return null;
        }).filter((item) => item !== null);
        console.log("Duplicate items", duplicate);

        if(duplicate.length > 0){
            setSname((prevSname) => [...sname, ...duplicate]);
            console.log("Updated sname", [...sname, ...duplicate]);
        }
    };

    const handlePrint = useReactToPrint({
        content: () => printRef.current,
        documentTitle: 'Personal Card',
    });

    const handleDelete = () => {
        const updatedSname = sname.filter((item) => !selectedCard.has(item.id));
        setSname(updatedSname);
        setSelectedCards(new Set());
    };

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
                            borderRadius: 0, 
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
                    <>
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
                                        <TableCell sx={{ fontWeight: 'bold', color: '#555', border: '1px solid #ddd', textAlign: 'center'}}>
                                            Номер картки
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: 'bold', color: '#555', border: '1px solid #ddd', textAlign: 'center' }}>
                                            Прізвище
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: 'bold', color: '#555', border: '1px solid #ddd', textAlign: 'center' }}>
                                            Ім'я
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: 'bold', color: '#555', border: '1px solid #ddd', textAlign: 'center' }}>
                                            По батькові
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: 'bold', color: '#555', border: '1px solid #ddd', textAlign: 'center' }}>
                                            Взаємодія
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {sname.map((surname) => (
                                    <TableRow 
                                        key={surname.id}
                                        sx={{
                                            backgroundColor: selectedCard.has(surname.id) ? '#e3f2fc' : 'transparent',
                                            transition: 'background-color 0.1s ease',
                                            padding: 0,
                                            '&:not(:last-child) td': {
                                                borderBottom: '1px solid #ddd'
                                            }
                                        }}
                                    >
                                        <TableCell sx={{ padding: '10px', color: '#333', border: '1px solid #ddd' }}>
                                            <Checkbox 
                                                checked={selectedCard.has(surname.id)}
                                                onChange={() => handleSelectedCard(surname.id)}
                                                color="primary"
                                                sx={{ marginRight: 1 }}
                                            />
                                            {surname.unique_card}
                                        </TableCell>
                                        <TableCell sx={{ padding: '10px', color: '#333', border: '1px solid #ddd', width: '20%' }}>
                                            {surname.sname}
                                        </TableCell>
                                        <TableCell sx={{ padding: '10px', color: '#333', border: '1px solid #ddd', width: '20%' }}>
                                            {surname.fname}
                                        </TableCell>
                                        <TableCell sx={{ padding: '10px', color: '#333', border: '1px solid #ddd', width: '20%' }}>
                                            {surname.fatherly}
                                        </TableCell>
                                        <TableCell sx={{ padding: 0, border: '1px solid #ddd', width: '20%' }}>
                                            <Button
                                                fullWidth
                                                sx={{
                                                    flex: 1,                                              
                                                    color: 'white',
                                                    backgroundColor: '#4169E1',
                                                    border: 'none',
                                                    '&:hover': {
                                                        backgroundColor: '#365E9B',
                                                    },
                                                    padding: 0,
                                                    borderRadius: 0,
                                                    minHeight: '65px',
                                                }}
                                                onClick={() => navigate(`/view/personal_card/personalCard/${surname.id}`)}
                                            >
                                                Редагування
                                            </Button> 
                                        </TableCell>
                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, gap: 2, width: '100%' }}>
                            <Button 
                                variant="outlined" 
                                color="primary" 
                                sx={{ width: '100%', fontSize: '16px', padding: '10px 24px' }}
                                onClick={handleDuplicate}
                            >
                                Зробити дубль
                            </Button>
                            <Button 
                                variant="outlined" 
                                color="primary" 
                                sx={{ width: '100%', fontSize: '16px', padding: '10px 24px' }}
                                onClick={handlePrint}
                            >
                                Друк довідки
                            </Button>
                            <Button 
                                variant="outlined" 
                                color="primary" 
                                sx={{ width: '100%', fontSize: '16px', padding: '10px 24px' }}
                                onClick={handleDelete}
                            >
                                Видалити картку
                            </Button>
                        </Box>
                    </>
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