import { Test, TestingModule } from '@nestjs/testing';
import { RPNCalculator } from './rpnCalculator';
import { CalculatorModule } from '../calculator.module';

const testSet = [
  [['3', '5', '+'], '8'],
  [['3', '5', '+', '4', '2', '-', '/'], '4'],
  [['5', '3', '1', '+', '*', '2', '-', '3', '1', '+', '*'], '72'],
];

describe('RPNCalculator', () => {
  let rpnCalculator: RPNCalculator;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CalculatorModule],
    }).compile();

    rpnCalculator = module.get<RPNCalculator>(RPNCalculator);
  });

  it.each(testSet)(
    'calculates %s and returns %s',
    (tokens: string[], result: string) => {
      expect(rpnCalculator.calculate(tokens)).toStrictEqual(result);
    },
  );
});
