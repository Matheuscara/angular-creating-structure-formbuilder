import {Component, OnDestroy, output} from '@angular/core';
import { Form } from './form';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Input} from '../../../../widgets/components/input/input';

@Component({
  selector: 'app-transcation-form',
  imports: [ReactiveFormsModule, Input],
  templateUrl: './transcation-form.html',
  styleUrl: './transcation-form.css'
})
export class TranscationForm implements OnDestroy {
  submitForm = output();

  public form: Form;
  public formGroup: FormGroup;

  constructor(protected fb: FormBuilder) {
    this.form = new Form(fb);
    this.formGroup = this.form.form;
  }

  sendForm() {
    this.submitForm.emit()
    this.form.reset()
  }

  ngOnDestroy(): void {
    this.form.destroy();
  }
}
