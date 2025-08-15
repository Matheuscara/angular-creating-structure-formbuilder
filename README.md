# 🛠️ Formulários Reativos Padronizados no Angular

Uma abordagem opinativa para padronizar formulários reativos — do gerenciamento de estado à exibição de erros — trazendo consistência, clareza e manutenibilidade para projetos Angular.

> "Cansado da anarquia nos formulários Angular? Vamos criar um padrão." — [Matheus Dias](https://www.linkedin.com/in/matheus-dias-cara/)

---

## 📋 Índice

* [Motivação](#-motivação)
* [Arquitetura da Solução](#-arquitetura-da-solução)

  * [1. FormBase](#1-formbase)
  * [2. ErrorType](#2-errortype)
  * [3. Implementação de Exemplo](#3-implementação-de-exemplo)
* [Como Usar](#-como-usar)
* [Benefícios](#-benefícios)
* [Próximos Passos](#-próximos-passos)
* [Autor](#-autor)

---

## 💡 Motivação

Apesar do `FormBuilder` do Angular oferecer uma forma elegante de definir formulários reativos, falta um **padrão consistente** para:

* Lidar com validações condicionais.
* Centralizar exibição de mensagens de erro.
* Padronizar reset e marcação de campos como tocados.

Isso leva a **inconsistências** e **dificuldade de manutenção** em projetos grandes.
A proposta deste repositório é criar **uma camada de abstração intermediária** que resolva esses problemas.

---

## 🏗 Arquitetura da Solução

A solução se apoia em **3 pilares**:

### 1. **FormBase**

Classe abstrata que serve como contrato para todos os formulários:

* Define métodos obrigatórios (`getInitialValues`, `errors`, `manageConditionalValidation`).
* Centraliza lógica de reset, marcação de campos e gerenciamento de erros.
* Usa **Generics** para tipagem forte.

### 2. **ErrorType**

Dicionário global de mensagens de erro:

* Mapeia chaves de erro do Angular (`required`, `minlength`, etc.) para mensagens amigáveis.
* Suporta **mensagens dinâmicas** via funções.
* Pode ser sobrescrito por cada formulário específico.

### 3. **Implementação de Exemplo — TransactionForm**

Demonstra como criar um formulário real seguindo o padrão:

* Aplica validação condicional para o campo `category`.
* Isola toda a lógica de negócio do componente.
* Facilita manutenção e legibilidade.

---

## 🚀 Como Usar

1. **Criar um novo formulário**

```ts
export class MyForm extends FormBase<MyFormValues> {
  override errors = new Map<string, string>();

  override getInitialValues(): MyFormValues {
    return { field1: '', field2: 0 };
  }

  override manageConditionalValidation(): void {
    // Lógica condicional de validação aqui
  }
}
```

2. **Usar no componente**

```ts
constructor(private fb: FormBuilder) {
  this.form = new MyForm(fb);
  this.formGroup = this.form.form;
}
```

3. **Exibir erros no template**

```html
<app-input
  label="Campo"
  formControlName="field1"
  [control]="form.controls.field1"
  [errorMessage]="form.getErrorMessageAfterTouched('field1')"
></app-input>
```

---

## ✅ Benefícios

* **Consistência**: Todos os formulários seguem a mesma estrutura.
* **Tipagem Forte**: Menos erros em tempo de desenvolvimento.
* **Manutenibilidade**: Lógica de negócio separada da camada visual.
* **Reutilização**: `FormBase` e `ErrorType` são compartilhados em todo o projeto.

---

## 📅 Próximos Passos

* [ ] Adicionar testes unitários para `FormBase`.
* [ ] Criar exemplos para formulários complexos (com arrays e nested groups).
* [ ] Implementar suporte para **Angular Signals** no gerenciamento de estado.

---

## 👨‍💻 Autor

**Matheus Dias**
[LinkedIn](https://www.linkedin.com/in/matheus-dias-cara/) | [Medium](https://medium.com/@matheusdiasdev)
