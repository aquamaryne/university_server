import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2 } from "lucide-react";

interface Faculty {
    id: number;
    faculty_name: string;
    short_name: string;
}

const FacultyPage: React.FC = () => {
    const[faculties, setFaculties] = useState<Faculty[]>([]);
    const[loading, setLoading] = useState<boolean>(true);
    const[error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFaculties = async() => {
            setLoading(true);
            
            try{
                const responce = await fetch(`http://localhost:3001/faculty`);

                if(!responce.ok){
                    throw new Error('Не вдалося отримати дані факультетів');
                }
                const data: Faculty[] = await responce.json();
                setFaculties(data);
                setError(null);
            } catch(error){
                console.error(`Помилка завантаження даних: ${error}` );
            } finally {
                setLoading(false);
            }
        };

        fetchFaculties();
    }, []);

    return(
        <Card className="shadow-md rounded-none border-black">
            <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-bold text-center">
                    Довідник факультетів
                </CardTitle>
                <div className="flex justify-end">
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Plus className="h-4 w-4" /> Додати факультети
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                {loading  ? (
                    <div className="flex justify-center p-8">
                        <div className="w-8 h-8 rounded-none border-4 border-primary border-t-transparent animate-spin"></div>
                    </div>
                ): error ? (
                    <div className="p-4 text-center text-red-500">{error}</div>
                ) : (
                    <Table>
                        <TableCaption>
                            Список всіх факультетів НТУ
                        </TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px] text-center">Код</TableHead>
                                <TableHead>Назва</TableHead>
                                <TableHead>Скорочена назва</TableHead>
                                <TableHead className="w-[120px] text-center">Дії</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {faculties.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                                        Немає даних про факультет
                                    </TableCell>
                                </TableRow>
                            ): (
                                faculties.map((faculty) => (
                                    <TableRow key={faculty.id}>
                                        <TableCell className="text-center font-medium">
                                            {faculty.id}
                                        </TableCell>
                                        <TableCell>{faculty.faculty_name}</TableCell>
                                        <TableCell>{faculty.short_name}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50">
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                )}
            </CardContent>
        </Card>
    )
}

export default FacultyPage;