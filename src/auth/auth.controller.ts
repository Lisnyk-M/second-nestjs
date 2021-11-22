import { Controller } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Post, Body } from '@nestjs/common';
import { CreateUserDto } from '../users/create-user.dto';
import {CreateUserResponseDto} from '../dto/create.user.response';
import {LoginUserResponseDto} from '../dto/login.user.response';
import { User } from '../users/user.entity';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Post('/register')
    @ApiOperation({ summary: 'create user' })
    @ApiBody({
        description: 'body contain',
        type: User,        
    })
    @ApiResponse({
        status: 201,
        description: 'create user',
        type: CreateUserResponseDto,
    })
    @ApiResponse({ status: 401, description: 'User allready in database.' })
    async create(@Body() createUserDto: CreateUserDto): Promise<object> {
        const resultSave = await this.authService.save(createUserDto);
        return resultSave;
    }

    @Post('/login')
    @ApiOperation({ summary: 'login user' })
    @ApiBody({
        description: 'body contain',
        type: User,
    })
    @ApiResponse({
        status: 201,
        description: 'create user',
        type: LoginUserResponseDto,        
    })
    @ApiResponse({ status: 404, description: 'User not found.' })
    async login(@Body() createUserDto: CreateUserDto): Promise<any> {
        // console.log('createUserDto: ', createUserDto);
        const loginedUser = await this.authService.login(createUserDto);
        return loginedUser;
    }
    
}
