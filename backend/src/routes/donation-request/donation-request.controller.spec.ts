import { Test, TestingModule } from '@nestjs/testing';
import { DonationRequestController } from './donation-request.controller';

describe('DonationRequestController', () => {
  let controller: DonationRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DonationRequestController],
    }).compile();

    controller = module.get<DonationRequestController>(DonationRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
