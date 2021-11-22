import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyController } from './company.controller';
import { CompanysService } from './companys.service';
import { Companys } from './company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Companys])],
  controllers: [CompanyController],
  providers: [CompanysService],
  exports: [CompanysService],
})
export class CompanyModule {}
