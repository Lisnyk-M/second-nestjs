import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule, UsersCompanyRoleModule, CompanyModule, RoleModule, AuthModule  } from './index-modules';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    CompanyModule,
    UsersCompanyRoleModule,
    RoleModule,
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
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule { }
