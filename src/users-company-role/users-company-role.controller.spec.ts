import { Test, TestingModule } from '@nestjs/testing';
import { UsersCompanyRoleController } from './users-company-role.controller';

describe('UsersCompanyRoleController', () => {
  let controller: UsersCompanyRoleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersCompanyRoleController],
    }).compile();

    controller = module.get<UsersCompanyRoleController>(UsersCompanyRoleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
