import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const testSet = [
  ['3+5', '8'],
  ['(3+5)/(4-2)', '4'],
  ['(5*(3+1)-2)*(3+1)', '72'],
];

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('#calculate', () => {
    it.each(testSet)(
      'calculates the expression: %s and returns the result: %s',
      (expression: string, result: string) => {
        expect(appController.calculate(expression)).toBe(result);
      },
    );
  });
});
