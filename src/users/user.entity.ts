import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose, Transform } from 'class-transformer';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @ApiProperty({ example: 'myemail@gmail.com', description: 'Email' })
    email: string;

    @Column()
    @ApiProperty({ example: '12jgds_Zhgs', description: 'Password' })
    @Exclude()
    password: string;

    @Exclude()
    @Column()
    token: string;

    @Column()
    filename: string;

    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
      }
}