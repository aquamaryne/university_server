import React, { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";

interface ScienceRank {
    id: number;
    rank_name: string;
    short_name: string;
}

const ScienceRank: React.FC = () => {
    const [scienceRanks, setScienceRanks] = useState<ScienceRank[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchScienceRanks = async () => {
            setLoading(true);
            
            try {
                const response = await fetch(`http://localhost:3001/science-ranks`);

                if (!response.ok) {
                    throw new Error('Не вдалося отримати дані наукових звань');
                }
                const data: ScienceRank[] = await response.json();
                setScienceRanks(data);
                setError(null);
            } catch (error) {
                console.error(`Помилка завантаження даних: ${error}`);
                setError('Помилка завантаження даних наукових звань');
            } finally {
                setLoading(false);
            }
        };

        fetchScienceRanks();
    }, []);

    return (
        <div className="bg-white shadow-md border border-black">
            <div className="p-4 border-b border-gray-200">
                <h1 className="text-2xl font-bold text-center mb-4">
                    Довідник наукових звань
                </h1>
                <div className="flex justify-end">
                    <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded hover:bg-gray-50 text-sm">
                        <Plus className="h-4 w-4" /> Додати звання
                    </button>
                </div>
            </div>
            <div className="p-4">
                {loading ? (
                    <div className="flex justify-center p-8">
                        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent animate-spin rounded-full"></div>
                    </div>
                ) : error ? (
                    <div className="p-4 text-center text-red-500">{error}</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-300">
                            <caption className="mb-4 text-sm text-gray-600">
                                Список всіх наукових звань НТУ
                            </caption>
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="border border-gray-300 px-4 py-3 text-center w-24">Код</th>
                                    <th className="border border-gray-300 px-4 py-3 text-left">Назва звання</th>
                                    <th className="border border-gray-300 px-4 py-3 text-left">Скорочена назва</th>
                                    <th className="border border-gray-300 px-4 py-3 text-center w-32">Дії</th>
                                </tr>
                            </thead>
                            <tbody>
                                {scienceRanks.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="border border-gray-300 px-4 py-8 text-center text-gray-500">
                                            Немає даних про наукові звання
                                        </td>
                                    </tr>
                                ) : (
                                    scienceRanks.map((rank) => (
                                        <tr key={rank.id} className="hover:bg-gray-50">
                                            <td className="border border-gray-300 px-4 py-3 text-center font-medium">
                                                {rank.id}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-3">
                                                {rank.rank_name}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-3">
                                                {rank.short_name}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-3 text-center">
                                                <div className="flex justify-center gap-2">
                                                    <button className="p-1 hover:bg-gray-200 rounded">
                                                        <Pencil className="h-4 w-4" />
                                                    </button>
                                                    <button className="p-1 hover:bg-red-100 text-red-500 hover:text-red-700 rounded">
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ScienceRank;