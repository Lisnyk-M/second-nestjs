import { Injectable, HttpException, HttpStatus, } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { Companys } from './company.entity';
import { CreateCompanyDto } from '../dto/company/create.company';
import { User } from '../users/user.entity';
import { UsersService } from '../index-services';

@Injectable()
export class CompanysService {
    constructor(
        @InjectRepository(Companys)
        private companysRepository: Repository<Companys>,
        // private usersService: UsersService,

    ) { }

    create(createCompanyDto: CreateCompanyDto): any {
        return this.companysRepository.save(createCompanyDto);
    }

    async getCompany(id: number): Promise<Companys> {
        return await this.companysRepository.findOne(id);
    }

    async getCompanyUser(companyId: number, userId: number): Promise<Companys>{
        const findedRecord = await this.companysRepository.findOne({    
            relations: ['users']
        })
        console.log('findedRecord: ', findedRecord);
        return findedRecord;
    }

    async sendSQL() {
        const response = await this.companysRepository.createQueryBuilder("user")
            .where("user.id = :id", { id: 11 })
            .getOne();
        console.log('SQL Response: ', response);

        return response;
    }

    // async addCompany(companyId: number, userId: number) {
    //     const findCompany = await this.getCompany(companyId);
    //     if (!findCompany) {
    //         throw new HttpException(`Company id: ${companyId} not found`, HttpStatus.NOT_FOUND);
    //     }

    //     const createCompany = await this.sendSQL();

    //     const user = new User({});
    //     user.email = 'desept@mail.com';
    //     const company = new Companys();
    //     company.name = 'dndntttt';
    //     company.description = 'this is a new company';
    //     company.users = [user];

    //     try {
    //         const res = await this.companysRepository.save(company);

    //         if (!res) {
    //             throw new HttpException('saved fail:', HttpStatus.BAD_REQUEST);
    //         }
    //         console.log('Result saving: ', res);
    //     } catch (e) {
    //         console.log('Error saving: ', e);
    //     }
    // }

}