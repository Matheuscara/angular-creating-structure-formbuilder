import { FormGroup, AbstractControl, ValidationErrors } from '@angular/forms';
import { ErrorType } from './error.enum';

/**
 * @class FormBase<T>
 * @description Uma classe abstrata que serve como um template para qualquer formulário do sistema.
 *
 * @template T - Um tipo genérico que representa a interface (o "shape") dos valores do formulário,
 * garantindo forte tipagem em toda a classe.
 */
export abstract class FormBase<T> {
  /** A instância do FormGroup do Angular que esta classe gerencia. */
  form: FormGroup;

  /**
   * @constructor
   * @param form A instância do FormGroup, geralmente criada com FormBuilder na classe filha.
   */
  protected constructor(form: FormGroup) {
    this.form = form;
  }

  // --- Métodos Abstratos (a serem implementados pela classe filha) ---

  /**
   * @abstract
   * @description Retorna um objeto com os valores iniciais/padrão para o formulário.
   * É usado principalmente pelo método `reset()` para restaurar o formulário ao seu estado original.
   */
  abstract getInitialValues(): T;

  /**
   * @abstract
   * @description Um Map que define mensagens de erro customizadas específicas para este formulário.
   * A chave é o nome do erro (ex: 'minlength') e o valor é a mensagem de erro.
   * Permite sobrescrever ou adicionar mensagens de erro além das globais definidas em `ErrorType`.
   * @returns {Map<string, string>} Um mapa de erros customizados.
   */
  abstract errors: Map<string, string>;

  /**
   * @abstract
   * @description Encapsula a lógica para validações condicionais.
   * Este método deve ser chamado no construtor da classe filha para "escutar"
   * mudanças em um campo e aplicar/remover validadores em outro.
   * @param values Os valores atuais do formulário, para basear a lógica condicional.
   */
  abstract manageConditionalValidation(values: T): void;


  // --- Getters de Acesso Rápido (Propriedades do FormGroup) ---

  /** Retorna o valor atual de todos os campos do formulário. */
  get value(): T {
    return this.form.value;
  }

  /** Retorna `true` se o formulário inteiro for válido. */
  get valid(): boolean {
    return this.form.valid;
  }

  /** Retorna `true` se o usuário alterou o valor de algum campo. */
  get dirty(): boolean {
    return this.form.dirty;
  }

  /** Retorna `true` se o usuário interagiu (entrou e saiu) de algum campo. */
  get touched(): boolean {
    return this.form.touched;
  }

  /** Retorna um objeto com todas as instâncias de `AbstractControl` do formulário, fortemente tipado. */
  get controls(): { [key in keyof T]: AbstractControl } {
    return this.form.controls as any;
  }


  // --- Métodos de Ação ---

  /** Reseta o formulário para os valores definidos em `getInitialValues()`. */
  reset(): void {
    this.form.reset(this.getInitialValues());
  }

  /**
   * Atualiza parcialmente o valor do formulário.
   * @param values Um objeto contendo apenas os campos a serem atualizados.
   */
  patch(values: Partial<T>): void {
    this.form.patchValue(values);
  }

  /** Marca todos os campos do formulário como "touched", útil para exibir todas as mensagens de erro de uma vez. */
  markAllAsTouched(): void {
    this.form.markAllAsTouched();
  }

  /** Retorna o valor completo do formulário, incluindo campos desabilitados. */
  getRawValue(): T {
    return this.form.getRawValue();
  }


  // --- Lógica de Gerenciamento de Erros ---

  /**
   * Obtém o objeto de erros de um controle específico, mas somente se o campo já foi "tocado".
   * @param controlName O nome do controle a ser verificado.
   * @returns {ValidationErrors | null} O objeto de erros do Angular, ou nulo.
   */
  private getErrorsAfterTouched(controlName: keyof T): ValidationErrors | null {
    const control = this.form.get(controlName as string);
    if (control && control.touched && control.errors) {
      return control.errors;
    }
    return null;
  }

  /**
   * Retorna uma mensagem de erro legível para um campo específico, se aplicável.
   * A lógica prioriza erros customizados definidos no `Map` da classe filha,
   * depois busca em um enum/objeto global (`ErrorType`), e suporta mensagens dinâmicas via funções.
   * @param controlName O nome do controle para o qual a mensagem de erro é necessária.
   * @returns {string} A mensagem de erro formatada, ou uma string vazia se não houver erro a ser exibido.
   */
  public getErrorMessageAfterTouched(controlName: keyof T): string {
    const errors = this.getErrorsAfterTouched(controlName);
    if (!errors) {
      return '';
    }

    const errorKey = Object.keys(errors)[0];
    const errorValue = errors[errorKey]; // Valor associado ao erro (ex: { requiredLength: 5 })

    // Prioridade 1: Erros customizados definidos na classe filha.
    // Prioridade 2: Erros globais definidos em ErrorType.
    const customError = this.errors.get(errorKey) || (ErrorType as any)[errorKey];

    // Suporte para mensagens de erro dinâmicas (ex: "Mínimo de 5 caracteres necessários").
    if (typeof customError === 'function') {
      return customError(errorValue);
    }

    if (typeof customError === 'string') {
      return customError;
    }

    return 'Erro inválido.';
  }


  // --- Métodos Utilitários de Controle ---

  /**
   * Obtém a instância de um `AbstractControl` pelo nome, com verificação de existência.
   * @param control O nome do controle a ser recuperado.
   * @returns {AbstractControl} A instância do controle.
   * @throws {Error} Se o controle não existir no formulário.
   */
  getControl(control: string): AbstractControl {
    if (!this.form.controls[control]) {
      // Usar console.error é preferível a alert em uma base de código.
      console.error(`Controle "${control}" não existe no formulário.`);
      throw new Error(`Controle "${control}" não existe no formulário.`);
    }
    return this.form.controls[control];
  }

  /**
   * Obtém o valor de um `AbstractControl` específico pelo nome.
   * @param control O nome do controle.
   * @returns {any} O valor do controle.
   * @throws {Error} Se o controle não existir no formulário.
   */
  getControlValue(control: string): any {
    return this.getControl(control).value;
  }
}
