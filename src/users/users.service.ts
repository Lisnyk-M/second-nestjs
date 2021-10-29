import { Injectable, NotFoundException, HttpException, HttpStatus, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {ConfigService} from '@nestjs/config';

import { S3Client } from "@aws-sdk/client-s3";  //aws.docs
import * as AWS from 'aws-sdk';
import { PutObjectCommand, GetObjectCommand, CreateBucketCommand } from "@aws-sdk/client-s3";

import { CreateUserDto } from './create-user.dto';
import { User } from './user.entity';
import { GetUserResponseDto } from 'src/dto/get.user.response';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private configService: ConfigService
    ) { }

    getHello(): string {
        return 'Hello World!';
    }

    async findAll(): Promise<User[]> {
        const users = await this.usersRepository.find();
        const filteredUsers = users.map(user => {
            delete user.password;
            return user;
        })
        return filteredUsers;
    }

    findOne(email: string): Promise<User> {
        return this.usersRepository.findOne(email);
    }

    findByEmail(email: string): Promise<User> {
        return this.usersRepository.findOne({ email });
    }

    async remove(id: string): Promise<any> {
        return await this.usersRepository.delete(id);
    }

    async save(createUserDto: CreateUserDto): Promise<User> {
        return this.usersRepository.save(createUserDto);
    }

    async update(object: any): Promise<any> {
        this.usersRepository.save(object);
    }

    async getUser(id: string): Promise<any> {
        const user = await this.usersRepository.findOne(id);

        if (!user) {
            throw new NotFoundException();
        }
        const getUserResponseDto = new GetUserResponseDto();
        getUserResponseDto.id = id;
        getUserResponseDto.email = user.email;

        return getUserResponseDto;
    }

    getS3() {
        const config = {
            accessKeyId: this.configService.get<string>('accessKeyId'),
            secretAccessKey: this.configService.get<string>('secretAccessKey'),
            region: this.configService.get<string>('REGION'),
            sslEnabled: false,
            s3ForcePathStyle: true
        };

        return new AWS.S3(config);
    }

    async upload(file, email) {
        if (!file) {
            throw new HttpException('file did not load', HttpStatus.BAD_REQUEST);
        }
        
        const BUCKET_S3 = this.configService.get<string>('BUCKET_S3');
        const REGION = this.configService.get<string>('REGION');
        const { originalname } = file;
        const extention = path.extname(originalname);
        const findUser = await this.findByEmail(email);

        if (!findUser) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND)
        }

        const backetPathFile = `https://${BUCKET_S3}.s3.${REGION}.amazonaws.com/`;
        const uniqueFileName = uuidv4();
        const fullFileName = backetPathFile + uniqueFileName + extention;
        const uniqueWithExt = uniqueFileName + extention;
        const uploaded = await this.uploadS3(file.buffer, BUCKET_S3, uniqueWithExt);
        if (!uploaded) {
            throw new HttpException('Error upload', HttpStatus.NOT_FOUND);
        }
        await this.usersRepository.update({ email }, { filename: uniqueWithExt });
        
        return { fullFileName };
    }

    async uploadS3(file, bucket, name) {
        const s3 = this.getS3();
        const params = {
            Bucket: bucket,
            Key: String(name),
            Body: file,
            ContentType: 'image/jpeg'
        };
        return new Promise((resolve, reject) => {
            s3.upload((params), (err, data) => {
                if (err) {
                    return reject(err.message);
                }
                return resolve(data);
            });

        });
    }
}
