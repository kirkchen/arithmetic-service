import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':expression')
  calculate(@Param('expression') expression: string): string {
    // Get the expression from the path param
    // Use the calculator service to calculate the answer
    return 'Not implemented yet';
  }
}
