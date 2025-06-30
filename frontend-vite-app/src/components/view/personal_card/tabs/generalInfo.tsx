import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { type EmployeeData } from "../types/cardTypes";

interface GeneralInfoTabsProps {
    employeeData: EmployeeData;
    onInputChange: (field: keyof EmployeeData, value: string) => void;
}

// Выносим опции за пределы компонента, чтобы они не пересоздавались
const educationOptions = [
    { value: 'higher', label: 'Вища' },
    { value: 'secondary', label: 'Середня' },
    { value: 'vocational', label: 'Професійно-технічна' },
];

const educationTypeOptions = [
    { value: 'full-time', label: 'Денна' },
    { value: 'part-time', label: 'Заочна' },
    { value: 'external', label: 'Вечірня' },
];

const contractTypeOptions = [
    { value: 'permanent', label: 'Постійний' },
    { value: 'temporary', label: 'Тимчасовий' },
    { value: 'contract', label: 'Контракт' },
];

const terminationReasonOptions = [
    { value: 'resignation', label: 'Звільнення за власним бажанням, ст.38 КЗпП України' },
    { value: 'contract-end', label: 'Закінчення строку контракту' },
    { value: 'agreement', label: 'За згодою сторін' },
];

// Выносим компоненты за пределы основного компонента
const FormField = React.memo(({ 
    id, 
    label, 
    value, 
    onChange, 
    type = "text", 
    className = "", 
    placeholder = "",
    size = "default"
}: {
    id: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    type?: string;
    className?: string;
    placeholder?: string;
    size?: "sm" | "default";
}) => (
    <div className={`space-y-1 ${className}`}>
        <Label htmlFor={id} className="text-xs font-medium text-gray-500 dark:text-gray-400">
            {label}
        </Label>
        <Input 
            id={id}
            type={type}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={`${size === 'sm' ? 'h-8 text-sm' : 'h-9 text-sm'} transition-all duration-200 focus:ring-1 focus:ring-blue-400/30 hover:border-gray-300 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm hover:shadow font-medium text-gray-700 dark:text-gray-300`}
        />
    </div>
));

const SelectField = React.memo(({ 
    id, 
    label, 
    value, 
    onChange, 
    options, 
    className = "",
    placeholder = "Оберіть...",
    size = "default"
}: {
    id: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string; }[];
    className?: string;
    placeholder?: string;
    size?: "sm" | "default";
}) => (
    <div className={`space-y-1 ${className}`}>
        <Label htmlFor={id} className="text-xs font-medium text-gray-500 dark:text-gray-400">
            {label}
        </Label>
        <Select value={value || ''} onValueChange={onChange}>
            <SelectTrigger className={`${size === 'sm' ? 'h-8 text-sm' : 'h-9 text-sm'} transition-all duration-200 focus:ring-1 focus:ring-blue-400/30 hover:border-gray-300 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm hover:shadow font-medium text-gray-700 dark:text-gray-300`}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className="border border-gray-200 dark:border-gray-700 shadow-lg">
                {options.map((option) => (
                    <SelectItem key={option.value} value={option.value} className="text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800">
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    </div>
));

FormField.displayName = 'FormField';
SelectField.displayName = 'SelectField';

const GeneralInfoTab: React.FC<GeneralInfoTabsProps> = ({ employeeData, onInputChange }) => {

    return (
        <div className="w-full h-screen overflow-auto bg-gray-50/50 dark:bg-gray-900/50">
            <div className="w-full p-4 space-y-6">
                {/* Soft Header */}
                <div className="text-center py-4 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-md">
                    <h1 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 tracking-wide">
                        Особова картка працівника
                    </h1>
                    <div className="w-24 h-0.5 bg-blue-300 mx-auto mt-2 rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 h-full">
                    {/* Left Column - Personal Information */}
                    <Card className="shadow-lg border border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm transform hover:scale-[1.005] transition-all duration-300">
                        <CardHeader className="pb-3 pt-4 bg-gradient-to-r from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/30">
                            <CardTitle className="text-lg font-medium text-gray-700 dark:text-gray-300 flex items-center gap-3">
                                <div className="w-2 h-5 bg-blue-400 rounded-full"></div>
                                Особисті дані
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 px-6 py-4 bg-gray-50/30 dark:bg-gray-700/20">
                            {/* ID Information */}
                            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border-l-2 border-blue-300">
                                <div className="grid grid-cols-4 gap-3 mb-3">
                                    <FormField
                                        id="identificationCode"
                                        label="Ідентифікаційний код"
                                        value={employeeData.identificationCode}
                                        onChange={(value) => onInputChange('identificationCode', value)}
                                        className="col-span-3"
                                        placeholder="0000000000"
                                        size="sm"
                                    />
                                    <FormField
                                        id="taxNumber"
                                        label="Таб №"
                                        value={employeeData.taxNumber}
                                        onChange={(value) => onInputChange('taxNumber', value)}
                                        className="col-span-1"
                                        size="sm"
                                    />
                                </div>

                                <FormField
                                    id="personalCardNumber"
                                    label="Особова картка"
                                    value={employeeData.personalCardNumber}
                                    onChange={(value) => onInputChange('personalCardNumber', value)}
                                    placeholder="Номер особової картки"
                                    size="sm"
                                />
                            </div>

                            <Separator className="my-4 bg-gray-200 dark:bg-gray-600 h-px" />

                            {/* Personal Details */}
                            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border-l-2 border-green-300">
                                <div className="grid grid-cols-3 gap-3 mb-3">
                                    <FormField
                                        id="lastName"
                                        label="Прізвище"
                                        value={employeeData.lastName}
                                        onChange={(value) => onInputChange('lastName', value)}
                                        placeholder="Прізвище"
                                        size="sm"
                                    />
                                    <FormField
                                        id="firstName"
                                        label="Ім'я"
                                        value={employeeData.firstName}
                                        onChange={(value) => onInputChange('firstName', value)}
                                        placeholder="Ім'я"
                                        size="sm"
                                    />
                                    <FormField
                                        id="patronymic"
                                        label="По-батькові"
                                        value={employeeData.patronymic}
                                        onChange={(value) => onInputChange('patronymic', value)}
                                        placeholder="По-батькові"
                                        size="sm"
                                    />
                                </div>

                                <div className="grid grid-cols-3 gap-3 mb-3">
                                    <FormField
                                        id="birthDate"
                                        label="Дата народження"
                                        type="date"
                                        value={employeeData.birthDate}
                                        onChange={(value) => onInputChange('birthDate', value)}
                                        size="sm"
                                    />
                                    
                                    <div className="space-y-1">
                                        <Label className="text-xs font-medium text-gray-500 dark:text-gray-400">Стать</Label>
                                        <div className="flex items-center justify-center space-x-4 pt-1 bg-gray-50 dark:bg-gray-700 rounded-lg p-2">
                                            <div className="flex items-center space-x-2">
                                                <Checkbox 
                                                    id="male" 
                                                    checked={employeeData.gender === 'male'}
                                                    onCheckedChange={(checked) => checked && onInputChange('gender', 'male')}
                                                    className="w-4 h-4 border border-gray-300 data-[state=checked]:bg-blue-400"
                                                />
                                                <Label htmlFor="male" className="text-sm font-medium text-gray-600 dark:text-gray-400">Ч</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Checkbox 
                                                    id="female" 
                                                    checked={employeeData.gender === 'female'}
                                                    onCheckedChange={(checked) => checked && onInputChange('gender', 'female')}
                                                    className="w-4 h-4 border border-gray-300 data-[state=checked]:bg-pink-400"
                                                />
                                                <Label htmlFor="female" className="text-sm font-medium text-gray-600 dark:text-gray-400">Ж</Label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <Label className="text-xs font-medium text-gray-500 dark:text-gray-400">Працює з</Label>
                                        <div className="flex items-center space-x-2 bg-gray-50 dark:bg-gray-700 rounded-lg p-2">
                                            <Input
                                                id="workingSince"
                                                value={employeeData.workingSince}
                                                onChange={(e) => onInputChange('workingSince', e.target.value)}
                                                className="h-8 w-16 text-sm font-medium text-center border"
                                                placeholder="2020"
                                            />
                                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">р.</span>
                                        </div>
                                    </div>
                                </div>

                                <FormField
                                    id="birthPlace"
                                    label="Місце народження"
                                    value={employeeData.birthPlace}
                                    onChange={(value) => onInputChange('birthPlace', value)}
                                    placeholder="Місто, країна"
                                    size="sm"
                                />
                            </div>

                            {/* Education Section */}
                            <div className="p-4 bg-gradient-to-br from-blue-50/70 to-indigo-50/70 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-lg shadow-sm border border-blue-100 dark:border-blue-800">
                                <div className="flex items-center gap-2 mb-3">
                                    <Badge variant="secondary" className="text-sm h-6 bg-blue-200 text-blue-700 font-medium shadow-sm">Освіта</Badge>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-3 mb-3">
                                    <SelectField
                                        id="education"
                                        label="Рівень"
                                        value={employeeData.education}
                                        onChange={(value) => onInputChange('education', value)}
                                        options={educationOptions}
                                        size="sm"
                                    />
                                    <SelectField
                                        id="educationType"
                                        label="Вид навчання"
                                        value={employeeData.educationType}
                                        onChange={(value) => onInputChange('educationType', value)}
                                        options={educationTypeOptions}
                                        size="sm"
                                    />
                                </div>

                                <FormField
                                    id="educationInstitution"
                                    label="ЗВО та дата закінчення"
                                    value={employeeData.educationInstitution}
                                    onChange={(value) => onInputChange('educationInstitution', value)}
                                    placeholder="Назва та рік"
                                    size="sm"
                                />
                            </div>

                            {/* Position */}
                            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border-l-2 border-purple-300">
                                <div className="grid grid-cols-4 gap-3">
                                    <SelectField
                                        id="department"
                                        label="Підрозділ"
                                        value={employeeData.department}
                                        onChange={(value) => onInputChange('department', value)}
                                        options={[
                                            { value: "08", label: "08" },
                                            { value: "01", label: "01" },
                                            { value: "02", label: "02" },
                                        ]}
                                        className="col-span-1"
                                        size="sm"
                                    />
                                    
                                    <SelectField
                                        id="position"
                                        label="Посада"
                                        value={employeeData.position}
                                        onChange={(value) => onInputChange('position', value)}
                                        options={[
                                            { value: "senior_lecturer", label: "Ст. викладач" },
                                            { value: "lecturer", label: "Викладач" },
                                            { value: "assistant", label: "Асистент" },
                                        ]}
                                        className="col-span-3"
                                        size="sm"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Right Column - Professional Information */}
                    <Card className="shadow-lg border border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm transform hover:scale-[1.005] transition-all duration-300">
                        <CardHeader className="pb-3 pt-4 bg-gradient-to-r from-green-100 to-emerald-50 dark:from-green-900/30 dark:to-emerald-800/30">
                            <CardTitle className="text-lg font-medium text-gray-700 dark:text-gray-300 flex items-center gap-3">
                                <div className="w-2 h-5 bg-green-400 rounded-full"></div>
                                Професійні дані
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 px-6 py-4 bg-gray-50/30 dark:bg-gray-700/20">
                            {/* Professional Details */}
                            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border-l-2 border-green-300">
                                <div className="grid grid-cols-1 gap-3 mb-3">
                                    <FormField
                                        id="specialization"
                                        label="Спеціальність за дипломом"
                                        value={employeeData.specialization}
                                        onChange={(value) => onInputChange('specialization', value)}
                                        placeholder="Спеціальність"
                                        size="sm"
                                    />

                                    <FormField
                                        id="qualification"
                                        label="Кваліфікація за дипломом"
                                        value={employeeData.qualification}
                                        onChange={(value) => onInputChange('qualification', value)}
                                        placeholder="Кваліфікація"
                                        size="sm"
                                    />

                                    <div className="grid grid-cols-2 gap-3">
                                        <FormField
                                            id="diplomaNumber"
                                            label="Диплом №"
                                            value={employeeData.diplomaNumber}
                                            onChange={(value) => onInputChange('diplomaNumber', value)}
                                            placeholder="Номер"
                                            size="sm"
                                        />
                                        <FormField
                                            id="diplomaDate"
                                            label="Дата диплома"
                                            type="date"
                                            value={employeeData.diplomaDate}
                                            onChange={(value) => onInputChange('diplomaDate', value)}
                                            size="sm"
                                        />
                                    </div>
                                </div>
                            </div>

                            <Separator className="my-4 bg-gray-200 dark:bg-gray-600 h-px" />

                            {/* Experience */}
                            <div className="p-4 bg-gradient-to-br from-orange-50/70 to-amber-50/70 dark:from-orange-900/10 dark:to-amber-900/10 rounded-lg shadow-sm border border-orange-100 dark:border-orange-800">
                                <div className="grid grid-cols-2 gap-3">
                                    <FormField
                                        id="totalExperience"
                                        label="Загальний стаж"
                                        value={employeeData.totalExperience}
                                        onChange={(value) => onInputChange('totalExperience', value)}
                                        placeholder="років"
                                        size="sm"
                                    />

                                    <FormField
                                        id="continuousExperience"
                                        label="Безперервний стаж"
                                        value={employeeData.continuousExperience}
                                        onChange={(value) => onInputChange('continuousExperience', value)}
                                        placeholder="років"
                                        size="sm"
                                    />
                                </div>
                            </div>

                            <Separator className="my-4 bg-gray-200 dark:bg-gray-600 h-px" />

                            {/* Employment Details */}
                            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border-l-2 border-indigo-300">
                                <div className="grid grid-cols-3 gap-3 mb-3">
                                    <FormField
                                        id="hiringDate"
                                        label="Дата прийому"
                                        type="date"
                                        value={employeeData.hiringDate}
                                        onChange={(value) => onInputChange('hiringDate', value)}
                                        size="sm"
                                    />
                                    <FormField
                                        id="hiringOrderNumber"
                                        label="№ наказу"
                                        value={employeeData.hiringOrderNumber}
                                        onChange={(value) => onInputChange('hiringOrderNumber', value)}
                                        placeholder="№"
                                        size="sm"
                                    />
                                    <FormField
                                        id="hiringOrderDate"
                                        label="Дата наказу"
                                        type="date"
                                        value={employeeData.hiringOrderDate}
                                        onChange={(value) => onInputChange('hiringOrderDate', value)}
                                        size="sm"
                                    />
                                </div>

                                <FormField
                                    id="lastWorkplace"
                                    label="Останнє місце роботи"
                                    value={employeeData.lastWorkplace}
                                    onChange={(value) => onInputChange('lastWorkplace', value)}
                                    placeholder="Місце роботи та посада"
                                    size="sm"
                                />
                            </div>

                            <Separator className="my-4 bg-gray-200 dark:bg-gray-600 h-px" />

                            {/* Termination */}
                            <div className="p-4 bg-gradient-to-br from-red-50/70 to-pink-50/70 dark:from-red-900/10 dark:to-pink-900/10 rounded-lg shadow-sm border border-red-100 dark:border-red-800">
                                <div className="grid grid-cols-2 gap-3 mb-3">
                                    <FormField
                                        id="terminationDate"
                                        label="Дата звільнення"
                                        type="date"
                                        value={employeeData.terminationDate}
                                        onChange={(value) => onInputChange('terminationDate', value)}
                                        size="sm"
                                    />

                                    <SelectField
                                        id="terminationReason"
                                        label="Причина звільнення"
                                        value={employeeData.terminationReason}
                                        onChange={(value) => onInputChange('terminationReason', value)}
                                        options={terminationReasonOptions}
                                        size="sm"
                                    />
                                </div>
                            </div>

                            <Separator className="my-4 bg-gray-200 dark:bg-gray-600 h-px" />

                            {/* Contract */}
                            <div className="p-4 bg-gradient-to-br from-purple-50/70 to-violet-50/70 dark:from-purple-900/10 dark:to-violet-900/10 rounded-lg shadow-sm border border-purple-100 dark:border-purple-800">
                                <div className="grid grid-cols-2 gap-3">
                                    <SelectField
                                        id="contractType"
                                        label="Тип угоди"
                                        value={employeeData.contractType}
                                        onChange={(value) => onInputChange('contractType', value)}
                                        options={contractTypeOptions}
                                        size="sm"
                                    />
                                    <FormField
                                        id="contractEndDate"
                                        label="Закінчення угоди"
                                        type="date"
                                        value={employeeData.contractEndDate}
                                        onChange={(value) => onInputChange('contractEndDate', value)}
                                        size="sm"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default GeneralInfoTab;