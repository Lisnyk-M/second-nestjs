import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user.entity';
import { CompanyModule } from '../index-modules';
import { CompanysService } from '../index-services';
import { Companys } from 'src/company/company.entity';
import { UsersCompanyRole } from 'src/users-company-role/users-company-role.entity';
import { UsersCompanyRoleService } from 'src/users-company-role/users-company-role.service';
import { Role } from 'src/role/role.entity';
import { RoleService } from '../index-services';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Companys, UsersCompanyRole, Role]),
    // CompanyModule,
  ],
  providers: [UsersService, ConfigService, CompanysService, UsersCompanyRoleService, RoleService],
  controllers: [UsersController],
  exports: [UsersService, ConfigService, CompanysService, UsersCompanyRoleService, RoleService],
})
export class UsersModule { }
