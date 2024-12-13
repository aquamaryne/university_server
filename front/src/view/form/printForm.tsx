import React from 'react';
import { Table, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const PrintForm: React.FC = () => {
    return (
        <TableContainer 
            component={Paper}
            sx={{
                fontSize: "12px",
                width: "99%",
                boxShadow: 'none',
                margin: "0 auto",
            }}
        >
            <Table 
                size="small"
                sx={{
                    borderCollapse: 'collapse',
                }}
            >
                <TableHead>
                    <TableRow sx={{ border: '1px solid black' }}>
                        <TableCell rowSpan={2} align="center" sx={{ fontWeight: 'bold', border: '1px solid black' }}>
                            № п/п
                        </TableCell>
                        <TableCell rowSpan={2} align="center" sx={{ fontWeight: 'bold', border: '1px solid black' }}>
                            Прізвище, ім'я та по-батькові
                        </TableCell>
                        <TableCell rowSpan={2} align="center" sx={{ fontWeight: 'bold', border: '1px solid black' }}>
                            Посада
                        </TableCell>
                        <TableCell rowSpan={2} align="center" sx={{ fontWeight: 'bold', border: '1px solid black' }}>
                            Дата вступу на посаду
                        </TableCell>
                        <TableCell rowSpan={2} align="center" sx={{ fontWeight: 'bold', border: '1px solid black' }}>
                            Дисципліна, яку читає
                        </TableCell>
                        <TableCell rowSpan={2} align="center" sx={{ fontWeight: 'bold', border: '1px solid black' }}>
                            Штат чи сумісник
                        </TableCell>
                        <TableCell rowSpan={2} align="center" sx={{ fontWeight: 'bold', border: '1px solid black' }}>
                            Вчене звання
                        </TableCell>
                        <TableCell rowSpan={2} align="center" sx={{ fontWeight: 'bold', border: '1px solid black' }}>
                            Вчений ступінь
                        </TableCell>
                        <TableCell colSpan={2} align="center" sx={{ fontWeight: 'bold', border: '1px solid black' }}>
                            Стаж науково-пед. роботи
                        </TableCell>
                        <TableCell rowSpan={2} align="center" sx={{ fontWeight: 'bold', border: '1px solid black' }}>
                            Рік останнього підвищення кваліфікації
                        </TableCell>
                        <TableCell colSpan={3} align="center" sx={{ fontWeight: 'bold', border: '1px solid black' }}>
                            Загальні дані
                        </TableCell>
                        <TableCell rowSpan={2} align="center" sx={{ fontWeight: 'bold', border: '1px solid black' }}>
                            Почесне звання
                        </TableCell>
                        <TableCell rowSpan={2} align="center" sx={{ fontWeight: 'bold', border: '1px solid black' }}>
                            Іноземна мова, якою володіє
                        </TableCell>
                        <TableCell rowSpan={2} align="center" sx={{ fontWeight: 'bold', border: '1px solid black' }}>
                            Звільнення, у який навч. заклад
                        </TableCell>
                        <TableCell rowSpan={2} align="center" sx={{ fontWeight: 'bold', border: '1px solid black' }}>
                            Дата закінчення трудового договору або контракту
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="center" sx={{ fontWeight: 'bold', border: '1px solid black' }}>Загальний</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold', border: '1px solid black' }}>У даному ВНЗ</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold', border: '1px solid black' }}>Рік народження</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold', border: '1px solid black' }}>Стать</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold', border: '1px solid black' }}>
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
            </Table>
        </TableContainer>
    )
}

export default PrintForm;
