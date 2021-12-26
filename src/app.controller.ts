import { Controller, Get, Param } from '@nestjs/common';
import { CalculatorService } from './calculator/calculator.service';

@Controller()
export class AppController {
  constructor(private readonly calculatorService: CalculatorService) {}

  @Get(':expression')
  calculate(@Param('expression') expression: string): string {
    // Get the expression from the path param
    // Use the calculator service to calculate the answer
    return this.calculatorService.calculate(expression);
  }
}
