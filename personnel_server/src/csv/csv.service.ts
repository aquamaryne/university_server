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

                const newPersonalInfo = this.personalInfoRepository.create({
                    date_of_issue: row.date_of_issue,
                    place_of_living: row.place_of_living,
                    unique_card: row.unique_card,
                    serial_num_of_passport: row.serial_num_of_passport,
                    employeers: savedEmployeer,
                })

                await this.personalInfoRepository.save(newPersonalInfo);


                const newEducation = this.educationRepository.create({
                    degree_of_education: row.degree_of_education,
                    diploma: row.diploma,
                    number_of_diploma: row.number_of_diploma,
                    name_of_the_high_university: row.name_of_the_high_university,
                    name_of_the_middle_university: row.name_of_the_middle_university,
                    employeers: savedEmployeer,
                });

                await this.educationRepository.save(newEducation);

                const newMilitary = this.militaryRepository.create({
                    accounting_category: row.accounting_category,
                    accounting_group: row.accounting_group,
                    suitability_for_military_service: row.suitability_for_military_service,
                    military_accounting_specialty: row.military_accounting_specialty,
                    military_rank: row.military_rank,
                    depot: row.depot,
                    num: row.num,
                    name_of_military_office_at_the_place_of_residence: row.name_of_military_office_at_the_place_of_residence,
                    employeers: savedEmployeer,
                });

                await this.militaryRepository.save(newMilitary);

                const familyStatus = await this.familyStatusRepository.findOne({ where: { status: row.status }});
                const newFamily = this.familyRepository.create({
                    children_name: row.children_name,
                    count_of_children: row.count_of_children,
                    year_of_birth_children: row.year_of_birth_children,
                    employeers: savedEmployeer,
                    familyStatus: familyStatus || null,
                });

                await this.familyRepository.save(newFamily);

                const newLanguage = this.languageRepository.create({
                    language: row.language,
                    employeers: savedEmployeer,
                });
                await this.languageRepository.save(newLanguage);

                const sex = await this.sexRepository.findOne({ where: { sex_name: row.sex_name }});
                if(!sex){
                    const newSex = this.sexRepository.create({
                        sex_name: row.sex_name,
                        employeers: savedEmployeer,
                    });
                    await this.sexRepository.save(newSex);
                };

                const newDomains = this.domainsRepository.create({
                    domain_name: row.domain_name,
                    employeers: savedEmployeer,
                });

                await this.domainsRepository.save(newDomains);

                const newFired = this.firedRepository.create({
                    unique_card: row.unique_card,
                    date_of_fired: row.date_of_fired,
                    identify_code: row.identify_code,
                    employeers: savedEmployeer,
                });

                await this.firedRepository.save(newFired);

                const newWorkExp = this.workExpierenceRepository.create({
                    science_in_this_university: row.science_in_this_university,
                    global_science_exp: row.global_science_exp,
                    global_work_exp: row.global_work_exp,
                    continuous_work_exp: row.continuous_work_exp,
                    employeers: savedEmployeer,
                })
            })


            .on('end', () => {
                console.log('Import ended');
            });
        stream.pipe(csvStream);
    }
}
