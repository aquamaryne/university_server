import React from 'react';
import { Table, TableCell, TableBody, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import ReactToPrint, { useReactToPrint } from 'react-to-print';
import PrintIcon from '@mui/icons-material/Print';

const PrintForm: React.FC = () => {
    const componentRef = React.useRef<HTMLDivElement>(null);

    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
      documentTitle: 'Друк формуляра',
      onAfterPrint: () => console.log('Друк завершено'),
    });

    return (
        <div style={{ justifyContent: 'center', padding: '16px' }}>
            <TableContainer 
                ref={componentRef}
                component={Paper}
                sx={{
                    '@media print': {
                        transform: 'scale(0.95)',
                        transformOrigin: 'top left',
                        border: '1px solid black',
                        margin: '0',
                        width: '100%',
                    },
                    '@page': {
                        size: 'A4 landscape',
                        margin: '10mm',
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
                            wordWrap: 'break-word',
                            whiteSpace: 'normal',
                            padding: '4px',
                            fontSize: '0.8rem',
                            textAlign: 'center',
                            verticalAlign: 'middle',
                        },
                        '@media print': {
                            '& th, & td': {
                                fontSize: '7px',
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
            <Button
                variant='contained'
                onClick={handlePrint}
                color='primary'
                sx={{ marginTop: '30px' }}
                endIcon={<PrintIcon />}
            >
                Друк
            </Button>
        </div>
    )
}

export default PrintForm;
