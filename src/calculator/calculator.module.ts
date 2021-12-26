import { Module, Provider } from '@nestjs/common';
import { Divide, Minus, Multiply, Plus, Operators } from './operators';
import { ExpressionParser, RPNCalculator } from './utils';
import { CalculatorService } from './calculator.service';

const operators = [Plus, Minus, Multiply, Divide];

export const OperatorsProvider: Provider = {
  provide: Operators,
  useFactory: (...operators) => new Operators(operators),
  inject: operators,
};

@Module({
  imports: [],
  providers: [
    CalculatorService,
    ExpressionParser,
    RPNCalculator,
    ...operators,
    OperatorsProvider,
  ],
  exports: [
    CalculatorService,
    ExpressionParser,
    RPNCalculator,
    ...operators,
    OperatorsProvider,
  ],
})
export class CalculatorModule {}
