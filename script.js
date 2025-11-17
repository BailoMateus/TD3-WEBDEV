const API_URL = "https://jsonplaceholder.typicode.com/posts";

const btnCarregar = document.getElementById("btnCarregar");
const postsContainer = document.getElementById("postsContainer");
const statusBox = document.getElementById("status");
const formPost = document.getElementById("formPost");
const novoPostResposta = document.getElementById("novoPostResposta");

// Função utilitária para mostrar mensagens de status
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

        if (!resposta.ok) {
            throw new Error(`Erro na requisição: ${resposta.status} ${resposta.statusText}`);
        }

        const dados = await resposta.json();

        // Para não lotar a tela, vou mostrar só os 10 primeiros posts
        const primeiros = dados.slice(0, 10);

        postsContainer.innerHTML = "";

        primeiros.forEach(post => {
            const card = document.createElement("div");
            card.className = "post-card";
            card.dataset.id = post.id; // guardar id para o DELETE

            card.innerHTML = `
                <div class="post-header">
                    <h3>${post.title}</h3>
                    <span class="post-id">ID: ${post.id}</span>
                </div>
                <p>${post.body}</p>
                <button class="btnDelete">Excluir (DELETE)</button>
            `;

            const btnDelete = card.querySelector(".btnDelete");
            btnDelete.addEventListener("click", () => deletarPost(post.id, card));

            postsContainer.appendChild(card);
        });

        mostrarStatus("Posts carregados com sucesso.", "ok");
    } catch (erro) {
        console.error(erro);
        mostrarStatus("Falha ao carregar posts: " + erro.message, "error");
    }
}

// POST - Criar novo post
async function criarPost(title, body) {
    try {
        mostrarStatus("Enviando novo post...", "ok");

        const resposta = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                title: title,
                body: body,
                userId: 1
            })
        });

        if (!resposta.ok) {
            throw new Error(`Erro na requisição: ${resposta.status} ${resposta.statusText}`);
        }

        const dados = await resposta.json();

        novoPostResposta.innerHTML = `
            <h3>Resposta da API (POST)</h3>
            <pre>${JSON.stringify(dados, null, 2)}</pre>
        `;

        mostrarStatus("Post criado com sucesso (simulado pela API).", "ok");
    } catch (erro) {
        console.error(erro);
        mostrarStatus("Falha ao criar post: " + erro.message, "error");
    }
}

// DELETE - Deletar post (simulado)
async function deletarPost(id, cardElemento) {
    const url = `${API_URL}/${id}`;

    try {
        mostrarStatus(`Excluindo post ID ${id}...`, "ok");

        const resposta = await fetch(url, {
            method: "DELETE"
        });

        if (!resposta.ok) {
            throw new Error(`Erro na requisição: ${resposta.status} ${resposta.statusText}`);
        }


        cardElemento.remove();

        mostrarStatus(`Post ID ${id} excluído (simulado pela API).`, "ok");
    } catch (erro) {
        console.error(erro);
        mostrarStatus("Falha ao excluir post: " + erro.message, "error");
    }
}

// Eventos
btnCarregar.addEventListener("click", carregarPosts);

formPost.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = formPost.title.value.trim();
    const body = formPost.body.value.trim();

    if (!title || !body) {
        mostrarStatus("Preencha título e conteúdo antes de enviar.", "error");
        return;
    }

    criarPost(title, body);
});
