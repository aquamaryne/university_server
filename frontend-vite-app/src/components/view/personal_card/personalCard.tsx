import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, FileText, BookOpen, Clock, Settings } from "lucide-react";
interface EmployeeData {
  identificationCode: string;
  taxNumber: string;
  insuranceNumber: string;
  personalCardNumber: string;
  lastName: string;
  firstName: string;
  patronymic: string;
  birthDate: string;
  birthPlace: string;
  education: string;
  educationInstitution: string;
  graduationYear: string;
  educationType: string;
  department: string;
  position: string;
  startDate: string;
  contractEndDate: string;
  contractType: string;
  gender: string;
  workingSince: string;
  specialization: string;
  qualification: string;
  diplomaNumber: string;
  diplomaDate: string;
  totalExperience: string;
  continuousExperience: string;
  hiringDate: string;
  hiringOrderNumber: string;
  hiringOrderDate: string;
  lastWorkplace: string;
  terminationDate: string;
  terminationReason: string;
}

interface CheckboxState {
    fullTime: boolean;
    partTime25: boolean;
    partTime50: boolean;
    partTime75: boolean;
    coWorker: boolean;
    externalCoWorker: boolean;
    temporaryWorker: boolean;
    postalPaidTeacher: boolean;
    scientificCandiate: boolean;
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

const PersonalCard: React.FC = () => {
    const { id } = useParams<{ id: string}>();
    const navigate = useNavigate();
    const[loading, setLoading] = useState(false);
    const[activeTab, setActiveTab] = useState<string>("general");
    const[scientificDegree, setScientificDegree] = useState<string>("008");

    const [employeeData, setEmployeeData] = useState<EmployeeData>({
        identificationCode: '',
        taxNumber: '',
        insuranceNumber: '',
        personalCardNumber: '',
        lastName: '',
        firstName: '',
        patronymic: '',
        birthDate: '',
        birthPlace: '',
        education: '',
        educationInstitution: '',
        graduationYear: '',
        educationType: '',
        department: '',
        position: '',
        startDate: '',
        contractEndDate: '',
        contractType: '',
        gender: '',
        workingSince: '',
        specialization : '',
        qualification:'',
        diplomaNumber: '',
        diplomaDate: '',
        totalExperience: '',
        continuousExperience: '',
        hiringDate: '',
        hiringOrderNumber: '',
        hiringOrderDate: '',
        lastWorkplace: '',
        terminationDate: '',
        terminationReason: '',
    });

    const [checkboxes, setCheckboxes] = useState<CheckboxState>({
        fullTime: true,
        partTime25: false,
        partTime50: false,
        partTime75: false,
        coWorker: false,
        externalCoWorker: false,
        temporaryWorker: false,
        postalPaidTeacher: false,
        scientificCandiate: false,
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

    useEffect(() => {
        if(id){
            fetchemployeeData(id);
        }
    }, [id]);

    const fetchemployeeData = async (employeeId: string) => {
        setLoading(true);
        try{
            const responce = await fetch(`http://localhost:3001/employees/${employeeId}`);
            if(responce.ok){
                const data = await responce.json();
                setEmployeeData(data);
            } 
        } catch(error){
            console.error('Error fetching employee data: ', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (field: keyof EmployeeData, value: string) => {
        setEmployeeData(prev => ({
            ...prev,
            [field]: value
        }));
    }

    const handleCheckboxChange = (field: keyof CheckboxState, checked: boolean) => {
        setCheckboxes(prev => ({
            ...prev,
            [field]: checked
        }))
    }

    const handleSave = async () => {
        setLoading(true);
        try{
            const method = id ? 'PUT' : 'POST';
            const url = id ? `http://localhost:3001/employees/${id}` : 'http://localhost:3001/employees';
            const responce = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(employeeData),
            });

            if(responce.ok){
                navigate('../personal_card/searchBySurname');
            }
        } catch(error) {
            console.error('Error saving employee data: ', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if(!id) return;

        if(confirm('Ви впевнені, що хочете видалити цю картку?')){
            try{
                const responce = await fetch(`http://localhost:3001/employees/${id}`, {
                    method: 'DELETE',
                });
                
                if(responce.ok){
                    navigate('../personal_card/searchBySurname');
                }
            } catch(error) {
                console.error('Error deleting employee data: ', error);
            }
        }
    };

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

    const contractTypeOtions = [
        { value: 'permanent', label: 'Постійний' },
        { value: 'temporary', label: 'Тимчасовий' },
        { value: 'contract', label: 'Контракт' },
    ];

    const terminationReasonOptions = [
        { value: 'resignation', label: 'Звільнення за власним бажанням,  ст.38 КЗпП України' },
        { value: 'contract-end', label: 'Закінчення строку контракту' },
        { value: 'agreement', label: 'За згодою сторін' },
    ]

    if(loading){
        return(
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent animate-spin rounded-full"></div>
            </div>
        )
    }

    return (
        <div className="container mx-auto p-4 max-w-7xl">
            <Card className="shadow-lg rounded-none border-black">
                <CardHeader className="border-b border-black">
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-2xl font-bold flex items-center gap-2">
                            <User className="h-6 w-6" />
                            Особиста картка працівника
                        </CardTitle>
                    </div>
                </CardHeader>

                <CardContent className="p-6">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="grid w-full grid-cols-5 mb-6">
                            <TabsTrigger value="general" className="flex items-center gap-2">
                                <User className="h-4 w-4" />
                                Загальна відомості
                            </TabsTrigger>
                            <TabsTrigger value="general2" className="flex items-center gap-2">
                                <FileText className="h-4 w-4" />
                                Загальні відомості-2
                            </TabsTrigger>
                            <TabsTrigger value="appointments" className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                Призначення
                            </TabsTrigger>
                            <TabsTrigger value="vacations" className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                Відпустки
                            </TabsTrigger>
                            <TabsTrigger value="additional" className="flex items-center gap-2">
                                <Settings className="h-4 w-4" />
                                Додат. відомості
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="general" className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="spacr-y-4">
                                    <div className="flex gap-4">
                                        <div className="flex-1">
                                            <Label htmlFor="identificationCode">Ідентифікаційний код</Label>
                                            <Input 
                                                id="identificationCode"
                                                value={employeeData.identificationCode}
                                                onChange={(e) => handleInputChange('identificationCode', e.target.value)}
                                                className="mt-1"
                                            />
                                        </div>
                                        <div className="w-24">
                                            <Label htmlFor="taxNumber">Таб №</Label>
                                            <Input 
                                                id="taxNumber"
                                                value={employeeData.taxNumber}
                                                onChange={(e) => handleInputChange('taxNumber', e.target.value)}
                                                className="mt-1"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <Label htmlFor="personalCardNumber">Особова картка</Label>
                                        <Input 
                                            id="personalCardNumber"
                                            value={employeeData.personalCardNumber}
                                            onChange={(e) => handleInputChange('personalCardNumber', e.target.value)}
                                            className="mt-1"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="lastName">Прізвище</Label>
                                        <Input 
                                            id="lastName"
                                            value={employeeData.lastName}
                                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                                            className="mt-1"
                                        />
                                    </div>  
                                    <div>
                                        <Label htmlFor="firstName">Ім'я</Label>
                                        <Input 
                                            id="firstName"
                                            value={employeeData.firstName}
                                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                                            className="mt-1"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="fatherly">По-батькові</Label>
                                        <Input 
                                            id="fatherly"
                                            value={employeeData.patronymic}
                                            onChange={(e) => handleInputChange('patronymic', e.target.value)}
                                            className="mt-1"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="birthPlace">Місце народження</Label>
                                        <Input 
                                            id="birthPlace"
                                            value={employeeData.birthPlace}
                                            onChange={(e) => handleInputChange('birthPlace', e.target.value)}
                                            className="mt-1"
                                        />
                                    </div>

                                    <div className="space-y-3">
                                        <Label className="text-base font-medium">Освіта</Label>
                                        <div>
                                            <Label htmlFor="education">Рівень осіті</Label>
                                            <Select value={employeeData.education} onValueChange={(value) => handleInputChange('education', value)}>
                                                <SelectTrigger className="mt-1">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {educationOptions.map((option) => (
                                                        <SelectItem key={option.value} value={option.value}>
                                                            {option.value}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div>
                                            <Label htmlFor="educationIntitution">Назва і дата закінчення ЗВО</Label>
                                            <Input 
                                                id="educationInstitution"
                                                value={employeeData.educationInstitution}
                                                onChange={(e) => handleInputChange('educationInstitution', e.target.value)}
                                                className="mt-1"
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="educationType">Вид навчання</Label>
                                            <Select value={employeeData.educationType} onValueChange={(value) => handleInputChange('educationType', value)}>
                                                <SelectTrigger className="mt-1">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {educationTypeOptions.map((option) => (
                                                        <SelectItem key={option.value} value={option.value}>
                                                            {option.value}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <div className="w-32">
                                            <Label htmlFor="department">Підрозділ</Label>
                                            <Select value={employeeData.department} onValueChange={(value) => handleInputChange('department', value)}>
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
                                            <Select value={employeeData.position} onValueChange={(value) => handleInputChange('position', value)}>
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

                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <Label className="text-sm font-medium">Стать:</Label>
                                        <div className="flex items-center space-x-4">
                                            <div className="flex items-center space-x-2">
                                                <Checkbox 
                                                id="male" 
                                                checked={employeeData.gender === 'male'}
                                                onCheckedChange={(checked) => checked && handleInputChange('gender', 'male')}
                                                />
                                                <Label htmlFor="male">Чоловічий</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Checkbox 
                                                    id="female" 
                                                    checked={employeeData.gender === 'female'}
                                                    onCheckedChange={(checked) => checked && handleInputChange('gender', 'female')}
                                                />
                                                <Label htmlFor="female">Жіночий</Label>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 ml-4">
                                            <Label htmlFor="workingSince" className="text-sm">В інституті працює з</Label>
                                            <Input
                                                id="workingSince"
                                                value={employeeData.workingSince}
                                                onChange={(e) => handleInputChange('workingSince', e.target.value)}
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
                                            onChange={(e) => handleInputChange('specialization', e.target.value)}
                                            className="mt-1"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="qualification">6. Кваліфікація за дипломом</Label>
                                        <Input
                                            id="qualification"
                                            value={employeeData.qualification}
                                            onChange={(e) => handleInputChange('qualification', e.target.value)}
                                            className="mt-1"
                                        />
                                    </div>

                                    <div className="flex gap-2">
                                        <div className="flex-1">
                                        <Label htmlFor="diplomaNumber">Диплом №</Label>
                                        <Input
                                            id="diplomaNumber"
                                            value={employeeData.diplomaNumber}
                                            onChange={(e) => handleInputChange('diplomaNumber', e.target.value)}
                                            className="mt-1"
                                        />
                                        </div>
                                        <div className="w-40">
                                        <Label htmlFor="diplomaDate">Дата</Label>
                                        <Input
                                            id="diplomaDate"
                                            type="date"
                                            value={employeeData.diplomaDate}
                                            onChange={(e) => handleInputChange('diplomaDate', e.target.value)}
                                            className="mt-1"
                                        />
                                        </div>
                                    </div>

                                    <div>
                                        <Label htmlFor="totalExperience">7. Загальний стаж роботи</Label>
                                        <Input
                                            id="totalExperience"
                                            value={employeeData.totalExperience}
                                            onChange={(e) => handleInputChange('totalExperience', e.target.value)}
                                            className="mt-1"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="continuousExperience">8. Безперервний стаж роботи</Label>
                                        <Input
                                            id="continuousExperience"
                                            value={employeeData.continuousExperience}
                                            onChange={(e) => handleInputChange('continuousExperience', e.target.value)}
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
                                            onChange={(e) => handleInputChange('hiringDate', e.target.value)}
                                            className="mt-1"
                                        />
                                        </div>
                                        <div className="w-32">
                                        <Label htmlFor="hiringOrderNumber">№ наказу</Label>
                                        <Input
                                            id="hiringOrderNumber"
                                            value={employeeData.hiringOrderNumber}
                                            onChange={(e) => handleInputChange('hiringOrderNumber', e.target.value)}
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
                                            onChange={(e) => handleInputChange('hiringOrderDate', e.target.value)}
                                            className="mt-1"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="lastWorkplace">9. Останнє місце роботи, посада, професія</Label>
                                        <Input
                                            id="lastWorkplace"
                                            value={employeeData.lastWorkplace}
                                            onChange={(e) => handleInputChange('lastWorkplace', e.target.value)}
                                            className="mt-1"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="terminationDate">10. Дата звільнення</Label>
                                        <Input
                                            id="terminationDate"
                                            type="date"
                                            value={employeeData.terminationDate}
                                            onChange={(e) => handleInputChange('terminationDate', e.target.value)}
                                            className="mt-1"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="terminationReason">Причина звільнення</Label>
                                        <Select value={employeeData.terminationReason} onValueChange={(value) => handleInputChange('terminationReason', value)}>
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
                                        <Select value={employeeData.contractType} onValueChange={(value) => handleInputChange('contractType', value)}>
                                            <SelectTrigger className="mt-1">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {contractTypeOtions.map((option) => (
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
                                            onChange={(e) => handleInputChange('contractEndDate', e.target.value)}
                                            className="mt-1"
                                        />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="general2" className="space-y-6">
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold mb-4">11. Родинний стан</h3>
                                    <div className="flex gap-4">
                                        <div className="w-48">
                                        <Label>Члени сім'ї</Label>
                                        <Select>
                                            <SelectTrigger className="mt-1">
                                                <SelectValue placeholder="Виберіть" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="spouse">Дружина/Чоловік</SelectItem>
                                                <SelectItem value="child">Дитина</SelectItem>
                                                <SelectItem value="parent">Батько/Мати</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        </div>
                                            <div className="flex-1">
                                            <Label>ПІБ</Label>
                                            <Input className="mt-1" />
                                        </div>
                                    </div>
                                </div>

                                <Separator />

                                <div>
                                    <h3 className="text-lg font-semibold mb-4">12. Паспорт</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <Label>Серія</Label>
                                            <Input className="mt-1" />
                                        </div>
                                        <div>
                                            <Label>Номер</Label>
                                            <Input className="mt-1" />
                                        </div>
                                        <div>
                                            <Label>Дата видачі</Label>
                                            <Input type="date" className="mt-1" />
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <Label>Ким виданий</Label>
                                        <Input className="mt-1" />
                                    </div>
                                </div>

                                <Separator />

                                <div>
                                    <h3 className="text-lg font-semibold mb-4">13-14. Контактна інформація</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <Label>Домашня адреса</Label>
                                            <Input className="mt-1" />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <Label>Телефон</Label>
                                                <Input className="mt-1" />
                                            </div>
                                            <div>
                                                <Label>Мобільний телефон</Label>
                                                <Input className="mt-1" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabsContent> 

                        <TabsContent value="appointments">
                            <div className="border rounded-lg overflow-auto max-h-96">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-muted">
                                            <TableHead className="w-12">#</TableHead>
                                            <TableHead>Дата</TableHead>
                                            <TableHead>Підрозділ</TableHead>
                                            <TableHead>Посада</TableHead>
                                            <TableHead>Вид труд.договору</TableHead>
                                            <TableHead>Оклад</TableHead>
                                            <TableHead>Наказ №</TableHead>
                                            <TableHead>від</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {[...Array(5)].map((_, i) => (
                                            <TableRow key={i} className="hover:bg-muted/50">
                                                <TableCell>{i + 1}</TableCell>
                                                <TableCell></TableCell>
                                                <TableCell></TableCell>
                                                <TableCell></TableCell>
                                                <TableCell></TableCell>
                                                <TableCell></TableCell>
                                                <TableCell></TableCell>
                                                <TableCell></TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </TabsContent>

                        <TabsContent value="vacations">
                            <div className="border rounded-lg overflow-auto max-h-96">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-muted">
                                        <TableHead>Вид</TableHead>
                                        <TableHead>Період</TableHead>
                                        <TableHead>Початок</TableHead>
                                        <TableHead>Кінець</TableHead>
                                        <TableHead>Наказ</TableHead>
                                        <TableHead>Від</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {[...Array(10)].map((_, i) => (
                                            <TableRow key={i} className="hover:bg-muted/50">
                                                <TableCell></TableCell>
                                                <TableCell></TableCell>
                                                <TableCell></TableCell>
                                                <TableCell></TableCell>
                                                <TableCell></TableCell>
                                                <TableCell></TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </TabsContent>

                        <TabsContent value="additional" className="space-y-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Left Column - Work Status */}
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-semibold mb-4">Статус роботи</h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-3">
                                                <div className="flex items-center space-x-2">
                                                    <Checkbox 
                                                        id="fullTime" 
                                                        checked={checkboxes.fullTime}
                                                        onCheckedChange={(checked) => handleCheckboxChange('fullTime', !!checked)}
                                                    />
                                                    <Label htmlFor="fullTime">Повна ставка</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <Checkbox 
                                                        id="partTime25" 
                                                        checked={checkboxes.partTime25}
                                                        onCheckedChange={(checked) => handleCheckboxChange('partTime25', !!checked)}
                                                    />
                                                    <Label htmlFor="partTime25">0.25 ставки</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <Checkbox 
                                                        id="partTime50" 
                                                        checked={checkboxes.partTime50}
                                                        onCheckedChange={(checked) => handleCheckboxChange('partTime50', !!checked)}
                                                    />
                                                    <Label htmlFor="partTime50">0.50 ставки</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <Checkbox 
                                                        id="partTime75" 
                                                        checked={checkboxes.partTime75}
                                                        onCheckedChange={(checked) => handleCheckboxChange('partTime75', !!checked)}
                                                    />
                                                    <Label htmlFor="partTime75">0.75 ставки</Label>
                                                </div>
                                            </div>
                                            <div className="space-y-3">
                                                <div className="flex items-center space-x-2">
                                                    <Checkbox 
                                                        id="coWorker" 
                                                        checked={checkboxes.coWorker}
                                                        onCheckedChange={(checked) => handleCheckboxChange('coWorker', !!checked)}
                                                    />
                                                    <Label htmlFor="coWorker">Сумісник</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <Checkbox 
                                                        id="externalCoWorker" 
                                                        checked={checkboxes.externalCoWorker}
                                                        onCheckedChange={(checked) => handleCheckboxChange('externalCoWorker', !!checked)}
                                                    />
                                                    <Label htmlFor="externalCoWorker">Сумісник зі сторони</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <Checkbox 
                                                        id="temporaryWorker" 
                                                        checked={checkboxes.temporaryWorker}
                                                        onCheckedChange={(checked) => handleCheckboxChange('temporaryWorker', !!checked)}
                                                    />
                                                    <Label htmlFor="temporaryWorker">Працює тимчасово</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <Checkbox 
                                                        id="postalPaidTeacher" 
                                                        checked={checkboxes.postalPaidTeacher}
                                                        onCheckedChange={(checked) => handleCheckboxChange('postalPaidTeacher', !!checked)}
                                                    />
                                                    <Label htmlFor="postalPaidTeacher">Викладач з почасовою оплатою</Label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <Separator />

                                    <div>
                                        <Label htmlFor="academicTitle">Вчене звання</Label>
                                        <Input id="academicTitle" className="mt-1" />
                                    </div>
                                </div>

                                {/* Right Column - Scientific Information */}
                                <div className="space-y-6">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <Label>Розширена зона</Label>
                                            <Input defaultValue="0.00" className="w-20" />
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <Checkbox 
                                                    id="scientificCandidate" 
                                                    checked={checkboxes.scientificCandiate}
                                                    onCheckedChange={(checked) => handleCheckboxChange('scientificCandiate', !!checked)}
                                                />
                                                <Label htmlFor="scientificCandidate">Кандидат наук</Label>
                                            </div>
                                            <Button variant="outline" size="sm">
                                                Карта канд.
                                            </Button>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <Checkbox 
                                                    id="scientificDoctor" 
                                                    checked={checkboxes.scientificDoctor}
                                                    onCheckedChange={(checked) => handleCheckboxChange('scientificDoctor', !!checked)}
                                                />
                                                <Label htmlFor="scientificDoctor">Доктор наук</Label>
                                            </div>
                                            <Button variant="outline" size="sm">
                                                Карта докт.
                                            </Button>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <Checkbox 
                                                id="academician" 
                                                checked={checkboxes.academician}
                                                onCheckedChange={(checked) => handleCheckboxChange('academician', !!checked)}
                                            />
                                            <Label htmlFor="academician">Академік</Label>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <Label>Галузь вчен.ступені:</Label>
                                            <Select value={scientificDegree} onValueChange={setScientificDegree}>
                                                <SelectTrigger className="w-32">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="008">008</SelectItem>
                                                    <SelectItem value="007">007</SelectItem>
                                                    <SelectItem value="009">009</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <Label>Рік присвоєння останнього вченого звання:</Label>
                                            <Input defaultValue="2004" className="w-20" />
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <Label>Рік останнього підвищення кваліфікації:</Label>
                                            <Input defaultValue="2023" className="w-20" />
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <Label>Загальний науково-педагогічний стаж:</Label>
                                            <Input defaultValue="24" className="w-20" />
                                        </div>

                                        <div>
                                            <Label>Філія</Label>
                                            <Input className="mt-1" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            {/* Chernobyl and Disability Information */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Chernobyl Section */}
                                <Card className="p-4">
                                <h3 className="text-lg font-semibold mb-4">Чорнобилець:</h3>
                                <div className="flex gap-4 mb-4">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox 
                                            id="chernobyl1" 
                                            checked={checkboxes.chernobyl1}
                                            onCheckedChange={(checked) => handleCheckboxChange('chernobyl1', !!checked)}
                                        />
                                        <Label htmlFor="chernobyl1">1 кат.</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox 
                                            id="chernobyl2" 
                                            checked={checkboxes.chernobyl2}
                                            onCheckedChange={(checked) => handleCheckboxChange('chernobyl2', !!checked)}
                                        />
                                        <Label htmlFor="chernobyl2">2 кат.</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox 
                                            id="chernobyl3" 
                                            checked={checkboxes.chernobyl3}
                                            onCheckedChange={(checked) => handleCheckboxChange('chernobyl3', !!checked)}
                                        />
                                        <Label htmlFor="chernobyl3">3 кат.</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox 
                                            id="chernobyl4" 
                                            checked={checkboxes.chernobyl4}
                                            onCheckedChange={(checked) => handleCheckboxChange('chernobyl4', !!checked)}
                                        />
                                        <Label htmlFor="chernobyl4">4 кат.</Label>
                                    </div>
                                </div>
                                <div>
                                    <Label>№ посвідчення чорнобильця, коли і ким видане:</Label>
                                    <Input className="mt-1" />
                                </div>
                                </Card>

                                {/* Disability Section */}
                                <Card className="p-4">
                                    <h3 className="text-lg font-semibold mb-4">Інвалід:</h3>
                                    <div className="flex gap-4 mb-4">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox 
                                                id="disability1" 
                                                checked={checkboxes.disability1}
                                                onCheckedChange={(checked) => handleCheckboxChange('disability1', !!checked)}
                                            />
                                            <Label htmlFor="disability1">1 групи</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox 
                                                id="disability2" 
                                                checked={checkboxes.disability2}
                                                onCheckedChange={(checked) => handleCheckboxChange('disability2', !!checked)}
                                            />
                                            <Label htmlFor="disability2">2 групи</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox 
                                                id="disability3" 
                                                checked={checkboxes.disability3}
                                                onCheckedChange={(checked) => handleCheckboxChange('disability3', !!checked)}
                                            />
                                            <Label htmlFor="disability3">3 групи</Label>
                                        </div>
                                    </div>
                                    <div>
                                        <Label>№ посвідчення, коли і ким видане:</Label>
                                        <Input className="mt-1" />
                                    </div>
                                </Card>
                            </div>

                            <Separator />

                            {/* Additional Information Section */}
                            <div className="space-y-4">
                                <div>
                                    <Label>Додаткові відомості</Label>
                                    <div className="space-y-2 mt-1">
                                        <Input />
                                        <Input />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label>Дата звільнення</Label>
                                        <Input type="date" className="mt-1" />
                                    </div>
                                    <div>
                                        <Label>Причина звільнення</Label>
                                        <Select>
                                            <SelectTrigger className="mt-1">
                                                <SelectValue placeholder="Виберіть причину" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="voluntary">За власним бажанням</SelectItem>
                                                <SelectItem value="agreement">За згодою сторін</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label>№ наказу на звільнення</Label>
                                        <Input className="mt-1" />
                                    </div>
                                    <div>
                                        <Label>Дата наказу на звільнення</Label>
                                        <Input type="date" className="mt-1" />
                                    </div>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                    <div className="flex justify-center gap-4 mt-8 pt-6 border-t">
                        <Button 
                            variant="destructive" 
                            onClick={handleDelete}
                            disabled={!id}
                            className="min-w-32"
                        >
                            Видалити
                        </Button>
                        <Button 
                            onClick={handleSave}
                            disabled={loading}
                            className="min-w-32"
                        >
                            {loading ? 'Збереження...' : 'Зберегти'}
                        </Button>
                        <Button 
                            variant="outline"
                            onClick={() => window.print()}
                            className="min-w-32"
                        >
                            Друк 1-ї сторінки
                        </Button>
                        <Button 
                            variant="outline"
                            onClick={() => window.print()}
                            className="min-w-32"
                        >
                            Друк 2-ї сторінки
                        </Button>
                        <Button 
                            variant="secondary"
                            onClick={() => navigate('/view/personal_card/searchBySurname')}
                            className="min-w-32"
                        >
                            Назад до пошуку
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default PersonalCard;