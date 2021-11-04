import { Controller, Delete, Get, Param, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersCompanyRoleService } from './users-company-role.service';

@UseGuards(JwtAuthGuard)
@Controller('users-company-role')
export class UsersCompanyRoleController {
    constructor(
        private usersCompanyRoleService: UsersCompanyRoleService
    ) { }

    @ApiBearerAuth()
    @ApiResponse({
        status: 200,
        description: 'company/user/ add role',
        // type: UsersResponseDto,
        // isArray: true,
    })
    @ApiOperation({ summary: 'Add role to user' })
    @Get('/add-role/:companyid/:roleid')
    async addUserRole(
        @Param('companyid') companyId: number,
        @Param('roleid') roleId: number,
        @Req() req
    ): Promise<any> {
        const { userId } = req.user;
        console.log('companyId, roleId: ', companyId, roleId);
        const result = await this.usersCompanyRoleService.addRole(companyId, userId, roleId);
        return result;
    }

    @ApiBearerAuth()
    @ApiResponse({
        status: 200,
        description: 'company/user/ add role',
        // type: UsersResponseDto,
        // isArray: true,
    })
    @ApiOperation({ summary: 'Remove role from user' })
    @Delete('/add-role/:companyid/:roleid')
    async removeUserRole(
        @Param('companyid') companyId: number,
        @Param('roleid') roleId: number,
        @Req() req
    ): Promise<any> {
        const { userId } = req.user;
        console.log('companyId, roleId: ', companyId, roleId);
        const result = await this.usersCompanyRoleService.deleteRole(companyId, userId, roleId);
        return result;
    }
}
