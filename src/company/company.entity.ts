import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose, Transform } from 'class-transformer';
import {UsersCompany} from '../users.company/users.company.entity';
import { UsersCompanyRole } from "src/users-company-role/users-company-role.entity";

@Entity()
export class Companys {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @ApiProperty({ example: 'Google', description: 'Company name' })
    name: string;

    @Column()
    @ApiProperty({ example: '12jgds_Zhgs', description: 'Password' })
    // @Exclude()
    description: string;

    @OneToMany(() => UsersCompany, usersCompany => usersCompany.company)
    usersCompanys: UsersCompany[]

    @OneToMany(() => UsersCompanyRole, usersCompanyRole => usersCompanyRole.company)
    usersCompanyRoles: UsersCompanyRole[]
  
    // constructor(partial: Partial<UsersCompany>) {
    //   Object.assign(this, partial);
    // }

     // constructor(partial: Partial<User>) {
    //     Object.assign(this, partial);
    //   }
}