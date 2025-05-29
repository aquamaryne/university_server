import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const AppointmentsTab: React.FC = () => {
    return (
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
    );
};

export default AppointmentsTab;
