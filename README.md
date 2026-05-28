# 🎬 Projeto CINE

Sistema web completo para gerenciamento de cinemas desenvolvido com Next.js e React.

O projeto permite cadastrar:

* Shoppings;
* Cinemas;
* Filmes;
* Itens de consumo;
* Clientes;
* Reserva de cadeiras.

Além disso, o sistema possui:

* CRUD completo;
* Validação de formulários;
* Persistência de dados com LocalStorage;
* Integração com API do IBGE;
* Interface responsiva com Bootstrap.

---

# 🚀 Tecnologias Utilizadas

* Next.js
* React.js
* Bootstrap
* React Bootstrap
* Formik
* Yup
* Axios
* React Icons
* UUID
* React Input Mask

---

# 📂 Estrutura do Projeto

```bash id="ejf1qm"
src/
│
├── app/
│   ├── cadeiras/
│   ├── cinemas/
│   ├── clientes/
│   ├── consumos/
│   ├── filmes/
│   ├── shoppings/
│   ├── layout.js
│   ├── page.js
│   └── page.module.css
│
├── components/
│   └── Pagina.js
│
├── services/
│   └── apiLocalidades.js
```

---

# 🎯 Funcionalidades

## 🏬 Gerenciamento de Shoppings

* Cadastro de shoppings;
* Edição;
* Exclusão;
* Upload de imagem via URL;
* Cadastro de endereço;
* Controle de cinema disponível.

---

## 🎥 Gerenciamento de Cinemas

* Cadastro de cinemas;
* Associação com shoppings;
* Listagem completa;
* Exclusão e edição.

---

## 🎬 Gerenciamento de Filmes

* Cadastro de filmes;
* Controle das informações do filme;
* Associação com cinema;
* Listagem dos filmes cadastrados.

---

## 🍿 Itens de Consumo

* Cadastro de produtos;
* Controle de preço;
* Listagem de itens disponíveis.

---

## 👤 Clientes

* Cadastro de clientes;
* Associação com:

  * filme;
  * cinema;
  * consumo;
  * cadeira reservada.

---

## 💺 Reserva de Cadeiras

O sistema possui um mapa interativo de cadeiras.

### Funcionalidades:

* Seleção visual de assentos;
* Controle de cadeiras ocupadas;
* Limite de seleção baseado na quantidade de ingressos;
* Persistência no LocalStorage;
* Bloqueio de cadeiras já reservadas;
* Nova sessão de cinema.

### Legenda:

* 🟢 Verde → cadeira selecionada
* 🔴 Vermelho → cadeira ocupada
* ⚪ Branco → cadeira disponível

---

# 🌎 Integração com API do IBGE

O sistema utiliza a API pública do IBGE para:

* listar estados;
* listar cidades automaticamente.

Arquivo responsável:

```bash id="r26m11"
src/services/apiLocalidades.js
```

Código:

```js id="s5z2mn"
import axios from "axios";

const apiLocalidades = axios.create({
  baseURL: "https://servicodados.ibge.gov.br/api/v1/localidades"
})

export default apiLocalidades
```

---

# 🧠 Armazenamento dos Dados

O sistema utiliza:

```js id="f3t3l0"
localStorage
```

para armazenar:

* shoppings;
* cinemas;
* filmes;
* consumos;
* clientes;
* cadeiras reservadas.

---

# 🎨 Interface

O projeto utiliza:

* Bootstrap;
* React Bootstrap;
* CSS Modules;
* Layout responsivo.

---

# ⚙️ Como Executar o Projeto

## 1️⃣ Clonar o repositório

```bash id="p8snbi"
git clone URL_DO_REPOSITORIO
```

---

## 2️⃣ Entrar na pasta

```bash id="2nv6fd"
cd nome-do-projeto
```

---

## 3️⃣ Instalar dependências

```bash id="bjlwmq"
npm install
```

---

## 4️⃣ Executar o projeto

```bash id="t3b5ku"
npm run dev
```

---

# 📌 Rotas do Sistema

| Página              | Rota         |
| ------------------- | ------------ |
| Home                | `/`          |
| Shoppings           | `/shoppings` |
| Cinemas             | `/cinemas`   |
| Filmes              | `/filmes`    |
| Consumos            | `/consumos`  |
| Clientes            | `/clientes`  |
| Reserva de Cadeiras | `/cadeiras`  |

---

# 📱 Responsividade

O sistema foi desenvolvido para funcionar em:

* Desktop;
* Tablet;
* Smartphone.

---

# 📚 Objetivo do Projeto

Este projeto foi desenvolvido com foco em:

* aprendizado de React e Next.js;
* manipulação de estado;
* CRUD completo;
* integração com APIs;
* validação de formulários;
* componentização;
* boas práticas de desenvolvimento frontend.

---

# 👨‍💻 Autor

Paulo Henrique
