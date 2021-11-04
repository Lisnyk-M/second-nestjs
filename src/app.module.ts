import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CompanyModule } from './company/company.module';
import { UsersCompanyModule } from './users.company/users.company.module';
import { RoleService } from './role/role.service';
import { RoleController } from './role/role.controller';
import { RoleModule } from './role/role.module';
import { UsersCompanyRoleModule } from './users-company-role/users-company-role.module';
import { UsersCompanyRoleService } from './users-company-role/users-company-role.service';
import { UsersCompanyService } from './users.company/users.company.service';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    CompanyModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'test',
      password: 'test',
      database: 'test',
      entities: [
        "dist/users/user.entity.js",
        "dist/company/company.entity.js",
        "dist/users.company/users.company.entity.js",
        "dist/role/role.entity.js",
        "dist/users-company-role/users-company-role.entity.js"
      ],
      synchronize: true,
    }),
    UsersCompanyModule,    
    UsersCompanyRoleModule,    
    RoleModule,
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule { }
