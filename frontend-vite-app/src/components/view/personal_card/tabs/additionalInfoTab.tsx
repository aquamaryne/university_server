import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Award, FileText, AlertCircle } from "lucide-react";

// Выносим опции за пределы компонента
const scientificDegreeOptions = [
    { value: '008', label: '008 - Право' },
    { value: '007', label: '007 - Управління та адміністрування' },
    { value: '009', label: '009 - Міжнародні відносини' },
    { value: '010', label: '010 - Математика' },
    { value: '011', label: '011 - Освітні науки' },
    { value: '012', label: '012 - Інформаційні технології' },
];

const terminationReasonOptions = [
    { value: 'voluntary', label: 'За власним бажанням, ст.38 КЗпП України' },
    { value: 'agreement', label: 'За згодою сторін, ст.36 КЗпП України' },
    { value: 'contract_end', label: 'Закінчення строку контракту' },
    { value: 'reduction', label: 'Скорочення штатів' },
    { value: 'violation', label: 'Порушення трудової дисципліни' },
];

// Типы для состояния
interface CheckboxState {
    fullTime: boolean;
    partTime25: boolean;
    partTime50: boolean;
    partTime75: boolean;
    coWorker: boolean;
    externalCoWorker: boolean;
    temporaryWorker: boolean;
    postalPaidTeacher: boolean;
    scientificCandidate: boolean;
    scientificDoctor: boolean;
    academician: boolean;
    chernobyl1: boolean;
    chernobyl2: boolean;
    chernobyl3: boolean;
    chernobyl4: boolean;
    disability1: boolean;
    disability2: boolean;
    disability3: boolean;
}

interface AdditionalInfoTabProps {
    checkboxes?: CheckboxState;
    onCheckboxChange?: (field: keyof CheckboxState, checked: boolean) => void;
}

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
    value?: string;
    onChange?: (value: string) => void;
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
            onChange={(e) => onChange?.(e.target.value)}
            placeholder={placeholder}
            className={`${size === 'sm' ? 'h-8 text-sm' : 'h-9 text-sm'} transition-all duration-200 focus:ring-1 focus:ring-violet-400/30 hover:border-gray-300 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm hover:shadow font-medium text-gray-700 dark:text-gray-300`}
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
    value?: string;
    onChange?: (value: string) => void;
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
            <SelectTrigger className={`${size === 'sm' ? 'h-8 text-sm' : 'h-9 text-sm'} transition-all duration-200 focus:ring-1 focus:ring-violet-400/30 hover:border-gray-300 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm hover:shadow font-medium text-gray-700 dark:text-gray-300`}>
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

const AdditionalInfoTab: React.FC<AdditionalInfoTabProps> = ({ 
    checkboxes: initialCheckboxes, 
    onCheckboxChange 
}) => {
    const [checkboxes, setCheckboxes] = useState<CheckboxState>(initialCheckboxes || {
        fullTime: false,
        partTime25: false,
        partTime50: false,
        partTime75: false,
        coWorker: false,
        externalCoWorker: false,
        temporaryWorker: false,
        postalPaidTeacher: false,
        scientificCandidate: false,
        scientificDoctor: false,
        academician: false,
        chernobyl1: false,
        chernobyl2: false,
        chernobyl3: false,
        chernobyl4: false,
        disability1: false,
        disability2: false,
        disability3: false,
    });

    const [formData, setFormData] = useState({
        academicTitle: '',
        extendedZone: '0.00',
        scientificDegree: '008',
        lastTitleYear: '2004',
        lastQualificationYear: '2023',
        scientificExperience: '24',
        branch: '',
        chernobylCertificate: '',
        disabilityCertificate: '',
        additionalInfo1: '',
        additionalInfo2: '',
        terminationDate: '',
        terminationReason: '',
        terminationOrderNumber: '',
        terminationOrderDate: '',
    });

    const handleCheckboxChange = (field: keyof CheckboxState, checked: boolean) => {
        setCheckboxes(prev => ({ ...prev, [field]: checked }));
        onCheckboxChange?.(field, checked);
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const getActiveWorkStatus = () => {
        const activeStatuses = [];
        if (checkboxes.fullTime) activeStatuses.push('Повна ставка');
        if (checkboxes.partTime25) activeStatuses.push('0.25');
        if (checkboxes.partTime50) activeStatuses.push('0.50');
        if (checkboxes.partTime75) activeStatuses.push('0.75');
        if (checkboxes.coWorker) activeStatuses.push('Сумісник');
        if (checkboxes.externalCoWorker) activeStatuses.push('Зовнішній сумісник');
        if (checkboxes.temporaryWorker) activeStatuses.push('Тимчасово');
        if (checkboxes.postalPaidTeacher) activeStatuses.push('Почасовик');
        return activeStatuses;
    };

    const getScientificDegrees = () => {
        const degrees = [];
        if (checkboxes.scientificCandidate) degrees.push('Кандидат наук');
        if (checkboxes.scientificDoctor) degrees.push('Доктор наук');
        if (checkboxes.academician) degrees.push('Академік');
        return degrees;
    };

    return (
        <div className="w-full h-screen overflow-auto bg-gray-50/50 dark:bg-gray-900/50">
            <div className="w-full p-4 space-y-6">
                {/* Header */}
                <div className="text-center py-4 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-md">
                    <h1 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 tracking-wide">
                        Додаткова інформація
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Статус роботи та наукова діяльність
                    </p>
                    <div className="w-24 h-0.5 bg-violet-300 mx-auto mt-2 rounded-full"></div>
                </div>

                {/* Status Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="shadow-md border border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-800/90">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <FileText className="w-5 h-5 text-blue-500" />
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Статус роботи</p>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                        {getActiveWorkStatus().map((status, index) => (
                                            <Badge key={index} variant="secondary" className="text-xs">
                                                {status}
                                            </Badge>
                                        ))}
                                        {getActiveWorkStatus().length === 0 && (
                                            <span className="text-xs text-gray-400">Не вказано</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Card className="shadow-md border border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-800/90">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <Award className="w-5 h-5 text-purple-500" />
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Наукові ступені</p>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                        {getScientificDegrees().map((degree, index) => (
                                            <Badge key={index} variant="secondary" className="text-xs bg-purple-100 text-purple-800">
                                                {degree}
                                            </Badge>
                                        ))}
                                        {getScientificDegrees().length === 0 && (
                                            <span className="text-xs text-gray-400">Не вказано</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Card className="shadow-md border border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-800/90">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <AlertCircle className="w-5 h-5 text-orange-500" />
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Пільги</p>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                        {(checkboxes.chernobyl1 || checkboxes.chernobyl2 || checkboxes.chernobyl3 || checkboxes.chernobyl4) && (
                                            <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-800">
                                                Чорнобилець
                                            </Badge>
                                        )}
                                        {(checkboxes.disability1 || checkboxes.disability2 || checkboxes.disability3) && (
                                            <Badge variant="secondary" className="text-xs bg-red-100 text-red-800">
                                                Інвалідність
                                            </Badge>
                                        )}
                                        {!(checkboxes.chernobyl1 || checkboxes.chernobyl2 || checkboxes.chernobyl3 || checkboxes.chernobyl4 || checkboxes.disability1 || checkboxes.disability2 || checkboxes.disability3) && (
                                            <span className="text-xs text-gray-400">Не вказано</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-6">
                        {/* Work Status */}
                        <Card className="shadow-lg border border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                            <CardHeader className="pb-3 pt-4 bg-gradient-to-r from-blue-100 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-800/30">
                                <CardTitle className="text-lg font-medium text-gray-700 dark:text-gray-300 flex items-center gap-3">
                                    <div className="w-2 h-5 bg-blue-400 rounded-full"></div>
                                    Статус роботи
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 px-6 py-4 bg-gray-50/30 dark:bg-gray-700/20">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-3">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox 
                                                id="fullTime" 
                                                checked={checkboxes.fullTime}
                                                onCheckedChange={(checked) => handleCheckboxChange('fullTime', !!checked)}
                                                className="border border-gray-300 data-[state=checked]:bg-blue-500"
                                            />
                                            <Label htmlFor="fullTime" className="text-sm font-medium text-gray-700 dark:text-gray-300">Повна ставка</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox 
                                                id="partTime25" 
                                                checked={checkboxes.partTime25}
                                                onCheckedChange={(checked) => handleCheckboxChange('partTime25', !!checked)}
                                                className="border border-gray-300 data-[state=checked]:bg-blue-500"
                                            />
                                            <Label htmlFor="partTime25" className="text-sm font-medium text-gray-700 dark:text-gray-300">0.25 ставки</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox 
                                                id="partTime50" 
                                                checked={checkboxes.partTime50}
                                                onCheckedChange={(checked) => handleCheckboxChange('partTime50', !!checked)}
                                                className="border border-gray-300 data-[state=checked]:bg-blue-500"
                                            />
                                            <Label htmlFor="partTime50" className="text-sm font-medium text-gray-700 dark:text-gray-300">0.50 ставки</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox 
                                                id="partTime75" 
                                                checked={checkboxes.partTime75}
                                                onCheckedChange={(checked) => handleCheckboxChange('partTime75', !!checked)}
                                                className="border border-gray-300 data-[state=checked]:bg-blue-500"
                                            />
                                            <Label htmlFor="partTime75" className="text-sm font-medium text-gray-700 dark:text-gray-300">0.75 ставки</Label>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-3">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox 
                                                id="coWorker" 
                                                checked={checkboxes.coWorker}
                                                onCheckedChange={(checked) => handleCheckboxChange('coWorker', !!checked)}
                                                className="border border-gray-300 data-[state=checked]:bg-blue-500"
                                            />
                                            <Label htmlFor="coWorker" className="text-sm font-medium text-gray-700 dark:text-gray-300">Сумісник</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox 
                                                id="externalCoWorker" 
                                                checked={checkboxes.externalCoWorker}
                                                onCheckedChange={(checked) => handleCheckboxChange('externalCoWorker', !!checked)}
                                                className="border border-gray-300 data-[state=checked]:bg-blue-500"
                                            />
                                            <Label htmlFor="externalCoWorker" className="text-sm font-medium text-gray-700 dark:text-gray-300">Сумісник зі сторони</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox 
                                                id="temporaryWorker" 
                                                checked={checkboxes.temporaryWorker}
                                                onCheckedChange={(checked) => handleCheckboxChange('temporaryWorker', !!checked)}
                                                className="border border-gray-300 data-[state=checked]:bg-blue-500"
                                            />
                                            <Label htmlFor="temporaryWorker" className="text-sm font-medium text-gray-700 dark:text-gray-300">Працює тимчасово</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox 
                                                id="postalPaidTeacher" 
                                                checked={checkboxes.postalPaidTeacher}
                                                onCheckedChange={(checked) => handleCheckboxChange('postalPaidTeacher', !!checked)}
                                                className="border border-gray-300 data-[state=checked]:bg-blue-500"
                                            />
                                            <Label htmlFor="postalPaidTeacher" className="text-sm font-medium text-gray-700 dark:text-gray-300">Викладач з почасовою оплатою</Label>
                                        </div>
                                    </div>
                                </div>

                                <Separator className="my-4" />

                                <FormField
                                    id="academicTitle"
                                    label="Вчене звання"
                                    value={formData.academicTitle}
                                    onChange={(value) => handleInputChange('academicTitle', value)}
                                    placeholder="Професор, доцент, тощо"
                                    size="sm"
                                />
                            </CardContent>
                        </Card>

                        {/* Benefits */}
                        <div className="grid grid-cols-1 gap-4">
                            {/* Chernobyl Section */}
                            <Card className="shadow-lg border border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                                <CardHeader className="pb-3 pt-4 bg-gradient-to-r from-orange-100 to-amber-50 dark:from-orange-900/30 dark:to-amber-800/30">
                                    <CardTitle className="text-lg font-medium text-gray-700 dark:text-gray-300 flex items-center gap-3">
                                        <div className="w-2 h-5 bg-orange-400 rounded-full"></div>
                                        Чорнобилець
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4 px-6 py-4 bg-gray-50/30 dark:bg-gray-700/20">
                                    <div className="flex gap-4">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox 
                                                id="chernobyl1" 
                                                checked={checkboxes.chernobyl1}
                                                onCheckedChange={(checked) => handleCheckboxChange('chernobyl1', !!checked)}
                                                className="border border-gray-300 data-[state=checked]:bg-orange-500"
                                            />
                                            <Label htmlFor="chernobyl1" className="text-sm font-medium text-gray-700 dark:text-gray-300">1 кат.</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox 
                                                id="chernobyl2" 
                                                checked={checkboxes.chernobyl2}
                                                onCheckedChange={(checked) => handleCheckboxChange('chernobyl2', !!checked)}
                                                className="border border-gray-300 data-[state=checked]:bg-orange-500"
                                            />
                                            <Label htmlFor="chernobyl2" className="text-sm font-medium text-gray-700 dark:text-gray-300">2 кат.</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox 
                                                id="chernobyl3" 
                                                checked={checkboxes.chernobyl3}
                                                onCheckedChange={(checked) => handleCheckboxChange('chernobyl3', !!checked)}
                                                className="border border-gray-300 data-[state=checked]:bg-orange-500"
                                            />
                                            <Label htmlFor="chernobyl3" className="text-sm font-medium text-gray-700 dark:text-gray-300">3 кат.</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox 
                                                id="chernobyl4" 
                                                checked={checkboxes.chernobyl4}
                                                onCheckedChange={(checked) => handleCheckboxChange('chernobyl4', !!checked)}
                                                className="border border-gray-300 data-[state=checked]:bg-orange-500"
                                            />
                                            <Label htmlFor="chernobyl4" className="text-sm font-medium text-gray-700 dark:text-gray-300">4 кат.</Label>
                                        </div>
                                    </div>
                                    <FormField
                                        id="chernobylCertificate"
                                        label="№ посвідчення чорнобильця, коли і ким видане"
                                        value={formData.chernobylCertificate}
                                        onChange={(value) => handleInputChange('chernobylCertificate', value)}
                                        placeholder="Номер посвідчення та дата видачі"
                                        size="sm"
                                    />
                                </CardContent>
                            </Card>

                            {/* Disability Section */}
                            <Card className="shadow-lg border border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                                <CardHeader className="pb-3 pt-4 bg-gradient-to-r from-red-100 to-pink-50 dark:from-red-900/30 dark:to-pink-800/30">
                                    <CardTitle className="text-lg font-medium text-gray-700 dark:text-gray-300 flex items-center gap-3">
                                        <div className="w-2 h-5 bg-red-400 rounded-full"></div>
                                        Інвалідність
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4 px-6 py-4 bg-gray-50/30 dark:bg-gray-700/20">
                                    <div className="flex gap-4">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox 
                                                id="disability1" 
                                                checked={checkboxes.disability1}
                                                onCheckedChange={(checked) => handleCheckboxChange('disability1', !!checked)}
                                                className="border border-gray-300 data-[state=checked]:bg-red-500"
                                            />
                                            <Label htmlFor="disability1" className="text-sm font-medium text-gray-700 dark:text-gray-300">1 групи</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox 
                                                id="disability2" 
                                                checked={checkboxes.disability2}
                                                onCheckedChange={(checked) => handleCheckboxChange('disability2', !!checked)}
                                                className="border border-gray-300 data-[state=checked]:bg-red-500"
                                            />
                                            <Label htmlFor="disability2" className="text-sm font-medium text-gray-700 dark:text-gray-300">2 групи</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox 
                                                id="disability3" 
                                                checked={checkboxes.disability3}
                                                onCheckedChange={(checked) => handleCheckboxChange('disability3', !!checked)}
                                                className="border border-gray-300 data-[state=checked]:bg-red-500"
                                            />
                                            <Label htmlFor="disability3" className="text-sm font-medium text-gray-700 dark:text-gray-300">3 групи</Label>
                                        </div>
                                    </div>
                                    <FormField
                                        id="disabilityCertificate"
                                        label="№ посвідчення, коли і ким видане"
                                        value={formData.disabilityCertificate}
                                        onChange={(value) => handleInputChange('disabilityCertificate', value)}
                                        placeholder="Номер посвідчення та дата видачі"
                                        size="sm"
                                    />
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        {/* Scientific Information */}
                        <Card className="shadow-lg border border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                            <CardHeader className="pb-3 pt-4 bg-gradient-to-r from-purple-100 to-violet-50 dark:from-purple-900/30 dark:to-violet-800/30">
                                <CardTitle className="text-lg font-medium text-gray-700 dark:text-gray-300 flex items-center gap-3">
                                    <div className="w-2 h-5 bg-purple-400 rounded-full"></div>
                                    Наукова діяльність
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 px-6 py-4 bg-gray-50/30 dark:bg-gray-700/20">
                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        id="extendedZone"
                                        label="Розширена зона"
                                        value={formData.extendedZone}
                                        onChange={(value) => handleInputChange('extendedZone', value)}
                                        placeholder="0.00"
                                        size="sm"
                                    />
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox 
                                                id="scientificCandidate" 
                                                checked={checkboxes.scientificCandidate}
                                                onCheckedChange={(checked) => handleCheckboxChange('scientificCandidate', !!checked)}
                                                className="border border-gray-300 data-[state=checked]:bg-purple-500"
                                            />
                                        </div>
                                        <Button variant="outline" size="sm" className="h-8 text-xs">
                                            Карта канд.
                                        </Button>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox 
                                                id="scientificDoctor" 
                                                checked={checkboxes.scientificDoctor}
                                                onCheckedChange={(checked) => handleCheckboxChange('scientificDoctor', !!checked)}
                                                className="border border-gray-300 data-[state=checked]:bg-purple-500"
                                            />
                                            <Label htmlFor="scientificDoctor" className="text-sm font-medium text-gray-700 dark:text-gray-300">Доктор наук</Label>
                                        </div>
                                        <Button variant="outline" size="sm" className="h-8 text-xs">
                                            Карта докт.
                                        </Button>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Checkbox 
                                            id="academician" 
                                            checked={checkboxes.academician}
                                            onCheckedChange={(checked) => handleCheckboxChange('academician', !!checked)}
                                            className="border border-gray-300 data-[state=checked]:bg-purple-500"
                                        />
                                        <Label htmlFor="academician" className="text-sm font-medium text-gray-700 dark:text-gray-300">Академік</Label>
                                    </div>
                                </div>

                                <SelectField
                                    id="scientificDegree"
                                    label="Галузь вченого ступеня"
                                    value={formData.scientificDegree}
                                    onChange={(value) => handleInputChange('scientificDegree', value)}
                                    options={scientificDegreeOptions}
                                    size="sm"
                                />

                                <div className="grid grid-cols-1 gap-4">
                                    <FormField
                                        id="lastTitleYear"
                                        label="Рік присвоєння останнього вченого звання"
                                        value={formData.lastTitleYear}
                                        onChange={(value) => handleInputChange('lastTitleYear', value)}
                                        placeholder="2024"
                                        size="sm"
                                    />

                                    <FormField
                                        id="lastQualificationYear"
                                        label="Рік останнього підвищення кваліфікації"
                                        value={formData.lastQualificationYear}
                                        onChange={(value) => handleInputChange('lastQualificationYear', value)}
                                        placeholder="2024"
                                        size="sm"
                                    />

                                    <FormField
                                        id="scientificExperience"
                                        label="Загальний науково-педагогічний стаж"
                                        value={formData.scientificExperience}
                                        onChange={(value) => handleInputChange('scientificExperience', value)}
                                        placeholder="років"
                                        size="sm"
                                    />

                                    <FormField
                                        id="branch"
                                        label="Філія"
                                        value={formData.branch}
                                        onChange={(value) => handleInputChange('branch', value)}
                                        placeholder="Назва філії"
                                        size="sm"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Additional Information */}
                        <Card className="shadow-lg border border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                            <CardHeader className="pb-3 pt-4 bg-gradient-to-r from-teal-100 to-cyan-50 dark:from-teal-900/30 dark:to-cyan-800/30">
                                <CardTitle className="text-lg font-medium text-gray-700 dark:text-gray-300 flex items-center gap-3">
                                    <div className="w-2 h-5 bg-teal-400 rounded-full"></div>
                                    Додаткові відомості
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 px-6 py-4 bg-gray-50/30 dark:bg-gray-700/20">
                                <div className="space-y-4">
                                    <FormField
                                        id="additionalInfo1"
                                        label="Додаткові відомості (рядок 1)"
                                        value={formData.additionalInfo1}
                                        onChange={(value) => handleInputChange('additionalInfo1', value)}
                                        placeholder="Додаткова інформація"
                                        size="sm"
                                    />
                                    
                                    <FormField
                                        id="additionalInfo2"
                                        label="Додаткові відомості (рядок 2)"
                                        value={formData.additionalInfo2}
                                        onChange={(value) => handleInputChange('additionalInfo2', value)}
                                        placeholder="Додаткова інформація"
                                        size="sm"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Termination Information */}
                        <Card className="shadow-lg border border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                            <CardHeader className="pb-3 pt-4 bg-gradient-to-r from-gray-100 to-slate-50 dark:from-gray-900/30 dark:to-slate-800/30">
                                <CardTitle className="text-lg font-medium text-gray-700 dark:text-gray-300 flex items-center gap-3">
                                    <div className="w-2 h-5 bg-gray-400 rounded-full"></div>
                                    Звільнення
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 px-6 py-4 bg-gray-50/30 dark:bg-gray-700/20">
                                <div className="grid grid-cols-1 gap-4">
                                    <FormField
                                        id="terminationDate"
                                        label="Дата звільнення"
                                        value={formData.terminationDate}
                                        onChange={(value) => handleInputChange('terminationDate', value)}
                                        type="date"
                                        size="sm"
                                    />

                                    <SelectField
                                        id="terminationReason"
                                        label="Причина звільнення"
                                        value={formData.terminationReason}
                                        onChange={(value) => handleInputChange('terminationReason', value)}
                                        options={terminationReasonOptions}
                                        placeholder="Оберіть причину"
                                        size="sm"
                                    />

                                    <FormField
                                        id="terminationOrderNumber"
                                        label="№ наказу на звільнення"
                                        value={formData.terminationOrderNumber}
                                        onChange={(value) => handleInputChange('terminationOrderNumber', value)}
                                        placeholder="Номер наказу"
                                        size="sm"
                                    />

                                    <FormField
                                        id="terminationOrderDate"
                                        label="Дата наказу на звільнення"
                                        value={formData.terminationOrderDate}
                                        onChange={(value) => handleInputChange('terminationOrderDate', value)}
                                        type="date"
                                        size="sm"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdditionalInfoTab;