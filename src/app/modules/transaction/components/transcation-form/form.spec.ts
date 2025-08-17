import {Form} from './form';
import {FormBuilder, Validators} from '@angular/forms';

describe('Form', () => {
  let form: Form;

  beforeEach(() => {
    form = new Form(new FormBuilder())
  })

  it('when input type changed to `despesa`, the input category should be required', () => {
    const jasmineSpyValueChanges: jasmine.Spy = spyOn(form.controls.category, 'setValidators');
    const errors = form.getControl('category').errors;
    expect(errors).toEqual(null);

    form.getControl('type').setValue('despesa');

    expect(jasmineSpyValueChanges).toHaveBeenCalledWith([Validators.required])
  });

  it('when input type changed to diferent value `despesa`, the input category should be required', () => {
    const jasmineSpyValueChanges: jasmine.Spy = spyOn(form.controls.category, 'clearValidators');
    const errors = form.getControl('category').errors;
    expect(errors).toEqual(null);

    form.getControl('type').setValue('receita');

    expect(jasmineSpyValueChanges).toHaveBeenCalledWith()
  });

  it('Return initial values of the model', () => {
    const initialValue = form.getInitialValues();

    expect(initialValue).toEqual({
      description: '',
      amount: 0,
      type: 'receita',
      date: '',
      category: null,
      notes: ''
    })
  })

  it('should have notes field in form controls', () => {
    expect(form.controls.notes).toBeDefined();
    expect(form.getControl('notes').value).toBe('');
  })

  it('should include notes field when getting form value', () => {
    form.patch({ notes: 'Test note' });
    const formValue = form.value;
    
    expect(formValue.notes).toBe('Test note');
  })
})
