import { Companys } from "src/company/company.entity";
import { Role } from "src/role/role.entity";
import { User } from "src/users/user.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UsersCompanyRole {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.usersCompanyRoles)
    user: User;

    @ManyToOne(() => Companys, company => company.usersCompanyRoles)
    company: Companys;

    @ManyToOne(() => Role, role => role.usersCompanyRoles)
    role: Role;

       // @ManyToOne(() => Role, roles => roles.role)
    // roles: Role;
}