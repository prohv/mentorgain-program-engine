import { Test, TestingModule } from '@nestjs/testing';
import { ProfileController } from './app.controller';
import { AppService } from './app.service';

describe('ProfileController', () => {
  let profileController: ProfileController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProfileController],
      providers: [AppService],
    }).compile();

    profileController = app.get<ProfileController>(ProfileController);
  });


  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(profileController.getProfile({ id: '1', email: 'test@example.com', role: 'user' })).toBeDefined();
    });
  });
});
