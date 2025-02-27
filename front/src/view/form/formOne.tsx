import React from 'react';
import { Table, TableCell, TableBody, TableContainer, TableHead, TableRow, Paper, Button, Select, MenuItem, FormControl, TextField, SelectChangeEvent, Typography, Menu } from "@mui/material";
import ReactToPrint, { useReactToPrint } from 'react-to-print';
import { LocalizationProvider  } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import uk from "date-fns/locale/uk";
import enUS from 'date-fns/locale/en-US';
import PrintIcon from '@mui/icons-material/Print';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';


const FormOne: React.FC = () => {
    const componentRef = React.useRef<HTMLDivElement>(null);
    const[selecterdDepartment, setSelectedDepartment] = React.useState<string | number>("");
    const[loading, setLoading] = React.useState<boolean>(true);
    const [selectedDate, setSelectedDate] = React.useState<Date | null>(new Date());
    const[startPage, setStartPage] = React.useState<string>('');
    const[menuArchor, setMenuArchor] = React.useState<null | HTMLElement>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value;

        if(!isNaN(Number(value)) && Number(value) >= 0){
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
                    <h4 style={{margin: 0, marginBottom: "5px"}}>СПИСОК</h4>
                    <p style={{ margin: 0, marginBottom: "5px"}}>академіків, членів-кореспондентів академій наук, докторів наук, професорів,</p>
                    <p style={{ margin: 0, marginBottom: "5px"}}>Заслужених діячів наук і техніки України, Заслужених працівників народної освіти (культури і т.ін.),</p>
                    <p style={{ margin: 0, marginBottom: "5px"}}>Лауреатів премій, депутатів Верховної Ради України</p>
                    <p style={{ margin: 0, marginBottom: "15px"}}>
                        на {selectedDate?.toLocaleDateString('uk-UA', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                    <TableContainer 
                        ref={componentRef}
                        component={Paper}
                        sx={{
                            '@media print': {
                                transform: 'scale(1)',
                                margin: '3mm',
                                border: '1px solid black',
                                width: 'calc(100% - 5mm)',
                            },
                            '@page': {
                                size: 'A4 landscape',
                            }
                        }}
                    >
                        <Table
                            size="small"
                            sx={{
                                tableLayout: 'fixed',
                                borderCollapse: 'collapse',
                                padding: 'center',
                                fontFamily: 'Roboto, sans-serif',
                                '& th': {
                                    border: '1px solid black',
                                    padding: '4px',
                                    textAlign: 'center',
                                },
                                "& td": {
                                    border: 'none',

                                },
                                '@media print': {
                                    '& th, & td': {
                                        fontSize: '9px',
                                    }
                                }
                            }}
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell rowSpan={2}>№ п/п</TableCell>
                                    <TableCell rowSpan={2}>Прізвище, ім'я та по-батькові</TableCell>
                                    <TableCell rowSpan={2}>Посада</TableCell>
                                    <TableCell rowSpan={2}>Дата вступу на посаду</TableCell>
                                    <TableCell rowSpan={2}>Дисципліна, яку читає</TableCell>
                                    <TableCell rowSpan={2}>Штат чи сумісник</TableCell>
                                    <TableCell rowSpan={2}>Вчене звання</TableCell>
                                    <TableCell rowSpan={2}>Вчений ступінь</TableCell>
                                    <TableCell colSpan={2}>Стаж науково-пед. роботи</TableCell>
                                    <TableCell rowSpan={2}>Рік останнього підвищення кваліфікації</TableCell>
                                    <TableCell colSpan={3}>Загальні дані</TableCell>
                                    <TableCell rowSpan={2}>Почесне звання</TableCell>
                                    <TableCell rowSpan={2}>Іноземна мова, якою володіє</TableCell>
                                    <TableCell rowSpan={2}>Звільнення, у який навч. заклад</TableCell>
                                    <TableCell rowSpan={2}>Дата закінчення трудового договору або контракту</TableCell>
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
                            <TableBody>
                                
                                    
                            </TableBody>
                            
                        </Table>
                    </TableContainer>
                    <div style={{ marginTop: '20px'}}>
                        <Typography variant="body1" sx={{ fontFamily: 'Roboto, sans-serif' }}>
                            {`「${startPage}」`}
                        </Typography>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormOne;
