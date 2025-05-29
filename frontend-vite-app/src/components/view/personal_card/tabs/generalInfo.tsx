import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { type EmployeeData } from "../types/cardTypes";

interface GeneralInfoTabsProps {
    employeeData: EmployeeData,
    onInputChange: (field: keyof EmployeeData, value: string) => void,
}

const GeneralInfoTab: React.FC<GeneralInfoTabsProps> = ({ employeeData, onInputChange }) => {
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
    ]

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-4">
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <Label htmlFor="identificationCode">Ідентифікаційний код</Label>
                            <Input 
                                id="identificationCode"
                                value={employeeData.identificationCode}
                                onChange={(e) => onInputChange('identificationCode', e.target.value)}
                                className="mt-1"
                            />
                        </div>
                        <div className="w-24">
                            <Label htmlFor="taxNumber">Таб №</Label>
                            <Input 
                                id="taxNumber"
                                value={employeeData.taxNumber}
                                onChange={(e) => onInputChange('taxNumber', e.target.value)}
                                className="mt-1"
                            />
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="personalCardNumber">Особова картка</Label>
                        <Input 
                            id="personalCardNumber"
                            value={employeeData.personalCardNumber}
                            onChange={(e) => onInputChange('personalCardNumber', e.target.value)}
                            className="mt-1"
                        />
                    </div>

                    <Separator />

                    <div>
                        <Label htmlFor="lastName">Прізвище</Label>
                        <Input 
                            id="lastName"
                            value={employeeData.lastName}
                            onChange={(e) => onInputChange('lastName', e.target.value)}
                            className="mt-1"
                        />
                    </div>

                    <div>
                        <Label htmlFor="firstName">Ім'я</Label>
                        <Input 
                            id="firstName"
                            value={employeeData.firstName}
                            onChange={(e) => onInputChange('firstName', e.target.value)}
                            className="mt-1"
                        />
                    </div>

                    <div>
                        <Label htmlFor="patronymic">По-батькові</Label>
                        <Input 
                            id="patronymic"
                            value={employeeData.patronymic}
                            onChange={(e) => onInputChange('patronymic', e.target.value)}
                            className="mt-1"
                        />
                    </div>

                    <div>
                        <Label htmlFor="birthDate">Дата народження</Label>
                        <Input 
                            id="birthDate"
                            type="date"
                            value={employeeData.birthDate}
                            onChange={(e) => onInputChange('birthDate', e.target.value)}
                            className="mt-1"
                        />
                    </div>

                    <div>
                        <Label htmlFor="birthPlace">Місце народження</Label>
                        <Input 
                            id="birthPlace"
                            value={employeeData.birthPlace}
                            onChange={(e) => onInputChange('birthPlace', e.target.value)}
                            className="mt-1"
                        />
                    </div>

                    <div className="space-y-3">
                        <Label className="text-base font-medium">Освіта</Label>
                        
                        <div>
                            <Label htmlFor="education">Рівень освіти</Label>
                            <Select value={employeeData.education} onValueChange={(value) => onInputChange('education', value)}>
                                <SelectTrigger className="mt-1">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {educationOptions.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label htmlFor="educationInstitution">Назва і дата закінчення ЗВО</Label>
                            <Input 
                                id="educationInstitution"
                                value={employeeData.educationInstitution}
                                onChange={(e) => onInputChange('educationInstitution', e.target.value)}
                                className="mt-1"
                            />
                        </div>

                        <div>
                            <Label htmlFor="educationType">Вид навчання</Label>
                            <Select value={employeeData.educationType} onValueChange={(value) => onInputChange('educationType', value)}>
                                <SelectTrigger className="mt-1">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {educationTypeOptions.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <div className="w-32">
                            <Label htmlFor="department">Підрозділ</Label>
                            <Select value={employeeData.department} onValueChange={(value) => onInputChange('department', value)}>
                                <SelectTrigger className="mt-1">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="08">08</SelectItem>
                                    <SelectItem value="01">01</SelectItem>
                                    <SelectItem value="02">02</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        
                        <div className="flex-1">
                            <Label htmlFor="position">Посада</Label>
                            <Select value={employeeData.position} onValueChange={(value) => onInputChange('position', value)}>
                                <SelectTrigger className="mt-1">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="senior_lecturer">Старший викладач</SelectItem>
                                    <SelectItem value="lecturer">Викладач</SelectItem>
                                    <SelectItem value="assistant">Асистент</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <Label className="text-sm font-medium">Стать:</Label>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <Checkbox 
                                    id="male" 
                                    checked={employeeData.gender === 'male'}
                                    onCheckedChange={(checked) => checked && onInputChange('gender', 'male')}
                                />
                                <Label htmlFor="male">Чоловічий</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox 
                                    id="female" 
                                    checked={employeeData.gender === 'female'}
                                    onCheckedChange={(checked) => checked && onInputChange('gender', 'female')}
                                />
                                <Label htmlFor="female">Жіночий</Label>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                            <Label htmlFor="workingSince" className="text-sm">В інституті працює з</Label>
                            <Input
                                id="workingSince"
                                value={employeeData.workingSince}
                                onChange={(e) => onInputChange('workingSince', e.target.value)}
                                className="w-20"
                            />
                            <span className="text-sm">року</span>
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="specialization">5. Спеціальність за дипломом</Label>
                        <Input
                            id="specialization"
                            value={employeeData.specialization}
                            onChange={(e) => onInputChange('specialization', e.target.value)}
                            className="mt-1"
                        />
                    </div>

                    <div>
                        <Label htmlFor="qualification">6. Кваліфікація за дипломом</Label>
                        <Input
                            id="qualification"
                            value={employeeData.qualification}
                            onChange={(e) => onInputChange('qualification', e.target.value)}
                            className="mt-1"
                        />
                    </div>

                    <div className="flex gap-2">
                        <div className="flex-1">
                            <Label htmlFor="diplomaNumber">Диплом №</Label>
                            <Input
                                id="diplomaNumber"
                                value={employeeData.diplomaNumber}
                                onChange={(e) => onInputChange('diplomaNumber', e.target.value)}
                                className="mt-1"
                            />
                        </div>
                        <div className="w-40">
                            <Label htmlFor="diplomaDate">Дата</Label>
                            <Input
                                id="diplomaDate"
                                type="date"
                                value={employeeData.diplomaDate}
                                onChange={(e) => onInputChange('diplomaDate', e.target.value)}
                                className="mt-1"
                            />
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="totalExperience">7. Загальний стаж роботи</Label>
                        <Input
                            id="totalExperience"
                            value={employeeData.totalExperience}
                            onChange={(e) => onInputChange('totalExperience', e.target.value)}
                            className="mt-1"
                        />
                    </div>

                    <div>
                        <Label htmlFor="continuousExperience">8. Безперервний стаж роботи</Label>
                        <Input
                            id="continuousExperience"
                            value={employeeData.continuousExperience}
                            onChange={(e) => onInputChange('continuousExperience', e.target.value)}
                            className="mt-1"
                        />
                    </div>

                    <div className="flex gap-2">
                        <div className="flex-1">
                            <Label htmlFor="hiringDate">Дата прийому в НТУ</Label>
                            <Input
                                id="hiringDate"
                                type="date"
                                value={employeeData.hiringDate}
                                onChange={(e) => onInputChange('hiringDate', e.target.value)}
                                className="mt-1"
                            />
                        </div>
                        <div className="w-32">
                            <Label htmlFor="hiringOrderNumber">№ наказу</Label>
                            <Input
                                id="hiringOrderNumber"
                                value={employeeData.hiringOrderNumber}
                                onChange={(e) => onInputChange('hiringOrderNumber', e.target.value)}
                                className="mt-1"
                            />
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="hiringOrderDate">Дата наказу на прийом</Label>
                        <Input
                            id="hiringOrderDate"
                            type="date"
                            value={employeeData.hiringOrderDate}
                            onChange={(e) => onInputChange('hiringOrderDate', e.target.value)}
                            className="mt-1"
                        />
                    </div>

                    <div>
                        <Label htmlFor="lastWorkplace">9. Останнє місце роботи, посада, професія</Label>
                        <Input
                            id="lastWorkplace"
                            value={employeeData.lastWorkplace}
                            onChange={(e) => onInputChange('lastWorkplace', e.target.value)}
                            className="mt-1"
                        />
                    </div>

                    <div>
                        <Label htmlFor="terminationDate">10. Дата звільнення</Label>
                        <Input
                            id="terminationDate"
                            type="date"
                            value={employeeData.terminationDate}
                            onChange={(e) => onInputChange('terminationDate', e.target.value)}
                            className="mt-1"
                        />
                    </div>

                    <div>
                        <Label htmlFor="terminationReason">Причина звільнення</Label>
                        <Select value={employeeData.terminationReason} onValueChange={(value) => onInputChange('terminationReason', value)}>
                            <SelectTrigger className="mt-1">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {terminationReasonOptions.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex gap-2">
                        <div className="w-40">
                            <Label htmlFor="contractType">Трудова угода</Label>
                            <Select value={employeeData.contractType} onValueChange={(value) => onInputChange('contractType', value)}>
                                <SelectTrigger className="mt-1">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {contractTypeOptions.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex-1">
                            <Label htmlFor="contractEndDate">Термін закінч. труд угоди</Label>
                            <Input
                                id="contractEndDate"
                                type="date"
                                value={employeeData.contractEndDate}
                                onChange={(e) => onInputChange('contractEndDate', e.target.value)}
                                className="mt-1"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GeneralInfoTab;