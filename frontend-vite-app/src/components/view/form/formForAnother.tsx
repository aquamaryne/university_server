import React, { useState, useEffect, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarIcon, PrinterIcon, Download, Settings2 } from 'lucide-react';
import { cn } from '@/lib/utils';

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
    const [domain, setDomain] = useState<Domain[]>([]);
    const [selectedDepartment, setSelectedDepartment] = useState<string>('');
    const [data, setData] = useState<DataItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [startPage, setStartPage] = useState<number>(1);
    const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value) && value >= 1) {
            setStartPage(value);
        }
    };

    const handleDateChange = (date: Date | undefined) => {
        if (date) {
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
            try {
                const response = await fetch('http://localhost:3001/faculty');
                const data = await response.json();
                setDomain(data);
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
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 border border-black">
            {/* Header Section */}
            <div className="bg-white border-b border-slate-200/60 px-8 py-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
                            Формуляр підрозділів
                        </h1>
                        <p className="text-slate-500 text-sm mt-1">
                            Національний транспортний університет
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button
                            onClick={handleDownload}
                            variant="outline"
                            size="sm"
                            className="border-black hover:bg-slate-50 rounded-none"
                        >
                            <Download className="w-4 h-4 mr-2" />
                            Зміст
                        </Button>
                        <Button
                            onClick={handlePrint}
                            size="sm"
                            className="bg-slate-900 hover:bg-slate-800 rounded-none"
                        >
                            <PrinterIcon className="w-4 h-4 mr-2" />
                            Друк
                        </Button>
                    </div>
                </div>
            </div>

            {/* Controls Section */}
            <Card className="mx-8 mt-6 shadow-sm rounded-none border-black w-auto">
                <CardHeader className="pb-4">
                    <div className="flex items-center gap-2">
                        <Settings2 className="w-4 h-4 text-slate-400" />
                        <CardTitle className="text-base font-medium text-slate-800">Налаштування</CardTitle>
                    </div>
                </CardHeader>
                
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="department" className="text-sm font-medium text-slate-700">
                                Підрозділ
                            </Label>
                            <Select value={selectedDepartment} onValueChange={handleDepartmentChange} disabled={loading}>
                                <SelectTrigger className="h-10 border-black focus:border-slate-400 focus:ring-0 rounded-none" id="department">
                                    <SelectValue placeholder={loading ? 'Завантаження...' : 'Виберіть підрозділ'} />
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

                        <div className="space-y-2">
                            <Label htmlFor="startPage" className="text-sm font-medium text-slate-700">
                                Початок сторінки
                            </Label>
                            <Input
                                id="startPage"
                                type="number"
                                min="1"
                                value={startPage}
                                onChange={handleInputChange}
                                className="h-10 border-black focus:border-slate-400 focus:ring-0 rounded-none"
                                placeholder="Номер сторінки"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-slate-700">Дата</Label>
                            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={cn(
                                            "w-full h-10 justify-start text-left font-normal border-black hover:bg-slate-50 rounded-none transition-colors",
                                            !selectedDate && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4 text-slate-400" />
                                        {selectedDate ? (
                                            selectedDate.toLocaleDateString('uk-UA', {
                                                day: '2-digit',
                                                month: 'long',
                                                year: 'numeric'
                                            })
                                        ) : (
                                            <span>Виберіть дату</span>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent 
                                    className="w-auto p-0 z-50 shadow-lg border-slate-200" 
                                    align="start"
                                    side="bottom"
                                    sideOffset={4}
                                    avoidCollisions={true}
                                    collisionPadding={16}
                                >
                                    <div className="bg-slate-900 rounded-lg border border-slate-700 shadow-xl overflow-hidden p-4">
                                        <Calendar
                                            mode="single"
                                            selected={selectedDate}
                                            onSelect={handleDateChange}
                                            autoFocus
                                            className="rounded-lg"
                                            classNames={{
                                                months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                                                month: "space-y-4 w-full",
                                                caption: "flex justify-center pt-1 relative items-center mb-4",
                                                caption_label: "text-sm font-semibold text-white",
                                                nav: "space-x-1 flex items-center",
                                                nav_button: cn(
                                                    "h-7 w-7 bg-transparent p-0 text-slate-400 hover:text-white hover:bg-slate-700 rounded-md transition-colors"
                                                ),
                                                nav_button_previous: "absolute left-1",
                                                nav_button_next: "absolute right-1",
                                                table: "w-full border-collapse",
                                                head_row: "grid grid-cols-7 gap-0 mb-2",
                                                head_cell: "h-9 w-9 text-center text-xs font-medium text-slate-400 flex items-center justify-center",
                                                row: "grid grid-cols-7 gap-0",
                                                cell: "h-9 w-9 text-center text-sm p-0 relative",
                                                day: cn(
                                                    "h-9 w-9 p-0 font-normal text-slate-300 flex items-center justify-center",
                                                    "hover:bg-slate-700 hover:text-white rounded-md transition-colors duration-200"
                                                ),
                                                day_today: "bg-slate-700 text-white font-semibold",
                                                day_selected: "bg-blue-600 text-white hover:bg-blue-500 focus:bg-blue-600 font-semibold",
                                                day_outside: "text-slate-600 opacity-50",
                                                day_disabled: "text-slate-700 opacity-30 cursor-not-allowed",
                                                day_hidden: "invisible",
                                            }}
                                        />
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Print Content */}
            <Card className="mx-8 mt-6 mb-8 shadow-sm overflow-hidden rounded-none border-black">
                <div ref={componentRef} className="print-content">
                    {/* Document Header */}
                    <CardHeader className="bg-slate-50">
                        <div className="text-center space-y-3">
                            <CardTitle className="text-xl font-bold text-slate-900 tracking-tight">
                                ФОРМУЛЯР ПІДРОЗДІЛІВ
                            </CardTitle>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                Національного транспортного університету
                            </p>
                            <p className="text-slate-800 font-medium text-sm">
                                на {selectedDate.toLocaleDateString('uk-UA', {
                                    day: '2-digit',
                                    month: 'long',
                                    year: 'numeric'
                                })}
                            </p>
                        </div>
                    </CardHeader>

                    {/* Table Container */}
                    <CardContent className="p-6">
                        <div className="border border-slate-200 overflow-hidden">
                            <div className="overflow-x-auto">
                                <Table className="w-full">
                                    <TableHeader>
                                        <TableRow className="bg-slate-100 hover:bg-slate-100">
                                            <TableCell 
                                                rowSpan={2}
                                                className="border border-slate-300 text-center font-semibold text-xs text-slate-700 p-3 w-16"
                                            >
                                                № п/п
                                            </TableCell>
                                            <TableCell 
                                                rowSpan={2}
                                                className="border border-slate-300 text-center font-semibold text-xs text-slate-700 p-3 min-w-[160px]"
                                            >
                                                Прізвище, ім'я та по-батькові
                                            </TableCell>
                                            <TableCell 
                                                rowSpan={2}
                                                className="border border-slate-300 text-center font-semibold text-xs text-slate-700 p-3 min-w-[120px]"
                                            >
                                                Посада
                                            </TableCell>
                                            <TableCell 
                                                rowSpan={2}
                                                className="border border-slate-300 text-center font-semibold text-xs text-slate-700 p-3 min-w-[100px]"
                                            >
                                                Дата вступу на посаду
                                            </TableCell>
                                            <TableCell 
                                                rowSpan={2}
                                                className="border border-slate-300 text-center font-semibold text-xs text-slate-700 p-3 min-w-[100px]"
                                            >
                                                Штат чи сумісник
                                            </TableCell>
                                            <TableCell 
                                                colSpan={2}
                                                className="border border-slate-300 text-center font-semibold text-xs text-slate-700 p-3"
                                            >
                                                Стаж науково-пед. роботи
                                            </TableCell>
                                            <TableCell 
                                                colSpan={3}
                                                className="border border-slate-300 text-center font-semibold text-xs text-slate-700 p-3"
                                            >
                                                Загальні дані
                                            </TableCell>
                                            <TableCell 
                                                rowSpan={2}
                                                className="border border-slate-300 text-center font-semibold text-xs text-slate-700 p-3 min-w-[120px]"
                                            >
                                                Дата закінчення трудового договору або контракту
                                            </TableCell>
                                        </TableRow>
                                        <TableRow className="bg-slate-100 hover:bg-slate-100">
                                            <TableCell className="border border-slate-300 text-center font-semibold text-xs text-slate-700 p-3 min-w-[80px]">
                                                Загальний
                                            </TableCell>
                                            <TableCell className="border border-slate-300 text-center font-semibold text-xs text-slate-700 p-3 min-w-[80px]">
                                                У даному ВНЗ
                                            </TableCell>
                                            <TableCell className="border border-slate-300 text-center font-semibold text-xs text-slate-700 p-3 min-w-[80px]">
                                                Рік народження
                                            </TableCell>
                                            <TableCell className="border border-slate-300 text-center font-semibold text-xs text-slate-700 p-3 min-w-[60px]">
                                                Стать
                                            </TableCell>
                                            <TableCell className="border border-slate-300 text-center font-semibold text-xs text-slate-700 p-3 min-w-[140px]">
                                                Освіта (який навч. заклад закінч. і коли)
                                            </TableCell>
                                        </TableRow>
                                        <TableRow className="bg-slate-50 hover:bg-slate-50">
                                            {Array.from({ length: 11 }, (_, index) => (
                                                <TableCell 
                                                    key={index} 
                                                    className="border border-slate-300 text-center font-medium text-xs text-slate-600 p-2"
                                                >
                                                    {index + 1}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {Array.from({ length: ITEM_PER_PAGE }, (_, index) => (
                                            <TableRow key={index} className="hover:bg-slate-50/50 transition-colors duration-200">
                                                {Array.from({ length: 11 }, (_, cellIndex) => (
                                                    <TableCell 
                                                        key={cellIndex}
                                                        className="border border-slate-300 h-16 text-xs text-slate-700 p-3 align-top"
                                                    >
                                                        {cellIndex === 0 && (
                                                            <span className="font-medium text-slate-600">
                                                                {startIndex + index + 1}
                                                            </span>
                                                        )}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>

                        {/* Page Footer */}
                        <div className="mt-6 text-center">
                            <div className="inline-flex items-center px-4 py-2 bg-slate-100">
                                <span className="text-sm font-medium text-slate-700">
                                    Сторінка {startPage}
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </div>
            </Card>

            {/* Enhanced Print Styles */}
            <style>{`
                @media print {
                    @page {
                        size: A4 landscape;
                        margin: 5mm;
                    }
                    
                    body {
                        -webkit-print-color-adjust: exact;
                        color-adjust: exact;
                        margin: 0 !important;
                        padding: 0 !important;
                    }
                    
                    * {
                        visibility: hidden;
                    }
                    
                    .print-content,
                    .print-content * {
                        visibility: visible;
                    }
                    
                    .print-content {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100% !important;
                        height: 100% !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        box-shadow: none !important;
                        border: none !important;
                        background: white !important;
                        transform: none !important;
                        display: flex !important;
                        flex-direction: column !important;
                    }
                    
                    .print-content .bg-slate-50,
                    .print-content [class*="CardHeader"] {
                        background-color: white !important;
                        padding: 8pt 0 !important;
                        margin: 0 !important;
                        flex-shrink: 0 !important;
                    }
                    
                    .print-content .p-6,
                    .print-content [class*="CardContent"] {
                        padding: 0 !important;
                        margin: 0 !important;
                        flex: 1 !important;
                        display: flex !important;
                        flex-direction: column !important;
                    }
                    
                    .print-content h1,
                    .print-content .text-xl {
                        font-size: 16pt !important;
                        margin: 0 0 6pt 0 !important;
                        font-weight: bold !important;
                        text-align: center !important;
                    }
                    
                    .print-content p {
                        font-size: 11pt !important;
                        margin: 0 0 3pt 0 !important;
                        line-height: 1.2 !important;
                        text-align: center !important;
                    }
                    
                    .print-content .border,
                    .print-content .overflow-hidden {
                        border: none !important;
                        overflow: visible !important;
                        flex: 1 !important;
                    }
                    
                    .print-content .overflow-x-auto {
                        overflow: visible !important;
                        width: 100% !important;
                        flex: 1 !important;
                        display: flex !important;
                        flex-direction: column !important;
                    }
                    
                    .print-content table {
                        width: 100% !important;
                        height: 100% !important;
                        border-collapse: collapse !important;
                        font-size: 12pt !important;
                        margin: 0 !important;
                        table-layout: fixed !important;
                        flex: 1 !important;
                    }
                    
                    .print-content thead {
                        display: table-header-group;
                    }
                    
                    .print-content tbody {
                        display: table-row-group;
                        height: 100% !important;
                    }
                    
                    .print-content th,
                    .print-content td {
                        padding: 3pt 2pt !important;
                        font-size: 10pt !important;
                        line-height: 1.1 !important;
                        border: 1pt solid #000 !important;
                        vertical-align: middle !important;
                        word-wrap: break-word !important;
                        text-align: center !important;
                        white-space: nowrap !important;
                        overflow: hidden !important;
                        text-overflow: ellipsis !important;
                    }
                    
                    .print-content tbody tr {
                        height: calc((100% - 35pt) / 7) !important;
                        min-height: 25pt !important;
                    }
                    
                    .print-content tbody td {
                        height: calc((100% - 35pt) / 7) !important;
                        min-height: 25pt !important;
                        vertical-align: middle !important;
                    }
                    
                    /* Скрываем элементы управления */
                    .print-content .space-y-6,
                    .print-content .grid {
                        display: none !important;
                    }
                    
                    /* ПОЛНОСТЬЮ СКРЫВАЕМ НИЖНИЙ БЛОК С ДАТОЙ И НОМЕРОМ СТРАНИЦЫ */
                    .print-content .mt-6,
                    .print-content .mt-6.text-center,
                    .print-content .inline-flex {
                        display: none !important;
                        visibility: hidden !important;
                    }
                    
                    /* Показываем только таблицу и заголовок */
                    .print-content .text-center.space-y-3,
                    .print-content .overflow-x-auto {
                        display: flex !important;
                        flex-direction: column !important;
                    }
                    
                    .print-content .text-center.space-y-3 {
                        flex-shrink: 0 !important;
                    }
                    
                    /* Стили для номеров строк */
                    .print-content tbody td:first-child {
                        font-weight: bold !important;
                        background-color: #f9f9f9 !important;
                        width: 4% !important;
                        font-size: 11pt !important;
                    }
                    
                    /* Оптимизированные ширины столбцов для 11 колонок */
                    .print-content th:nth-child(1) { width: 4% !important; }
                    .print-content th:nth-child(2) { width: 12% !important; }
                    .print-content th:nth-child(3) { width: 10% !important; }
                    .print-content th:nth-child(4) { width: 8% !important; }
                    .print-content th:nth-child(5) { width: 8% !important; }
                    .print-content th:nth-child(6) { width: 8% !important; }
                    .print-content th:nth-child(7) { width: 8% !important; }
                    .print-content th:nth-child(8) { width: 8% !important; }
                    .print-content th:nth-child(9) { width: 6% !important; }
                    .print-content th:nth-child(10) { width: 16% !important; }
                    .print-content th:nth-child(11) { width: 12% !important; }
                }
                
                /* Scrollbar styling for better aesthetics */
                .overflow-x-auto::-webkit-scrollbar {
                    height: 6px;
                }
                
                .overflow-x-auto::-webkit-scrollbar-track {
                    background: #f1f5f9;
                }
                
                .overflow-x-auto::-webkit-scrollbar-thumb {
                    background: #cbd5e1;
                }
                
                .overflow-x-auto::-webkit-scrollbar-thumb:hover {
                    background: #94a3b8;
                }
            `}</style>
        </div>
    );
}

export default StaffForm;