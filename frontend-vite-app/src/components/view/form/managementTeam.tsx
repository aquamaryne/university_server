import React, { useRef, useState, useEffect } from 'react';
import { useReactToPrint } from "react-to-print";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { PrinterIcon, Download, Calendar as CalendarIcon, Settings2 } from 'lucide-react';
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';
import { cn } from '@/lib/utils';


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
    const [selectedDepartment, setSelectedDepartment] = useState<string>("");
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
                                            "w-full h-10 justify-start text-left font-normal border-black hover:bg-slate-50 rounded-none",
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
                                    className="w-auto p-0 z-50" 
                                    align="start"
                                    side="bottom"
                                    sideOffset={4}
                                    avoidCollisions={true}
                                    collisionPadding={16}
                                >
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
                                        className="rounded-none border"
                                        autoFocus
                                    />
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
                                    「{startPage}」
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
                        margin: 8mm;
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
                        padding: 6pt 0 !important;
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
                        font-size: 14pt !important;
                        margin: 0 0 4pt 0 !important;
                        font-weight: bold !important;
                        text-align: center !important;
                    }
                    
                    .print-content p {
                        font-size: 9pt !important;
                        margin: 0 0 2pt 0 !important;
                        line-height: 1.1 !important;
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
                        font-size: 10pt !important;
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
                        padding: 2pt 1pt !important;
                        font-size: 9pt !important;
                        line-height: 1.0 !important;
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
                        font-size: 6pt !important;
                        padding: 1pt 0.5pt !important;
                        line-height: 1.0 !important;
                        height: 30pt !important;
                        white-space: normal !important;
                        word-break: break-word !important;
                        hyphens: auto !important;
                    }
                    
                    .print-content tbody tr {
                        height: calc((100% - 30pt) / 7) !important;
                    }
                    
                    .print-content tbody td {
                        height: calc((100% - 30pt) / 7) !important;
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
                    }
                    
                    /* Более точные ширины столбцов */
                    .print-content th:nth-child(1) { width: 3% !important; }
                    .print-content th:nth-child(2) { width: 6% !important; }
                    .print-content th:nth-child(3) { width: 5% !important; }
                    .print-content th:nth-child(4) { width: 5% !important; }
                    .print-content th:nth-child(5) { width: 7% !important; }
                    .print-content th:nth-child(6) { width: 6% !important; }
                    .print-content th:nth-child(7) { width: 6% !important; }
                    .print-content th:nth-child(8) { width: 6% !important; }
                    .print-content th:nth-child(9) { width: 5% !important; }
                    .print-content th:nth-child(10) { width: 5% !important; }
                    .print-content th:nth-child(11) { width: 7% !important; }
                    .print-content th:nth-child(12) { width: 5% !important; }
                    .print-content th:nth-child(13) { width: 5% !important; }
                    .print-content th:nth-child(14) { width: 5% !important; }
                    .print-content th:nth-child(15) { width: 8% !important; }
                    .print-content th:nth-child(16) { width: 9% !important; }
                    .print-content th:nth-child(17) { width: 11% !important; }
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