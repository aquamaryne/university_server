import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { type CheckboxState } from '../types/checkboxTypes';

interface AdditionalInfoTabProps {
    checkboxes: CheckboxState;
    onCheckboxChange: (field: keyof CheckboxState, checked: boolean) => void;
}

const AdditionalInfoTab: React.FC<AdditionalInfoTabProps> = ({ 
    checkboxes, 
    onCheckboxChange 
}) => {
    const [scientificDegree, setScientificDegree] = useState<string>("008");

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Work Status */}
                <div className="space-y-6">
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Статус роботи</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-3">
                                <div className="flex items-center space-x-2">
                                    <Checkbox 
                                        id="fullTime" 
                                        checked={checkboxes.fullTime}
                                        onCheckedChange={(checked) => onCheckboxChange('fullTime', !!checked)}
                                    />
                                    <Label htmlFor="fullTime">Повна ставка</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox 
                                        id="partTime25" 
                                        checked={checkboxes.partTime25}
                                        onCheckedChange={(checked) => onCheckboxChange('partTime25', !!checked)}
                                    />
                                    <Label htmlFor="partTime25">0.25 ставки</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox 
                                        id="partTime50" 
                                        checked={checkboxes.partTime50}
                                        onCheckedChange={(checked) => onCheckboxChange('partTime50', !!checked)}
                                    />
                                    <Label htmlFor="partTime50">0.50 ставки</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox 
                                        id="partTime75" 
                                        checked={checkboxes.partTime75}
                                        onCheckedChange={(checked) => onCheckboxChange('partTime75', !!checked)}
                                    />
                                    <Label htmlFor="partTime75">0.75 ставки</Label>
                                </div>
                            </div>
                            
                            <div className="space-y-3">
                                <div className="flex items-center space-x-2">
                                    <Checkbox 
                                        id="coWorker" 
                                        checked={checkboxes.coWorker}
                                        onCheckedChange={(checked) => onCheckboxChange('coWorker', !!checked)}
                                    />
                                    <Label htmlFor="coWorker">Сумісник</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox 
                                        id="externalCoWorker" 
                                        checked={checkboxes.externalCoWorker}
                                        onCheckedChange={(checked) => onCheckboxChange('externalCoWorker', !!checked)}
                                    />
                                    <Label htmlFor="externalCoWorker">Сумісник зі сторони</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox 
                                        id="temporaryWorker" 
                                        checked={checkboxes.temporaryWorker}
                                        onCheckedChange={(checked) => onCheckboxChange('temporaryWorker', !!checked)}
                                    />
                                    <Label htmlFor="temporaryWorker">Працює тимчасово</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox 
                                        id="postalPaidTeacher" 
                                        checked={checkboxes.postalPaidTeacher}
                                        onCheckedChange={(checked) => onCheckboxChange('postalPaidTeacher', !!checked)}
                                    />
                                    <Label htmlFor="postalPaidTeacher">Викладач з почасовою оплатою</Label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    <div>
                        <Label htmlFor="academicTitle">Вчене звання</Label>
                        <Input id="academicTitle" className="mt-1" />
                    </div>
                </div>

                {/* Right Column - Scientific Information */}
                <div className="space-y-6">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label>Розширена зона</Label>
                            <Input defaultValue="0.00" className="w-20" />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <Checkbox 
                                    id="scientificCandidate" 
                                    checked={checkboxes.scientificCandidate}
                                    onCheckedChange={(checked) => onCheckboxChange('scientificCandidate', !!checked)}
                                />
                                <Label htmlFor="scientificCandidate">Кандидат наук</Label>
                            </div>
                            <Button variant="outline" size="sm">
                                Карта канд.
                            </Button>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <Checkbox 
                                    id="scientificDoctor" 
                                    checked={checkboxes.scientificDoctor}
                                    onCheckedChange={(checked) => onCheckboxChange('scientificDoctor', !!checked)}
                                />
                                <Label htmlFor="scientificDoctor">Доктор наук</Label>
                            </div>
                            <Button variant="outline" size="sm">
                                Карта докт.
                            </Button>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox 
                                id="academician" 
                                checked={checkboxes.academician}
                                onCheckedChange={(checked) => onCheckboxChange('academician', !!checked)}
                            />
                            <Label htmlFor="academician">Академік</Label>
                        </div>

                        <div className="flex items-center justify-between">
                            <Label>Галузь вчен.ступені:</Label>
                            <Select value={scientificDegree} onValueChange={setScientificDegree}>
                                <SelectTrigger className="w-32">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="008">008</SelectItem>
                                    <SelectItem value="007">007</SelectItem>
                                    <SelectItem value="009">009</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex items-center justify-between">
                            <Label>Рік присвоєння останнього вченого звання:</Label>
                            <Input defaultValue="2004" className="w-20" />
                        </div>

                        <div className="flex items-center justify-between">
                            <Label>Рік останнього підвищення кваліфікації:</Label>
                            <Input defaultValue="2023" className="w-20" />
                        </div>

                        <div className="flex items-center justify-between">
                            <Label>Загальний науково-педагогічний стаж:</Label>
                            <Input defaultValue="24" className="w-20" />
                        </div>

                        <div>
                            <Label>Філія</Label>
                            <Input className="mt-1" />
                        </div>
                    </div>
                </div>
            </div>

            <Separator />

            {/* Chernobyl and Disability Information */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Chernobyl Section */}
                <Card className="p-4">
                    <h3 className="text-lg font-semibold mb-4">Чорнобилець:</h3>
                    <div className="flex gap-4 mb-4">
                        <div className="flex items-center space-x-2">
                            <Checkbox 
                                id="chernobyl1" 
                                checked={checkboxes.chernobyl1}
                                onCheckedChange={(checked) => onCheckboxChange('chernobyl1', !!checked)}
                            />
                            <Label htmlFor="chernobyl1">1 кат.</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox 
                                id="chernobyl2" 
                                checked={checkboxes.chernobyl2}
                                onCheckedChange={(checked) => onCheckboxChange('chernobyl2', !!checked)}
                            />
                            <Label htmlFor="chernobyl2">2 кат.</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox 
                                id="chernobyl3" 
                                checked={checkboxes.chernobyl3}
                                onCheckedChange={(checked) => onCheckboxChange('chernobyl3', !!checked)}
                            />
                            <Label htmlFor="chernobyl3">3 кат.</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox 
                                id="chernobyl4" 
                                checked={checkboxes.chernobyl4}
                                onCheckedChange={(checked) => onCheckboxChange('chernobyl4', !!checked)}
                            />
                            <Label htmlFor="chernobyl4">4 кат.</Label>
                        </div>
                    </div>
                    <div>
                        <Label>№ посвідчення чорнобильця, коли і ким видане:</Label>
                        <Input className="mt-1" />
                    </div>
                </Card>

                {/* Disability Section */}
                <Card className="p-4">
                    <h3 className="text-lg font-semibold mb-4">Інвалід:</h3>
                    <div className="flex gap-4 mb-4">
                        <div className="flex items-center space-x-2">
                            <Checkbox 
                                id="disability1" 
                                checked={checkboxes.disability1}
                                onCheckedChange={(checked) => onCheckboxChange('disability1', !!checked)}
                            />
                            <Label htmlFor="disability1">1 групи</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox 
                                id="disability2" 
                                checked={checkboxes.disability2}
                                onCheckedChange={(checked) => onCheckboxChange('disability2', !!checked)}
                            />
                            <Label htmlFor="disability2">2 групи</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox 
                                id="disability3" 
                                checked={checkboxes.disability3}
                                onCheckedChange={(checked) => onCheckboxChange('disability3', !!checked)}
                            />
                            <Label htmlFor="disability3">3 групи</Label>
                        </div>
                    </div>
                    <div>
                        <Label>№ посвідчення, коли і ким видане:</Label>
                        <Input className="mt-1" />
                    </div>
                </Card>
            </div>

            <Separator />

            {/* Additional Information Section */}
            <div className="space-y-4">
                <div>
                    <Label>Додаткові відомості</Label>
                    <div className="space-y-2 mt-1">
                        <Input />
                        <Input />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label>Дата звільнення</Label>
                        <Input type="date" className="mt-1" />
                    </div>
                    <div>
                        <Label>Причина звільнення</Label>
                        <Select>
                            <SelectTrigger className="mt-1">
                                <SelectValue placeholder="Виберіть причину" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="voluntary">За власним бажанням</SelectItem>
                                <SelectItem value="agreement">За згодою сторін</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label>№ наказу на звільнення</Label>
                        <Input className="mt-1" />
                    </div>
                    <div>
                        <Label>Дата наказу на звільнення</Label>
                        <Input type="date" className="mt-1" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdditionalInfoTab;
                