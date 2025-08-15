/**
 * @fileoverview Centraliza as mensagens de erro padrão para validações de formulários em toda a aplicação.
 *
 * Este objeto (`ErrorType`) funciona como um dicionário que mapeia chaves de erro do Angular
 * (ex: 'required', 'minlength') para mensagens de erro legíveis para o usuário.
 *
 * A principal vantagem desta abordagem é a capacidade de lidar tanto com mensagens estáticas (strings)
 * quanto com mensagens dinâmicas (funções), que podem incorporar valores do próprio erro
 * para fornecer um feedback mais preciso ao usuário.
 */

/**
 * @const ErrorType
 * @description Um registro (Record) que mapeia nomes de erros de validação para suas mensagens correspondentes.
 *
 * - **Chave (string):** O nome do erro retornado pelo validador do Angular
 *  (ex: `Validators.required` retorna um erro com a chave `'required'`).
 * - **Valor (string | function):**
 *   - **string:** Uma mensagem de erro estática e simples.
 *   - **function:** Uma função que recebe o objeto de erro como argumento e retorna uma string formatada.
 *     Isso é usado para erros que contêm informações contextuais, como o comprimento mínimo exigido ou o valor atual.
 *
 * Este objeto é consumido pela classe `FormBase` para traduzir os erros de validação em texto para a UI.
 */
export const ErrorType: Record<string, string | ((error: any) => string)> = {
  // --- Erros Padrão do Angular (Validators) ---

  /** Mensagem para campos obrigatórios que não foram preenchidos. */
  required: 'Este campo é obrigatório.',

  /** Mensagem dinâmica para campos que não atingiram o comprimento mínimo de caracteres. */
  minlength: (error: { requiredLength: number, actualLength: number }) =>
    `O comprimento mínimo é de ${error.requiredLength} caracteres. Você digitou ${error.actualLength}.`,

  /** Mensagem dinâmica para campos que excederam o comprimento máximo de caracteres. */
  maxlength: (error: { requiredLength: number, actualLength: number }) =>
    `O comprimento máximo é de ${error.requiredLength} caracteres. Você digitou ${error.actualLength}.`,

  /** Mensagem dinâmica para campos numéricos cujo valor é menor que o mínimo permitido. */
  min: (error: { min: number, actual: number }) =>
    `O valor não pode ser menor que ${error.min}. Você digitou ${error.actual}.`,

  /** Mensagem dinâmica para campos numéricos cujo valor é maior que o máximo permitido. */
  max: (error: { max: number, actual: number }) =>
    `O valor não pode ser maior que ${error.max}. Você digitou ${error.actual}.`,

  /** Mensagem para campos que deveriam conter um e-mail, mas o formato é inválido. */
  email: 'Por favor, insira um endereço de e-mail válido.',

  /** Mensagem para campos que não correspondem a uma expressão regular (pattern) definida. */
  pattern: `O valor não corresponde ao padrão exigido.`,

  /** Mensagem genérica para validadores nulos ou erros inesperados. */
  nullValidator: 'Valor inválido.',

  /** Mensagem para validadores que comparam dois campos e encontram uma divergência (ex: confirmação de senha). */
  mismatch: 'Os campos não coincidem.',

  /** Mensagem para um validador customizado que restringe os valores permitidos em um campo. */
  allowedValues: 'Este valor não é permitido.',

  // --- Erros de Validadores Customizados ---

  // Adicione aqui outras mensagens para seus validadores customizados...
};
