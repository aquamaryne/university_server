import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as ExcelJS from 'exceljs';
import { Repository } from 'typeorm';
import { Response } from 'express';
import { Employeers } from 'src/entity/employeers';

@Injectable()
export class ExcelService {
    constructor(
        @InjectRepository(Employeers)
        private readonly employeersRepositoty: Repository<Employeers>
    ) {}

    async generateCombinedExcel(responce: Response){
        const employeers = await this.employeersRepositoty.find({
            relations:[
                'personal_info',
                'positions',
                'domains',
                'education',
                'family',
                'department',
                'work_experience',
                'sex',
                'fired',
                'language',
                'family_status'
            ],
        });

        const data = employeers.map((employee) => ({
            unique_card: employee.unique_card || '',
            fname: employee.fname,
            sname: employee.sname,
            fatherly: employee.fatherly,
            date_of_birth: employee.date_of_birth?.toISOString().split('T')[0] || '',
            position_name: employee.positions?.[0]?.positions_name || '',
            degree_of_education: employee.education?.[0]?.degree_of_education || '',
            diploma: employee.education?.[0]?.diploma || '',
            count_of_children: employee.family?.[0]?.count_of_children || '',
            global_work_experience: employee.work_experience?.[0]?.global_work_exp || '',
            scientific_in_this_institute: employee.work_experience?.[0] || '',
            sex_name: employee.sex?.[0]?.sex_name || '',
            domain_name: employee.domains?.[0]?.domain_name || '',
            achievement_name: employee.achievement?.[0]?.achievement_name || '',
        }));

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Усі дані');

        worksheet.columns = [
            { header: 'Унікальний номер', key: 'unique_card', width: 20 },
            { header: "Ім'я", key: 'fname', width: 20 },
            { header: 'Прізвище', key: 'sname', width: 20 },
            { header: 'По батькові', key: 'fatherly', width: 20 },
            { header: 'Дата народження', key: 'date_of_birth', width: 20 },
            { header: 'Посада', key: 'position_name', width: 20 },
            { header: 'Ступінь освіти', key: 'degree_of_education', width: 20 },
            { header: 'Диплом', key: 'diploma', width: 20 },
            { header: 'Кількість дітей', key: 'count_of_children', width: 20 },
            { header: 'Загальний стаж роботи', key: 'global_work_experience', width: 20 },
            { header: 'Науковий стаж в цьому інституті', key: 'scientific_in_this_institute', width: 20 },
            { header: 'Стать', key: 'sex', width: 20 },
            { header: 'Домен', key: 'domain_name', width: 20 },
            { header: 'Досягнення', key: 'achievement_name', width: 20 },
        ];

        worksheet.addRows(data);
        responce.setHeader(
            'Content-Type',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        )
        responce.setHeader(
            'Content-Disposition',
            'attachment; filename=combined.xlsx',
        );

        await workbook.xlsx.write(responce);
        responce.end();
    } 
}
