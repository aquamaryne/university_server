import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import * as fastCsv from 'fast-csv';
import { Employeers } from 'src/entity/employeers';
import { Personal_Info } from 'src/entity/personalInfo';
import { Positions } from 'src/entity/positions';
import { Domains } from 'src/entity/domains';
import { Education } from 'src/entity/education';
import { Family } from 'src/entity/family';
import { Military_Appearance } from 'src/entity/militaryAppearance';
import { Department } from 'src/entity/department';
import { Work_Experience } from 'src/entity/workExperience';
import { Sex } from 'src/entity/sex';
import { Fired } from 'src/entity/fired';
import { Language } from 'src/entity/lang';
import { FamilyStatus } from 'src/entity/familyStatus';

@Injectable()
export class CsvService {
    constructor(
        @InjectRepository(Employeers)           private readonly employeerRepository: Repository<Employeers>,
        @InjectRepository(Positions)            private readonly positionsRepository: Repository<Positions>,
        @InjectRepository(Department)           private readonly departmentRepository: Repository<Department>,
        @InjectRepository(Personal_Info)        private readonly personalInfoRepository: Repository<Personal_Info>, 
        @InjectRepository(Domains)              private readonly domainsRepository: Repository<Domains>,
        @InjectRepository(Family)               private readonly familyRepository: Repository<Family>,
        @InjectRepository(Military_Appearance)  private readonly militaryRepository: Repository<Military_Appearance>,
        @InjectRepository(Work_Experience)      private readonly workExperienceRepository: Repository<Work_Experience>,
        @InjectRepository(Education)            private readonly educationRepository: Repository<Education>,
        @InjectRepository(Sex)                  private readonly sexRepository: Repository<Sex>,
        @InjectRepository(Fired)                private readonly firedRepository: Repository<Fired>,
        @InjectRepository(Work_Experience)      private readonly workExpierenceRepository: Repository<Work_Experience>,
        @InjectRepository(Language)             private readonly languageRepository: Repository<Language>,
        @InjectRepository(FamilyStatus)         private readonly familyStatusRepository: Repository<FamilyStatus>,
    ) {}

    async importCsv(filePath: string) {
        const stream = fs.createReadStream(filePath);
        const csvStream = fastCsv.parse({ headers: true })
            .on('data', async(row) => {
                const newEmployeer = this.employeerRepository.create({
                    fname: row.fname,
                    sname: row.sname,
                    fatherly: row.fatherly,
                    date_of_birth: new Date(row.date_of_birth),
                });

                const savedEmployeer = await this.employeerRepository.save(newEmployeer);

                let department = await this.departmentRepository.findOne({ where: { faculty_name: row.faculty_name }});
                if(!department){
                    department = this.departmentRepository.create({ faculty_name: row.faculty_name });
                    department = await this.departmentRepository.save(department);
                }

                const newPositions = this.positionsRepository.create({
                    positions_name: row.positions_name,
                    position_where_work_now: row.position_where_work_now,
                    date_of_entry: new Date(row.date_of_entry),
                    type_of_study: row.type_of_study,
                    number_of_order: row.number_of_order,
                    employeers: savedEmployeer,
                    department: department,
                });
                await this.positionsRepository.save(newPositions);
            })


            .on('end', () => {
                console.log('Import ended');
            });
        stream.pipe(csvStream);
    }
}
