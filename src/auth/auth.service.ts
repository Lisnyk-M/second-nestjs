import { Injectable, HttpException, HttpStatus, BadRequestException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/create-user.dto';
import { UsersService } from '../index-services';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        // private usersService: UsersService,
        private readonly jwtService: JwtService
    ) { }

    async validateUser(createUserDto: CreateUserDto): Promise<any> {
        const { email, password } = createUserDto;
        // const user = await this.usersService.findByEmail(email);
        const user = await this.userRepository.findOne({
            where: {
                email
            }
        })
        
        if (!user) {
            throw new HttpException('Email or password is wrong.', HttpStatus.NOT_FOUND);
        }

        const compared = await bcrypt.compare(password, user.password);

        if (!compared) {
            throw new HttpException('Email or password is wrong.', HttpStatus.NOT_FOUND);
        }
        return { ...user };
    }

    async login(createUserDto: CreateUserDto) {
        const user = await this.validateUser(createUserDto);
        // const { id, email} = createUserDto; 

        if (!user) {
            throw new NotFoundException();
        }

        const payload = { email: createUserDto.email, id: user.id };

        return {
            accessToken: this.jwtService.sign(payload),
        };
    }

    async save(createUserDto: CreateUserDto): Promise<object> {
        let result = undefined;
        const SALT_FACTOR = 8;

        // const findUser = await this.usersService.findByEmail(createUserDto.email);
        // if (findUser) {
        //     throw new HttpException('User already in database', HttpStatus.BAD_REQUEST);
        // }

        const hashPassword = await bcrypt.hash(createUserDto.password.toString(), SALT_FACTOR);
        const toSave = { ...createUserDto, token: '', password: hashPassword, filename: '' };
        // result = await this.usersService.save(toSave);

        return { message: "user created successfully" };
    }
}
