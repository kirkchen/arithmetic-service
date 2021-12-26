import { OperatorAssociativity } from './OperatorAssociativity';

export interface IOperator {
  symbol: string;

  precedence: number;

  associativity: OperatorAssociativity;

  execute: (a: number, b: number) => number;
}
