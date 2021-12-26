import { Test, TestingModule } from '@nestjs/testing';
import { RPNCalculator } from './rpnCalculator';
import { Divide, Minus, Multiply, Plus } from '../operators';

const testSet = [
  [['3', '5', '+'], '8'],
  [['3', '5', '+', '4', '2', '-', '/'], '4'],
  [['5', '3', '1', '+', '*', '2', '-', '3', '1', '+', '*'], '72'],
];

describe('RPNCalculator', () => {
  let rpnCalculator: RPNCalculator;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RPNCalculator,
        Plus,
        Minus,
        Multiply,
        Divide,
        {
          provide: 'Operators',
          useFactory: (plus, minus, multiply, divide) => [
            plus,
            minus,
            multiply,
            divide,
          ],
          inject: [Plus, Minus, Multiply, Divide],
        },
      ],
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
