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
import { string } from "prop-types";
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
    const[loading, setLoading] = useState(true);
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
            <Card className="shadow-lg">
                <CardHeader className="border-b">
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

                                    <Separator />

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
                                </div>
                            </div>
                        </TabsContent> 
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    )
}

export default PersonalCard;