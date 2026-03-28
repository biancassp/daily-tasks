const lista = document.querySelector(".lista-tarefas");
const input = document.querySelector(".campo-texto");
const botao = document.querySelector(".adicionar")


//faz o botão funcionar
botao.addEventListener("click", () => adicionarTarefa());


//adiciona botão para excluir
function adicionarTarefa(textoManual = null) {
    const texto = textoManual || input.value;

    if (texto === "" || texto === null) return;
    if (texto === "") return;

    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = texto;
    span.contentEditable = true;

    span.addEventListener('dblclick', () => {
        li.classList.toggle("concluida");
        salvarTarefas();
    });

span.addEventListener('blur', () => {
    if (span.innerText.trim() === "") {
        li.remove();
    }
    salvarTarefas();
});

const btnExcluir = document.createElement("button");
btnExcluir.textContent = "Excluir";

btnExcluir.onclick = () => {
    li.remove();
    salvarTarefas();
};

li.appendChild(span);
li.appendChild(btnExcluir);
lista.appendChild(li);

input.value = "";
salvarTarefas();
}

//salvar no localStorage
function salvarTarefas() {
    const tarefas = [];
    const todosOsSpans = document.querySelectorAll(".lista-tarefas span");

    todosOsSpans.forEach(span => {
        tarefas.push(span.innerText);
    });

    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

//carregar no localStorage
function carregarTarefas() {
    const dados = localStorage.getItem("tarefas");

    if (!dados) return;

    const tarefas = JSON.parse(dados);

    tarefas.forEach(t => {
        adicionarTarefa(t); 
    });
}

//chama quando abre
carregarTarefas();


//mensagem do dia 
const mensagens = [
    "Pequenos progressos ainda são progressos. ✨",
    "Já bebeu água hoje? 💧",
    "Seu corpo também precisa de cuidado. 🚴",
    "Hoje é um bom dia pra recomeçar. 🌼",
    "Que tal uma pausa agora? 💤",
    "Cuide de si mesmo com carinho. 💕",
    "Não espere pelo momento perfeito, comece hoje, com o que tem. ⌛",
    "A autoconfiança é o primeiro passo para grandes feitos. 🌺",
    "Aprenda com os erros, eles são degraus para o sucesso. 🏆",
    "Sempre parece impossível até que seja feito. 📚",
    "Cuidar de si é valorizar a vida. 🌱"
];

const dataHoje = new Date();
const diaDoMes = dataHoje.getDate();

const indiceMensagem = diaDoMes % mensagens.length;

const mensagemSelecionada = mensagens[indiceMensagem];
document.querySelector('.mensagem').innerText = mensagemSelecionada;
