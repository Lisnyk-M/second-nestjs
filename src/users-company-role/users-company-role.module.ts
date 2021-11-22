import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersCompanyRoleService } from './users-company-role.service';
import { UsersCompanyRoleController } from './users-company-role.controller';
import { UsersCompanyRole } from './users-company-role.entity';
import { RoleModule, CompanyModule, UsersModule } from '../index-modules';
import { Companys } from 'src/company/company.entity';
import { Role } from 'src/role/role.entity';
import { User } from 'src/users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersCompanyRole]),
    // CompanyModule,
    // RoleModule,
    // UsersModule, //  was here
    // UsersCompanyModule,
  ],
  providers: [UsersCompanyRoleService],
  controllers: [UsersCompanyRoleController],
  exports: [UsersCompanyRoleService],
})
export class UsersCompanyRoleModule {}
