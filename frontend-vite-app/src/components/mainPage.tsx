import React from "react";
import { NavLink } from "react-router-dom";
import { SidebarProvider, Sidebar, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarMenuSub, SidebarMenuSubItem, SidebarMenuSubButton } from "./ui/sidebar";
import { ChevronRight,  BookOpen, User, Printer, BarChart3, FileText, Archive, Building2 } from "lucide-react";

const navItems = [
    { 
        title: "Довідники", 
        icon: BookOpen,
        subItems: [
            { name: "Довідники факультетів", path: "/view/witness/faculty" },
            { name: "Довідники підрозділів", path: "/view/witness/domain" },
            { name: "Довідники посад", path: "/view/witness/work" },
            { name: "Довідники причин звільнення", path: "/view/witness/reasonOfFired" },
            { name: "Довідники родинного стану", path: "/view/witness/familyStatus" },
            { name: "Довідники членів сім'ї", path: "/view/witness/familyMember" },
            { name: "Довідники трудових угод", path: "/view/witness/laborAgreement" },
            { name: "Довідники видів відпусток", path: "/view/witness/typeOfChill" },
            { name: "Довідники вчених званнів", path: "/view/witness/scienceRank" },
            { name: "Довідники вчених ступенів", path: "/view/witness/scienceDegree" },
            { name: "Довідники іноземних мов", path: "/view/witness/language" },
            { name: "Довідники наукових галузей", path: "/view/witness/scienceDepart" },
            { name: "Довідники почесних званнів", path: "/view/witness/hononaryTitles" }
        ]
    },
    { 
    title: "Особисті картки", 
    icon: User,
        subItems: [
            { name: "Ввод особистих карток", path: "/view/personal_card/personalCard" },
            { name: "Пошук по прізвищу", path: "/view/personal_card/searchBySurname" }
        ]
    },
    { 
    title: "Друк",
    icon: Printer, 
        subItems: [
            { name: "Друк особистих карток", path: "/view/print/printPersonalCard" },
            { name: "Друк списку співробітників по підрозділам", path: "/view/print/printByDivisions" },
            { name: "Друк списку ювілярів у поточному році", path: "/view/print/printAnniversaries" },
            { name: "Друк списку співробітників пенсійного віку", path: "/view/print/printRetirementAge" },
            { name: "Друк списку співробітників передпенсійного віку", path: "/view/print/printPreRetirementAge" },
            { name: "Друк списку сумісників", path: "/view/print/printPartTimers" },
            { name: "Друк списку чорнобильців", path: "/view/print/printFromChernobyl" },
            { name: "Друк списку інвалідів 2-3 групи", path: "/view/print/printDisableTwoThirdGroup" },
            { name: "Друк списку працівників, що працюють неповний робочий день", path: "/view/print/printNotFullWorkDay" },
            { name: "Друк списку працівників, працюючих на погодинній оплаті", path: "/view/print/printEveryHourEmployee" },
            { name: "Друк справки з місця роботи", path: "/view/print/printAffairsFromWork" },
            { name: "Друк форми №6 - чисельність окремих категорій праціників", path: "/view/print/printFormSixExceptions" },
            { name: "Друк списку дітей віком до 16 років", path: "/view/print/printChildFromSixteen" },
            { name: "Друк списку працюючих жінок", path: "/view/print/printWoman" },
            { name: "Друк списку всіх працівників по підрозділам (по алфавіту)", path: "/view/print/printByAlphabet" },
            { name: "Друк списку всіх працівників по підрозділам (по посадам)", path: "/view/print/printEmployeeByDivision" },
            { name: "Друк списку кандидатів наук", path: "/view/print/printScienceCandidate" },
            { name: "Друк списку докторів наук", path: "/view/print/printScienceDoctors" },
            { name: "Друк списку академіків", path: "/view/print/printAcademic" },
            { name: "Друк педагогічних і науково-педагогічних працівників", path: "/view/print/printPedagogicalAndSciencePedagogical" },
            { name: "Дні народження працівників", path: "/view/print/printBirthday" }
        ]
    },
    { 
    title: "Статистика",
    icon: BarChart3, 
        subItems: [
            { name: "Ввести реквізити для статичних форм", path: "/view/statistic/enterForStaticForm" },
            { name: "Форма №5 - формування даних", path: "/view/statistic/formFive" },
            { name: "Корегування та друк форми №5", path: "/view/statistic/editFormFive" },
            { name: "Форма №6", path: "/view/statistic/formSix" },
            { name: "Корегування форми №6", path: "/view/statistic/editFormSix" },
            { name: "Список осіб віком 16-29 років, що підлягають імунизації", path: "/view/statistic/listOfAges" },
            { name: "Список працівників віком старше ... років", path: "/view/statistic/listOfOlder" },
            { name: "Список всіх без сумісників і філіалів", path: "/view/statistic/listOfAllWithoutPartTimesAndBranches" },
            { name: "Список кандидатів і докторів з № дипломів", path: "/view/statistic/listOfDoctorsByDiploma" }
        ]
    },
    { 
    title: "Формуляр", 
    icon: FileText,
        subItems: [
            { name: "Занести звідки прийшов", path: "/view/form/whereFrom" },
            { name: "Введення даних до формуляру", path: "/view/form/enterDataToFrom" },
            { name: "Керівний склад", path: "/view/form/managementTeam" },
            { name: "Друк штатного формуляру", path: "/view/form/printForm" },
            { name: "Формуляр підрозділів", path: "/view/form/formForAnother" },
            { name: "Форма №1. Список академікі, член-корів", path: "/view/form/formOne" },
            { name: "Форма №2. Список сумісників на неповну ставку", path: "/view/form/formTwo" },
            { name: "Форма №3. Список викладачів, кандидатів наук, що працюють над док. дисерт.", path: "/view/form/formThree" },
            { name: "Форма №4. Кількісний і якісний склад викладачів, факультетів, ВУЗу", path: "/view/form/formFour" },
            { name: "Форма №5. Відомість про професорсько-викладацькому складу", path: "/view/form/formFive" }
        ]
    },
    { 
    title: "Архів",
    icon: Archive, 
        subItems: [
            { name: "Перегляд картки в архіві", path: "/view/archieve/watchCard" },
            { name: "Списки звільнених викладачів за вказаний період", path: "/view/archieve/listOfFired" },
            { name: "Перегляд і коригування номерів і дат наказів на прийом і звільнення", path: "/view/archieve/watchAndEdit" }
        ]
    }
];

export default function MainPage() {
    const [activeItem, setActiveItem] = React.useState<string>("");
    const [openSubmenus, setOpenSubmenus] = React.useState<string[]>([]);
    
    const toggleSunmenu = (title: string) => {
        setOpenSubmenus(prev => prev.includes(title) ? prev.filter(item => item !== title): [...prev, title]);
    };

    return (
        <SidebarProvider>
            <Sidebar className="border-r bg-card border-black">
                <div className="p-4 font-semibold text-lg border-b text-center border-black">
                    Відділ кадрів
                </div>
                <SidebarContent>
                    <SidebarMenu>
                        {navItems.map((categoty) => {
                            const IconComponent = categoty.icon;
                            return (
                                <SidebarMenuItem key={categoty.title}>
                                    <SidebarMenuButton
                                        className="w-full justify-between py-2 border-r-none border-black"
                                        onClick={() =>{
                                            setActiveItem(categoty.title);
                                            toggleSunmenu(categoty.title);
                                        }}
                                        isActive = {activeItem === categoty.title}
                                    >
                                        <div className="flex items-center gap-2">
                                            <IconComponent className="h-4 w-4 text-slate-600 group-hover:text-slate-900 transition-colors" />
                                            <span>{categoty.title}</span>
                                        </div>
                                        <ChevronRight className={`h-4 w-4 transition-transform ${openSubmenus.includes(categoty.title) ? "transform rotate-90" : ""}`} />
                                    </SidebarMenuButton>
                                    <div className={`transition-all duration-200 ease-in-out overflow-y-auto ${
                                        openSubmenus.includes(categoty.title) 
                                        ? "max-h-64 opacity-100" 
                                        : "max-h-0 opacity-0"
                                    }`}>
                                        <SidebarMenuSub className="pr-2 border-black">
                                            {categoty.subItems.map((item) => (
                                                <SidebarMenuSubItem key={item.path}>
                                                    <SidebarMenuSubButton 
                                                        asChild 
                                                        className="transition-colors duration-200 border-1 hover:border-blue-600 rounded-none"
                                                    >
                                                        <NavLink 
                                                            to={item.path} 
                                                            className={({ isActive }) =>
                                                                `block truncate ${isActive ? "bg-muted text-blue-300" : ""}`
                                                            }
                                                        >
                                                            {item.name}
                                                        </NavLink>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                            ))}
                                        </SidebarMenuSub>
                                    </div>
                                </SidebarMenuItem>
                            )
                        })}
                    </SidebarMenu>
                </SidebarContent>
            </Sidebar>
        </SidebarProvider>
    )
}

