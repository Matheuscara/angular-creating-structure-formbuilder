import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TranscationForm} from './transcation-form';
import {provideZonelessChangeDetection} from '@angular/core';

describe('TranscationForm', () => {
  let component: TranscationForm;
  let fixture: ComponentFixture<TranscationForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranscationForm],
      providers: [provideZonelessChangeDetection()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TranscationForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('SendForm should emit and reset form', () => {
    const spyOnFormEmit = spyOn(component.submitForm, 'emit');
    const spyOnFormReset = spyOn(component.form, 'reset');

    component.sendForm();

    expect(spyOnFormEmit).toHaveBeenCalled();
    expect(spyOnFormReset).toHaveBeenCalled();
  })
});
