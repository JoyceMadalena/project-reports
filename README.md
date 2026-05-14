# Project Reports

## Sobre o projeto

O Project Reports é uma aplicação web interna desenvolvida para gerenciamento de projetos, equipe e relatórios técnicos.

O sistema foi pensado para ambientes institucionais e equipes que precisam:

- organizar projetos internos;
- controlar acessos por perfil de usuário;
- gerenciar membros da equipe;
- criar relatórios técnicos futuramente em Markdown;
- acompanhar projetos ativos;
- centralizar informações operacionais.

A proposta do sistema é funcionar como uma plataforma administrativa privada, onde apenas usuários autenticados possuem acesso.

---

# Objetivos do projeto

## Objetivo principal

Criar uma plataforma de gerenciamento interno de projetos com autenticação, controle de permissões e organização de relatórios.

---

## Objetivos específicos

- Implementar autenticação de usuários;
- Criar controle de acesso por perfil;
- Permitir gerenciamento da equipe;
- Criar CRUD de projetos;
- Desenvolver estrutura para relatórios em Markdown;
- Criar dashboard administrativo;
- Organizar projetos por usuários e permissões;
- Permitir escalabilidade futura do sistema.

---

# Tecnologias utilizadas

## Frontend

- Next.js 16
- React
- TypeScript
- Tailwind CSS

---

## Backend

- Next.js API Routes
- Prisma ORM
- PostgreSQL

---

## Banco de dados

- PostgreSQL
- Prisma Client
- Prisma Migrate
- Prisma Studio

---

## Segurança e autenticação

- bcrypt
- Cookies de sessão
- Controle de roles

---

## Bibliotecas auxiliares

- lucide-react

---

# Estrutura geral do projeto

```text
src/
 ├── app/
 │    ├── api/
 │    ├── dashboard/
 │    ├── login/
 │    └── page.tsx
 │
 ├── components/
 │    └── team/
 │
 ├── lib/
 │    ├── prisma.ts
 │    └── auth.ts
 │
 └── generated/
      └── prisma/
```

---

# Estrutura das principais rotas

## Autenticação

```text
/login
/api/login
/api/register
/api/me
```

---

## Dashboard

```text
/dashboard
```

---

## Equipe

```text
/dashboard/team
/dashboard/team/new
/dashboard/team/[id]/edit
```

---

## Projetos

```text
/dashboard/projects
/dashboard/projects/new
```

---

# Estrutura do banco de dados

## User

Responsável pelo gerenciamento dos usuários do sistema.

### Campos principais

- id
- name
- email
- password
- role
- createdAt

---

## Project

Responsável pelos projetos cadastrados.

### Campos principais

- id
- name
- slug
- description
- status
- createdAt

---

## Report

Estrutura reservada para relatórios futuros.

### Objetivo

- armazenar relatórios em Markdown;
- relacionar relatórios aos projetos;
- controlar permissões por usuário.

---

# Controle de acesso

O sistema possui controle de permissões por role.

## Roles disponíveis

### ADMIN

Possui acesso total ao sistema.

Pode:

- cadastrar membros;
- editar membros;
- excluir membros;
- criar projetos;
- visualizar equipe;
- gerenciar permissões.

---

### MANAGER

Perfil intermediário.

Pode:

- gerenciar projetos específicos;
- criar relatórios;
- acompanhar projetos.

---

### MEMBER

Perfil básico.

Pode:

- visualizar projetos autorizados;
- acessar relatórios permitidos.

---

# Sistema de autenticação

A autenticação funciona através de:

- validação de email e senha;
- senha criptografada com bcrypt;
- sessão salva em cookie;
- leitura do usuário autenticado via auth.ts.

---

# Funcionalidades implementadas

## Autenticação

- Login funcional;
- Sessão por cookie;
- Validação de usuário;
- Controle de acesso.

---

## Dashboard

- Dashboard inicial;
- Dados reais do banco;
- Quantidade de projetos;
- Quantidade de usuários;
- Quantidade de relatórios.

---

## Equipe

- Listagem de membros;
- Cadastro de membros;
- Edição de membros;
- Exclusão de membros;
- Controle de permissões.

---

## Segurança

- Apenas ADMIN pode gerenciar equipe;
- Usuário não pode excluir a própria conta;
- Sistema impede exclusão do último administrador.

---

## Projetos

- Estrutura inicial da área de projetos;
- API de projetos;
- Página de listagem.

---

# Fluxo atual do sistema

```text
Login
   ↓
Dashboard
   ↓
Projetos
   ↓
Equipe
   ↓
Gerenciamento interno
```

---

# Etapas futuras do projeto

## Projetos

- Criar formulário de novo projeto;
- Editar projetos;
- Excluir projetos;
- Relacionar membros aos projetos.

---

## Relatórios

- Criar editor Markdown;
- Salvar relatórios no banco;
- Renderizar Markdown;
- Controle de acesso por relatório.

---

## Dashboard

- Melhorar métricas;
- Gráficos;
- Indicadores operacionais;
- Timeline de projetos.

---

## Segurança

- Middleware de autenticação;
- Proteção avançada de rotas;
- Persistência robusta de sessão.

---

## UX/UI

- Sidebar administrativa;
- Tema claro/escuro;
- Melhorias responsivas;
- Componentização.

---

# Deploy planejado

## Frontend

- Vercel

---

## Banco de dados

- PostgreSQL persistente
- Neon ou Supabase futuramente

---

# Considerações finais

O Project Reports está sendo desenvolvido como uma plataforma escalável de gerenciamento interno, focada em organização de projetos, permissões de equipe e centralização de relatórios.

A estrutura atual já possui:

- autenticação;
- controle de acesso;
- CRUD parcial;
- integração com banco de dados;
- organização modular;
- base preparada para cresc
