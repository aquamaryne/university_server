import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsTrigger, TabsList } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
    User, 
    FileText, 
    Calendar, 
    Clock, 
    Settings, 
    Save, 
    Trash2, 
    Printer, 
    ArrowLeft, 
    UserCircle,
    Building2,
    Mail,
    Phone,
    MapPin,
    AlertCircle,
    CheckCircle,
    Loader2
} from "lucide-react";

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
    const [saving, setSaving] = React.useState(false);
    const [activeTab, setActiveTab] = React.useState<string>("general");
    const [hasChanges, setHasChanges] = React.useState(false);

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
        setHasChanges(true);
    };

    const handleCheckboxChange = (field: keyof CheckboxState, checked: boolean) => {
        setCheckboxes(prev => ({
            ...prev,
            [field]: checked
        }));
        setHasChanges(true);
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            if (id) {
                await employeeService.updateEmployee(id, employeeData);
            } else {
                await employeeService.createEmployee(employeeData);
            }
            setHasChanges(false);
            // Показать уведомление об успешном сохранении
        } catch (error) {
            console.error('Error saving employee data:', error);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!id) return;
        
        if (confirm('Ви впевнені, що хочете видалити цю картку? Ця дія незворотна.')) {
            try {
                await employeeService.deleteEmployee(id);
                navigate('/view/personal_card/searchBySurname');
            } catch (error) {
                console.error('Error deleting employee:', error);
            }
        }
    };

    const getEmployeeStatus = () => {
        if (!employeeData.lastName && !employeeData.firstName) return 'Нова картка';
        if (employeeData.terminationDate) return 'Звільнений';
        return 'Активний';
    };

    const getStatusBadgeVariant = () => {
        const status = getEmployeeStatus();
        if (status === 'Активний') return 'default';
        if (status === 'Звільнений') return 'destructive';
        return 'secondary';
    };

    const tabsConfig = [
        {
            value: "general",
            label: "Загальні відомості",
            icon: User,
            color: "text-blue-600"
        },
        {
            value: "general2", 
            label: "Загальні відомості-2",
            icon: FileText,
            color: "text-green-600"
        },
        {
            value: "appointments",
            label: "Призначення",
            icon: Calendar,
            color: "text-purple-600"
        },
        {
            value: "vacations",
            label: "Відпустки",
            icon: Clock,
            color: "text-orange-600"
        },
        {
            value: "additional",
            label: "Додат. відомості",
            icon: Settings,
            color: "text-gray-600"
        }
    ];

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
                <div className="container mx-auto max-w-7xl">
                    <Card className="shadow-2xl border-slate-200 overflow-hidden">
                        <CardContent className="flex justify-center items-center min-h-[500px]">
                            <div className="flex flex-col items-center gap-6">
                                <div className="relative">
                                    <div className="w-16 h-16 border-4 border-slate-200 border-t-blue-600 animate-spin rounded-full"></div>
                                    <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-l-blue-400 animate-ping rounded-full"></div>
                                </div>
                                <div className="text-center">
                                    <p className="text-xl font-medium text-slate-700">Завантаження даних...</p>
                                    <p className="text-sm text-slate-500 mt-1">Будь ласка, зачекайте</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            {/* Header Section */}
            <div className="bg-white border-b border-slate-200 shadow-sm">
                <div className="container mx-auto max-w-7xl px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => navigate('/view/personal_card/searchBySurname')}
                                className="hover:bg-slate-100"
                            >
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Назад до пошуку
                            </Button>
                            <div className="h-6 w-px bg-slate-300"></div>
                            <div>
                                <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                                    <UserCircle className="h-7 w-7 text-blue-600" />
                                    Особиста картка працівника
                                </h1>
                                <div className="flex items-center gap-2 mt-1">
                                    <Badge variant={getStatusBadgeVariant()} className="text-xs">
                                        {getEmployeeStatus()}
                                    </Badge>
                                    {id && (
                                        <Badge variant="outline" className="text-xs">
                                            ID: {id}
                                        </Badge>
                                    )}
                                    {hasChanges && (
                                        <Badge variant="outline" className="text-xs text-orange-600 border-orange-300">
                                            <AlertCircle className="h-3 w-3 mr-1" />
                                            Незбережені зміни
                                        </Badge>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Employee Summary Card */}
            <div className="container mx-auto max-w-8xl px-6 py-4">
                <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 shadow-sm rounded-none ">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-4 flex-1 min-w-0">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <User className="h-6 w-6 text-blue-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-lg text-slate-900">
                                        {`${employeeData.lastName} ${employeeData.firstName} ${employeeData.patronymic}`.trim() || 
                                         (id ? 'Завантаження даних...' : 'Нова картка працівника')}
                                    </h3>
                                    <div className="flex items-center gap-4 text-sm text-slate-600 mt-1 flex-wrap">
                                        {employeeData.position && (
                                            <span className="flex items-center gap-1">
                                                <Building2 className="h-3 w-3 flex-shrink-0" />
                                                <span className="truncate">{employeeData.position}</span>
                                            </span>
                                        )}
                                        {employeeData.department && (
                                            <span className="flex items-center gap-1">
                                                <MapPin className="h-3 w-3 flex-shrink-0" />
                                                <span className="truncate">{employeeData.department}</span>
                                            </span>
                                        )}
                                        {!employeeData.position && !employeeData.department && (
                                            <span className="text-slate-500 italic">
                                                {id ? 'Інформація про посаду завантажується...' : 'Заповніть дані працівника'}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            
                            <div className="text-right flex-shrink-0 ml-4">
                                {employeeData.startDate ? (
                                    <>
                                        <p className="text-sm text-slate-500">Працює з</p>
                                        <p className="font-medium text-slate-700">{employeeData.startDate}</p>
                                    </>
                                ) : (
                                    <>
                                        <p className="text-sm text-slate-500">Статус</p>
                                        <p className="font-medium text-slate-700">{getEmployeeStatus()}</p>
                                    </>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content */}
            <div className="container mx-auto max-w-8xl px-6 pb-8">
                <Card className="shadow-xl border-slate-200 overflow-hidden rounded-none">
                    <CardContent className="p-0">
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                            {/* Enhanced Tabs Header */}
                            <div className="bg-slate-50 border-b border-slate-200 px-6 py-4">
                                <TabsList className="grid w-full grid-cols-5 bg-white border border-slate-200 shadow-sm h-auto p-1 relative">
                                    {tabsConfig.map((tab) => {
                                        const IconComponent = tab.icon;
                                        const isActive = activeTab === tab.value;
                                        
                                        // Определяем цвет подчеркивания для активной вкладки
                                        const getUnderlineColor = () => {
                                            if (!isActive) return 'transparent';
                                            switch (tab.value) {
                                                case 'general': return '#2563eb'; // blue-600
                                                case 'general2': return '#059669'; // green-600
                                                case 'appointments': return '#9333ea'; // purple-600
                                                case 'vacations': return '#ea580c'; // orange-600
                                                case 'additional': return '#4b5563'; // gray-600
                                                default: return '#2563eb';
                                            }
                                        };
                                        
                                        return (
                                            <TabsTrigger 
                                                key={tab.value}
                                                value={tab.value} 
                                                className="flex flex-col items-center gap-2 py-3 px-4 data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-200 relative"
                                                style={{
                                                    borderBottom: isActive ? `2px solid ${getUnderlineColor()}` : '2px solid transparent'
                                                }}
                                            >
                                                <IconComponent className={`h-4 w-4 ${tab.color} ${isActive ? 'scale-110' : ''} transition-transform duration-200`} />
                                                <span className={`text-xs font-medium text-center leading-tight ${isActive ? 'text-slate-900' : 'text-slate-600'} transition-colors duration-200`}>
                                                    {tab.label}
                                                </span>
                                            </TabsTrigger>
                                        );
                                    })}
                                </TabsList>
                            </div>

                            {/* Tab Content with enhanced styling */}
                            <div className="p-6">
                                <TabsContent value="general" className="mt-0">
                                    <div className="space-y-6">
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2">
                                                <User className="h-5 w-5 text-blue-600" />
                                                <h3 className="text-lg font-semibold text-slate-900">Основна інформація</h3>
                                            </div>
                                            <div className="h-px bg-gradient-to-r from-blue-600 via-blue-400 to-transparent"></div>
                                        </div>
                                        <GeneralInfoTab 
                                            employeeData={employeeData}
                                            onInputChange={handleInputChange}
                                        />
                                    </div>
                                </TabsContent>

                                <TabsContent value="general2" className="mt-0">
                                    <div className="space-y-6">
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2">
                                                <FileText className="h-5 w-5 text-green-600" />
                                                <h3 className="text-lg font-semibold text-slate-900">Додаткова інформація</h3>
                                            </div>
                                            <div className="h-px bg-gradient-to-r from-green-600 via-green-400 to-transparent"></div>
                                        </div>
                                        <GeneralInfo2Tab />
                                    </div>
                                </TabsContent>

                                <TabsContent value="appointments" className="mt-0">
                                    <div className="space-y-6">
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-5 w-5 text-purple-600" />
                                                <h3 className="text-lg font-semibold text-slate-900">Призначення та переміщення</h3>
                                            </div>
                                            <div className="h-px bg-gradient-to-r from-purple-600 via-purple-400 to-transparent"></div>
                                        </div>
                                        <AppointmentsTab />
                                    </div>
                                </TabsContent>

                                <TabsContent value="vacations" className="mt-0">
                                    <div className="space-y-6">
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2">
                                                <Clock className="h-5 w-5 text-orange-600" />
                                                <h3 className="text-lg font-semibold text-slate-900">Відпустки та відсутність</h3>
                                            </div>
                                            <div className="h-px bg-gradient-to-r from-orange-600 via-orange-400 to-transparent"></div>
                                        </div>
                                        <VacationsTab />
                                    </div>
                                </TabsContent>

                                <TabsContent value="additional" className="mt-0">
                                    <div className="space-y-6">
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2">
                                                <Settings className="h-5 w-5 text-gray-600" />
                                                <h3 className="text-lg font-semibold text-slate-900">Додаткові відомості</h3>
                                            </div>
                                            <div className="h-px bg-gradient-to-r from-gray-600 via-gray-400 to-transparent"></div>
                                        </div>
                                        <AdditionalInfoTab 
                                            checkboxes={checkboxes}
                                            onCheckboxChange={handleCheckboxChange}
                                        />
                                    </div>
                                </TabsContent>
                            </div>
                        </Tabs>
                    </CardContent>
                </Card>

                {/* Enhanced Action Buttons */}
                <div className="mt-6">
                    <Card className="bg-slate-50 border-slate-200">
                        <CardContent className="p-4">
                            <div className="flex justify-center gap-3">
                                <Button 
                                    variant="destructive" 
                                    onClick={handleDelete}
                                    disabled={!id}
                                    className="min-w-32 shadow-sm"
                                >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Видалити
                                </Button>
                                
                                <Button 
                                    onClick={handleSave}
                                    disabled={saving || !hasChanges}
                                    className="min-w-32 bg-blue-600 hover:bg-blue-700 shadow-sm"
                                >
                                    {saving ? (
                                        <>
                                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                            Збереження...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="h-4 w-4 mr-2" />
                                            Зберегти
                                        </>
                                    )}
                                </Button>
                            </div>
                            
                            {hasChanges && (
                                <div className="mt-3 text-center">
                                    <p className="text-sm text-orange-600 flex items-center justify-center gap-1">
                                        <AlertCircle className="h-3 w-3" />
                                        У вас є незбережені зміни
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Print Styles */}
            <style>{`
                @media print {
                    body {
                        -webkit-print-color-adjust: exact;
                        color-adjust: exact;
                    }
                    
                    .no-print {
                        display: none !important;
                    }
                    
                    .print-only {
                        display: block !important;
                    }
                }
                
                /* Custom scrollbar */
                .container::-webkit-scrollbar {
                    width: 6px;
                }
                
                .container::-webkit-scrollbar-track {
                    background: #f1f5f9;
                }
                
                .container::-webkit-scrollbar-thumb {
                    background: #cbd5e1;
                    border-radius: 3px;
                }
                
                .container::-webkit-scrollbar-thumb:hover {
                    background: #94a3b8;
                }
            `}</style>
        </div>
    );
};

export default PersonalCard;