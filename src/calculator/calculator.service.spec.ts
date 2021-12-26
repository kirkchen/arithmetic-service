import { Test, TestingModule } from '@nestjs/testing';
import { CalculatorService } from './calculator.service';
import { ExpressionParser, RPNCalculator } from './utils';

describe('CalculatorService', () => {
  let service: CalculatorService;
  const expressionParserMock = {
    parse: jest.fn(),
  };
  const rpnCalculatorMock = {
    calculate: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CalculatorService,
        {
          provide: ExpressionParser,
          useValue: expressionParserMock,
        },
        {
          provide: RPNCalculator,
          useValue: rpnCalculatorMock,
        },
      ],
    }).compile();

    service = module.get<CalculatorService>(CalculatorService);
  });

  describe('when parse and execute expression successfully', () => {
    beforeEach(() => {
      expressionParserMock.parse.mockReturnValueOnce(['3', '5', '+']);

      rpnCalculatorMock.calculate.mockReturnValueOnce('8');
    });

    it('returns the result', () => {
      expect(service.calculate('3+5')).toStrictEqual('8');
    });
  });
});
