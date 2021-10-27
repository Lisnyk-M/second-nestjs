import { Entity } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class CreateUserResponseDto {
    @ApiProperty({ example: 'user created successfully', description: 'message' })
    message: 'user created successfully';
}