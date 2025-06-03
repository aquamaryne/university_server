import React, { useState, useEffect} from "react";
import { useReactToPrint } from "react-to-print";
import { Card, CardTitle, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { PrinterIcon, Download, Calendar as CalendarIcon } from "lucide-react";
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
    hire_date: string;
}

const ITEM_PER_PAGE = 7;

const PrintForm: React.FC = () => {
    const componentRef = React.useRef<HTMLDivElement>(null);
    const [faculty, setFaculty] = useState<Faculty[]>([]);
    const [selectedDepartment, setSelectedDepartment] = useState<string>("");
    const [data, setData] = useState<DataItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [startPage, setStartPage] = useState<number>(1);
    const [calendarOpen, setCalendarOpen] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = parseInt(e.target.value);
        if(!isNaN(value) && value >=  0){
            setStartPage(value);
        }
    }

    const handlePrint = useReactToPrint({
        contentRef: componentRef,
        documentTitle: 'Друк формуляра',
        onAfterPrint: () => console.log('Друк завершенр')
    });

    useEffect(() => {
        const fetchFaculty = async() => {
            try{
                const responce = await fetch('http://localhost:3001/faculty');
                const data = await responce.json();
                setFaculty(data);
            } catch (error) {
                console.log('Error while fetching data');
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
        link.download = 'Зміст.pdf';
        document.body.appendChild(link);
        link.click()
        document.body.removeChild(link);
    };

    return (
        <div className="container mx-auto p-4 max-w-7xl">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">
                        Друк штатного формуляра
                    </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-6">
                    {/* Controls Section */}
                    <div className="flex flex-wrap items-end gap-4 p-4 bg-muted/50 rounded-lg">
                        <div className="flex-1 min-w-48">
                            <Label htmlFor="department">Кафедра</Label>
                            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                                <SelectTrigger className="mt-1 rounded-none">
                                    <SelectValue placeholder={loading ? "Завантаження..." : "Виберіть кафедру"} />
                                </SelectTrigger>
                                <SelectContent>
                                    {faculty.map((faculty) => (
                                        <SelectItem key={faculty.id} value={faculty.id.toString()}>
                                            {faculty.faculty_name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="min-w-48">
                            <Label htmlFor="startPage">Початок сторінки</Label>
                            <Input
                                id="startPage"
                                type="number"
                                min="1"
                                value={startPage}
                                onChange={handleInputChange}
                                className="mt-1 rounded-none"
                                placeholder="Введіть номер сторінки"
                            />
                        </div>

                        <div className="min-w-40">
                            <Label>Дата</Label>
                            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={cn(
                                            "w-full mt-1 justify-start text-left font-normal rounded-none",
                                            !selectedDate && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {selectedDate ? (
                                            format(selectedDate, "dd MMMM yyyy", { locale: uk })
                                        ) : (
                                            <span>Виберіть дату</span>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={selectedDate}
                                        onSelect={(date) => {
                                            if (date) {
                                                setSelectedDate(date);
                                                setCalendarOpen(false);
                                            }
                                        }}
                                        locale={uk}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        <Button
                            onClick={handlePrint}
                            className="rounded-none min-w-24"
                            size="default"
                        >
                            <PrinterIcon className="mr-2 h-4 w-4" />
                            Друк
                        </Button>

                        <Button
                            onClick={handleDownload}
                            variant="outline"
                            className="rounded-none min-w-24"
                            size="default"
                        >
                            <Download className="mr-2 h-4 w-4" />
                            Зміст
                        </Button>
                    </div>

                    <Separator />

                    {/* Print Content */}
                    <div ref={componentRef} className="print-content">
                        <div className="text-center mb-6 space-y-2">
                            <h4 className="text-lg font-bold m-0">ШТАТНИЙ ФОРМУЛЯР</h4>
                            <p className="text-sm m-0">
                                науково-педагогічного складу Національного транспортного університету
                            </p>
                            <p className="text-sm m-0 font-medium">
                                на {format(selectedDate, "dd MMMM yyyy", { locale: uk })}
                            </p>
                        </div>

                        <div className="overflow-x-auto border rounded-lg">
                            <Table className="w-full border-collapse">
                                <TableHeader>
                                    <TableRow className="border-b">
                                        <TableCell rowSpan={2} className="border text-center w-12 text-xs font-bold">
                                            № п/п
                                        </TableCell>
                                        <TableCell rowSpan={2} className="border text-center w-32 text-xs font-bold">
                                            Прізвище, ім'я та по-батькові
                                        </TableCell>
                                        <TableCell rowSpan={2} className="border text-center w-24 text-xs font-bold">
                                            Посада
                                        </TableCell>
                                        <TableCell rowSpan={2} className="border text-center w-24 text-xs font-bold">
                                            Дата вступу на посаду
                                        </TableCell>
                                        <TableCell rowSpan={2} className="border text-center w-32 text-xs font-bold">
                                            Дисципліна, яку читає
                                        </TableCell>
                                        <TableCell rowSpan={2} className="border text-center w-20 text-xs font-bold">
                                            Штат чи сумісник
                                        </TableCell>
                                        <TableCell rowSpan={2} className="border text-center w-20 text-xs font-bold">
                                            Вчене звання
                                        </TableCell>
                                        <TableCell rowSpan={2} className="border text-center w-20 text-xs font-bold">
                                            Вчений ступінь
                                        </TableCell>
                                        <TableCell colSpan={2} className="border text-center text-xs font-bold">
                                            Стаж науково-пед. роботи
                                        </TableCell>
                                        <TableCell rowSpan={2} className="border text-center w-20 text-xs font-bold">
                                            Рік останнього підвищення кваліфікації
                                        </TableCell>
                                        <TableCell colSpan={3} className="border text-center text-xs font-bold">
                                            Загальні дані
                                        </TableCell>
                                        <TableCell rowSpan={2} className="border text-center w-20 text-xs font-bold">
                                            Почесне звання
                                        </TableCell>
                                        <TableCell rowSpan={2} className="border text-center w-20 text-xs font-bold">
                                            Іноземна мова, якою володіє
                                        </TableCell>
                                        <TableCell rowSpan={2} className="border text-center w-24 text-xs font-bold">
                                            Звільнення, у який навч. заклад
                                        </TableCell>
                                        <TableCell rowSpan={2} className="border text-center w-24 text-xs font-bold">
                                            Дата закінчення трудового договору або контракту
                                        </TableCell>
                                    </TableRow>
                                    <TableRow className="border-b">
                                        <TableCell className="border text-center text-xs font-bold">
                                            Загальний
                                        </TableCell>
                                        <TableCell className="border text-center text-xs font-bold">
                                            У даному ВНЗ
                                        </TableCell>
                                        <TableCell className="border text-center text-xs font-bold">
                                            Рік народження
                                        </TableCell>
                                        <TableCell className="border text-center text-xs font-bold">
                                            Стать
                                        </TableCell>
                                        <TableCell className="border text-center text-xs font-bold">
                                            Освіта (який навч. заклад закінч. і коли)
                                        </TableCell>
                                    </TableRow>
                                    <TableRow className="border-b bg-muted/30">
                                        {Array(18).fill(0).map((_, index) => (
                                            <TableCell key={index} className="border text-center text-xs font-bold">
                                                {index + 1}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {Array(ITEM_PER_PAGE).fill(0).map((_, index) => (
                                        <TableRow key={index} className="hover:bg-muted/20 transition-colors">
                                            {Array(18).fill(0).map((_, cellIndex) => (
                                                <TableCell key={cellIndex} className="border h-12 text-xs">
                                                    {cellIndex === 0 ? startIndex + index + 1 : ''}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>

                        <div className="mt-6 text-center">
                            <p className="text-sm font-medium">
                                Сторінка {startPage}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Print Styles */}
            <style>{`
                @media print {
                    @page {
                        size: A4 landscape;
                        margin: 5mm;
                    }
                    
                    .print-content {
                        width: 100% !important;
                        max-width: none !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        box-shadow: none !important;
                        border: none !important;
                        background: white !important;
                    }
                    
                    .print-content table {
                        width: 100% !important;
                        font-size: 8pt !important;
                        border-collapse: collapse !important;
                    }
                    
                    .print-content th,
                    .print-content td {
                        padding: 2pt !important;
                        font-size: 6pt !important;
                        border: 1px solid black !important;
                    }
                    
                    .print-content h4 {
                        font-size: 10pt !important;
                        margin: 0 0 5pt 0 !important;
                    }
                    
                    .print-content p {
                        font-size: 8pt !important;
                        margin: 0 0 3pt 0 !important;
                    }
                    
                    body * {
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
                        width: 100%;
                    }
                }
            `}</style>
        </div>
    )
}

export default PrintForm;