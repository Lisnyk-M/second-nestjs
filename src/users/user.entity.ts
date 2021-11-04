import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose, Transform } from 'class-transformer';
import { UsersCompany } from "src/users.company/users.company.entity";
import { UsersCompanyRole } from "src/users-company-role/users-company-role.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ApiProperty({ example: 'myemail@gmail.com', description: 'Email' })
  email: string;

  @Column()
  @ApiProperty({ example: '1111', description: 'Password' })
  @Exclude()
  password: string;

  @Exclude()
  @Column()
  token: string;

  @Column()
  filename: string;

  @OneToMany(() => UsersCompany, usersCompany => usersCompany.user)
  usersCompanys: UsersCompany[]

  @OneToMany(() => UsersCompanyRole, usersCompanyRole => usersCompanyRole.user)
  usersCompanyRoles: UsersCompanyRole[]

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}