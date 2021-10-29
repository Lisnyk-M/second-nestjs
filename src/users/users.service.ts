import { Injectable, NotFoundException, HttpException, HttpStatus, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';

import { S3Client } from "@aws-sdk/client-s3";  //aws.docs
import * as AWS from 'aws-sdk';
import { PutObjectCommand, GetObjectCommand, CreateBucketCommand } from "@aws-sdk/client-s3";

import { CreateUserDto } from './create-user.dto';
import { User } from './user.entity';
import { GetUserResponseDto } from 'src/dto/get.user.response';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import {appConfig} from '../common/helper/config.aws';

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
        return this.usersRepository.find();
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

        return user;
    }

    getS3() {
        this.configService.get('INVITATION_TOKEN_HOURS_DURATION');
        return new AWS.S3(appConfig());
    }

    getName(file) {
        const BUCKET_S3 = this.configService.get('BUCKET_S3');
        const REGION = this.configService.get('REGION');
        const { originalname } = file;
        const backetPathFile = `https://${BUCKET_S3}.s3.${REGION}.amazonaws.com/`;
        const uniqueFileName = uuidv4() + path.extname(originalname);
        const fullFileName = backetPathFile + uniqueFileName;

        return { uniqueFileName, fullFileName, BUCKET_S3 };
    }

    async changeAvatar(file, email) {
        const { uniqueFileName, fullFileName, BUCKET_S3 } = this.getName(file);
        if (!file) {
            throw new HttpException('file did not load', HttpStatus.BAD_REQUEST);
        }

        const findUser = await this.findByEmail(email);
        if (!findUser) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        const uploaded = await this.uploadS3(file.buffer, BUCKET_S3, uniqueFileName);
        if (!uploaded) {
            throw new HttpException('Error upload', HttpStatus.NOT_FOUND);
        }
        await this.usersRepository.update({ email }, { filename: uniqueFileName });

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
