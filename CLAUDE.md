# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `npm start` or `ng serve`
- **Build for production**: `npm run build` or `ng build`
- **Run tests**: `npm test` or `ng test`
- **Run tests with coverage**: `npm run test:cov`
- **Watch mode build**: `npm run watch`

## Project Architecture

This is an Angular 20 application demonstrating a standardized approach to reactive forms using a base class pattern.

### Core Architecture Components

**FormBase Pattern**: The application implements a standardized form architecture using an abstract `FormBase<T>` class at `src/app/core/base/form.base.ts`. All forms extend this base class which provides:
- Type-safe form handling with generics
- Centralized error management
- Conditional validation support
- Consistent reset/patch operations

**Error Management**: Global error messages are centralized in `src/app/core/base/error.enum.ts` using the `ErrorType` object. This supports both static error messages and dynamic functions that can format error details.

**Custom Validators**: Located in `src/app/core/validators/form/` - includes utilities like `allowedValuesValidator` for restricting field values.

### Directory Structure

```
src/app/
├── core/           # Base classes, validators, shared utilities
├── main/           # App root component and routing
├── modules/        # Feature modules (transaction module)
│   └── transaction/
│       ├── components/  # Feature-specific components
│       └── pages/       # Page-level components
└── widgets/        # Reusable UI components
```

### Form Implementation Pattern

When creating new forms:
1. Extend `FormBase<YourFormInterface>` 
2. Implement required abstract methods: `getInitialValues()`, `errors` Map, `manageConditionalValidation()`
3. Use the custom input component (`app-input`) with `getErrorMessageAfterTouched()` for consistent error display

### Widget Components

The `widgets/` directory contains reusable UI components like the `Input` component which implements `ControlValueAccessor` for seamless integration with reactive forms.

### Testing

- Uses Jasmine and Karma for unit testing
- Test files follow the `.spec.ts` convention
- Coverage reports generated in `./coverage/desafio2angular/`
- Karma configured for headless Chrome testing

### Code Conventions

- Standalone components are used throughout
- TypeScript strict mode enabled
- Portuguese language used for user-facing error messages
- File naming: lowercase with hyphens (kebab-case)
- Class naming: PascalCase

### Language Guidelines

- **Terminal/Communication**: Always use Portuguese when communicating with the user
- **Code**: Always write code, comments, variables, functions, and documentation in English
- **User-facing messages**: Error messages and UI text should be in Portuguese for end users

## Development Guidelines

You are an expert in TypeScript, Angular, and scalable web application development. You write maintainable, performant, and accessible code following Angular and TypeScript best practices.

### TypeScript Best Practices
- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

### Angular Best Practices
- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default.
- Use signals for state management
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images.
  - `NgOptimizedImage` does not work for inline base64 images.

### Components
- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `computed()` for derived state
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in `@Component` decorator
- Prefer inline templates for small components
- Prefer Reactive forms instead of Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead
- DO NOT use `ngStyle`, use `style` bindings instead

### State Management
- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead

### Templates
- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables

### Services
- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Use the `inject()` function instead of constructor injection