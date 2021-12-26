import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CalculatorModule } from './calculator/calculator.module';

@Module({
  imports: [CalculatorModule],
  controllers: [AppController],
})
export class AppModule {}
