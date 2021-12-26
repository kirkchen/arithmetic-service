import { Inject } from '@nestjs/common';
import { IOperator } from '../operators';
import { find } from 'ramda';

export class RPNCalculator {
  constructor(@Inject('Operators') private readonly operators: IOperator[]) {}

  private getOperator(token: string) {
    return find<IOperator>((i) => i.symbol === token)(this.operators);
  }

  calculate(tokens: string[]): string {
    tokens = tokens.reverse();
    const stack = [];

    while (tokens.length > 0) {
      const a = tokens.pop();

      if (!this.getOperator(a)) {
        stack.push(a);
      } else {
        // not enough values on stack
        if (stack.length < 2) {
          return;
        } else {
          const c = Number(stack.pop());
          const b = Number(stack.pop());

          stack.push(this.getOperator(a).execute(b, c));
        }
      }
    }

    if (stack.length === 1) {
      return stack.pop().toString();
    }

    throw new Error('Unexpected error');
  }
}
