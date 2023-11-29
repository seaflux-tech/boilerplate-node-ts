# Prerequisite

Dependency | Version
--- | --- 
**NodeJS** | `v14.16.1`
**Typescript** | `v4.2.4`
**Yarn** | `v1.22.10`

# ENV 

Copy `.env.example` to `.env`, add appropriate values.

# Development environment Setup

## DB Table Creation
Set `DROP_AND_RECREATE_TABLE=true` in `.env` file, it will generate all required tables.

## Seed testing data

`yarn sq db:seed:all`

## Start server

Use `yarn start` to start dev server

# Static Code Analyzer

`yarn lint`