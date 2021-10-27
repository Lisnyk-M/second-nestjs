import { Entity } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class LoginUserResponseDto {
    @ApiProperty({ example: 'user logined successfully', description: 'message' })
    message: 'user created successfully';

    @ApiProperty({
        example: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUiLCJpYXQiOjE2MzQ1NjQ2MDIsImV4cCI6MTYzNDczNzQwMn0.8Trq7PPmPi8JZVDk2NWTfE9RpRuwxhLmQ5AQ083NGro`,
        description: 'message'
    })
    token: string
}