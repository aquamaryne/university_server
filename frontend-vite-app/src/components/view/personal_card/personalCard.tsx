import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsTrigger, TabsList } from "@/components/ui/tabs";
import { User, FileText, Calendar, Clock, Settings } from "lucide-react";

import GeneralInfoTab from "./tabs/generalInfo";
import GeneralInfo2Tab from "./tabs/generalInfoTab2";
import VacationsTab from "./tabs/vacationsTab";
import AppointmentsTab from "./tabs/appointmentsTab";
import AdditionalInfoTab from "./tabs/additionalInfoTab";

import { type EmployeeData } from "./types/cardTypes";
import { type CheckboxState } from "./types/checkboxTypes";
import { employeeService } from "./service/employeeService";

const PersonalCard: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(false);
    const [activeTab, setActiveTab] = React.useState<string>("general");

    const [employeeData, setEmployeeData] = React.useState<EmployeeData>({
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
        specialization: '',
        qualification: '',
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

    const [checkboxes, setCheckboxes] = React.useState<CheckboxState>({
        fullTime: true,
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

    React.useEffect(() => {
        if (id) {
            fetchEmployeeData(id);
        }
    }, [id]);

    const fetchEmployeeData = async (employeeId: string) => {
        setLoading(true);
        try {
            const data = await employeeService.getEmployee(employeeId);
            setEmployeeData(data);
        } catch (error) {
            console.error('Error fetching employee data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (field: keyof EmployeeData, value: string) => {
        setEmployeeData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleCheckboxChange = (field: keyof CheckboxState, checked: boolean) => {
        setCheckboxes(prev => ({
            ...prev,
            [field]: checked
        }));
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            if (id) {
                await employeeService.updateEmployee(id, employeeData);
            } else {
                await employeeService.createEmployee(employeeData);
            }
            navigate('/view/personal_card/searchBySurname');
        } catch (error) {
            console.error('Error saving employee data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!id) return;
        
        if (confirm('Ви впевнені, що хочете видалити цю картку?')) {
            try {
                await employeeService.deleteEmployee(id);
                navigate('/view/personal_card/searchBySurname');
            } catch (error) {
                console.error('Error deleting employee:', error);
            }
        }
    };

    if (loading) {
        return (
            <div className="container mx-auto p-4 max-w-7xl">
                <Card className="shadow-lg">
                    <CardContent className="flex justify-center items-center min-h-[400px]">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-8 h-8 border-4 border-primary border-t-transparent animate-spin rounded-full"></div>
                            <p className="text-muted-foreground">Завантаження...</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
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
                                Загальні відомості
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

                        <TabsContent value="general">
                            <GeneralInfoTab 
                                employeeData={employeeData}
                                onInputChange={handleInputChange}
                            />
                        </TabsContent>

                        <TabsContent value="general2">
                            <GeneralInfo2Tab />
                        </TabsContent>

                        <TabsContent value="appointments">
                            <AppointmentsTab />
                        </TabsContent>

                        <TabsContent value="vacations">
                            <VacationsTab />
                        </TabsContent>

                        <TabsContent value="additional">
                            <AdditionalInfoTab 
                                checkboxes={checkboxes}
                                onCheckboxChange={handleCheckboxChange}
                            />
                        </TabsContent>
                    </Tabs>

                    {/* Action Buttons */}
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
    );
};

export default PersonalCard;
