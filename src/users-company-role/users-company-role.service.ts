import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersCompanyRole } from './users-company-role.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Companys } from 'src/company/company.entity';
import { Role } from '../role/role.entity';
import { RoleService, CompanysService, UsersService } from '../index-services';

@Injectable()
export class UsersCompanyRoleService {
    constructor(
        @InjectRepository(UsersCompanyRole)
        private usersCompanyRoleRepository: Repository<UsersCompanyRole>,

        @InjectRepository(Companys)
        private companysService: CompanysService,

        @InjectRepository(Role)
        private roleServise: RoleService,

        @InjectRepository(User)
        private userService: UsersService,
    ) { }

    async addRole(companyId: number, userId: number, roleId: number): Promise<object> {
        const findCompany = await this.companysService.getCompany(companyId);
        if (!findCompany) {
            throw new HttpException('Company not found', HttpStatus.NOT_FOUND);
        }

        const findRole = await this.roleServise.getRole(roleId);
        if (!findRole) {
            throw new HttpException('Role is not available', HttpStatus.FORBIDDEN);
        }

        const getedCompany = await this.userService.getUserCompany(companyId, userId);
        console.log('getedCompany: ', getedCompany);

        if (!getedCompany) {
            throw new HttpException(`user with Id: ${userId} not found in company with Id: ${companyId} `, HttpStatus.NOT_FOUND);
        }

        const findRoleUCR = await this.usersCompanyRoleRepository.findOne({
            where: {
                user: { id: userId },
                company: { id: companyId },
                role: { id: roleId },
            }
        })
        console.log('findRoleUCR: ', findRoleUCR);

        if (findRoleUCR) {
            throw new HttpException(`role with id: ${roleId} already exist in user with id: ${userId}`, HttpStatus.CONFLICT);
        }

        // console.log('findUserCompanyRec: ', findUserCompanyRec);

        const user = new User({});
        const company = new Companys();
        const role = new Role();
        const usersCompanyRole = new UsersCompanyRole();
        usersCompanyRole.user = user;
        usersCompanyRole.company = company;
        usersCompanyRole.role = role;

        usersCompanyRole.company.id = companyId;
        usersCompanyRole.user.id = userId;
        usersCompanyRole.role.id = roleId;
        const res = await this.usersCompanyRoleRepository.save(usersCompanyRole);
        console.log('add role result saving: ', res);
        return { message: 'role added' };
    }

    async deleteUCR(companyId: number, userId: number): Promise<any> {
        const deleted = await this.usersCompanyRoleRepository.delete({
            company: { id: companyId },
            user: { id: userId },
        });

        console.log('deleteUCR: ', deleted);
    }

    async deleteRole(companyId: number, userId: number, roleId: number): Promise<any> {
        const deleted = await this.usersCompanyRoleRepository.delete({
            company: { id: companyId },
            user: { id: userId },
            role: { id: roleId },
        });

        console.log('deleteUCR: ', deleted);
    }
}
