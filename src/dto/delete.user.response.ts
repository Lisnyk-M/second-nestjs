import { Entity } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class DeleteUserResponseDto {
    @ApiProperty({ example: 'user created successfully', description: 'User not found' })
    message: string;
}