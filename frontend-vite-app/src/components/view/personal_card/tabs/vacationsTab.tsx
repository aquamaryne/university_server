import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const VacationsTab: React.FC = () => {
    return (
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
    );
};

export default VacationsTab;