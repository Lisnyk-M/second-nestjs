import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersCompany } from './users.company.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Companys } from 'src/company/company.entity';
import { UsersService } from '../users/users.service';
import { CompanysService } from '../company/companys.service';

@Injectable()
export class UsersCompanyService {
    constructor(
        @InjectRepository(UsersCompany)
        private usersCompanyRepository: Repository<UsersCompany>,
        // private usersService: UsersService,
        private companysService: CompanysService
    ) {
    }

    async add(companyId: number, userId: number) {
        const findCompany = await this.companysService.getCompany(companyId);
        if (!findCompany) {
            throw new HttpException(`Company id: ${companyId} not found`, HttpStatus.NOT_FOUND);
        }

        const findCompanyId = await this.usersCompanyRepository.findOne({
            where: {
                company: { id: companyId },
                user: { id: userId },
            }
        });
        if (findCompanyId) {
            throw new HttpException('company allready in user', HttpStatus.CONFLICT);
        }
        console.log('findCompanyId: ', findCompanyId);
        const createCompany = await this.companysService.sendSQL();

        const user = new User({});
        const company = new Companys();
        const usersCompany = new UsersCompany();
        usersCompany.user = user;
        usersCompany.company = company;

        usersCompany.company.id = companyId;
        usersCompany.user.id = userId;

        try {
            const res = await this.usersCompanyRepository.save(usersCompany);

            if (!res) {
                throw new HttpException('saved fail:', HttpStatus.BAD_REQUEST);
            }
            console.log('Result saving: ', res);
        } catch (e) {
            console.log('Error saving: ', e);
        }
    }

    async getUserCompanyRec(userId: number, CompanyId: number): Promise<UsersCompany> {
        return await this.usersCompanyRepository.findOne({
            where: {
                user: {id: userId},
                company: {id: CompanyId},
            }
        })
    }

    async deleteCompany(companyId: number, userId: number): Promise<object>{
        console.log('companyId, userId: ', companyId, userId);
        const deleted = await this.usersCompanyRepository.delete({
            user: {id: userId},
            company: {id: companyId},
        })

        console.log('deleted company: ', deleted);
        return deleted;
    }

}
