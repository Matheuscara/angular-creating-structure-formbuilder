import { ComponentFixture, TestBed } from '@angular/core/testing';
import {Component, provideZonelessChangeDetection} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { Input } from './input';

/**
 * @class TestHostComponent
 * @description Um componente "hospedeiro" criado exclusivamente para os testes.
 *
 * Ele simula o ambiente real onde o `app-input` será utilizado, contendo um
 * `formGroup` e vinculando o `app-input` a um `formControlName`. Isso é crucial
 * para testar a integração com a API de formulários do Angular (ControlValueAccessor).
 */
@Component({
  standalone: true,
  imports: [
    Input,
    ReactiveFormsModule
  ],
  template: `
    <form [formGroup]="form">
      <app-input
        label="Campo de Teste"
        id="test-input"
        errorMessage="Mensagem de erro"
        formControlName="testControl"
        [control]="form.get('testControl')!"
      ></app-input>
    </form>
  `,
})
class TestHostComponent {
  form = new FormGroup({
    testControl: new FormControl('Inicial'),
  });
}

describe('InputComponent', () => {
  let hostComponent: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let inputElement: HTMLInputElement;
  let testControl: FormControl;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();

    // Cria o componente hospedeiro e obtém o "fixture" para interagir com ele.
    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;

    // Obtém referências diretas para o FormControl e o elemento <input> nativo.
    testControl = hostComponent.form.get('testControl') as FormControl;
    inputElement = fixture.debugElement.query(By.css('input')).nativeElement;

    // Dispara o ciclo de detecção de mudanças inicial para renderizar o componente.
    await fixture.whenStable();
  });

  /**
   * @description Testa se o componente hospedeiro e o componente `Input` foram criados com sucesso.
   */
  it('should create', () => {
    expect(hostComponent).toBeTruthy();
    expect(fixture.debugElement.query(By.directive(Input))).toBeTruthy();
  });

  /**
   * @description Testa a comunicação "View -> Model".
   * Verifica se, ao simular a digitação do usuário no <input>, o valor do FormControl é atualizado.
   */
  it('Should update the value in formControl', () => {
    const testText = 'test input value';
    inputElement.value = testText;
    inputElement.dispatchEvent(new Event('input')); // Simula o evento de digitação.
    fixture.detectChanges();
    expect(testControl.value).toBe(testText);
  });

  /**
   * @description Testa a propagação do estado "disabled".
   * Verifica se, ao desabilitar o FormControl via código, o elemento <input> no HTML se torna desabilitado.
   */
  it('Input should disable when the control is disabled', async () => {
    expect(testControl.disabled).toBe(false);
    expect(inputElement.disabled).toBe(false);

    testControl.disable();
    await fixture.whenStable();

    expect(testControl.disabled).toBe(true);
    expect(inputElement.disabled).toBe(true);
  });

  /**
   * @description Testa a comunicação "Model -> View".
   * Verifica se, ao alterar o valor do FormControl via código, o valor do <input> no HTML é atualizado.
   */
  it('Should update value input when change in control', async () => {
    const testText = 'test input value';
    testControl.setValue(testText);

    await fixture.whenStable();

    expect(testControl.value).toBe(testText);
  });

  /**
   * @description Testa a propagação do estado "touched".
   * Verifica se, ao simular a perda de foco (blur) do <input>, o FormControl é marcado como "touched".
   */
  it('Should update touched the formControl when the control is changed', () => {
    expect(testControl.touched).toBeFalse();
    inputElement.dispatchEvent(new Event('blur')); // Simula o usuário saindo do campo.
    expect(testControl.touched).toBeTrue();
  });

  /**
   * @description Testa se as propriedades de entrada (`@Input`) são renderizadas corretamente.
   * Verifica se `label`, `id` e `errorMessage` são exibidos no HTML.
   */
  it('Props the input should be same', async () => {
    const labelElement: HTMLLabelElement = fixture.debugElement.query(By.css('label')).nativeElement;
    const errorSpanElement: HTMLSpanElement = fixture.debugElement.query(By.css('.error')).nativeElement;

    await fixture.whenStable();

    expect(labelElement.textContent).toContain('Campo de Teste');
    expect(labelElement.htmlFor).toBe('test-input');
    expect(inputElement.id).toBe('test-input');
    expect(errorSpanElement.textContent).toContain('Mensagem de erro');
  });

  /**
   * @description Testa o ciclo completo de desabilitar e re-habilitar.
   * Garante que o componente responde corretamente a ambas as transições de estado.
   */
  it('should re-enable the input element when the formControl is enabled after being disabled', () => {
    testControl.disable();
    fixture.detectChanges();
    expect(inputElement.disabled).toBe(true);

    testControl.enable();
    fixture.detectChanges();
    expect(inputElement.disabled).toBe(false);
  });

  /**
   * @description Testa a aplicação de classes CSS com base na validade do controle.
   * Verifica se a classe 'valid' é aplicada quando o controle é válido.
   */
  it('should apply the "valid" CSS class when the formControl state is valid', () => {
    // O controle já é válido no estado inicial.
    const inputClasses = fixture.debugElement.query(By.css('input')).nativeElement.classList;
    expect(testControl.valid).toBeTrue();
    expect(inputClasses).toContain('valid');
  });

  /**
   * @description Testa a aplicação de classes CSS com base na invalidade do controle.
   * Verifica se a classe 'invalid' é aplicada quando o controle se torna inválido.
   */
  it('should apply the "invalid" CSS class when the formControl state is invalid', () => {
    // Adiciona um validador e define um valor que o torna inválido.
    testControl.addValidators(Validators.required);
    testControl.setValue(null);
    fixture.detectChanges();

    const inputClasses = fixture.debugElement.query(By.css('input')).nativeElement.classList;
    expect(testControl.invalid).toBeTrue();
    expect(inputClasses).toContain('invalid');
  });
});
