import { Controller, Get, Post, Body } from '@nestjs/common';
import { CompanysService } from './companys.service';
import { CreateCompanyDto } from '../dto/company/create.company';
import { Companys } from './company.entity';

@Controller('/companys')
export class CompanyController {
    constructor(
        private companysService: CompanysService,
        // private createCompanyDto: CreateCompanyDto,
    ) {

    }
    @Post('/create')
    async create(@Body() createCompanyDto: CreateCompanyDto): Promise<void> {
        // const createCompanyDto = new 
        return await this.companysService.create(createCompanyDto);
    }

    @Get()
    async sqlRequest(): Promise<Companys> {
        return this.companysService.sendSQL();
    }
}

