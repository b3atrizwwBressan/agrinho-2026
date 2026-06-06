const botaoPlay = document.getElementById('btn-play');
const musica = document.getElementById('musica-jogo');
const gameBoard = document.querySelector('.game-board');
const caixaMensagem = document.getElementById('caixa-mensagem');

// 1. Criamos a lista de frases que vão aparecer em sequência
const dialogos = [
    "Bem-vindo à Renascimento Rural! O jogo começou.",
    "Uma certa pessoa precisa de sua ajuda...",
    "Procure por ele em sua casa, ele irá te explicar tudo que precisa saber!",
    "Boa sorte na sua jornada!",
    "Para andar, basta somente clicar A-S-D-W"
];

let fraseAtual = 0; // Começa na primeira frase (posição 0)
let jogoIniciado = false; // Garante que os cliques só funcionam após o Play

botaoPlay.addEventListener('click', function() {
    musica.play();

    // Escurece a tela
    gameBoard.classList.add('escurecer');

    setTimeout(function() {
        gameBoard.classList.add('cenario2');
        botaoPlay.style.display = 'none'; 

        // Mostra a primeira frase da lista
        caixaMensagem.style.display = 'block';
        caixaMensagem.innerText = dialogos[fraseAtual];

        gameBoard.classList.remove('escurecer');
        jogoIniciado = true; // Libera os cliques para passar de frase
    }, 500);
});

// 2. Evento que detecta o clique na caixa de mensagem para avançar
caixaMensagem.addEventListener('click', function() {
    if (jogoIniciado) {
        fraseAtual++; // Avança para a próxima frase (+1)

        // Se ainda sobrarem frases na lista, mostra a próxima
        if (fraseAtual < dialogos.length) {
            caixaMensagem.innerText = dialogos[fraseAtual];
        } else {
            // Se as frases acabaram, esconde a caixa ou inicia a ação do jogo
            caixaMensagem.innerText = "";
            caixaMensagem.style.display = 'none';
            console.log("Diálogo encerrado! O jogador já pode mover o personagem.");
        }
    }
});


document.querySelector("#personagem").style.display = "block";