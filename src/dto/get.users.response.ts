import { ApiProperty } from "@nestjs/swagger";

export class UsersResponseDto {
    @ApiProperty({
        example: 1,
        description: 'user id',
    })
    id: number;

    @ApiProperty({
        example: 'gsregrsdg@gmail.com',
        description: 'email',
    })
    email: string;
}