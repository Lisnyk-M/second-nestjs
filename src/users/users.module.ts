import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { ConfigService } from '@nestjs/config';
import { UsersCompanyService } from 'src/users.company/users.company.service';
import { UsersCompanyModule } from 'src/users.company/users.company.module';
import { UsersCompanyRoleModule } from 'src/users-company-role/users-company-role.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UsersCompanyModule,
    UsersCompanyRoleModule,
  ],
  providers: [UsersService, ConfigService,],
  controllers: [UsersController],
  exports: [UsersService, ConfigService],
})
export class UsersModule { }
