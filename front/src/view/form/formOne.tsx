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

interface People { 
    id: number;
    domain_name: string;
};

const FacultyData = [
    {
        id: 1,
        fullName: "Іваненко Петро Васильович",
        position: "Доцент",
        entryDate: "15.09.2010",
        discipline: "Математичний аналіз",
        staffType: "Штатний",
        academicTitle: "Кандидат наук",
        academicDegree: "Доцент",
        totalExperience: 20,
        universityExperience: 15,
        lastQualificationYear: 2022,
        birthYear: 1980,
        gender: "Чоловік",
        education: "КНУ ім. Шевченка, 2002",
        honoraryTitle: "Заслужений викладач",
        foreignLanguage: "Англійська",
        dismissal: "",
        contractEndDate: "31.08.2030"
    },
    {
        id: 2,
        fullName: "Сидоренко Марина Олександрівна",
        position: "Старший викладач",
        entryDate: "01.02.2015",
        discipline: "Фізика",
        staffType: "Штатний",
        academicTitle: "-",
        academicDegree: "Кандидат наук",
        totalExperience: 12,
        universityExperience: 9,
        lastQualificationYear: 2021,
        birthYear: 1985,
        gender: "Жінка",
        education: "ХНУ ім. Каразіна, 2008",
        honoraryTitle: "",
        foreignLanguage: "Німецька",
        dismissal: "",
        contractEndDate: "31.08.2028"
    },
    {
        id: 3,
        fullName: "Коваленко Андрій Ігорович",
        position: "Професор",
        entryDate: "12.07.2005",
        discipline: "Програмування",
        staffType: "Штатний",
        academicTitle: "Доктор наук",
        academicDegree: "Професор",
        totalExperience: 25,
        universityExperience: 18,
        lastQualificationYear: 2023,
        birthYear: 1975,
        gender: "Чоловік",
        education: "Львівська політехніка, 1997",
        honoraryTitle: "Академік НАН України",
        foreignLanguage: "Французька",
        dismissal: "",
        contractEndDate: "31.08.2035"
    },
    {
        id: 4,
        fullName: "Григоренко Ольга Миколаївна",
        position: "Асистент",
        entryDate: "05.09.2020",
        discipline: "Хімія",
        staffType: "Сумісник",
        academicTitle: "-",
        academicDegree: "Магістр",
        totalExperience: 5,
        universityExperience: 3,
        lastQualificationYear: 2023,
        birthYear: 1995,
        gender: "Жінка",
        education: "КПІ, 2018",
        honoraryTitle: "",
        foreignLanguage: "Англійська, Польська",
        dismissal: "",
        contractEndDate: "31.08.2025"
    },
    {
        id: 5,
        fullName: "Мельник Дмитро Віталійович",
        position: "Доцент",
        entryDate: "20.03.2012",
        discipline: "Електротехніка",
        staffType: "Штатний",
        academicTitle: "Кандидат наук",
        academicDegree: "Доцент",
        totalExperience: 18,
        universityExperience: 12,
        lastQualificationYear: 2020,
        birthYear: 1982,
        gender: "Чоловік",
        education: "Одеський національний університет, 2004",
        honoraryTitle: "",
        foreignLanguage: "Іспанська",
        dismissal: "",
        contractEndDate: "31.08.2029"
    }
];

interface FacultyMember {
    id: number;
    fullName: string;
    position: string;
    entryDate: string;
    discipline: string;
    staffType: string;
    academicTitle: string;
    academicDegree: string;
    totalExperience: number;
    universityExperience: number;
    lastQualificationYear: number;
    birthYear: number;
    gender: string;
    education: string;
    honoraryTitle: string;
    foreignLanguage: string;
    dismissal: string;
    contractEndDate: string;
}

interface FacultyTableProps {
    facultyData: FacultyMember[];
}

const FormOne: React.FC = () => {
    const componentRef = React.useRef<HTMLDivElement>(null);
    const[selecterdDepartment, setSelectedDepartment] = React.useState<string | number>("");
    const[loading, setLoading] = React.useState<boolean>(true);
    const [selectedDate, setSelectedDate] = React.useState<Date | null>(new Date());
    const[startPage, setStartPage] = React.useState<string>('');
    const[menuArchor, setMenuArchor] = React.useState<null | HTMLElement>(null);
    const[selectedRow, setSelectedRow] = React.useState<FacultyMember | null>(null);

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

    const handleContextMenu = (e: React.MouseEvent<HTMLTableRowElement>, row: FacultyMember) => {
        e.preventDefault();
        setSelectedRow(row);
        setMenuArchor(e.currentTarget);
    }

    const handleCloseMenu = () => {
        setMenuArchor(null);
        setSelectedRow(null);
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
                                {FacultyData.map((row) => (
                                    <TableRow 
                                        key={row.id}
                                        onContextMenu={(e) => handleContextMenu(e, row)}
                                        sx={{
                                            transition: 'background-color 0.3s ease-in-out',
                                            "&:hover": {
                                                backgroundColor: "rgba(25, 118, 210, 0.2)",
                                                cursor: 'pointer',
                                            }
                                        }}
                                    >
                                        <TableCell>{row.id}</TableCell>
                                        <TableCell>{row.fullName}</TableCell>
                                        <TableCell>{row.position}</TableCell>
                                        <TableCell>{row.entryDate}</TableCell>
                                        <TableCell>{row.discipline}</TableCell>
                                        <TableCell>{row.staffType}</TableCell>
                                        <TableCell>{row.academicTitle}</TableCell>
                                        <TableCell>{row.academicDegree}</TableCell>
                                        <TableCell>{row.totalExperience}</TableCell>
                                        <TableCell>{row.universityExperience}</TableCell>
                                        <TableCell>{row.lastQualificationYear}</TableCell>
                                        <TableCell>{row.birthYear}</TableCell>
                                        <TableCell>{row.gender}</TableCell>
                                        <TableCell>{row.education}</TableCell>
                                        <TableCell>{row.honoraryTitle}</TableCell>
                                        <TableCell>{row.foreignLanguage}</TableCell>
                                        <TableCell>{row.dismissal || '-'}</TableCell>
                                        <TableCell>{row.contractEndDate}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            <Menu
                                anchorEl={menuArchor}
                                open={Boolean(menuArchor)}
                                onClose={handleCloseMenu}
                            >
                                <MenuItem onClick={() => alert(`👀 Просмотр: ${selectedRow?.fullName}`)}>
                                    Просмотр
                                </MenuItem>
                                <MenuItem onClick={() => alert(`✏️ Редактирование: ${selectedRow?.fullName}`)}>
                                    Редактировать
                                </MenuItem>
                                <MenuItem onClick={() => alert(`🗑️ Удаление: ${selectedRow?.fullName}`)}>
                                    Удалить
                                </MenuItem>
                            </Menu>
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
