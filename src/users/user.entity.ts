import { Column, Entity, OneToMany, ManyToMany, PrimaryGeneratedColumn, JoinTable } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose, Transform } from 'class-transformer';
// import { UsersCompany } from "src/users.company/users.company.entity";
import { UsersCompanyRole } from "src/users-company-role/users-company-role.entity";
import { Companys } from '../company/company.entity';

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

  @ManyToMany(() => Companys, companys => companys.users)
  @JoinTable(
  //   {
  //   name: "user_company", // table name for the junction table of this relation
  //   joinColumn: {
  //     name: "user",
  //     referencedColumnName: "id"
  //   },
  //   inverseJoinColumn: {
  //     name: "company",
  //     referencedColumnName: "id"
  //   }
  // }
  )
  companies: Companys[];

  @OneToMany(() => UsersCompanyRole, usersCompanyRole => usersCompanyRole.user)
  usersCompanyRoles: UsersCompanyRole[]

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}