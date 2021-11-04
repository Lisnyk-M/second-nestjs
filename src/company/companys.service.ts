import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { Companys } from './company.entity';
import { CreateCompanyDto } from '../dto/company/create.company';

@Injectable()
export class CompanysService {
    constructor(
        @InjectRepository(Companys)
        private companysRepository: Repository<Companys>
    ) { }

    create(createCompanyDto: CreateCompanyDto): any {
        return this.companysRepository.save(createCompanyDto);
    }

    async getCompany(id: number): Promise<Companys>{
        return await this.companysRepository.findOne(id);
    }

    async sendSQL() {
        const response = await this.companysRepository.createQueryBuilder("user")
            .where("user.id = :id", { id: 11 })
            .getOne();
            console.log('SQL Response: ', response);

            return response;
    }

}