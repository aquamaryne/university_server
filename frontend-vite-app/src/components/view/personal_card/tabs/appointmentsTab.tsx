import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Выносим опции за пределы компонента
const departmentOptions = [
    { value: '01', label: '01' },
    { value: '02', label: '02' },
    { value: '08', label: '08' },
    { value: '10', label: '10' },
];

const positionOptions = [
    { value: 'senior_lecturer', label: 'Старший викладач' },
    { value: 'lecturer', label: 'Викладач' },
    { value: 'assistant', label: 'Асистент' },
    { value: 'professor', label: 'Професор' },
    { value: 'associate_professor', label: 'Доцент' },
];

const contractTypeOptions = [
    { value: 'permanent', label: 'Постійний' },
    { value: 'temporary', label: 'Тимчасовий' },
    { value: 'contract', label: 'Контракт' },
    { value: 'part_time', label: 'Сумісництво' },
];

// Тип для записи о назначении
interface AppointmentRecord {
    id: number;
    date: string;
    department: string;
    position: string;
    contractType: string;
    salary: string;
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
        className={`h-8 text-sm border-0 bg-transparent focus:bg-white focus:border focus:border-blue-400/30 focus:ring-1 focus:ring-blue-400/20 transition-all duration-200 ${className}`}
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
        <SelectTrigger className="h-8 text-sm border-0 bg-transparent focus:bg-white focus:border focus:border-blue-400/30 focus:ring-1 focus:ring-blue-400/20 transition-all duration-200">
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

const AppointmentsTab: React.FC = () => {
    const [appointments, setAppointments] = React.useState<AppointmentRecord[]>([
        { id: 1, date: '', department: '', position: '', contractType: '', salary: '', orderNumber: '', orderDate: '' },
        { id: 2, date: '', department: '', position: '', contractType: '', salary: '', orderNumber: '', orderDate: '' },
        { id: 3, date: '', department: '', position: '', contractType: '', salary: '', orderNumber: '', orderDate: '' },
        { id: 4, date: '', department: '', position: '', contractType: '', salary: '', orderNumber: '', orderDate: '' },
        { id: 5, date: '', department: '', position: '', contractType: '', salary: '', orderNumber: '', orderDate: '' },
    ]);

    const addAppointment = () => {
        const newAppointment: AppointmentRecord = {
            id: Date.now(),
            date: '',
            department: '',
            position: '',
            contractType: '',
            salary: '',
            orderNumber: '',
            orderDate: ''
        };
        setAppointments([...appointments, newAppointment]);
    };

    const removeAppointment = (id: number) => {
        if (appointments.length > 1) {
            setAppointments(appointments.filter(appointment => appointment.id !== id));
        }
    };

    const updateAppointment = (id: number, field: keyof Omit<AppointmentRecord, 'id'>, value: string) => {
        setAppointments(appointments.map(appointment =>
            appointment.id === id ? { ...appointment, [field]: value } : appointment
        ));
    };

    return (
        <div className="w-full h-screen overflow-auto bg-gray-50/50 dark:bg-gray-900/50">
            <div className="w-full p-4 space-y-6">
                {/* Header */}
                <div className="text-center py-4 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-md">
                    <h1 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 tracking-wide">
                        Призначення на посади
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Історія призначень та переводів
                    </p>
                    <div className="w-24 h-0.5 bg-indigo-300 mx-auto mt-2 rounded-full"></div>
                </div>

                {/* Table Card */}
                <Card className="shadow-lg border border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                    <CardHeader className="pb-3 pt-4 bg-gradient-to-r from-indigo-100 to-purple-50 dark:from-indigo-900/30 dark:to-purple-800/30">
                        <CardTitle className="text-lg font-medium text-gray-700 dark:text-gray-300 flex items-center gap-3">
                            <div className="w-2 h-5 bg-indigo-400 rounded-full"></div>
                            Призначення на посади
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-auto max-h-[70vh]">
                            <Table>
                                <TableHeader className="sticky top-0 z-10">
                                    <TableRow className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 hover:bg-gradient-to-r hover:from-indigo-100 hover:to-purple-100 dark:hover:from-indigo-900/30 dark:hover:to-purple-900/30">
                                        <TableHead className="w-12 text-center font-semibold text-gray-700 dark:text-gray-300">#</TableHead>
                                        <TableHead className="min-w-[120px] font-semibold text-gray-700 dark:text-gray-300">Дата</TableHead>
                                        <TableHead className="min-w-[100px] font-semibold text-gray-700 dark:text-gray-300">Підрозділ</TableHead>
                                        <TableHead className="min-w-[150px] font-semibold text-gray-700 dark:text-gray-300">Посада</TableHead>
                                        <TableHead className="min-w-[130px] font-semibold text-gray-700 dark:text-gray-300">Вид труд.договору</TableHead>
                                        <TableHead className="min-w-[100px] font-semibold text-gray-700 dark:text-gray-300">Оклад</TableHead>
                                        <TableHead className="min-w-[100px] font-semibold text-gray-700 dark:text-gray-300">Наказ №</TableHead>
                                        <TableHead className="min-w-[120px] font-semibold text-gray-700 dark:text-gray-300">від</TableHead>
                                        <TableHead className="w-12 text-center font-semibold text-gray-700 dark:text-gray-300">Дії</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {appointments.map((appointment, index) => (
                                        <TableRow 
                                            key={appointment.id} 
                                            className="hover:bg-indigo-50/50 dark:hover:bg-indigo-900/10 transition-colors duration-200 group"
                                        >
                                            <TableCell className="text-center font-medium text-gray-600 dark:text-gray-400">
                                                {index + 1}
                                            </TableCell>
                                            <TableCell className="p-1">
                                                <EditableCell
                                                    value={appointment.date}
                                                    onChange={(value) => updateAppointment(appointment.id, 'date', value)}
                                                    type="date"
                                                />
                                            </TableCell>
                                            <TableCell className="p-1">
                                                <EditableSelectCell
                                                    value={appointment.department}
                                                    onChange={(value) => updateAppointment(appointment.id, 'department', value)}
                                                    options={departmentOptions}
                                                    placeholder="Підрозділ"
                                                />
                                            </TableCell>
                                            <TableCell className="p-1">
                                                <EditableSelectCell
                                                    value={appointment.position}
                                                    onChange={(value) => updateAppointment(appointment.id, 'position', value)}
                                                    options={positionOptions}
                                                    placeholder="Посада"
                                                />
                                            </TableCell>
                                            <TableCell className="p-1">
                                                <EditableSelectCell
                                                    value={appointment.contractType}
                                                    onChange={(value) => updateAppointment(appointment.id, 'contractType', value)}
                                                    options={contractTypeOptions}
                                                    placeholder="Тип договору"
                                                />
                                            </TableCell>
                                            <TableCell className="p-1">
                                                <EditableCell
                                                    value={appointment.salary}
                                                    onChange={(value) => updateAppointment(appointment.id, 'salary', value)}
                                                    placeholder="0.00"
                                                    className="text-right"
                                                />
                                            </TableCell>
                                            <TableCell className="p-1">
                                                <EditableCell
                                                    value={appointment.orderNumber}
                                                    onChange={(value) => updateAppointment(appointment.id, 'orderNumber', value)}
                                                    placeholder="№"
                                                />
                                            </TableCell>
                                            <TableCell className="p-1">
                                                <EditableCell
                                                    value={appointment.orderDate}
                                                    onChange={(value) => updateAppointment(appointment.id, 'orderDate', value)}
                                                    type="date"
                                                />
                                            </TableCell>
                                            <TableCell className="text-center p-1">
                                                {appointments.length > 1 && (
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => removeAppointment(appointment.id)}
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
                                onClick={addAppointment}
                                className="w-full h-10 border-dashed border-indigo-300 text-indigo-600 hover:bg-indigo-50 hover:border-indigo-400 transition-colors"
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Додати запис
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default AppointmentsTab;