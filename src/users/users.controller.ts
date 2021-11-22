import { Controller, UseGuards, Delete, Param, Post, Get, Body, Req, ClassSerializerInterceptor } from '@nestjs/common';
import { UploadedFile, UseInterceptors } from '@nestjs/common';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiResponse, ApiOperation, ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersService } from './users.service';
import { UsersResponseDto } from '../dto/get.users.response';
import { GetUserResponseDto } from '../dto/get.user.response';
import { fileFilter } from '../common/helper/file-filter.helper';
import { Number } from 'aws-sdk/clients/iot';

@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('users')
@Controller('/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get('/hello')
    getHello(): string {
        return this.usersService.getHello();
    }

    @Get()
    @ApiOperation({ summary: 'Get all users' })
    @ApiBearerAuth()
    @ApiResponse({
        status: 200,
        description: 'Get all users',
        type: UsersResponseDto,
        isArray: true,
    })
    getAll(): Promise<UsersResponseDto[]> {
        return this.usersService.findAll();
    }

    @ApiBearerAuth()
    @Get('/:id')
    @ApiOperation({ summary: 'Get user' })
    @ApiResponse({
        status: 404,
        description: 'User not found',
    })
    @ApiResponse({ status: 200, description: '' })
    async getUser(@Param('id') id: number, @Req() req): Promise<any> {
        return this.usersService.getUser(id);
    }

    @ApiBearerAuth()
    @Delete('/:id')
    @ApiOperation({ summary: 'Delete user' })
    @ApiResponse({
        status: 404,
        description: 'User not found',
    })
    @ApiResponse({ status: 200, description: '' })
    async delete(@Param('id') id: string): Promise<void> {
        return await this.usersService.remove(id);
    }

    @ApiBearerAuth()
    @UseInterceptors(FileInterceptor('file', {
        limits: {
            fileSize: 1024 * 1024,
        },
        fileFilter
    }))
    @Post('/upload')
    async uploadFile(@Body() body: String,
        @UploadedFile() file: Express.Multer.File,
        @Req() req
    ) {
        const pathFile = await this.usersService.changeAvatar(file, req.user.email);
        return pathFile;
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Add company to user' })
    @Get('/company-add/:id')
    @ApiResponse({
        status: 200,
        description: 'company is created',
    })
    async userAddCompany(@Param('id') id: number, @Req() req): Promise<void> {
        const { userId } = req.user;
        console.log('userId: ', userId);
        await this.usersService.getUserCompany(id, 16);
        return await this.usersService.addCompany(id, userId);
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Remove company from user' })
    @Get('/company-delete/:id')
    @ApiResponse({
        status: 200,
        description: 'company is created',
    })
    async userDeleteCompany(@Param('id') id: number, @Req() req): Promise<void> {
        const { userId } = req.user;
        console.log('userId: ', userId);
        // return await this.usersService.removeCompany(id, userId);
    }
    

}
