import {FormBuilder, Validators} from '@angular/forms';
import {FormBase} from '../../../../core/base/form.base';
import {Subscription} from 'rxjs';
import {allowedValuesValidator} from '../../../../core/validators/form/allowed-values';

interface TransactionFormValues {
  description: string;
  amount: number;
  type: 'receita' | 'despesa';
  date: string;
  category: string | null;
  notes: string;
  priority: string;
}

export class Form extends FormBase<TransactionFormValues> {
  private valueChangesSub: Subscription = new Subscription;

  constructor(private fb: FormBuilder) {
    super(
      fb.group({
        description: ['', [Validators.required]],
        amount: [0, [Validators.required, Validators.min(0.01), Validators.max(10)]],
        type:  ['receita', [Validators.required, allowedValuesValidator(['receita', 'despesa'])]],
        date: ['', [Validators.required]],
        category: [''],
        notes: [''],
        priority: [''],
      }),
    );


    this.manageConditionalValidation();
  }

  override errors = new Map<string, string>();
  override manageConditionalValidation(): void {
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
      category: null,
      notes: '',
      priority: ''
    };
  }

  public destroy(): void {
    this.valueChangesSub.unsubscribe();
  }
}
