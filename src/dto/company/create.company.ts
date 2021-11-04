import { IsString, IsNotEmpty  } from 'class-validator';

export class CreateCompanyDto {
    @IsNotEmpty()
    name: string;

    @IsString()
    description: string;  
}