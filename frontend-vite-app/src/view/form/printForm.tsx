import React from 'react';
import { Table, TableCell, TableBody, TableContainer, TableHead, TableRow, Paper, InputLabel, Button, Select, MenuItem, FormControl, TextField, SelectChangeEvent, Typography } from "@mui/material";
import ReactToPrint, { useReactToPrint } from 'react-to-print';
import { LocalizationProvider  } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import uk from "date-fns/locale/uk";
import enUS from 'date-fns/locale/en-US';
import PrintIcon from '@mui/icons-material/Print';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

interface Domain { 
    id: number;
    domain_name: string;
};

interface DataItem {
    id: number;
    name: string;
    position: string;
    hire_date: string;
}

const ITEMS_PER_PAGE = 7;

const PrintForm: React.FC = () => {
    const componentRef = React.useRef<HTMLDivElement>(null);
    const[domains, setDomains] = React.useState<Domain[]>([]);
    const[selecterdDepartment, setSelectedDepartment] = React.useState<string | number>("");
    const[data, setData] = React.useState<DataItem[]>([]);
    const[loading, setLoading] = React.useState<boolean>(true);
    const [selectedDate, setSelectedDate] = React.useState<Date | null>(new Date());
    const[startPage, setStartPage] = React.useState<number>(1);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = parseInt(e.target.value);
        if(!isNaN(value) && value >= 0){
            setStartPage(value);
        }
    };

    const handleChangeDate = (newValue: Date | null) => {
        setSelectedDate(newValue);
    };

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'Друк формуляра',
        onAfterPrint: () => console.log('Друк завершено'),
    });

    const handleChange = (e: SelectChangeEvent<{ value: unknown }>) => {
        setSelectedDepartment(e.target.value as string);
    };

    React.useEffect(() => {
        const fetchDomain = async () => {
            try{
                const response = await fetch('http://localhost:3001/domains');
                const data = await response.json();
                setDomains(data);
            } catch(error){
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchDomain();
    }, []);

    const startIndex = (startPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startPage + ITEMS_PER_PAGE;
    const displayedData = data.slice(startIndex, endIndex);

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = 'http://localhost:3001/content-download';
        link.download = 'зміст.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div style={{ justifyContent: 'center', padding: '16px' }}>
            <FormControl>
                <InputLabel>Вкажіть кафедру</InputLabel>
                <Select 
                    label='Кафедра'
                    variant="standard" 
                    onChange={handleChange}
                    sx={{ 
                        width: '200px', 
                        height: "24px", 
                        marginBottom: '20px', 
                        marginRight: "10px" 
                    }} 
                >
                    <MenuItem value="" disabled>
                        {loading ? 'Завантаження...' : 'Виберіть кафедру'}
                    </MenuItem>
                    {/* {domains.map((dom) => (
                        <MenuItem key={dom.id} value={dom.id}>
                            {dom.domain_name}
                        </MenuItem>
                    ))} */}
                </Select>
            </FormControl>
            <TextField
                color='primary'
                variant='outlined'
                label="Введіть початок сторінки"
                sx={{ 
                    borderColor: '#1976d2',
                    width: '200px',
                    '& .MuiInputBase-root': {
                        borderRadius: 0,
                        height: '40.5px',
                    },
                    '& .MuiInputLabel-root': {
                        marginTop: '-6px',
                    }
                }}
                onChange={handleInputChange}
            />
            <LocalizationProvider 
                dateAdapter={AdapterDateFns} 
                adapterLocale={{ ...enUS, ...uk}}
            >
                <DatePicker 
                    value={selectedDate}
                    onChange={handleChangeDate}
                    sx={{
                        width: '150px',
                        marginLeft: '10px',
                        '& .MuiInputBase-root': {
                            borderRadius: 0,
                            border: '1px solid #1976d2',
                            height: '40.5px',
                        }
                    }}
                />
            </LocalizationProvider>
            <Button
                variant='contained'
                onClick={handlePrint}
                color='primary'
                endIcon={<PrintIcon />}
                sx={{
                    border: '1px solid #1976d2',
                    borderRadius: 0,
                    height: '40.5px',
                    marginLeft: '10px',
                }}
            >
                Друк
            </Button>
            <Button
                variant='contained'
                endIcon={<ArrowDownwardIcon />}
                sx={{
                    border: '1px solid #1976d2',
                    borderRadius: 0,
                    marginLeft: '10px',
                }}
                onClick={handleDownload}
            >
                Зміст
            </Button>
            <div ref={componentRef}>
                <div style={{ textAlign: "center", marginBottom: "20px", fontSize: "18px", fontFamily: 'Roboto, sans-serif' }}>
                    <h4 style={{margin: 0, marginBottom: "5px"}}>ШТАТНИЙ ФОРМУЛЯР</h4>
                    <p style={{ margin: 0, marginBottom: "5px"}}>науково-педагогічного складу Національного транспортного університету</p>
                    <p style={{ margin: 0, marginBottom: "15px"}}>
                        на {selectedDate?.toLocaleDateString('uk-UA', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                    <TableContainer 
                        ref={componentRef}
                        component={Paper}
                        sx={{
                            width: '100%',
                            maxWidth: 'none',
                            overflowX: 'auto',
                            margin: 0,
                            padding: 0,
                            '& .MuiTable-root': {
                                width: '100%',
                                minWidth: '100%',
                                tableLayout: 'fixed',
                            },
                            '@media print': {
                                width: '100% !important',
                                maxWidth: 'none !important',
                                margin: 0,
                                padding: 0,
                                overflow: 'visible',
                                boxShadow: 'none',

                                '& .MuiTable-root': {
                                    width: '100% !important',
                                    minWidth: '100% !important',
                                    maxWidth: 'none !important',
                                },

                                '& .MuitableCell-root': {
                                    padding: '2pt',
                                    fontSize: '8pt',
                                }
                            },
                            '@page': {
                                size: 'A4 landscape',
                                margin: '5mm'
                            }
                        }}
                    >
                        <Table
                            size="small"
                            sx={{
                                width: '100%',
                                tableLayout: 'fixed',
                                borderCollapse: 'collapse',
                                fontFamily: 'Roboto, sans-serif',
                                transform: 'scale(1)',
                                transformOrigin: 'top left',
                                '& th, & rd': {
                                    border: '1px solid black',
                                    textAlign: 'center',
                                    verticalAlign: 'middle',
                                    padding: '4px',
                                    fontSize: '13px',
                                    lineHeight: 1.3,
                                    wordWrap: 'break-word',
                                },
                                '@media print': {
                                    width: '100%',
                                    transform: 'scale(0.98)',
                                    margin: '0 auto',
                                    '& th, & rd': {
                                        fontSize: '6pt',
                                        padding: '3pt',
                                    },
                                    breakInside: 'aviod',
                                    pageBreakInside: 'avoid',
                                }
                            }}
                            >
                            <TableHead>
                                <TableRow>
                                    <TableCell rowSpan={2} sx={{ width: '3%' }}>№ п/п</TableCell>
                                    <TableCell rowSpan={2} sx={{ width: '5%' }}>Прізвище, ім'я та по-батькові</TableCell>
                                    <TableCell rowSpan={2} sx={{ width: '5%' }}>Посада</TableCell>
                                    <TableCell rowSpan={2} sx={{ width: '5%' }}>Дата вступу на посаду</TableCell>
                                    <TableCell rowSpan={2} sx={{ width: '5%' }}>Дисципліна, яку читає</TableCell>
                                    <TableCell rowSpan={2} sx={{ width: '3%' }}>Штат чи сумісник</TableCell>
                                    <TableCell rowSpan={2} sx={{ width: '3%' }}>Вчене звання</TableCell>
                                    <TableCell rowSpan={2} sx={{ width: '3%' }}>Вчений ступінь</TableCell>
                                    <TableCell colSpan={2} sx={{ width: '10%' }}>Стаж науково-пед. роботи</TableCell>
                                    <TableCell rowSpan={2} sx={{ width: '4%' }}>Рік останнього підвищення кваліфікації</TableCell>
                                    <TableCell colSpan={3} sx={{ width: '15%' }}>Загальні дані</TableCell>
                                    <TableCell rowSpan={2} sx={{ width: '3%' }}>Почесне звання</TableCell>
                                    <TableCell rowSpan={2} sx={{ width: '3%' }}>Іноземна мова, якою володіє</TableCell>
                                    <TableCell rowSpan={2} sx={{ width: '3%' }}>Звільнення, у який навч. заклад</TableCell>
                                    <TableCell rowSpan={2} sx={{ width: '3%' }}>Дата закінчення трудового договору або контракту</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="center">Загальний</TableCell>
                                    <TableCell align="center">У даному ВНЗ</TableCell>
                                    <TableCell align="center">Рік народження</TableCell>
                                    <TableCell align="center">Стать</TableCell>
                                    <TableCell align="center">Освіта (який навч. заклад закінч. і коли)</TableCell>
                                </TableRow>
                                <TableRow>
                                    {Array(18).fill(0).map((_, index) => (
                                        <TableCell key={index} align="center">
                                            {index + 1}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody
                                sx={{
                                    transition: 'background-color 0.3s ease-in-out',
                                    "&:hover": {
                                        backgroundColor: "rgba(25, 118, 210, 0.2)",
                                        cursor: 'pointer',
                                    }
                                }}
                            >
                                {displayedData.map((item) => (
                                    <h1></h1>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div style={{ marginTop: '20px'}}>
                        <Typography variant="body1" sx={{ fontFamily: 'Roboto, sans-serif', fontSize: '13px' }}>
                            {`「${startPage}」`}
                        </Typography>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PrintForm;
