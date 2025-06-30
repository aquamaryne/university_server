import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";

// Выносим опции за пределы компонента
const familyMemberOptions = [
    { value: 'spouse', label: 'Дружина/Чоловік' },
    { value: 'child', label: 'Дитина' },
    { value: 'parent', label: 'Батько/Мати' },
    { value: 'sibling', label: 'Брат/Сестра' },
    { value: 'other', label: 'Інше' },
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

const GeneralInfo2Tab: React.FC = () => {
    const [familyMembers, setFamilyMembers] = React.useState([
        { id: 1, relation: '', fullName: '' }
    ]);

    // Состояние для всех полей формы
    const [formData, setFormData] = React.useState({
        // Паспортные данные
        passportSeries: '',
        passportNumber: '',
        passportIssueDate: '',
        passportIssuedBy: '',
        // Контактная информация
        homeAddress: '',
        homePhone: '',
        mobilePhone: '',
        workPhone: '',
        email: '',
        // Военная служба
        militaryStatus: '',
        militaryTicket: '',
        // Экстренный контакт
        emergencyContactName: '',
        emergencyContactPhone: '',
        emergencyContactRelation: ''
    });

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const addFamilyMember = () => {
        setFamilyMembers([...familyMembers, { 
            id: Date.now(), 
            relation: '', 
            fullName: '' 
        }]);
    };

    const removeFamilyMember = (id: number) => {
        if (familyMembers.length > 1) {
            setFamilyMembers(familyMembers.filter(member => member.id !== id));
        }
    };

    const updateFamilyMember = (id: number, field: 'relation' | 'fullName', value: string) => {
        setFamilyMembers(familyMembers.map(member => 
            member.id === id ? { ...member, [field]: value } : member
        ));
    };

    return (
        <div className="w-full h-screen overflow-auto bg-gray-50/50 dark:bg-gray-900/50">
            <div className="w-full p-4 space-y-6">
                {/* Soft Header */}
                <div className="text-center py-4 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-md">
                    <h1 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 tracking-wide">
                        Особова картка працівника
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Додаткова інформація
                    </p>
                    <div className="w-24 h-0.5 bg-blue-300 mx-auto mt-2 rounded-full"></div>
                </div>

                <div className="w-full space-y-6">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-6">
                        {/* Family Status Section */}
                        <Card className="shadow-lg border border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm transform hover:scale-[1.005] transition-all duration-300">
                            <CardHeader className="pb-3 pt-4 bg-gradient-to-r from-purple-100 to-violet-50 dark:from-purple-900/30 dark:to-violet-800/30">
                                <CardTitle className="text-lg font-medium text-gray-700 dark:text-gray-300 flex items-center gap-3">
                                    <div className="w-2 h-5 bg-purple-400 rounded-full"></div>
                                    11. Родинний стан
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 px-6 py-4 bg-gray-50/30 dark:bg-gray-700/20">
                                <div className="space-y-4">
                                    {familyMembers.map((member, index) => (
                                        <div key={member.id} className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border-l-2 border-purple-300">
                                            <div className="flex items-center gap-2 mb-3">
                                                <Badge variant="secondary" className="text-xs h-5 bg-purple-200 text-purple-700 font-medium">
                                                    Член сім'ї {index + 1}
                                                </Badge>
                                                {familyMembers.length > 1 && (
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => removeFamilyMember(member.id)}
                                                        className="h-6 w-6 p-0 hover:bg-red-100 hover:text-red-600"
                                                    >
                                                        <X className="h-3 w-3" />
                                                    </Button>
                                                )}
                                            </div>
                                            
                                            <div className="grid grid-cols-1 gap-4">
                                                <SelectField
                                                    id={`relation-${member.id}`}
                                                    label="Ступінь споріднення"
                                                    value={member.relation}
                                                    onChange={(value) => updateFamilyMember(member.id, 'relation', value)}
                                                    options={familyMemberOptions}
                                                    size="sm"
                                                />
                                                <FormField
                                                    id={`fullName-${member.id}`}
                                                    label="ПІБ"
                                                    value={member.fullName}
                                                    onChange={(value) => updateFamilyMember(member.id, 'fullName', value)}
                                                    placeholder="Прізвище Ім'я По-батькові"
                                                    size="sm"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                    
                                    <Button
                                        variant="outline"
                                        onClick={addFamilyMember}
                                        className="w-full h-10 border-dashed border-purple-300 text-purple-600 hover:bg-purple-50 hover:border-purple-400 transition-colors"
                                    >
                                        <Plus className="h-4 w-4 mr-2" />
                                        Додати члена сім'ї
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Contact Information Section */}
                        <Card className="shadow-lg border border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm transform hover:scale-[1.005] transition-all duration-300">
                            <CardHeader className="pb-3 pt-4 bg-gradient-to-r from-green-100 to-emerald-50 dark:from-green-900/30 dark:to-emerald-800/30">
                                <CardTitle className="text-lg font-medium text-gray-700 dark:text-gray-300 flex items-center gap-3">
                                    <div className="w-2 h-5 bg-green-400 rounded-full"></div>
                                    13-14. Контактна інформація
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 px-6 py-4 bg-gray-50/30 dark:bg-gray-700/20">
                                <div className="space-y-4">
                                    {/* Address */}
                                    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border-l-2 border-green-300">
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-2 mb-3">
                                                <Badge variant="secondary" className="text-xs h-5 bg-green-200 text-green-700 font-medium">
                                                    Адреса проживання
                                                </Badge>
                                            </div>
                                            
                                            <FormField
                                                id="homeAddress"
                                                label="Домашня адреса"
                                                value={formData.homeAddress}
                                                onChange={(value) => handleInputChange('homeAddress', value)}
                                                placeholder="вул. Назва, буд. №, кв. №, місто, індекс"
                                                size="sm"
                                            />
                                        </div>
                                    </div>

                                    {/* Phone Numbers */}
                                    <div className="p-4 bg-gradient-to-br from-green-50/70 to-emerald-50/70 dark:from-green-900/10 dark:to-emerald-900/10 rounded-lg shadow-sm border border-green-100 dark:border-green-800">
                                        <div className="flex items-center gap-2 mb-3">
                                            <Badge variant="secondary" className="text-xs h-5 bg-green-200 text-green-700 font-medium">
                                                Телефони
                                            </Badge>
                                        </div>
                                        
                                        <div className="grid grid-cols-1 gap-4">
                                            <FormField
                                                id="homePhone"
                                                label="Домашній телефон"
                                                value={formData.homePhone}
                                                onChange={(value) => handleInputChange('homePhone', value)}
                                                placeholder="+380 (44) 000-00-00"
                                                size="sm"
                                            />
                                            <FormField
                                                id="mobilePhone"
                                                label="Мобільний телефон"
                                                value={formData.mobilePhone}
                                                onChange={(value) => handleInputChange('mobilePhone', value)}
                                                placeholder="+380 (67) 000-00-00"
                                                size="sm"
                                            />
                                        </div>
                                    </div>

                                    {/* Additional Contact */}
                                    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border-l-2 border-indigo-300">
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-2 mb-3">
                                                <Badge variant="secondary" className="text-xs h-5 bg-indigo-200 text-indigo-700 font-medium">
                                                    Додаткові контакти
                                                </Badge>
                                            </div>
                                            
                                            <div className="grid grid-cols-1 gap-4">
                                                <FormField
                                                    id="workPhone"
                                                    label="Робочий телефон"
                                                    value={formData.workPhone}
                                                    onChange={(value) => handleInputChange('workPhone', value)}
                                                    placeholder="+380 (44) 000-00-00"
                                                    size="sm"
                                                />
                                                <FormField
                                                    id="email"
                                                    label="Електронна пошта"
                                                    value={formData.email}
                                                    onChange={(value) => handleInputChange('email', value)}
                                                    type="email"
                                                    placeholder="email@example.com"
                                                    size="sm"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        {/* Passport Section */}
                        <Card className="shadow-lg border border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm transform hover:scale-[1.005] transition-all duration-300">
                            <CardHeader className="pb-3 pt-4 bg-gradient-to-r from-blue-100 to-sky-50 dark:from-blue-900/30 dark:to-sky-800/30">
                                <CardTitle className="text-lg font-medium text-gray-700 dark:text-gray-300 flex items-center gap-3">
                                    <div className="w-2 h-5 bg-blue-400 rounded-full"></div>
                                    12. Паспортні дані
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 px-6 py-4 bg-gray-50/30 dark:bg-gray-700/20">
                                <div className="p-4 bg-gradient-to-br from-blue-50/70 to-sky-50/70 dark:from-blue-900/10 dark:to-sky-900/10 rounded-lg shadow-sm border border-blue-100 dark:border-blue-800">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 mb-3">
                                            <Badge variant="secondary" className="text-xs h-5 bg-blue-200 text-blue-700 font-medium">
                                                Документ
                                            </Badge>
                                        </div>
                                        
                                        <div className="grid grid-cols-2 gap-4">
                                            <FormField
                                                id="passportSeries"
                                                label="Серія"
                                                value={formData.passportSeries}
                                                onChange={(value) => handleInputChange('passportSeries', value)}
                                                placeholder="АА"
                                                size="sm"
                                            />
                                            <FormField
                                                id="passportNumber"
                                                label="Номер"
                                                value={formData.passportNumber}
                                                onChange={(value) => handleInputChange('passportNumber', value)}
                                                placeholder="000000"
                                                size="sm"
                                            />
                                        </div>
                                        
                                        <FormField
                                            id="passportIssueDate"
                                            label="Дата видачі"
                                            value={formData.passportIssueDate}
                                            onChange={(value) => handleInputChange('passportIssueDate', value)}
                                            type="date"
                                            size="sm"
                                        />
                                        
                                        <FormField
                                            id="passportIssuedBy"
                                            label="Ким виданий"
                                            value={formData.passportIssuedBy}
                                            onChange={(value) => handleInputChange('passportIssuedBy', value)}
                                            placeholder="Назва органу, що видав паспорт"
                                            size="sm"
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Additional Information Section */}
                        <Card className="shadow-lg border border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm transform hover:scale-[1.005] transition-all duration-300">
                            <CardHeader className="pb-3 pt-4 bg-gradient-to-r from-orange-100 to-amber-50 dark:from-orange-900/30 dark:to-amber-800/30">
                                <CardTitle className="text-lg font-medium text-gray-700 dark:text-gray-300 flex items-center gap-3">
                                    <div className="w-2 h-5 bg-orange-400 rounded-full"></div>
                                    Додаткова інформація
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 px-6 py-4 bg-gray-50/30 dark:bg-gray-700/20">
                                <div className="space-y-4">
                                    {/* Military Service */}
                                    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border-l-2 border-orange-300">
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-2 mb-3">
                                                <Badge variant="secondary" className="text-xs h-5 bg-orange-200 text-orange-700 font-medium">
                                                    Військова служба
                                                </Badge>
                                            </div>
                                            
                                            <SelectField
                                                id="militaryStatus"
                                                label="Відношення до військової служби"
                                                value={formData.militaryStatus}
                                                onChange={(value) => handleInputChange('militaryStatus', value)}
                                                options={[
                                                    { value: 'served', label: 'Служив' },
                                                    { value: 'exempt', label: 'Звільнений' },
                                                    { value: 'liable', label: 'Військовозобов\'язаний' },
                                                    { value: 'not_liable', label: 'Не військовозобов\'язаний' },
                                                ]}
                                                size="sm"
                                            />
                                            
                                            <FormField
                                                id="militaryTicket"
                                                label="Військовий квиток"
                                                value={formData.militaryTicket}
                                                onChange={(value) => handleInputChange('militaryTicket', value)}
                                                placeholder="Серія та номер"
                                                size="sm"
                                            />
                                        </div>
                                    </div>

                                    {/* Emergency Contact */}
                                    <div className="p-4 bg-gradient-to-br from-red-50/70 to-pink-50/70 dark:from-red-900/10 dark:to-pink-900/10 rounded-lg shadow-sm border border-red-100 dark:border-red-800">
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-2 mb-3">
                                                <Badge variant="secondary" className="text-xs h-5 bg-red-200 text-red-700 font-medium">
                                                    Екстрений контакт
                                                </Badge>
                                            </div>
                                            
                                            <FormField
                                                id="emergencyContactName"
                                                label="ПІБ контактної особи"
                                                value={formData.emergencyContactName}
                                                onChange={(value) => handleInputChange('emergencyContactName', value)}
                                                placeholder="Прізвище Ім'я По-батькові"
                                                size="sm"
                                            />
                                            
                                            <FormField
                                                id="emergencyContactPhone"
                                                label="Телефон"
                                                value={formData.emergencyContactPhone}
                                                onChange={(value) => handleInputChange('emergencyContactPhone', value)}
                                                placeholder="+380 (67) 000-00-00"
                                                size="sm"
                                            />
                                            
                                            <FormField
                                                id="emergencyContactRelation"
                                                label="Ступінь споріднення"
                                                value={formData.emergencyContactRelation}
                                                onChange={(value) => handleInputChange('emergencyContactRelation', value)}
                                                placeholder="Дружина, син, тощо"
                                                size="sm"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
};

export default GeneralInfo2Tab;