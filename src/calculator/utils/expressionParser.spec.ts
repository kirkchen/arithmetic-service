import { Test, TestingModule } from '@nestjs/testing';
import { ExpressionParser } from './expressionParser';
import { Divide, Minus, Multiply, Plus } from '../operators';

const testSet = [
  ['3+5', ['3', '5', '+']],
  ['(3+5)/(4-2)', ['3', '5', '+', '4', '2', '-', '/']],
  [
    '(5*(3+1)-2)*(3+1)',
    ['5', '3', '1', '+', '*', '2', '-', '3', '1', '+', '*'],
  ],
];

describe('ExpressionParser', () => {
  let parser: ExpressionParser;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExpressionParser,
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

    parser = module.get<ExpressionParser>(ExpressionParser);
  });

  it.each(testSet)('converts %s to %s', (expression: string, RPN: string[]) => {
    expect(parser.parse(expression)).toStrictEqual(RPN);
  });
});
