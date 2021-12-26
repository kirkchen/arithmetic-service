import { Injectable } from '@nestjs/common';
import { IOperator } from './types/IOperator';
import { OperatorAssociativity } from './types/OperatorAssociativity';

@Injectable()
export class Minus implements IOperator {
  symbol = '-';
  associativity = OperatorAssociativity.Left;
  precedence = 2;

  execute(a, b) {
    return a - b;
  }
}
