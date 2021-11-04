import { User } from "../users/user.entity";
import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Companys } from '../company/company.entity';
import { Role } from "src/role/role.entity";

@Entity()
export class UsersCompany {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.usersCompanys)
    user: User;

    @ManyToOne(() => Companys, company => company.usersCompanys)
    company: Companys;

    // @ManyToOne(() => Role, roles => roles.role)
    // roles: Role;
}