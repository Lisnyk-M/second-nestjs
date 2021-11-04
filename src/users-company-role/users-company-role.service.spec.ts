import { Test, TestingModule } from '@nestjs/testing';
import { UsersCompanyRoleService } from './users-company-role.service';

describe('UsersCompanyRoleService', () => {
  let service: UsersCompanyRoleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersCompanyRoleService],
    }).compile();

    service = module.get<UsersCompanyRoleService>(UsersCompanyRoleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
