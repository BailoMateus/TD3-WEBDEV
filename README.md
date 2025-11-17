# Mini Blog – Consumo de API com JavaScript (GET, POST e DELETE)

Este projeto demonstra como consumir APIs utilizando **JavaScript**, `fetch`, `async/await` e tratamento de dados em JSON.  
A aplicação usa a API pública **JSONPlaceholder** para buscar, criar e excluir posts.

---

## 🚀 Funcionalidades

- **GET /posts** – Lista posts na tela  
- **POST /posts** – Cria um novo post via formulário  
- **DELETE /posts/:id** – Simula exclusão de posts  
- Exibição organizada dos dados no HTML  
- Tratamento de erros com `try/catch`  
- Código assíncrono com **async/await**

---

## 🧩 API Utilizada: JSONPlaceholder

🔗 https://jsonplaceholder.typicode.com/

Endpoints utilizados:

| Método | Endpoint | Descrição |
|--------|----------|------------|
| GET | `/posts` | Retorna lista de posts |
| POST | `/posts` | Cria um post (simulado) |
| DELETE | `/posts/:id` | Exclui um post (simulado) |

> A API não salva ou apaga nada de verdade — é ideal para estudos.

---

## 📁 Estrutura do Projeto

/
│── index.html
│── script.js
│── README.md

php-template
Copiar código

---

## 💻 Código HTML

```html
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Mini Blog - Consumo de API</title>
    <style>
        body { font-family: Arial; max-width: 900px; margin: 20px auto; }
        .post-card { border: 1px solid #ddd; padding: 10px; margin-bottom: 10px; }
        button { padding: 8px 12px; cursor: pointer; }
        .status { display: none; margin-top: 10px; padding: 8px; border-radius: 4px; }
        .ok { background: #e0ffe0; border: 1px solid #4caf50; }
        .error { background: #ffe0e0; border: 1px solid #f44336; }
    </style>
</head>
<body>

    <h1>Mini Blog - Consumo de API</h1>

    <section>
        <h2>1. Carregar posts (GET)</h2>
        <button id="btnCarregar">Carregar posts</button>
        <div id="status" class="status"></div>
        <div id="postsContainer"></div>
    </section>

    <section>
        <h2>2. Criar post (POST)</h2>
        <form id="formPost">
            <label>Título</label>
            <input type="text" id="title" required>

            <label>Conteúdo</label>
            <textarea id="body" rows="3" required></textarea>

            <button type="submit">Enviar</button>
        </form>

        <div id="novoPostResposta"></div>
    </section>

    <script src="script.js"></script>
</body>
</html>
🧠 Código JavaScript
javascript
Copiar código
const API_URL = "https://jsonplaceholder.typicode.com/posts";

const btnCarregar = document.getElementById("btnCarregar");
const postsContainer = document.getElementById("postsContainer");
const statusBox = document.getElementById("status");
const formPost = document.getElementById("formPost");
const novoPostResposta = document.getElementById("novoPostResposta");

// Exibe mensagens de status
function mostrarStatus(mensagem, tipo = "ok") {
    statusBox.textContent = mensagem;
    statusBox.className = "status " + tipo;
    statusBox.style.display = "block";
}

// GET - Buscar posts
async function carregarPosts() {
    try {
        mostrarStatus("Carregando posts...", "ok");

        const resposta = await fetch(API_URL);
        if (!resposta.ok) throw new Error(`Erro: ${resposta.status}`);

        const dados = await resposta.json();
        const primeiros = dados.slice(0, 10);

        postsContainer.innerHTML = "";

        primeiros.forEach(post => {
            const card = document.createElement("div");
            card.className = "post-card";

            card.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.body}</p>
                <button class="btnDelete">Excluir (DELETE)</button>
            `;

            card.querySelector(".btnDelete")
                .addEventListener("click", () => deletarPost(post.id, card));

            postsContainer.appendChild(card);
        });

        mostrarStatus("Posts carregados!", "ok");
    } catch (erro) {
        mostrarStatus("Erro ao carregar: " + erro.message, "error");
    }
}

// POST - Criar post
async function criarPost(title, body) {
    try {
        mostrarStatus("Enviando post...", "ok");

        const resposta = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json; charset=UTF-8" },
            body: JSON.stringify({ title, body, userId: 1 })
        });

        if (!resposta.ok) throw new Error(`Erro: ${resposta.status}`);

        const dados = await resposta.json();

        novoPostResposta.innerHTML = `
            <h3>Post enviado:</h3>
            <pre>${JSON.stringify(dados, null, 2)}</pre>
        `;

        mostrarStatus("Post criado!", "ok");
    } catch (erro) {
        mostrarStatus("Erro ao criar: " + erro.message, "error");
    }
}

// DELETE - Excluir post
async function deletarPost(id, card) {
    try {
        const resposta = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        if (!resposta.ok) throw new Error(`Erro: ${resposta.status}`);

        card.remove();
        mostrarStatus(`Post ${id} excluído!`, "ok");
    } catch (erro) {
        mostrarStatus("Erro ao excluir: " + erro.message, "error");
    }
}

// Eventos
btnCarregar.addEventListener("click", carregarPosts);

formPost.addEventListener("submit", (e) => {
    e.preventDefault();
    criarPost(formPost.title.value, formPost.body.value);
});
📝 Documentação (Resumo)
📌 Objetivo
Aprender a consumir APIs REST utilizando JavaScript, realizar requisições GET, POST e DELETE, manipular JSON e exibir dados no HTML com tratamento de erros.

🧠 Métodos Implementados
✔ GET /posts
Carrega posts

Mostra na tela

Verifica erros com response.ok

✔ POST /posts
Envia um novo post

Exibe o JSON retornado

Usa JSON.stringify()

✔ DELETE /posts/:id
Remove visualmente o post clicado

Simula exclusão real