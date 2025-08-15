import { AbstractControl, ValidationErrors } from '@angular/forms';

export function allowedValuesValidator(allowedValues: string[]): (control: AbstractControl) => ValidationErrors | null {

  return (control: AbstractControl): ValidationErrors | null => {

    if (!control.value) {
      return null;
    }

    const isValueAllowed = allowedValues.includes(control.value);

    return isValueAllowed ? null : { allowedValues: { validOptions: allowedValues, actualValue: control.value } };
  };
}
