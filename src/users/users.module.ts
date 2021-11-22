import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user.entity';
import { CompanyModule } from 'src/company/company.module';
import { UsersCompanyRoleModule } from 'src/users-company-role/users-company-role.module';
import { RoleModule } from 'src/role/role.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    CompanyModule,
    UsersCompanyRoleModule,
    RoleModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, ConfigService],
  exports: [UsersService, ConfigService],
})
export class UsersModule {}
