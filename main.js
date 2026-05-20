const formPost = document.querySelector("#form-post");
const tituloPost = document.querySelector("#titulo-post");
const conteudoPost = document.querySelector("#conteudo-post");
const renderizadorTitulo = document.querySelector("#renderizador-titulo");
const renderizadorConteudo = document.querySelector("#renderizador-conteudo");
const postInfo = document.querySelector("#post-info");

async function criarPost(event) {
  event.preventDefault();

  if (!tituloPost.value.trim() || !conteudoPost.value.trim()) {
    alert("Por favor, preencha todos os campos!");
    return;
  }

  const data = {
    title: tituloPost.value,
    body: conteudoPost.value,
    userId: 1,
  };

  try {
    postInfo.innerHTML = "Publicando post...";
    postInfo.style.color = "#ffc107";

    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    const resultado = await response.json();

    renderizadorTitulo.innerHTML = data.title;
    renderizadorConteudo.innerHTML = data.body;

    postInfo.innerHTML = `Post publicado com sucesso! ID: ${resultado.id}`;
    postInfo.style.color = "#28a745";

    formPost.reset();

    console.log("Post criado:", resultado);
  } catch (error) {
    console.error("Erro ao criar post:", error);
    postInfo.innerHTML = "Erro ao publicar post. Tente novamente.";
    postInfo.style.color = "#dc3545";
  }
}

formPost.addEventListener("submit", criarPost);

tituloPost.addEventListener("input", () => {
  if (tituloPost.value.trim()) {
    renderizadorTitulo.innerHTML = tituloPost.value;
  } else {
    renderizadorTitulo.innerHTML = "Seu título aparecerá aqui";
  }
});

conteudoPost.addEventListener("input", () => {
  if (conteudoPost.value.trim()) {
    renderizadorConteudo.innerHTML = conteudoPost.value;
  } else {
    renderizadorConteudo.innerHTML =
      "Seu conteúdo aparecerá aqui após publicar";
  }
});