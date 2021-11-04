import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { UsersCompany } from './users.company.entity';
import { UsersCompanyService } from './users.company.service';
import {CompanyModule} from '../company/company.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersCompany]),
    // UsersModule
    CompanyModule

  ],
  providers: [UsersCompanyService],
  exports: [UsersCompanyService]
})
export class UsersCompanyModule { }
