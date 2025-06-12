import React, { useState, useEffect, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar1Icon, PrinterIcon, DownloadIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { uk } from 'date-fns/locale';

interface Domain {
    id: number;
    domain_name: string;
}

interface DataItem {
    id: number;
    name: string;
    position: string;
    hire_date: string;
}

const ITEM_PER_PAGE = 7;

const StaffForm: React.FC = () => {
    const componentRef = useRef<HTMLDivElement>(null);
    const[domain, setDomaim] = useState<Domain[]>([]);
    const[selectedDepartment, setSelectedDepartment] = useState<string>('');
    const[data, setData] = useState<DataItem[]>([]);
    const[loading, setLoading] = useState<boolean>(true);
    const[selectedDate, setSelectedDate] = useState<Date>(new Date());
    const[startPage, setStartPage] = useState<number>(1);
    const[isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = parseInt(e.target.value, 10);
        if(!isNaN(value) && value >= 1){
            setStartPage(value);
        }
    };

    const handleDateChange = (date: Date | undefined) => {
        if(date){
            setSelectedDate(date);
            setIsCalendarOpen(false);
        }
    };

    const handlePrint = useReactToPrint({
        contentRef: componentRef,
        documentTitle: 'Друк підрозділів',
        onAfterPrint: () => console.log('Друк завершено'),
    });

    const handleDepartmentChange = (value: string) => {
        setSelectedDepartment(value);
    };

    useEffect(() => {
        const fetchFaculty = async () => {
            try{
                const responce = await fetch('http://localhost:3001/faculty');
                const data = await responce.json();
                setDomaim(data);
            } catch (error) {
                console.error('Помилка при завантаження даних: ', error);
            } finally { 
                setLoading(false);
            }
        };

        fetchFaculty();
    }, []);

    const startIndex = (startPage - 1) * ITEM_PER_PAGE;
    const endIndex = startIndex + ITEM_PER_PAGE;
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
        <div className='p-4 spacy-y-6'>
            <Card className='rounded-none border-black'>
                <CardContent className='p-4'>
                    <div className='flex flex-wrap gap-4 items-end'>
                        <div className='space-y-2'>
                            <Label htmlFor='department'>Вкажіть підрозділ</Label>
                            <Select onValueChange={handleDepartmentChange} disabled={loading}>
                                <SelectTrigger className='w-[250px] rounded-none' id='department'>
                                    <SelectValue placeholder={loading ? 'Завантаження...' : 'Вкажіть підрозділ'} />
                                </SelectTrigger>
                                <SelectContent>
                                    {domain.map((domains) => (
                                        <SelectItem key={domains.id} value={domains.id.toString()}>
                                            {domains.domain_name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className='space-y-2'>
                            <Label htmlFor='startPage'>Початок стрінки</Label>
                            <Input 
                                id='startPage'
                                type='number'
                                placeholder='Вкажіть номер'
                                value={startPage}
                                onChange={handleInputChange}
                                className='w-[200px] rounded-none'
                                min="1"
                            />
                        </div>

                        <div className='space-y-2'>
                            <Label>Дата</Label>
                            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={cn(
                                            "w-[200px] justify-start text-left font-normal rounded-none",
                                            !selectedDate && "text-muted-foreground"
                                        )}
                                    >
                                        <Calendar1Icon className='mr-2 h-4 w-4' />
                                        { selectedDate ? (
                                            format(selectedDate, 'dd MMMM yyyy', { locale: uk })
                                        ) : (
                                            <span>Оберіть дату</span>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className='w-auto p-0' align='start'>
                                    <Calendar 
                                        mode='single'
                                        selected={selectedDate}
                                        onSelect={handleDateChange}
                                        autoFocus
                                        locale={uk}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div className='flex gap-2'>
                            <Button
                                onClick={handlePrint}
                                className='rounded-none'
                                variant="default"
                            >
                                <PrinterIcon className='mr-2 h-4 w-4' />
                                Друк
                            </Button>
                            <Button
                                onClick={handleDownload}
                                className='rounded-none'
                                variant="outline"
                            >
                                <DownloadIcon className='mr-2 h-4 w-4' />
                                Зміст
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
            
            <div ref={componentRef} className='print:m-2'>
                <div className='text-center mb-6 font-serif'>
                    <h4 className='text-lg font-bold mb-2 print:text-base'>
                        ФОРМУЛЯР ПІДРОЗДІЛІВ
                    </h4>
                    <p className='text-sm mb-4 print:text-xs'>
                        на {format(selectedDate, "dd MMMM yyyy 'р.' ", {locale: uk})}
                    </p>
                </div>

                <div className='border border-black rounded-none print:border print:border-black'>
                    <Table className="border-collapse w-full">
                        <TableHeader>
                            <TableRow className="border-b border-black">
                                <TableCell 
                                    rowSpan={2}
                                    className="border border-black text-center p-2 font-bold text-xs print:text-[8px]"
                                >
                                    № п/п
                                </TableCell>
                                <TableCell 
                                    rowSpan={2}
                                    className="border border-black text-center p-2 font-bold text-xs print:text-[8px]"
                                >
                                    Прізвище, ім'я та по-батькові
                                </TableCell>
                                <TableCell 
                                    rowSpan={2}
                                    className="border border-black text-center p-2 font-bold text-xs print:text-[8px]"
                                >
                                    Посада
                                </TableCell>
                                <TableCell 
                                    rowSpan={2}
                                    className="border border-black text-center p-2 font-bold text-xs print:text-[8px]"
                                >
                                    Дата вступу на посаду
                                </TableCell>
                                <TableCell 
                                    rowSpan={2}
                                    className="border border-black text-center p-2 font-bold text-xs print:text-[8px]"
                                >
                                    Штат чи сумісник
                                </TableCell>
                                <TableCell 
                                    colSpan={2}
                                    className="border border-black text-center p-2 font-bold text-xs print:text-[8px]"
                                >
                                    Стаж науково-пед. роботи
                                </TableCell>
                                <TableCell 
                                    colSpan={3}
                                    className="border border-black text-center p-2 font-bold text-xs print:text-[8px]"
                                >
                                    Загальні дані
                                </TableCell>
                                <TableCell 
                                    rowSpan={2}
                                    className="border border-black text-center p-2 font-bold text-xs print:text-[8px]"
                                >
                                    Дата закінчення трудового договору або контракту
                                </TableCell>
                            </TableRow>
                            <TableRow className="border-b border-black">
                                <TableCell className="border border-black text-center p-2 font-bold text-xs print:text-[8px]">
                                    Загальний
                                </TableCell>
                                <TableCell className="border border-black text-center p-2 font-bold text-xs print:text-[8px]">
                                    У даному ВНЗ
                                </TableCell>
                                <TableCell className="border border-black text-center p-2 font-bold text-xs print:text-[8px]">
                                    Рік народження
                                </TableCell>
                                <TableCell className="border border-black text-center p-2 font-bold text-xs print:text-[8px]">
                                    Стать
                                </TableCell>
                                <TableCell className="border border-black text-center p-2 font-bold text-xs print:text-[8px]">
                                    Освіта (який навч. заклад закінч. і коли)
                                </TableCell>
                            </TableRow>
                            <TableRow className="border-b border-black">
                                {Array.from({ length: 11 }, (_, index) => (
                                    <TableCell 
                                        key={index} 
                                        className="border border-black text-center p-2 font-bold text-xs print:text-[8px]"
                                    >
                                        {index + 1}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {/* Пустые строки для заполнения */}
                            {Array.from({ length: ITEM_PER_PAGE }, (_, index) => (
                                <TableRow key={index} className="h-12 print:h-8">
                                    {Array.from({ length: 11 }, (_, cellIndex) => (
                                        <TableCell 
                                            key={cellIndex}
                                            className="border border-black p-2 text-xs print:text-[8px]"
                                        >
                                            &nbsp;
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                <div className='mt-4 text-center'>
                    <p className='text-sm font-serif print:text-xs'>
                        Сторінка {startPage}
                    </p>
                </div>
            </div>
             <style>
                {`
                    @media print {
                        @page {
                            size: A4 landscape;
                            margin: 10mm;
                        }
                        
                        body {
                            print-color-adjust: exact;
                            -webkit-print-color-adjust: exact;
                        }
                    }
                `}
            </style>
        </div>
    )
}

export default StaffForm;