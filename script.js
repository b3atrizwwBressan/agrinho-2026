const botaoPlay = document.getElementById('btn-play');
const musica = document.getElementById('musica-jogo');
const gameBoard = document.querySelector('.game-board');
const caixaMensagem = document.getElementById('caixa-mensagem');
const boneco = document.getElementById('personagem');
let posicaoX = 50; 
const velocidade = 8;

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
        boneco.style.display = "block";
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


const teclas = { 
    a: false, w: false, s: false, d: false, 
    ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false 
};

// 2. Quando APERTA a tecla: adiciona a classe que muda para o GIF andando
window.addEventListener('keydown', (evento) => {
    if (jogoIniciado && evento.key in teclas) {
        teclas[evento.key] = true;
        boneco.classList.add('movendo'); // Ativa o player1.gif do seu CSS
    }
});

// 3. Quando SOLTA a tecla: verifica se soltou tudo para voltar ao GIF parado
window.addEventListener('keyup', (evento) => {
    if (evento.key in teclas) {
        teclas[evento.key] = false;
    }
    
    // Se não tiver nenhuma tecla de movimento sendo segurada
    const nenhumaTeclaPressionada = !teclas.a && !teclas.w && !teclas.s && !teclas.d && 
                                    !teclas.ArrowLeft && !teclas.ArrowUp && !teclas.ArrowDown && !teclas.ArrowRight;

    if (nenhumTeclaPressionada) {
        boneco.classList.remove('movendo'); // Volta para o Playerparado.png do seu CSS
    }
});

// 4. O Loop que atualiza a posição da personagem na tela suavemente
function atualizarJogo() {
    if (jogoIniciado) {
        // Se andar para a direita (D ou Seta Direita)
        if (teclas.d || teclas.ArrowRight) {
            posicaoX += velocidade;
            boneco.style.transform = "scaleX(1)"; // Olha para a direita
        }
        // Se andar para a esquerda (A ou Seta Esquerda)
        if (teclas.a || teclas.ArrowLeft) {
            posicaoX -= velocidade;
            boneco.style.transform = "scaleX(-1)"; // Espelha a imagem para olhar para a esquerda
        }
        
        // Aplica o movimento no CSS do boneco
        boneco.style.left = posicaoX + "px";
    }
    
    // Fica rodando essa função a cada milissegundo em segundo plano
    requestAnimationFrame(atualizarJogo);
}

// Inicializa o sistema de movimento
atualizarJogo();