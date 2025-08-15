import { Component, forwardRef, input } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './input.html',
  styleUrl: './input.css',
  providers: [
    {
      /**
       * @description Provedor que registra este componente como um valor acessível
       * através do ‘token’ NG_VALUE_ACCESSOR.
       *
       * Isso é o que permite ao Angular saber que 'app-input' pode ser usado com
       * diretivas como 'formControlName' e 'ngModel'.
       * 'forwardRef' é usado para resolver uma referência circular, já que a classe 'Input'
       * é referenciada antes de ser totalmente definida.
       * 'multi: true' permite que múltiplos componentes se registrem como 'NG_VALUE_ACCESSOR'.
       */
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Input),
      multi: true,
    },
  ],
})
export class Input implements ControlValueAccessor {
  /** A label a ser exibida acima do campo de input. Obrigatória. */
  label = input.required<string>();

  /** O ID único para o elemento <input> e o atributo 'for' da label. Obrigatório. */
  id = input.required<string>();

  /** A mensagem de erro a ser exibida quando o campo for inválido. Obrigatória. */
  errorMessage = input.required<string>();

  /** O tipo do input HTML (ex: 'text', 'password', 'number'). Padrão é 'text'. */
  type = input<string>('text');

  /** Uma referência ao AbstractControl do formulário para verificar estados como valid/invalid. Obrigatório. */
  control = input.required<AbstractControl>();


  // --- Propriedades Internas do ControlValueAccessor ---

  /** O valor interno do campo de input. */
  value: any;

  /** O estado de desabilitado do campo. */
  disabled = false;

  /**
   * @description Função de callback registrada pelo Angular para notificar sobre mudanças de valor.
   * Inicializada com uma função vazia para evitar erros.
   */
  onChange = (_: any) => {};

  /**
   * @description Função de callback registrada pelo Angular para notificar que o campo foi "tocado" (perdeu o foco).
   * Inicializada com uma função vazia.
   */
  onTouched = () => {};


  // --- Métodos da Interface ControlValueAccessor ---

  /**
   * @description Chamado pelo Angular para escrever um novo valor no elemento. (Model ≥ View)
   * @param obj O novo valor vindo do FormControl.
   */
  writeValue(obj: any): void {
    this.value = obj;
  }

  /**
   * @description Registra a função de callback que deve ser chamada quando o valor do input muda na UI.
   * @param fn A função de callback ((value: any) ≥ void) fornecida pelo Angular.
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /**
   * @description Registra a função de callback que deve ser chamada quando o input perde o foco (blur).
   * @param fn A função de callback (() ≥ void) fornecida pelo Angular.
   */
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
   * @description Chamado pelo Angular quando o estado de "desabilitado" do controle muda.
   * @param isDisabled O novo estado de desabilitado.
   */
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }


  // --- Métodos de Eventos do Template ---

  /**
   * @description Chamado pelo evento (input) do template.
   * Atualiza o valor interno e notifica o Angular sobre a mudança. (View ≥ Model)
   * @param event O evento de input do DOM.
   */
  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value); // Notifica o Angular que o valor mudou.
  }

  /**
   * @description Chamado pelo evento (blur) do template.
   * Notifica o Angular que o campo foi "tocado".
   */
  onBlur(): void {
    this.onTouched();
  }
}
