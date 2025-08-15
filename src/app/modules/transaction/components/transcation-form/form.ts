import {FormBuilder, Validators, FormControl} from '@angular/forms';
import {BaseForm} from '../../../../core/base/form.base';
import {Subscription} from 'rxjs';

interface TransactionFormValues {
  description: string;
  amount: number;
  type: 'receita' | 'despesa';
  date: string;
  category: string | null;
}

export class Form extends BaseForm<TransactionFormValues> {
  private valueChangesSub: Subscription = new Subscription;

  constructor(private fb: FormBuilder) {
    super(
      fb.group({
        description: ['', [Validators.required]],
        amount: [0, [Validators.required, Validators.min(0.01)]],
        type: new FormControl<'receita' | 'despesa'>('receita',
          {nonNullable: true, validators: Validators.required}),
        date: ['', [Validators.required]],
        category: [''],
      })
    );


    this.manageConditionalValidation();
  }

  private manageConditionalValidation(): void {
    const typeControl = this.controls.type;
    const categoryControl = this.controls.category;

    this.valueChangesSub = typeControl.valueChanges.subscribe(type => {
      if (type === 'despesa') {
        categoryControl.setValidators([Validators.required]);
      } else {
        categoryControl.clearValidators();
      }
      categoryControl.updateValueAndValidity();
    });
  }

  override getInitialValues(): TransactionFormValues {
    return {
      description: '',
      amount: 0,
      type: 'receita',
      date: '',
      category: null
    };
  }

  protected destroy(): void {
    this.valueChangesSub.unsubscribe();
  }
}
