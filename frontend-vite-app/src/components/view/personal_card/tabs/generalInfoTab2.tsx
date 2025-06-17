import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const GeneralInfo2Tab: React.FC = () => {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold mb-4">11. Родинний стан</h3>
                <div className="flex gap-4">
                    <div className="w-48">
                        <Label>Члени сім'ї</Label>
                        <Select>
                            <SelectTrigger className="mt-1">
                                <SelectValue placeholder="Виберіть" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="spouse">Дружина/Чоловік</SelectItem>
                                <SelectItem value="child">Дитина</SelectItem>
                                <SelectItem value="parent">Батько/Мати</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex-1">
                        <Label>ПІБ</Label>
                        <Input className="mt-1" />
                    </div>
                </div>
            </div>

            <Separator />

            <div>
                <h3 className="text-lg font-semibold mb-4">12. Паспорт</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <Label>Серія</Label>
                        <Input className="mt-1" />
                    </div>
                    <div>
                        <Label>Номер</Label>
                        <Input className="mt-1" />
                    </div>
                    <div>
                        <Label>Дата видачі</Label>
                        <Input type="date" className="mt-1" />
                    </div>
                </div>
                <div className="mt-4">
                    <Label>Ким виданий</Label>
                    <Input className="mt-1" />
                </div>
            </div>

            <Separator />

            <div>
                <h3 className="text-lg font-semibold mb-4">13-14. Контактна інформація</h3>
                <div className="space-y-4">
                    <div>
                        <Label>Домашня адреса</Label>
                        <Input className="mt-1" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label>Телефон</Label>
                            <Input className="mt-1" />
                        </div>
                        <div>
                            <Label>Мобільний телефон</Label>
                            <Input className="mt-1" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GeneralInfo2Tab;