import React from 'react';
import { Table, TableCell, TableBody, TableContainer, TableHead, TableRow, Paper, Button, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import ReactToPrint, { useReactToPrint } from 'react-to-print';
import PrintIcon from '@mui/icons-material/Print';


interface Department { 
    id: number;
    name: string;
}

const PrintForm: React.FC = () => {
    const componentRef = React.useRef<HTMLDivElement>(null);
    const[department, setDepartment] = React.useState<Department[]>([]);
    const[selecterdDepartment, ssetSelectedDepartment] = React.useState<string | number>("");
    const[loading, setLoading] = React.useState<boolean>(true);

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'Друк формуляра',
        onAfterPrint: () => console.log('Друк завершено'),
    });

    return (
        <div style={{ justifyContent: 'center', padding: '16px' }}>
            <FormControl>
                <Select 
                    label='Кафедра'
                    variant="standard" 
                    sx={{ 
                        width: '200px', 
                        height: "40px", 
                        marginBottom: '20px', 
                        marginRight: "10px" 
                    }} 
                >
                    <MenuItem value="" disabled>
                        {loading ? 'Завантаження...' : 'Виберіть кафедру'}
                    </MenuItem>
                    {department.map((dep) => (
                        <MenuItem key={dep.id} value={dep.id}>
                            {dep.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button
                variant='contained'
                onClick={handlePrint}
                color='primary'
                endIcon={<PrintIcon />}
                sx={{
                    border: '1px solid #3f51b5',
                    borderRadius: 0,
                }}
            >
                Друк
            </Button>
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
                        '& th, & td': {
                            border: '1px solid black',
                            padding: '4px',
                            textAlign: 'center',
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
        </div>
    )
}

export default PrintForm;
