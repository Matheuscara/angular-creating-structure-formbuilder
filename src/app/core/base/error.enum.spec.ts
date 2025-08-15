import {ErrorType} from './error.enum';

describe('ErrorType', () => {
  it('Should return message error when find a valid key', () => {
    const errorType = ErrorType['required']

    expect(errorType).toBe('Este campo é obrigatório.');
  })

  it('Should return dinamic function parameter when value for minlength ', () => {
    const fnErrorType = ErrorType['minlength'] as (err: any) => string;
    const result = fnErrorType({requiredLength: 5, actualLength: 3});

    expect(result).toBe('O comprimento mínimo é de 5 caracteres. Você digitou 3.');
  })

  it('Should return dinamic function parameter when value for maxlength ', () => {
    const fnErrorType = ErrorType['maxlength'] as (err: any) => string;
    const result = fnErrorType({requiredLength: 5, actualLength: 3});

    expect(result).toBe(`O comprimento máximo é de 5 caracteres. Você digitou 3.`);
  })

  it('Should return dinamic function parameter when value for min ', () => {
    const fnErrorType = ErrorType['min'] as (err: any) => string;
    const result = fnErrorType({min: 5, actual: 3});

    expect(result).toBe(`O valor não pode ser menor que 5. Você digitou 3.`);
  })

  it('Should return dinamic function parameter when value for max ', () => {
    const fnErrorType = ErrorType['max'] as (err: any) => string;
    const result = fnErrorType({max: 5, actual: 3});

    expect(result).toBe(`O valor não pode ser maior que 5. Você digitou 3.`);
  })
})
