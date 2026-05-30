# ASTRO — E-commerce de Hardware

> Plataforma de e-commerce especializada em hardware e componentes de informática, desenvolvida com React.js no front-end e Node.js no back-end.

---

## Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias](#tecnologias)
- [Funcionalidades](#funcionalidades)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Como Rodar Localmente](#como-rodar-localmente)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Rotas da API](#rotas-da-api)
- [Autor](#autor)

---

## Sobre o Projeto

A **ASTRO** é uma aplicação full-stack de e-commerce voltada para venda de componentes de hardware, como placas de vídeo e processadores. O projeto conta com autenticação de usuários (CPF e CNPJ), carrinho de compras, lista de desejos, gerenciamento de pedidos e endereços.

---

## Tecnologias

### Front-end
- [React.js 19](https://react.dev/)
- [React Router DOM 7](https://reactrouter.com/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- [React Hook Form](https://react-hook-form.com/)
- [Ionic React](https://ionicframework.com/docs/react) + [React Icons](https://react-icons.github.io/react-icons/)

### Back-end
- [Node.js](https://nodejs.org/)
- [Express 5](https://expressjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [SQLite](https://www.sqlite.org/) (desenvolvimento)
- [JWT](https://jwt.io/) — autenticação
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js) — hash de senhas
- [dotenv](https://github.com/motdotla/dotenv)
- [Nodemon](https://nodemon.io/) (desenvolvimento)

---

## Funcionalidades

- [x] Cadastro de usuário (Pessoa Física — CPF e Pessoa Jurídica — CNPJ)
- [x] Login e autenticação com JWT
- [x] Listagem de produtos por categoria
- [x] Carrinho de compras
- [x] Lista de desejos
- [x] Gerenciamento de pedidos
- [x] Gerenciamento de endereços
- [ ] Finalização de compra (em desenvolvimento)
- [ ] Painel administrativo (em desenvolvimento)

---

## Estrutura do Projeto

```
astro/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── productController.js
│   │   │   ├── categoryController.js
│   │   │   ├── cartController.js
│   │   │   ├── orderController.js
│   │   │   └── addressController.js
│   │   ├── routes/
│   │   ├── middlewares/
│   │   │   └── auth.js
│   │   ├── lib/
│   │   │   └── prisma.js
│   │   ├── app.js
│   │   └── server.js
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── cart/
    │   │   ├── home/
    │   │   ├── login/
    │   │   └── wishlist/
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── hooks/
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Cart.jsx
    │   │   ├── WishList.jsx
    │   │   ├── Buycard.jsx
    │   │   ├── About.jsx
    │   │   └── Contact.jsx
    │   ├── services/
    │   │   └── api.js
    │   └── layouts/
    └── package.json
```

---

## Como Rodar Localmente

### Pré-requisitos

- [Node.js](https://nodejs.org/) v18 ou superior
- npm

### 1. Clone o repositório

```bash
git clone https://github.com/gianlucamz/ASTRO.git
cd ASTRO
```

### 2. Configure e rode o back-end

```bash
cd backend
npm install
```

Crie o arquivo `.env` na pasta `backend/` com as variáveis listadas abaixo, depois rode:

```bash
npx prisma migrate dev
npm run dev
```

O servidor estará disponível em `http://localhost:3000` (ou a porta definida no `.env`).

### 3. Configure e rode o front-end

Abra um novo terminal:

```bash
cd frontend
npm install
npm run dev
```

O front-end estará disponível em `http://localhost:5173`.

---

## Variáveis de Ambiente

Crie um arquivo `.env` dentro da pasta `backend/` com o seguinte conteúdo:

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET=sua_chave_secreta_aqui
PORT=3000
```

> Nunca suba o arquivo `.env` para o repositório. Ele já está no `.gitignore`.

---

## Rotas da API

| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| POST | `/auth/register` | Cadastro de usuário | ❌ |
| POST | `/auth/login` | Login e geração de token | ❌ |
| GET | `/products` | Listar produtos | ❌ |
| GET | `/products/:id` | Detalhes de um produto | ❌ |
| GET | `/categories` | Listar categorias | ❌ |
| GET | `/cart` | Visualizar carrinho | ✅ |
| POST | `/cart` | Adicionar item ao carrinho | ✅ |
| DELETE | `/cart/:id` | Remover item do carrinho | ✅ |
| GET | `/orders` | Listar pedidos do usuário | ✅ |
| POST | `/orders` | Criar pedido | ✅ |
| GET | `/addresses` | Listar endereços | ✅ |
| POST | `/addresses` | Cadastrar endereço | ✅ |

> ✅ Requer token JWT no header: `Authorization: Bearer <token>`

---

## Autores

**- Gianluca Moreno Zocarato** (https://github.com/gianlucamz)
**- Isaque Barcelos Leme De Souza** (https://github.com/Isaque-Barcelos08)
**- Matheus Pires Macedo** (https://github.com/Matiospires)
**- Nand de Freitas Morais** (https://github.com/nandfm)
**- Osvaldo Costa Rocha Júnior** (https://github.com/OhJr)
