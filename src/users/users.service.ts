import { Injectable, NotFoundException, HttpException, HttpStatus, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { S3Client } from "@aws-sdk/client-s3";
import { PutObjectCommand, GetObjectCommand, CreateBucketCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { CreateUserDto } from './create-user.dto';
import { User } from './user.entity';
import { GetUserResponseDto } from 'src/dto/get.user.response';

const REGION = "eu-west-2";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    getHello(): string {
        return 'Hello World!';
    }

    findAll(): Promise<User[]> {
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
        this.usersRepository.save(object,);
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
        return new S3Client({ region: REGION });
    }

    async upload(file, email) {
        if (!file) {
            throw new HttpException('file did not load', HttpStatus.BAD_REQUEST);
        }
        const { originalname } = file;
        const findUser = await this.findByEmail(email);

        if (!findUser) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND)
        }

        const bucketS3 = 'bucket-my-12345-end';
        const pathFile = `https://${bucketS3}.s3.${REGION}.amazonaws.com/${originalname}`;
        console.log('pathFile: ', pathFile);
        const updated = await this.usersRepository.update({ email }, { filename: pathFile });
        const data = await this.uploadS3(file.buffer, bucketS3, originalname);

        const params = {
            Bucket: bucketS3,
            Key: originalname,
            Body: file.buffer,
        }

        const command = new GetObjectCommand(params);
        const signedUrl = await getSignedUrl(this.getS3(), command, {
            expiresIn: 3600,
        });

        return { pathFile };
    }

    async uploadS3(file, bucket, name) {
        const s3 = this.getS3();
        const params = {
            Bucket: bucket,
            Key: String(name),
            Body: file,
        };
        return new Promise((resolve, reject) => {
            s3.send(new PutObjectCommand(params), (err, data) => {
                if (err) {
                    reject(err.message);
                }
                resolve(data);
            });

        });
    }
}
