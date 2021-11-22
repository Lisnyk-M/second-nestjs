import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../index-modules';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { User } from '../users/user.entity';
import {Companys} from '../company/company.entity';
import {UsersCompanyRole} from '../users-company-role/users-company-role.entity';
import {Role} from '../role/role.entity';
import { ConfigService } from '@nestjs/config';
import {CompanysService, UsersCompanyRoleService, RoleService, UsersService} from '../index-services';


require('dotenv').config();

// , UsersService, ConfigService, CompanysService, UsersCompanyRoleService, RoleService
// const x = AuthService;
// console.log('UsersModule: ', x)

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Companys, UsersCompanyRole, Role]),
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    })
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule { }
