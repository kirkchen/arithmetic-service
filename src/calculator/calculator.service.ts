import { Injectable } from '@nestjs/common';
import { ExpressionParser, RPNCalculator } from './utils';

@Injectable()
export class CalculatorService {
  constructor(
    private readonly expressionParser: ExpressionParser,
    private readonly rpnCalculator: RPNCalculator,
  ) {}

  calculate(expression: string): string {
    const rpn = this.expressionParser.parse(expression);

    return this.rpnCalculator.calculate(rpn);
  }
}
