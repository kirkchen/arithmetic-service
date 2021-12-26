import { IOperator } from './types/IOperator';
import { find } from 'ramda';

export class Operators {
  constructor(private readonly operators: IOperator[]) {}

  isOperator(token: string) {
    return !!this.getOperator(token);
  }

  getOperator(token: string) {
    return find<IOperator>((i) => i.symbol === token)(this.operators);
  }

  getAllOperators() {
    return this.operators;
  }
}
