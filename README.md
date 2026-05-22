# NEXORA Studio

Business Operating Platform

---

# Overview

NEXORA Studio is an enterprise frontend platform built with React, TypeScript and Webpack, designed around a layered architecture focused on scalability, maintainability and long-term business evolution.

The project follows strict architectural boundaries between:

- Domain
- Application
- Infrastructure
- Presentation

The frontend was designed to support large-scale business systems, including:

- Multi-module administration panels
- Enterprise CRUD management
- Authentication/session orchestration
- URL-driven application state
- Shared UI systems
- Internationalization
- Highly reusable presentation components

---

# Current Foundation

The current frontend foundation already includes:

- React 19
- TypeScript strict mode
- Webpack production pipeline
- ESLint Flat Config
- Layered architecture enforcement
- Jest testing environment
- Alias-based imports
- Husky Git hooks
- Commitlint validation
- Shared component system
- URL-driven filtering/sorting/pagination
- Internationalization infrastructure
- Session persistence architecture
- Enterprise DataGrid system

---

# Tech Stack

## Core

- React
- React DOM
- TypeScript
- Webpack
- Sass Modules
- React Router DOM

---

## Code Quality

- ESLint (Flat Config)
- Prettier
- SonarJS
- Husky
- lint-staged
- Commitlint

---

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
  core/
```

---

# Layer Responsibilities

# Domain Layer

Contains pure business rules and enterprise abstractions.

## Responsibilities

- Entities
- Enums
- Value Objects
- Domain Rules
- Domain Contracts

## Restrictions

The domain layer must never depend on:

- React
- Browser APIs
- Infrastructure
- Application
- HTTP
- Routing

---

# Application Layer

Responsible for business orchestration.

## Responsibilities

- Services
- Requests
- Responses
- Application Flows
- Coordination Logic

## Restrictions

The application layer must not depend on:

- React
- Presentation
- Infrastructure implementations

Only abstractions/contracts are allowed.

---

# Infrastructure Layer

Contains external implementations and adapters.

## Responsibilities

- HTTP Clients
- API Adapters
- Storage Adapters
- Authentication Infrastructure
- External Integrations

---

# Presentation Layer

Responsible for the UI system and user interaction.

## Responsibilities

- React Components
- Layouts
- Pages
- Routing
- UI Composition
- URL State Synchronization

## Restrictions

Presentation must not access infrastructure directly.

All infrastructure communication must happen through the application layer.

---

# Core Layer

Contains global frontend infrastructure shared across all layers.

## Responsibilities

- Internationalization
- Shared Configuration
- Cross-cutting Frontend Utilities
- Global Runtime Behaviors

---

# Architectural Rules

Dependency flow is enforced through ESLint.

Allowed flow:

```txt
presentation → application → domain
infra → application/domain
core → shared runtime support
```

Forbidden examples:

- Presentation importing infrastructure directly
- Domain importing React
- Application importing presentation
- Domain importing HTTP libraries
- Application importing browser APIs

---

# UI Architecture

The frontend follows a reusable enterprise component strategy.

---

# Shared Components

Reusable UI components live inside:

```txt
presentation/shared/components
```

Examples:

- Button
- Input
- Select
- Card
- Table
- DataGrid
- Pagination

---

# Dumb vs Smart Components

The architecture separates responsibilities clearly.

## Dumb Components

Pure rendering components.

Examples:

- Table
- Button
- Card

Characteristics:

- No business rules
- No routing knowledge
- No URL manipulation
- No application orchestration

---

## Smart Components

Behavior-oriented orchestration components.

Examples:

- DataGrid
- Filters
- Session orchestration

Characteristics:

- URL synchronization
- Sorting behavior
- Pagination behavior
- Filter orchestration

---

# URL-Driven State

The frontend uses URL query parameters as the source of truth for page state.

Examples:

```txt
?page=1&pageSize=10&orderBy=Name&desc=false
```

Benefits:

- Persistent navigation state
- Shareable filtered pages
- Browser history support
- Back/forward navigation consistency
- Enterprise admin behavior alignment

---

# DataGrid System

The platform includes a reusable enterprise DataGrid architecture.

## Features

- Sorting
- Pagination
- Filters
- URL synchronization
- Shared table rendering
- Reusable toolbar system

---

## Responsibility Split

### Table

Pure rendering layer.

Responsible only for:

- Rendering rows
- Rendering columns
- Empty state
- Loading state

No business behavior.

---

### DataGrid

Behavior orchestration layer.

Responsible for:

- Sorting
- Pagination
- URL updates
- Table orchestration

---

# Internationalization

The frontend includes a modular i18n system.

## Structure

```txt
core/i18n/
```

Dictionary organization is module-based:

```txt
core/i18n/dictionaries/
  en-US/
    auth.ts
    dashboard.ts
    company.ts
```

Benefits:

- Scalable translations
- Module isolation
- Easier maintenance
- Avoid monolithic dictionary files

---

# Authentication Architecture

The authentication system already supports:

- Session persistence
- Refresh token flow
- SSR-aware session handling
- Cookie-based auth orchestration
- Runtime session recovery

The architecture was designed to support future enterprise SSO flows.

---

# TypeScript Configuration

The project uses:

- Strict typing
- ES Modules
- Alias-based imports
- Bundler module resolution
- Layer-aware path mapping

Example:

```ts
import { Company } from '@domain/entities/core/company';
```

---

# ESLint

The project uses ESLint Flat Config with:

- TypeScript support
- React support
- SonarJS
- Architectural boundaries
- Layer isolation
- Prettier integration

Lint rules are architecture-aware.

---

# Testing Strategy

Current testing infrastructure includes:

- Jest
- ts-jest
- jsdom
- Layer-aware test organization

Example:

```txt
src/application/__tests__/
```

The testing strategy prioritizes:

- Domain isolation
- Service behavior validation
- Integration boundaries
- Runtime stability

---

# Git Workflow

The project uses Husky for workflow enforcement.

---

# Pre-Commit

Executed automatically before commits:

- ESLint
- Staged validation

---

# Commit Validation

Commit messages follow Conventional Commits.

Examples:

```txt
feat: add company datagrid pagination
fix: resolve refresh token retry flow
refactor: split i18n dictionaries by module
```

---

# Pre-Push

Executed automatically before push:

- Tests
- Production build

---

# Scripts

# Development

```bash
yarn dev
```

Starts the local development server.

---

# Production Build

```bash
yarn build
```

Generates the production bundle.

---

# Tests

```bash
yarn test
```

Runs Jest tests.

---

# Watch Tests

```bash
yarn test:watch
```

Runs tests in watch mode.

---

# Coverage

```bash
yarn test:ci
```

Runs tests with coverage.

---

# Lint

```bash
yarn lint
```

Runs ESLint.

---

# Auto Fix

```bash
yarn lint:fix
```

Runs ESLint auto fixes.

---

# Current Status

The frontend foundation is fully operational and already supports enterprise-grade expansion.

Implemented so far:

- Frontend bootstrap
- Layered architecture
- Runtime stabilization
- Shared UI system
- Authentication/session flow
- URL-driven state
- Enterprise DataGrid foundation
- Internationalization system
- Toolchain stabilization
- Git workflow enforcement
- Testing infrastructure
- Architectural boundary enforcement

---

# Long-Term Direction

The architecture was designed to support:

- Large enterprise modules
- Multi-tenant systems
- Advanced permission systems
- SSR integration
- Shared design systems
- Complex business workflows
- High scalability frontend operations

---

# License

MIT License.
