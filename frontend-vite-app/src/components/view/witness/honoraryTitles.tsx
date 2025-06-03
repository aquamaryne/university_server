import React, { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";

interface HonoraryTitle {
    id: number;
    title_name: string;
    short_name: string;
}

const HonoraryTitles: React.FC = () => {
    const [honoraryTitles, setHonoraryTitles] = useState<HonoraryTitle[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchHonoraryTitles = async () => {
            setLoading(true);
            
            try {
                const response = await fetch(`http://localhost:3001/honorary-titles`);

                if (!response.ok) {
                    throw new Error('Не вдалося отримати дані почесних звань');
                }
                const data: HonoraryTitle[] = await response.json();
                setHonoraryTitles(data);
                setError(null);
            } catch (error) {
                console.error(`Помилка завантаження даних: ${error}`);
                setError('Помилка завантаження даних почесних звань');
            } finally {
                setLoading(false);
            }
        };

        fetchHonoraryTitles();
    }, []);

    return (
        <div className="bg-white shadow-md border border-black">
            <div className="p-4 border-b border-gray-200">
                <h1 className="text-2xl font-bold text-center mb-4">
                    Довідник почесних звань
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
                                Список всіх почесних звань НТУ
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
                                {honoraryTitles.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="border border-gray-300 px-4 py-8 text-center text-gray-500">
                                            Немає даних про почесні звання
                                        </td>
                                    </tr>
                                ) : (
                                    honoraryTitles.map((title) => (
                                        <tr key={title.id} className="hover:bg-gray-50">
                                            <td className="border border-gray-300 px-4 py-3 text-center font-medium">
                                                {title.id}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-3">
                                                {title.title_name}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-3">
                                                {title.short_name}
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

export default HonoraryTitles;