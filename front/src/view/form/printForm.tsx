import React from 'react';
import { Table, TableCell, TableBody, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import ReactToPrint from 'react-to-print';

const PrintForm: React.FC = () => {
    const componentRef = React.useRef<HTMLDivElement>(null);
    return (
        <div>
            <TableContainer 
                ref={componentRef}
                component={Paper}
                sx={{
                    '@media print': {
                        width: '99%',
                        margin: '0',
                        border: '1px solid black',
                        boxShadow: 'none',
                    },
                }}
            >
                <Table 
                    size="small"
                    sx={{
                        borderCollapse: 'collapse',
                        tableLayout: 'fixed',
                    }}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell rowSpan={2} align="center" sx={{ fontWeight: 'bold', border: '1px solid black', textAlign: 'center', verticalAlign: 'middle' }}>
                                № п/п
                            </TableCell>
                            <TableCell rowSpan={2} align="center" sx={{ fontWeight: 'bold', border: '1px solid black', textAlign: 'center', verticalAlign: 'middle' }}>
                                Прізвище, ім'я та по-батькові
                            </TableCell>
                            <TableCell rowSpan={2} align="center" sx={{ fontWeight: 'bold', border: '1px solid black', textAlign: 'center', verticalAlign: 'middle' }}>
                                Посада
                            </TableCell>
                            <TableCell rowSpan={2} align="center" sx={{ fontWeight: 'bold', border: '1px solid black', textAlign: 'center', verticalAlign: 'middle' }}>
                                Дата вступу на посаду
                            </TableCell>
                            <TableCell rowSpan={2} align="center" sx={{ fontWeight: 'bold', border: '1px solid black', textAlign: 'center', verticalAlign: 'middle' }}>
                                Дисципліна, яку читає
                            </TableCell>
                            <TableCell rowSpan={2} align="center" sx={{ fontWeight: 'bold', border: '1px solid black', textAlign: 'center', verticalAlign: 'middle' }}>
                                Штат чи сумісник
                            </TableCell>
                            <TableCell rowSpan={2} align="center" sx={{ fontWeight: 'bold', border: '1px solid black', textAlign: 'center', verticalAlign: 'middle' }}>
                                Вчене звання
                            </TableCell>
                            <TableCell rowSpan={2} align="center" sx={{ fontWeight: 'bold', border: '1px solid black', textAlign: 'center', verticalAlign: 'middle' }}>
                                Вчений ступінь
                            </TableCell>
                            <TableCell colSpan={2} align="center" sx={{ fontWeight: 'bold', border: '1px solid black', textAlign: 'center', verticalAlign: 'middle' }}>
                                Стаж науково-пед. роботи
                            </TableCell>
                            <TableCell rowSpan={2} align="center" sx={{ fontWeight: 'bold', border: '1px solid black', textAlign: 'center', verticalAlign: 'middle' }}>
                                Рік останнього підвищення кваліфікації
                            </TableCell>
                            <TableCell colSpan={3} align="center" sx={{ fontWeight: 'bold', border: '1px solid black', textAlign: 'center', verticalAlign: 'middle' }}>
                                Загальні дані
                            </TableCell>
                            <TableCell rowSpan={2} align="center" sx={{ fontWeight: 'bold', border: '1px solid black', textAlign: 'center', verticalAlign: 'middle' }}>
                                Почесне звання
                            </TableCell>
                            <TableCell rowSpan={2} align="center" sx={{ fontWeight: 'bold', border: '1px solid black', textAlign: 'center', verticalAlign: 'middle' }}>
                                Іноземна мова, якою володіє
                            </TableCell>
                            <TableCell rowSpan={2} align="center" sx={{ fontWeight: 'bold', border: '1px solid black', textAlign: 'center', verticalAlign: 'middle' }}>
                                Звільнення, у який навч. заклад
                            </TableCell>
                            <TableCell rowSpan={2} align="center" sx={{ fontWeight: 'bold', border: '1px solid black', textAlign: 'center', verticalAlign: 'middle' }}>
                                Дата закінчення трудового договору або контракту
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center" sx={{ fontWeight: 'bold', border: '1px solid black', textAlign: 'center', verticalAlign: 'middle' }}>Загальний</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold', border: '1px solid black', textAlign: 'center', verticalAlign: 'middle' }}>У даному ВНЗ</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold', border: '1px solid black', textAlign: 'center', verticalAlign: 'middle' }}>Рік народження</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold', border: '1px solid black', textAlign: 'center', verticalAlign: 'middle' }}>Стать</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold', border: '1px solid black', textAlign: 'center', verticalAlign: 'middle' }}>
                                Освіта (який навч. заклад закінч. і коли)
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            {Array(18).fill(0).map((_, index) => (
                                <TableCell key={index} align="center" sx={{ fontWeight: 'bold', border: '1px solid black' }}>
                                    {index + 1}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>

                    </TableBody>
                </Table>
            </TableContainer>
            <div style={{ marginBottom: '1rem' }}>
                <ReactToPrint
                    trigger={() => (
                        <Button variant='contained' color='primary' sx={{ mb: 2 }}>
                            Друкувати
                        </Button>
                    )}
                    content={() => componentRef.current}
                />
            </div>
        </div>
    )
}

export default PrintForm;
