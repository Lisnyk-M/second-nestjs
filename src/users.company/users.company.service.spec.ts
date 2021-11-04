import { Test, TestingModule } from '@nestjs/testing';
import { UsersCompanyService } from './users.company.service';

describe('Users.CompanyService', () => {
  let service: UsersCompanyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersCompanyService],
    }).compile();

    service = module.get<UsersCompanyService>(UsersCompanyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
