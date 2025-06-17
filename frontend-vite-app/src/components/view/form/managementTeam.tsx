import React, { useRef, useState, useEffect } from 'react';
import { useReactToPrint } from "react-to-print";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { PrinterIcon, Download, Calendar as CalendarIcon, Settings2 } from 'lucide-react';
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { DayPicker } from 'react-day-picker';

interface Faculty {
    id: number;
    faculty_name: string;
}

interface DataItem {
    id: number;
    name: string;
    position: string;
    hire_data: string;
}

const ITEM_PER_PAGE = 7;

const ManagementTeam: React.FC = () => {
    const componentRef = useRef<HTMLDivElement>(null);
    const[faculty, setFaculty] = useState<Faculty[]>([]);
    const[loading, setLoading] = useState<boolean>(false);
    const[data, setData] = useState<DataItem[]>([]);
    const[selectedDate, setSelectedDate] = useState<Date>(new Date());
    const[startPage, setStartPage] = useState<number>(1);
    const[isCalendarOpen, setIsCalendarOpen] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = parseInt(e.target.value);
        if(!isNaN(value) && value >= 0){
            setStartPage(value);
        }
    }

    const handlePrint = useReactToPrint({
        contentRef: componentRef,
        documentTitle: 'Друк формуляра',
        onAfterPrint: () => console.log('Друк завершено')
    });

    const startIndex = (startPage - 1) * ITEM_PER_PAGE;
    const endIndex = startIndex + ITEM_PER_PAGE;
    const displayedData = data.slice(startIndex, endIndex);
    
    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = `http://localhost:3001/content-download`;
        link.download = 'Зміст.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 border border-black">
            {/* Header Section */}
            <div className="bg-white border-b border-slate-200/60 px-8 py-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
                            Список керівного складу
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
                                            format(selectedDate, "dd MMMM yyyy", { locale: uk })
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
                                    <div className="bg-white rounded-lg border border-slate-200 shadow-xl">
                                        <Calendar
                                            mode="single"
                                            selected={selectedDate}
                                            onSelect={(date) => {
                                                if (date) {
                                                    setSelectedDate(date);
                                                    setIsCalendarOpen(false);
                                                }
                                            }}
                                            locale={uk}
                                            className="rounded-lg"
                                            autoFocus
                                            classNames={{
                                                months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                                                month: "space-y-4",
                                                caption: "flex justify-center pt-1 relative items-center",
                                                caption_label: "text-sm font-medium text-slate-900",
                                                nav: "space-x-1 flex items-center",
                                                nav_button: cn(
                                                    "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 hover:bg-slate-100 rounded-md transition-colors"
                                                ),
                                                nav_button_previous: "absolute left-1",
                                                nav_button_next: "absolute right-1",
                                                table: "w-full border-collapse space-y-1",
                                                head_row: "flex",
                                                head_cell: "text-slate-500 rounded-md w-9 font-normal text-[0.8rem]",
                                                row: "flex w-full mt-2",
                                                cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-slate-100/50 [&:has([aria-selected])]:bg-slate-100 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                                                day: cn(
                                                    "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-slate-100 hover:text-slate-900 rounded-md transition-colors"
                                                ),
                                                day_range_end: "day-range-end",
                                                day_selected: "bg-slate-900 text-slate-50 hover:bg-slate-900 hover:text-slate-50 focus:bg-slate-900 focus:text-slate-50",
                                                day_today: "bg-slate-100 text-slate-900 font-medium",
                                                day_outside: "day-outside text-slate-500 opacity-50 aria-selected:bg-slate-100/50 aria-selected:text-slate-500 aria-selected:opacity-30",
                                                day_disabled: "text-slate-500 opacity-50",
                                                day_range_middle: "aria-selected:bg-slate-100 aria-selected:text-slate-900",
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
                                СПИСОК
                            </CardTitle>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                керівного складу Національного транспортного університету
                            </p>
                            <p className="text-slate-800 font-medium text-sm">
                                на {format(selectedDate, "dd MMMM yyyy", { locale: uk })}
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
                                            <TableHead rowSpan={2} className="border border-slate-300 text-center font-semibold text-xs text-slate-700 p-3 w-16">
                                                № п/п
                                            </TableHead>
                                            <TableHead rowSpan={2} className="border border-slate-300 text-center font-semibold text-xs text-slate-700 p-3 min-w-[160px]">
                                                Прізвище, ім'я та по-батькові
                                            </TableHead>
                                            <TableHead rowSpan={2} className="border border-slate-300 text-center font-semibold text-xs text-slate-700 p-3 min-w-[120px]">
                                                Посада
                                            </TableHead>
                                            <TableHead rowSpan={2} className="border border-slate-300 text-center font-semibold text-xs text-slate-700 p-3 min-w-[100px]">
                                                Дата вступу на посаду
                                            </TableHead>
                                            <TableHead rowSpan={2} className="border border-slate-300 text-center font-semibold text-xs text-slate-700 p-3 min-w-[140px]">
                                                Дисципліна, яку читає
                                            </TableHead>
                                            <TableHead rowSpan={2} className="border border-slate-300 text-center font-semibold text-xs text-slate-700 p-3 min-w-[100px]">
                                                Штат чи сумісник
                                            </TableHead>
                                            <TableHead rowSpan={2} className="border border-slate-300 text-center font-semibold text-xs text-slate-700 p-3 min-w-[100px]">
                                                Вчене звання
                                            </TableHead>
                                            <TableHead rowSpan={2} className="border border-slate-300 text-center font-semibold text-xs text-slate-700 p-3 min-w-[100px]">
                                                Вчений ступінь
                                            </TableHead>
                                            <TableHead colSpan={2} className="border border-slate-300 text-center font-semibold text-xs text-slate-700 p-3">
                                                Стаж науково-пед. роботи
                                            </TableHead>
                                            <TableHead rowSpan={2} className="border border-slate-300 text-center font-semibold text-xs text-slate-700 p-3 min-w-[100px]">
                                                Рік останнього підвищення кваліфікації
                                            </TableHead>
                                            <TableHead colSpan={3} className="border border-slate-300 text-center font-semibold text-xs text-slate-700 p-3">
                                                Загальні дані
                                            </TableHead>
                                            <TableHead rowSpan={2} className="border border-slate-300 text-center font-semibold text-xs text-slate-700 p-3 min-w-[100px]">
                                                Почесне звання
                                            </TableHead>
                                            <TableHead rowSpan={2} className="border border-slate-300 text-center font-semibold text-xs text-slate-700 p-3 min-w-[120px]">
                                                Звільнення, у який навч. заклад
                                            </TableHead>
                                            <TableHead rowSpan={2} className="border border-slate-300 text-center font-semibold text-xs text-slate-700 p-3 min-w-[120px]">
                                                Дата закінчення трудового договору або контракту
                                            </TableHead>
                                        </TableRow>
                                        <TableRow className="bg-slate-100 hover:bg-slate-100">
                                            <TableHead className="border border-slate-300 text-center font-semibold text-xs text-slate-700 p-3 min-w-[80px]">
                                                Загальний
                                            </TableHead>
                                            <TableHead className="border border-slate-300 text-center font-semibold text-xs text-slate-700 p-3 min-w-[80px]">
                                                У даному ВНЗ
                                            </TableHead>
                                            <TableHead className="border border-slate-300 text-center font-semibold text-xs text-slate-700 p-3 min-w-[80px]">
                                                Рік народження
                                            </TableHead>
                                            <TableHead className="border border-slate-300 text-center font-semibold text-xs text-slate-700 p-3 min-w-[60px]">
                                                Стать
                                            </TableHead>
                                            <TableHead className="border border-slate-300 text-center font-semibold text-xs text-slate-700 p-3 min-w-[140px]">
                                                Освіта (який навч. заклад закінч. і коли)
                                            </TableHead>
                                        </TableRow>
                                        <TableRow className="bg-slate-50 hover:bg-slate-50">
                                            {Array(17).fill(0).map((_, index) => (
                                                <TableHead key={index} className="border border-slate-300 text-center font-medium text-xs text-slate-600 p-2">
                                                    {index + 1}
                                                </TableHead>
                                            ))}
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {Array(ITEM_PER_PAGE).fill(0).map((_, index) => (
                                            <TableRow key={index} className="hover:bg-slate-50/50 transition-colors duration-200">
                                                {Array(17).fill(0).map((_, cellIndex) => (
                                                    <TableCell key={cellIndex} className="border border-slate-300 h-16 text-xs text-slate-700 p-3 align-top">
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
                        margin: 5mm; /* Уменьшили отступы для большего пространства */
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
                        padding: 8pt 0 !important; /* Немного увеличили */
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
                        font-size: 16pt !important; /* Увеличили с 14pt */
                        margin: 0 0 6pt 0 !important;
                        font-weight: bold !important;
                        text-align: center !important;
                    }
                    
                    .print-content p {
                        font-size: 11pt !important; /* Увеличили с 9pt */
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
                        font-size: 12pt !important; /* Увеличили с 10pt */
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
                        padding: 3pt 2pt !important; /* Увеличили отступы */
                        font-size: 10pt !important; /* Увеличили с 9pt */
                        line-height: 1.1 !important;
                        border: 1pt solid #000 !important;
                        vertical-align: middle !important;
                        word-wrap: break-word !important;
                        text-align: center !important;
                        white-space: nowrap !important;
                        overflow: hidden !important;
                        text-overflow: ellipsis !important;
                    }
                    
                    .print-content th {
                        background-color: #f8f9fa !important;
                        font-weight: bold !important;
                        font-size: 8pt !important; /* Увеличили с 6pt */
                        padding: 2pt 1pt !important; /* Увеличили отступы */
                        line-height: 1.1 !important;
                        height: 35pt !important; /* Увеличили высоту заголовков */
                        white-space: normal !important;
                        word-break: break-word !important;
                        hyphens: auto !important;
                    }
                    
                    .print-content tbody tr {
                        height: calc((100% - 35pt) / 7) !important; /* Скорректировали под новую высоту заголовков */
                        min-height: 25pt !important; /* Минимальная высота строки */
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
                        font-size: 11pt !important; /* Увеличили размер номеров */
                    }
                    
                    /* Оптимизированные ширины столбцов для лучшего использования пространства */
                    .print-content th:nth-child(1) { width: 3% !important; }
                    .print-content th:nth-child(2) { width: 8% !important; } /* Увеличили для ФИО */
                    .print-content th:nth-child(3) { width: 6% !important; } /* Увеличили для должности */
                    .print-content th:nth-child(4) { width: 5% !important; }
                    .print-content th:nth-child(5) { width: 7% !important; } /* Увеличили для дисциплины */
                    .print-content th:nth-child(6) { width: 5% !important; }
                    .print-content th:nth-child(7) { width: 5% !important; }
                    .print-content th:nth-child(8) { width: 5% !important; }
                    .print-content th:nth-child(9) { width: 5% !important; }
                    .print-content th:nth-child(10) { width: 5% !important; }
                    .print-content th:nth-child(11) { width: 5% !important; }
                    .print-content th:nth-child(12) { width: 4% !important; }
                    .print-content th:nth-child(13) { width: 4% !important; }
                    .print-content th:nth-child(14) { width: 8% !important; } /* Увеличили для образования */
                    .print-content th:nth-child(15) { width: 5% !important; }
                    .print-content th:nth-child(16) { width: 6% !important; }
                    .print-content th:nth-child(17) { width: 6% !important; }
                    .print-content th:nth-child(18) { width: 9% !important; } /* Увеличили для последнего столбца */
                    
                    /* Дополнительные улучшения читаемости */
                    .print-content th[rowspan="2"] {
                        writing-mode: horizontal-tb !important;
                        text-orientation: mixed !important;
                    }
                    
                    /* Улучшение отображения многострочных заголовков */
                    .print-content th {
                        display: table-cell !important;
                        vertical-align: middle !important;
                    }
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

export default ManagementTeam;