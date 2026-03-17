# Tecnologias utilizadas

* Node.js
* NestJS
* Prisma ORM
* PostgreSQL
* Docker
* Jest (Testes)

---

# Como rodar a aplicação

## 1. Clonar o projeto

```bash
git clone <url-do-repositorio>
cd parking
```
---

## 2. Instalar dependências

```bash
pnpm install
```
---

## 3. Configurar variáveis de ambiente

Crie um arquivo `.env`:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/parking"
ADMIN_EMAIL="systemaadmin@gmail.com"
ADMIN_PASSWORD="system_admin@2025!#"
ADMIN_USERNAME="@@system_admin.2026"

POSTGRES_USER=seu_user
POSTGRES_PASSWORD=sua_pass
POSTGRES_DB="db_parking_api"
POSTGRES_DB_TEST="db_parking_api_test"
```
---

## Subir banco de dados e app

```bash
docker-compose up -d
```

> Isso irá subir um container PostgreSQL na porta 5434

---

## Rodar migrations

```bash
    alterar o DATABASE_URL no arquivo .env selecionando qual DATABASE_URL irá usar(teste, normal), apenas retire o "#" da seleção
    npx prisma migrate dev
    npx prisma generate
```

---

## Rodar seed

```bash
pnpm db:seed
```

---

## Iniciar aplicação

```bash
pnpm start:dev
```

Aplicação disponível em:

```
http://localhost:3002/api.parking/v1
http://localhost:3002/api.parking/v1/docs ---- documetação dos endpoints
```
---

## Rodar testes

```bash
pnpm test
```
---

## Observações sobre testes

* O banco de teste é resetado antes de cada teste
* O seed é executado automaticamente
* Testes são feitos com integração real (API + DB)
* Para facilitar a db de teste é uma db hospedada no neon
---

# Seed do sistema

O seed cria:

* Admin do sistema
* 50 vagas de estacionamento (LIVRE)

---
## 🔹 Documentação

```http
 GET localhost:3002/api.parking/v1/docs
```
---
# Autor

**Emanuel António**

---