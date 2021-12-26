import { Injectable } from '@nestjs/common';
import {
  both,
  complement,
  concat,
  equals,
  filter,
  is,
  join,
  map,
  pipe,
  replace,
  split,
} from 'ramda';
import { IOperator, OperatorAssociativity, Operators } from '../operators';

const isNumeric = pipe(Number, both(is(Number), complement(equals(NaN))));

@Injectable()
export class ExpressionParser {
  constructor(private readonly operators: Operators) {}

  private parseExpressionToArray(expression: string): string[] {
    return pipe(
      replace(/\s+/g, ''),
      split(
        pipe(
          map<IOperator, string>((i) => i.symbol),
          concat(['(', ')']),
          map<string, string>(concat('\\')),
          join(''),
          (splitters) => new RegExp(`([${splitters}])`, 'g'),
        )(this.operators.getAllOperators()),
      ),
      filter((i) => !!i),
    )(expression);
  }

  parse(expression: string): string[] {
    const tokens = this.parseExpressionToArray(expression);

    const output = [];
    const operatorStack = [];
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];

      if (isNumeric(token)) {
        output.push(token);
        continue;
      }

      const operator = this.operators.getOperator(token);
      if (operator) {
        let previousOperator = this.operators.getOperator(
          operatorStack[operatorStack.length - 1],
        );
        while (
          previousOperator &&
          ((operator.associativity === OperatorAssociativity.Left &&
            operator.precedence <= previousOperator.precedence) ||
            (operator.associativity === OperatorAssociativity.Right &&
              operator.precedence < previousOperator.precedence))
        ) {
          output.push(operatorStack.pop());
          previousOperator = this.operators.getOperator(
            operatorStack[operatorStack.length - 1],
          );
        }

        operatorStack.push(operator.symbol);
      } else if (token === '(') {
        operatorStack.push(token);
      } else if (token === ')') {
        while (operatorStack[operatorStack.length - 1] !== '(') {
          output.push(operatorStack.pop());
        }
        operatorStack.pop();
      }
    }

    while (operatorStack.length > 0) {
      output.push(operatorStack.pop());
    }

    return output;
  }
}
