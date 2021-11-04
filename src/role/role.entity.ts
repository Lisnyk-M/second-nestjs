import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { UsersCompanyRole } from "src/users-company-role/users-company-role.entity";

export enum UserRole {
    ADMIN = 'admin',
    USER = 'user',
    GHOST = 'guest',
}

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.USER,
    })
    role: UserRole

    @OneToMany(() => UsersCompanyRole, usersCompanyRole => usersCompanyRole.role)
    usersCompanyRoles: UsersCompanyRole[]

    // @OneToMany(() => UsersCompany, usersCompany => usersCompany.company)
    // usersCompanys: UsersCompany[]
}