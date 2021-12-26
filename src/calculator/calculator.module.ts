import { Module } from '@nestjs/common';
import { Divide, Minus, Multiply, Plus } from './operators';
import { ExpressionParser, RPNCalculator } from './utils';
import { CalculatorService } from './calculator.service';

@Module({
  imports: [],
  providers: [
    CalculatorService,
    ExpressionParser,
    RPNCalculator,
    Plus,
    Minus,
    Multiply,
    Divide,
    {
      provide: 'Operators',
      useFactory: (...operators) => operators,
      inject: [Plus, Minus, Multiply, Divide],
    },
  ],
  exports: [
    CalculatorService,
    ExpressionParser,
    RPNCalculator,
    Plus,
    Minus,
    Multiply,
    Divide,
    'Operators',
  ],
})
export class CalculatorModule {}
