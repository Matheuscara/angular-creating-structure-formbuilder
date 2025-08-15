import { FormControl } from '@angular/forms';
import {allowedValuesValidator} from './allowed-values';

describe('allowedValuesValidator', () => {
  const valoresPermitidos = ['receita', 'despesa'];
  const validate = allowedValuesValidator(valoresPermitidos);

  it('should return null (no error) if the control value is in the allowed list', () => {
    const control = new FormControl('receita');

    const resultado = validate(control);

    expect(resultado).toBeNull();
  });

  it('should return an error object if the control value is NOT in the allowed list', () => {
    const valorInvalido = 'investimento';
    const control = new FormControl(valorInvalido);

    const resultado = validate(control);

    expect(resultado).not.toBeNull();

    expect(resultado?.['allowedValues']).toEqual({
      validOptions: valoresPermitidos,
      actualValue: valorInvalido
    });
  });

  it('should return null (no error) if the control value is null', () => {
    const control = new FormControl(null);

    const resultado = validate(control);

    expect(resultado).toBeNull();
  });

  it('should return null (no error) if the control value is an empty string', () => {
    const control = new FormControl('');

    const resultado = validate(control);

    expect(resultado).toBeNull();
  });

});
