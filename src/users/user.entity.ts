import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @ApiProperty({ example: 'myemail@gmail.com', description: 'Email' })
    email: string;

    @Column()
    @ApiProperty({ example: '12jgds_Zhgs', description: 'Password' })
    password: string;

    @Column()
    token: string;

    @Column()
    filename: string;
}