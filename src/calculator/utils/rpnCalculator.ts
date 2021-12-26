import { Operators } from '../operators';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RPNCalculator {
  constructor(private readonly operators: Operators) {}

  calculate(tokens: string[]): string {
    tokens = tokens.reverse();
    const stack = [];

    while (tokens.length > 0) {
      const a = tokens.pop();

      if (!this.operators.isOperator(a)) {
        stack.push(a);
      } else {
        // not enough values on stack
        if (stack.length < 2) {
          return;
        } else {
          const c = Number(stack.pop());
          const b = Number(stack.pop());

          stack.push(this.operators.getOperator(a).execute(b, c));
        }
      }
    }

    if (stack.length === 1) {
      return stack.pop().toString();
    }

    throw new Error('Unexpected error');
  }
}
