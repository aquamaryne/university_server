import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from 'react-to-print';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Minimize, Crop, X } from "lucide-react";

const alphabet = 'АБВГҐДЕЄЖЗІЇЙКЛМНОПРСТУФХЦЧШЩЮЯ'.split('');

const categories = [
    { id: '1', label: '1 - Професорсько-викладацький склад', highlighted: true },
    { id: 'Y', label: 'У - Навчально-допоміжний склад', highlighted: true },
    { id: 'A', label: 'A - Адміністративно-господарський склад', highlighted: true },
    { id: 'C', label: 'C - Сумісники з сторони', highlighted: true },
    { id: 'Д', label: 'Д - НДІ', highlighted: true },
];

interface Employee {
    id: number;
    unique_card: string;
    sname: string;
    fname: string;
    fatherly: string;
}

const SearchBySurname: React.FC = () => {
    const[selectedLetter, setSelectedLetter] = useState<string | null>(null);
    const[searchQuery, setSearchQuery] = useState<string>("");
    const[employees, setEmployees] = useState<Employee[]>([]);
    const[loading, setLoading] = useState<boolean>(false);
    const[selectedCard, setSelectedCard] = useState<Set<number>>(new Set());
    const[isFormOpen, setIsFormOpen] = useState(false);
    const[selectedCategory, setSelecteCategory] = useState<string>("1");

    const printRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const fetchEmployees = async(queryType: 'letter' | 'search' | 'all', value: string = '') => {
        setLoading(true);
        let url = `http://localhost:3001/employeers/search`;
        
        if(queryType === 'letter' && value){
            url += `?letter=${encodeURIComponent(value)}`;
        } else if(queryType === 'search' && value) {
            url += `?query=${encodeURIComponent(value)}`;
        } else {
            url += `?all=true`;
        }

        try {
            const responce = await fetch(url);
            if(!responce.ok){
                throw new Error('Помилка при завантажені даних');
            }
            const data = await responce.json();
            setEmployees(data);
        } catch (error){
            console.error('Помилка при завантажені даних', error);
            setEmployees([]);
        } finally {
            setLoading(false);
        }
    }

    const handleLetterClick = (letter: string) => {
        setSelectedLetter(letter);
        setSearchQuery("");
        fetchEmployees('letter', letter);
    }

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
        setSelectedLetter(null);

        if(query.length > 0){
            fetchEmployees('search', query);
        } else {
            fetchEmployees('all');
        }
    };

    const handleSelectedCard = (id: number) => {
        const updateSelected = new Set(selectedCard);
        if(selectedCard.has(id)){
            updateSelected.delete(id);
        } else {
            updateSelected.add(id);
        }
        setSelectedCard(updateSelected);
    };

    useEffect(() => {
        fetchEmployees('all');
    }, []);

    const handleDuplicate = () => {
        const duplicates = Array.from(selectedCard).map((id) => {
            const original = employees.find((item) => item.id === id);
            if(original){
                return {
                    ...original,
                    id: Date.now() + Math.floor(Math.random() * 1000),
                };
            }

            return null;
        }).filter((item): item is Employee => item !== null);

        if(duplicates.length > 0){
            setEmployees((prevEmployees) => [...prevEmployees, ...duplicates]);
        }
    };

    const handlePrint = useReactToPrint({
        contentRef: printRef,
        documentTitle: 'Personal Card',
    });

    const handleOpenForm = () => {
        setIsFormOpen(true);
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
    };

    const handleDelete = () => {
        const updateEmployees = employees.filter((item) => !selectedCard.has(item.id));
        setEmployees(updateEmployees);
        setSelectedCard(new Set());
    };

    const handleCategorySelect = (id: string) => {
        setSelecteCategory(id);
        setIsFormOpen(false);
        setSelectedLetter(null);
        setSearchQuery("");
    };

    return (
        <Card className="shadow-md">
            <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                    <CardTitle className="text-2xl font-bold">
                        Пошук за прізвищем
                    </CardTitle>
                    <Button 
                        variant="outline" 
                        onClick={handleOpenForm}
                        className="rounded-none"
                    >
                        {categories.find(c => c.id === selectedCategory)?.label || 'Обрати категорію'}
                    </Button>
                </div>
            </CardHeader>

            <CardContent>
                {/* Alphabet selection */}
                <div className="flex flex-wrap justify-center mt-2">
                    {alphabet.map((letter) => (
                        <Button
                            key={letter}
                            variant={selectedLetter === letter ? "default" : "outline"}
                            onClick={() => handleLetterClick(letter)}
                            className="m-1 min-w-[50px] min-h-[50px] rounded-none transition-colors duration-200"
                        >
                            {letter}
                        </Button>
                    ))}
                </div>

                {/* Search input */}
                <div className="mt-4 ml-2">
                <Input
                    placeholder="Введіть прізвище"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="w-1/4 rounded-none"
                />
                </div>

                {/* Results section */}
                <div className="mt-8">
                    <h2 className="text-xl font-bold text-center mb-4">
                        Результат пошуку ({categories.find(c => c.id === selectedCategory)?.label})
                    </h2>
                    
                    {loading ? (
                        <div className="flex justify-center py-8">
                            <div className="w-8 h-8 rounded-none border-4 border-primary border-t-transparent animate-spin"></div>
                        </div>
                    ) : employees.length > 0 ? (

                    <>
                        <div className="border rounded-none mt-4 max-h-[500px] overflow-auto">
                            <Table>
                                <TableCaption>
                                    Список співробітників
                                </TableCaption>
                                <TableHeader>
                                    <TableRow>
                                    <TableHead className="text-center">Номер картки</TableHead>
                                    <TableHead className="text-center">Прізвище</TableHead>
                                    <TableHead className="text-center">Ім'я</TableHead>
                                    <TableHead className="text-center">По батькові</TableHead>
                                    <TableHead className="text-center">Взаємодія</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {employees.map((employee) => (
                                    <TableRow 
                                        key={employee.id}
                                        className={selectedCard.has(employee.id) ? "bg-blue-50" : ""}
                                    >
                                        <TableCell className="font-medium">
                                            <div className="flex items-center">
                                                <Checkbox 
                                                id={`employee-${employee.id}`}
                                                checked={selectedCard.has(employee.id)}
                                                onCheckedChange={() => handleSelectedCard(employee.id)}
                                                className="mr-2"
                                                />
                                                <span>{employee.unique_card}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>{employee.sname}</TableCell>
                                        <TableCell>{employee.fname}</TableCell>
                                        <TableCell>{employee.fatherly}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="default"
                                                className="w-full rounded-none bg-blue-600 hover:bg-blue-700"
                                                onClick={() => navigate(`/view/personal_card/personalCard/${employee.id}`)}
                                            >
                                                Редагування
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    
                        {/* Action buttons */}
                        <div className="flex justify-center mt-8 gap-4">
                            <Button 
                                variant="outline" 
                                className="flex-1 text-base py-6 rounded-none"
                                onClick={handleDuplicate}
                            >
                                Зробити дубль
                            </Button>
                            <Button 
                                variant="outline" 
                                className="flex-1 text-base py-6 rounded-none"
                                onClick={handlePrint}
                            >
                                Друк довідки
                            </Button>
                            <Button 
                                variant="outline" 
                                className="flex-1 text-base py-6 rounded-none"
                                onClick={handleDelete}
                            >
                                Видалити картку
                            </Button>
                        </div>
                    </>
                ) : (
                    <div className="text-center text-gray-500 py-8">
                        Нема результату
                    </div>
                )}
                </div>
            </CardContent>

            {/* Category Selection Dialog */}
            <Dialog open={isFormOpen} onOpenChange={handleCloseForm}>
                <DialogHeader className="bg-gray-100 border-b rounded-none px-2 py-1 flex justify-between items-center">
                <div className="flex items-center">
                    <div className="w-4 h-4 bg-gray-300 mr-2"></div>
                    <DialogTitle className="text-sm">Оберіть категорію</DialogTitle>
                </div>
                <div className="flex">
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleCloseForm}>
                        <Minimize className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleCloseForm}>
                        <Crop className="h-3 w-3" />
                    </Button>
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleCloseForm}>
                    <X className="h-3 w-3" />
                    </Button>
                </div>
                </DialogHeader>
                <DialogContent className="bg-gray-100 p-4 rounded-none">
                    <div className="space-y-2">
                        {categories.map((category) => (
                        <div 
                            key={category.id}
                            className={`
                            border p-4 bg-white cursor-pointer transition-all 
                            ${category.id === selectedCategory ? 'border-dashed border-blue-500' : 'border-solid border-gray-300'}
                            `}
                            onClick={() => handleCategorySelect(category.id)}
                        >
                            <p className="text-center">{category.label}</p>
                        </div>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>

            {/* Hidden print div */}
            <div className="hidden">
                <div ref={printRef}>
                    <h2 className="text-center text-xl font-bold my-4">Довідка персональних карток</h2>
                    <p className="mb-4">Категорія: {categories.find(c => c.id === selectedCategory)?.label}</p>
                    <table className="border-collapse w-full">
                        <thead>
                        <tr>
                            <th className="border border-gray-400 p-2 text-center">Номер картки</th>
                            <th className="border border-gray-400 p-2 text-center">Прізвище</th>
                            <th className="border border-gray-400 p-2 text-center">Ім'я</th>
                            <th className="border border-gray-400 p-2 text-center">По батькові</th>
                        </tr>
                        </thead>
                        <tbody>
                            {Array.from(selectedCard).map(id => {
                                const item = employees.find(s => s.id === id);
                                return item ? (
                                <tr key={item.id}>
                                    <td className="border border-gray-400 p-2 text-center">{item.unique_card}</td>
                                    <td className="border border-gray-400 p-2 text-center">{item.sname}</td>
                                    <td className="border border-gray-400 p-2 text-center">{item.fname}</td>
                                    <td className="border border-gray-400 p-2 text-center">{item.fatherly}</td>
                                </tr>
                                ) : null;
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </Card>
    );
}


export default SearchBySurname;

