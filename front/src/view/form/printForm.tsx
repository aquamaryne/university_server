import React from 'react';
import { Table, TableCell, TableBody, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import ReactToPrint, { useReactToPrint } from 'react-to-print';

const PrintForm: React.FC = () => {
    const componentRef = React.useRef<HTMLDivElement>(null);

    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
      documentTitle: 'Друк формуляра',
      onAfterPrint: () => console.log('Друк завершено'),
    });

    return (
        <div>
            <Button
                variant='contained'
                onClick={handlePrint}
                color='primary'
                sx={{ marginBottom: '2px' }}
                >
                Друк
            </Button>
            <TableContainer 
                ref={componentRef}
                component={Paper}
                sx={{
                    '@media print': {
                        border: '1px solid black',
                        boxShadow: 'none',
                        margin: '0',
                        width: '100%',
                    },
                    '@page': {
                        size: 'A4 landscape',
                        margin: '0',
                    }
                }}
            >
                <Table
                    size="small"
                    sx={{
                        tableLayout: 'fixed',
                        borderCollapse: 'collapse',
                        width: '100%',
                        '& th, & td': {
                            border: '1px solid black',
                            wordWrap: 'break-word',
                            whiteSpace: 'normal',
                            padding: '4px',
                            fontSize: '0.8rem',
                            textAlign: 'left',
                            verticalAlign: 'middle',
                        },
                        '@media print': {
                            '& th, & td': {
                                fontSize: '10px',
                            }
                        }
                    }}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell rowSpan={2} align="center" sx={{ fontWeight: 'bold', border: '1px solid black', textAlign: 'center', verticalAlign: 'middle', fontSize: '0.85rem' }}>
                                № п/п
                            </TableCell>
                            <TableCell rowSpan={2} align="center" sx={{ fontWeight: 'bold', border: '1px solid black', textAlign: 'center', verticalAlign: 'middle', fontSize: '0.85rem' }}>
                                Прізвище, ім'я та по-батькові
                            </TableCell>
                            <TableCell rowSpan={2} align="center" sx={{ fontWeight: 'bold', border: '1px solid black', textAlign: 'center', verticalAlign: 'middle', fontSize: '0.85rem' }}>
                                Посада
                            </TableCell>
                            <TableCell rowSpan={2} align="center" sx={{ fontWeight: 'bold', border: '1px solid black', textAlign: 'center', verticalAlign: 'middle', fontSize: '0.85rem' }}>
                                Дата вступу на посаду
                            </TableCell>
                            <TableCell rowSpan={2} align="center" sx={{ fontWeight: 'bold', border: '1px solid black', textAlign: 'center', verticalAlign: 'middle', fontSize: '0.85rem' }}>
                                Дисципліна, яку читає
                            </TableCell>
                            <TableCell rowSpan={2} align="center" sx={{ fontWeight: 'bold', border: '1px solid black', textAlign: 'center', verticalAlign: 'middle', fontSize: '0.85rem' }}>
                                Штат чи сумісник
                            </TableCell>
                            <TableCell rowSpan={2} align="center" sx={{ fontWeight: 'bold', border: '1px solid black', textAlign: 'center', verticalAlign: 'middle', fontSize: '0.85rem' }}>
                                Вчене звання
                            </TableCell>
                            <TableCell rowSpan={2} align="center" sx={{ fontWeight: 'bold', border: '1px solid black', textAlign: 'center', verticalAlign: 'middle', fontSize: '0.85rem' }}>
                                Вчений ступінь
                            </TableCell>
                            <TableCell colSpan={2} align="center" sx={{ fontWeight: 'bold', border: '1px solid black', textAlign: 'center', verticalAlign: 'middle', fontSize: '0.85rem' }}>
                                Стаж науково-пед. роботи
                            </TableCell>
                            <TableCell rowSpan={2} align="center" sx={{ fontWeight: 'bold', border: '1px solid black', textAlign: 'center', verticalAlign: 'middle', fontSize: '0.85rem' }}>
                                Рік останнього підвищення кваліфікації
                            </TableCell>
                            <TableCell colSpan={3} align="center" sx={{ fontWeight: 'bold', border: '1px solid black', textAlign: 'center', verticalAlign: 'middle', fontSize: '0.85rem' }}>
                                Загальні дані
                            </TableCell>
                            <TableCell rowSpan={2} align="center" sx={{ fontWeight: 'bold', border: '1px solid black', textAlign: 'center', verticalAlign: 'middle', fontSize: '0.85rem' }}>
                                Почесне звання
                            </TableCell>
                            <TableCell rowSpan={2} align="center" sx={{ fontWeight: 'bold', border: '1px solid black', textAlign: 'center', verticalAlign: 'middle', fontSize: '0.85rem' }}>
                                Іноземна мова, якою володіє
                            </TableCell>
                            <TableCell rowSpan={2} align="center" sx={{ fontWeight: 'bold', border: '1px solid black', textAlign: 'center', verticalAlign: 'middle', fontSize: '0.85rem' }}>
                                Звільнення, у який навч. заклад
                            </TableCell>
                            <TableCell rowSpan={2} align="center" sx={{ fontWeight: 'bold', border: '1px solid black', textAlign: 'center', verticalAlign: 'middle', fontSize: '0.85rem' }}>
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
        </div>
    )
}

export default PrintForm;
