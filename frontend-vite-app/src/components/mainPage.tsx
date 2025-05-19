import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { ChevronRight, Menu, MenuIcon } from "lucide-react";
import { Link } from "react-router-dom";


interface NavItem {
    title: string;
    icon?: React.ReactNode;
    subItems?: {
        name: string;
        path: string;
    }[];
}


const SideBar: React.FC = () => {
    const [activeItem, setActiveItem] = React.useState<string>("");
    const [isMobileOpen, setIsMobileOpen] = React.useState<boolean>(false);
    const [openSubmenus, setOpenSubmenus] = React.useState<string[]>([]);

    const toogleSubmenu = (title: string) => {
        setOpenSubmenus(prev => prev.includes(title)
            ? prev.filter(item => item !== title)
            : [...prev, title]
        );
    }

    const navItems: NavItem[] = [
        { 
        title: "Довідники", 
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
        subItems: [
            { name: "Ввод особистих карток", path: "/view/personal_card/personalCard" },
            { name: "Пошук по прізвищу", path: "/view/personal_card/searchBySurname" }
        ]
        },
        { 
        title: "Друк", 
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
        subItems: [
            { name: "Перегляд картки в архіві", path: "/view/archieve/watchCard" },
            { name: "Списки звільнених викладачів за вказаний період", path: "/view/archieve/listOfFired" },
            { name: "Перегляд і коригування номерів і дат наказів на прийом і звільнення", path: "/view/archieve/watchAndEdit" }
        ]
        }
    ];

    const renderContent = () => {
        return (
            <div className="p-4">
                <h2 className="text-xl font-semibold mb-4">{activeItem}</h2>
                <p>Виберіть пункт</p>
            </div>
        )
    }
    
    return (
        <div className="flex h-screen">
            <div className="hidden md:flex flex-col w-64 border-r bg-background">
                <div className="p-4 font-semibold text-lg border-b">Навігація</div>
                <nav className="flex-1">
                    <ul className="py-2">
                        {navItems.map((item) => (
                            <li key={item.title} className="px-2">
                                <Collapsible 
                                    open={openSubmenus.includes(item.title)}
                                    onOpenChange={() => toogleSubmenu(item.title)}
                                    className="w-full"
                                >
                                    <CollapsibleTrigger asChild>
                                        <Button
                                            variant={activeItem === item.title ? "secondary" : "ghost"}
                                            className={cn(
                                                "w-full justify-between text-left rounded-md px-3 py-2 mb-1",
                                                activeItem === item.title ? "bg-blue-100 text-blue-700" : ""
                                            )}
                                            onClick={() => setActiveItem(item.title)}
                                        >
                                            <span>{item.title}</span>
                                            <ChevronRight 
                                                className={cn(
                                                    "h-4 w-4 transition-transform",
                                                    openSubmenus.includes(item.title) && "transform rotate-90"
                                                )}
                                            />
                                        </Button>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <ul className="pl-2 py-1">
                                            {item.subItems?.map((subItem) => (
                                                <li key={subItem.name}>
                                                    <Link
                                                        to={subItem.path}
                                                        className="block py-1 px-4 text-sm hover:bg-blue-50 hover:text-blue-600 rounded-none transition-colors"
                                                    >
                                                        {subItem.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </CollapsibleContent>
                                </Collapsible>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
                <SheetTrigger asChild className="mb:hidden">
                    <Button variant="outline" size="icon" className="m-2">
                        <Menu className="h-5 w-5" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 p-0">
                    <div className="p-4 font-semibold text-lg border-r">Навігація</div>
                    <nav>
                        <ul className="py-2">
                            {navItems.map((item) => (
                                <li key={item.title} className="px-2">
                                    <Collapsible
                                        open={openSubmenus.includes(item.title)}
                                        onOpenChange={() => toogleSubmenu(item.title)}
                                        className="w-full"
                                    >
                                        <CollapsibleTrigger asChild>
                                            <Button
                                                variant={activeItem === item.title ? "secondary" : "ghost"}
                                                className="w-full justify-between text-left rounded-none px-3 py-2 mb-1"
                                                onClick={() => setActiveItem(item.title)}
                                            >
                                                <span>{item.title}</span>
                                                <ChevronRight 
                                                    className={cn(
                                                        "h-4 w-4 transition-transform",
                                                        openSubmenus.includes(item.title) && "transform rotate-90"
                                                    )}
                                                />
                                            </Button>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                            <ul className="pl-2 py-1">
                                                {item.subItems?.map((subItem) => (
                                                    <li key={subItem.path}>
                                                        <Link
                                                            to={subItem.path}
                                                            className="block py-1 px-4 text-sm hover:bg-slate-100 rounded-none transition-colors"
                                                            onClick={() => setIsMobileOpen(false)}
                                                        >
                                                            {subItem.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </CollapsibleContent>
                                    </Collapsible>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </SheetContent>
            </Sheet>

            <div className="flex-1 overflow-auto">
                <div className="md:hidden flex items-center mb-4">
                    <Button variant="outline" size="icon" onClick={() => setIsMobileOpen(true)}>
                        <MenuIcon className="h-5 w-5" />
                    </Button>
                    <h1 className="ml-4 text-xl font-semibold">{activeItem}</h1>
                </div>
                <div className="bg-card rounded-lg shadow p-4">
                    {renderContent()}
                </div>
            </div>
        </div>
    )
}

const MainPage: React.FC = () => {
    return(
        <div className="h-screen">
            <SideBar />
        </div>
    )
}

export default MainPage;