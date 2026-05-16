# NEXORA Studio

Business Operating Platform

---

## Overview

NEXORA Studio is a frontend platform built with React, TypeScript and Webpack, designed with a layered architecture focused on scalability, maintainability and long-term enterprise growth.

The project structure follows clear domain boundaries between business rules, application orchestration, infrastructure and presentation layers.

At the current stage, the project already includes:

- Modern TypeScript setup
- React 19 support
- Webpack production pipeline
- ESLint Flat Config
- Jest testing environment
- Husky Git hooks
- Commitlint validation
- Layer isolation via lint rules
- Alias-based module resolution
- Architectural enforcement between layers

---

# Tech Stack

## Core

- React
- React DOM
- TypeScript
- Webpack
- Sass

## Code Quality

- ESLint (Flat Config)
- Prettier
- SonarJS
- Husky
- lint-staged
- Commitlint

## Testing

- Jest
- ts-jest
- Testing Library

---

# Project Structure

```txt
src/
  domain/
  application/
  infra/
  presentation/
```

---

# Architecture

## Domain Layer

Contains pure business rules and domain abstractions.

### Responsibilities

- Entities
- Value Objects
- Business Rules
- Domain Contracts

### Restrictions

The domain layer must not depend on:

- React
- Browser APIs
- Infrastructure
- Application layer

---

## Application Layer

Responsible for orchestrating business flows.

### Responsibilities

- Use Cases
- Services
- Application Rules
- Domain Coordination

### Restrictions

The application layer must not depend on:

- React
- Presentation layer
- Infrastructure implementations

---

## Infrastructure Layer

Contains external implementations and adapters.

### Responsibilities

- HTTP Clients
- Storage
- API Integration
- External Services
- Adapters

---

## Presentation Layer

Responsible for the user interface.

### Responsibilities

- React Components
- Pages
- Hooks
- UI Composition
- Routing

### Restrictions

The presentation layer must not access infrastructure directly.

Infrastructure access should happen through the application layer.

---

# Architectural Rules

The project enforces dependency boundaries using ESLint.

Allowed dependency flow:

```txt
presentation → application → domain
infra → application/domain
```

Forbidden examples:

- Presentation importing infrastructure directly
- Domain importing React
- Application importing presentation
- Domain importing infrastructure

---

# Scripts

## Development

```bash
yarn dev
```

Starts the local development server.

---

## Production Build

```bash
yarn build
```

Generates the production bundle.

---

## Run Tests

```bash
yarn test
```

Runs Jest tests.

---

## Watch Tests

```bash
yarn test:watch
```

Runs tests in watch mode.

---

## Coverage

```bash
yarn test:ci
```

Runs tests with coverage report.

---

## Lint

```bash
yarn lint
```

Runs ESLint.

---

## Auto Fix Lint

```bash
yarn lint:fix
```

Runs ESLint with automatic fixes.

---

# Git Hooks

The project uses Husky for Git workflow enforcement.

## Pre-Commit

Executed automatically before commits:

- ESLint
- Staged validation

## Commit Message Validation

Commit messages are validated using Conventional Commits.

Examples:

```txt
feat: add authentication flow
fix: resolve session refresh issue
chore: configure jest and husky
```

## Pre-Push

Executed automatically before push:

- Tests
- Production build

---

# TypeScript Configuration

The project uses:

- ES Modules
- Bundler module resolution
- Alias-based imports
- Layered path mapping

Example:

```ts
import { User } from '@domain/entities/user';
```

---

# ESLint

The project uses ESLint Flat Config with:

- TypeScript support
- React support
- SonarJS
- Architectural boundaries
- Prettier integration

The lint configuration is divided by architectural layer.

---

# Testing Strategy

Current testing setup includes:

- Jest
- ts-jest
- jsdom environment
- Layer-aware test organization

Example structure:

```txt
src/application/__tests__/
```

---

# Current Status

The project foundation is fully operational.

Implemented so far:

- Frontend bootstrap
- Toolchain stabilization
- Build pipeline
- Testing environment
- Git workflow enforcement
- Layered architecture
- Runtime alignment between tooling

---

# License

MIT License.
