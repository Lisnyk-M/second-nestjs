import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersCompanyRoleService } from './users-company-role.service';
import { UsersCompanyRoleController } from './users-company-role.controller';
import { UsersCompanyRole } from './users-company-role.entity';
import { CompanyModule } from 'src/company/company.module';
import { RoleModule } from 'src/role/role.module';
import { UsersCompanyModule } from 'src/users.company/users.company.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersCompanyRole]),
    CompanyModule,
    RoleModule,
    UsersCompanyModule,
],
  providers: [UsersCompanyRoleService],
  controllers: [UsersCompanyRoleController],
  exports: [UsersCompanyRoleService]
})
export class UsersCompanyRoleModule {}
