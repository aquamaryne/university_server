import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Выносим опции за пределы компонента
const vacationTypeOptions = [
    { value: 'annual', label: 'Щорічна основна' },
    { value: 'additional', label: 'Щорічна додаткова' },
    { value: 'social', label: 'Соціальна' },
    { value: 'creative', label: 'Творча' },
    { value: 'study', label: 'Навчальна' },
    { value: 'maternity', label: 'По вагітності та пологах' },
    { value: 'childcare', label: 'По догляду за дитиною' },
    { value: 'unpaid', label: 'Без збереження заробітної плати' },
    { value: 'sick', label: 'Лікарняний' },
];

const periodOptions = [
    { value: '2020', label: '2020' },
    { value: '2021', label: '2021' },
    { value: '2022', label: '2022' },
    { value: '2023', label: '2023' },
    { value: '2024', label: '2024' },
    { value: '2025', label: '2025' },
];

// Тип для записи об отпуске
interface VacationRecord {
    id: number;
    type: string;
    period: string;
    startDate: string;
    endDate: string;
    orderNumber: string;
    orderDate: string;
}

// Компонент для редактируемой ячейки с Input
const EditableCell = React.memo(({
    value,
    onChange,
    type = "text",
    placeholder = "",
    className = ""
}: {
    value: string;
    onChange: (value: string) => void;
    type?: string;
    placeholder?: string;
    className?: string;
}) => (
    <Input
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        type={type}
        placeholder={placeholder}
        className={`h-8 text-sm border-0 bg-transparent focus:bg-white focus:border focus:border-emerald-400/30 focus:ring-1 focus:ring-emerald-400/20 transition-all duration-200 ${className}`}
    />
));

// Компонент для редактируемой ячейки с Select
const EditableSelectCell = React.memo(({
    value,
    onChange,
    options,
    placeholder = "Оберіть..."
}: {
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string; }[];
    placeholder?: string;
}) => (
    <Select value={value || ''} onValueChange={onChange}>
        <SelectTrigger className="h-8 text-sm border-0 bg-transparent focus:bg-white focus:border focus:border-emerald-400/30 focus:ring-1 focus:ring-emerald-400/20 transition-all duration-200">
            <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="border border-gray-200 dark:border-gray-700 shadow-lg">
            {options.map((option) => (
                <SelectItem key={option.value} value={option.value} className="text-sm">
                    {option.label}
                </SelectItem>
            ))}
        </SelectContent>
    </Select>
));

EditableCell.displayName = 'EditableCell';
EditableSelectCell.displayName = 'EditableSelectCell';

const VacationsTab: React.FC = () => {
    const [vacations, setVacations] = React.useState<VacationRecord[]>([
        { id: 1, type: '', period: '', startDate: '', endDate: '', orderNumber: '', orderDate: '' },
        { id: 2, type: '', period: '', startDate: '', endDate: '', orderNumber: '', orderDate: '' },
        { id: 3, type: '', period: '', startDate: '', endDate: '', orderNumber: '', orderDate: '' },
        { id: 4, type: '', period: '', startDate: '', endDate: '', orderNumber: '', orderDate: '' },
        { id: 5, type: '', period: '', startDate: '', endDate: '', orderNumber: '', orderDate: '' },
        { id: 6, type: '', period: '', startDate: '', endDate: '', orderNumber: '', orderDate: '' },
        { id: 7, type: '', period: '', startDate: '', endDate: '', orderNumber: '', orderDate: '' },
        { id: 8, type: '', period: '', startDate: '', endDate: '', orderNumber: '', orderDate: '' },
        { id: 9, type: '', period: '', startDate: '', endDate: '', orderNumber: '', orderDate: '' },
        { id: 10, type: '', period: '', startDate: '', endDate: '', orderNumber: '', orderDate: '' },
    ]);

    const addVacation = () => {
        const newVacation: VacationRecord = {
            id: Date.now(),
            type: '',
            period: '',
            startDate: '',
            endDate: '',
            orderNumber: '',
            orderDate: ''
        };
        setVacations([...vacations, newVacation]);
    };

    const removeVacation = (id: number) => {
        if (vacations.length > 1) {
            setVacations(vacations.filter(vacation => vacation.id !== id));
        }
    };

    const updateVacation = (id: number, field: keyof Omit<VacationRecord, 'id'>, value: string) => {
        setVacations(vacations.map(vacation =>
            vacation.id === id ? { ...vacation, [field]: value } : vacation
        ));
    };

    // Функция для подсчета дней отпуска
    const calculateDays = (startDate: string, endDate: string): number => {
        if (!startDate || !endDate) return 0;
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        return diffDays;
    };

    // Получение цвета бейджа для типа отпуска
    const getVacationTypeBadge = (type: string) => {
        const typeOption = vacationTypeOptions.find(option => option.value === type);
        if (!typeOption) return null;

        const colorMap: { [key: string]: string } = {
            'annual': 'bg-green-200 text-green-800',
            'additional': 'bg-blue-200 text-blue-800',
            'social': 'bg-purple-200 text-purple-800',
            'creative': 'bg-orange-200 text-orange-800',
            'study': 'bg-yellow-200 text-yellow-800',
            'maternity': 'bg-pink-200 text-pink-800',
            'childcare': 'bg-rose-200 text-rose-800',
            'unpaid': 'bg-gray-200 text-gray-800',
            'sick': 'bg-red-200 text-red-800',
        };

        return (
            <Badge className={`text-xs ${colorMap[type] || 'bg-gray-200 text-gray-800'}`}>
                {typeOption.label}
            </Badge>
        );
    };

    return (
        <div className="w-full h-screen overflow-auto bg-gray-50/50 dark:bg-gray-900/50">
            <div className="w-full p-4 space-y-6">
                {/* Header */}
                <div className="text-center py-4 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-md">
                    <h1 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 tracking-wide">
                        Відпустки та лікарняні
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Облік відпусток та тимчасової непрацездатності
                    </p>
                    <div className="w-24 h-0.5 bg-emerald-300 mx-auto mt-2 rounded-full"></div>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <Card className="shadow-md border border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-800/90">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-8 bg-green-400 rounded-full"></div>
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Щорічних</p>
                                    <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                                        {vacations.filter(v => v.type === 'annual').length}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Card className="shadow-md border border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-800/90">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-8 bg-blue-400 rounded-full"></div>
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Додаткових</p>
                                    <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                                        {vacations.filter(v => v.type === 'additional').length}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Card className="shadow-md border border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-800/90">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-8 bg-red-400 rounded-full"></div>
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Лікарняних</p>
                                    <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                                        {vacations.filter(v => v.type === 'sick').length}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Card className="shadow-md border border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-800/90">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <Calendar className="w-5 h-5 text-emerald-500" />
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Всього днів</p>
                                    <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                                        {vacations.reduce((total, vacation) => 
                                            total + calculateDays(vacation.startDate, vacation.endDate), 0
                                        )}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Table Card */}
                <Card className="shadow-lg border border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                    <CardHeader className="pb-3 pt-4 bg-gradient-to-r from-emerald-100 to-teal-50 dark:from-emerald-900/30 dark:to-teal-800/30">
                        <CardTitle className="text-lg font-medium text-gray-700 dark:text-gray-300 flex items-center gap-3">
                            <div className="w-2 h-5 bg-emerald-400 rounded-full"></div>
                            Відпустки та лікарняні
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-auto max-h-[60vh]">
                            <Table>
                                <TableHeader className="sticky top-0 z-10">
                                    <TableRow className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 hover:bg-gradient-to-r hover:from-emerald-100 hover:to-teal-100 dark:hover:from-emerald-900/30 dark:hover:to-teal-900/30">
                                        <TableHead className="min-w-[180px] font-semibold text-gray-700 dark:text-gray-300">Вид відпустки</TableHead>
                                        <TableHead className="min-w-[100px] font-semibold text-gray-700 dark:text-gray-300">Період</TableHead>
                                        <TableHead className="min-w-[120px] font-semibold text-gray-700 dark:text-gray-300">Початок</TableHead>
                                        <TableHead className="min-w-[120px] font-semibold text-gray-700 dark:text-gray-300">Кінець</TableHead>
                                        <TableHead className="min-w-[80px] font-semibold text-gray-700 dark:text-gray-300 text-center">Днів</TableHead>
                                        <TableHead className="min-w-[100px] font-semibold text-gray-700 dark:text-gray-300">Наказ №</TableHead>
                                        <TableHead className="min-w-[120px] font-semibold text-gray-700 dark:text-gray-300">від</TableHead>
                                        <TableHead className="w-12 text-center font-semibold text-gray-700 dark:text-gray-300">Дії</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {vacations.map((vacation) => (
                                        <TableRow 
                                            key={vacation.id} 
                                            className="hover:bg-emerald-50/50 dark:hover:bg-emerald-900/10 transition-colors duration-200 group"
                                        >
                                            <TableCell className="p-1">
                                                <div className="space-y-1">
                                                    <EditableSelectCell
                                                        value={vacation.type}
                                                        onChange={(value) => updateVacation(vacation.id, 'type', value)}
                                                        options={vacationTypeOptions}
                                                        placeholder="Тип відпустки"
                                                    />
                                                    {vacation.type && (
                                                        <div className="mt-1">
                                                            {getVacationTypeBadge(vacation.type)}
                                                        </div>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell className="p-1">
                                                <EditableSelectCell
                                                    value={vacation.period}
                                                    onChange={(value) => updateVacation(vacation.id, 'period', value)}
                                                    options={periodOptions}
                                                    placeholder="Рік"
                                                />
                                            </TableCell>
                                            <TableCell className="p-1">
                                                <EditableCell
                                                    value={vacation.startDate}
                                                    onChange={(value) => updateVacation(vacation.id, 'startDate', value)}
                                                    type="date"
                                                />
                                            </TableCell>
                                            <TableCell className="p-1">
                                                <EditableCell
                                                    value={vacation.endDate}
                                                    onChange={(value) => updateVacation(vacation.id, 'endDate', value)}
                                                    type="date"
                                                />
                                            </TableCell>
                                            <TableCell className="text-center p-1">
                                                <div className="flex items-center justify-center">
                                                    <Badge variant="outline" className="text-xs font-semibold min-w-[40px]">
                                                        {calculateDays(vacation.startDate, vacation.endDate) || '-'}
                                                    </Badge>
                                                </div>
                                            </TableCell>
                                            <TableCell className="p-1">
                                                <EditableCell
                                                    value={vacation.orderNumber}
                                                    onChange={(value) => updateVacation(vacation.id, 'orderNumber', value)}
                                                    placeholder="№"
                                                />
                                            </TableCell>
                                            <TableCell className="p-1">
                                                <EditableCell
                                                    value={vacation.orderDate}
                                                    onChange={(value) => updateVacation(vacation.id, 'orderDate', value)}
                                                    type="date"
                                                />
                                            </TableCell>
                                            <TableCell className="text-center p-1">
                                                {vacations.length > 1 && (
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => removeVacation(vacation.id)}
                                                        className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <Trash2 className="h-3 w-3" />
                                                    </Button>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                        
                        {/* Add Button */}
                        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/20">
                            <Button
                                variant="outline"
                                onClick={addVacation}
                                className="w-full h-10 border-dashed border-emerald-300 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-400 transition-colors"
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Додати відпустку
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default VacationsTab;