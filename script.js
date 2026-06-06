const botaoPlay = document.getElementById('btn-play');
const musica = document.getElementById('musica-jogo');
const gameBoard = document.querySelector('.game-board');
const caixaMensagem = document.getElementById('caixa-mensagem');
const boneco = document.getElementById('personagem');
let posicaoX = 50; 
let posicaoY = 50; // ADICIONE ISSO: Posição inicial de altura do boneco
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

// Quando APERTA qualquer tecla de andar, muda para o GIF andando
window.addEventListener('keydown', (evento) => {
    // Converte a tecla para minúscula (caso o CapsLock esteja ativo)
    const teclaPressionada = evento.key.toLowerCase();

    if (jogoIniciado && (teclaPressionada in teclas || evento.key in teclas)) {
        if (teclaPressionada in teclas) teclas[teclaPressionada] = true;
        if (evento.key in teclas) teclas[evento.key] = true;
        
        boneco.classList.add('movendo'); // Troca para o GIF andando (player1.gif)
    }
});

// Quando SOLTA a tecla, verifica se não há mais NENHUMA pressionada para voltar a ficar parado
window.addEventListener('keyup', (evento) => {
    const teclaSolta = evento.key.toLowerCase();

    if (teclaSolta in teclas) teclas[teclaSolta] = false;
    if (evento.key in teclas) teclas[evento.key] = false;
    
    // Verifica se TODAS as teclas estão falsas (ou seja, dedão fora do teclado)
    const nenhumaTeclaPressionada = !teclas.a && !teclas.w && !teclas.s && !teclas.d && 
                                    !teclas.ArrowLeft && !teclas.ArrowUp && !teclas.ArrowDown && !teclas.ArrowRight;

    if (nenhumaTeclaPressionada) {
        boneco.classList.remove('movendo'); // Remove a animação e volta para o parado (Playerparado.png)
    }
});


// ==========================================
// LOOP DE MOVIMENTAÇÃO (4 DIREÇÕES)
// ==========================================
function atualizarJogo() {
    if (jogoIniciado) {
        // IR PARA A DIREITA (D ou Seta Direita)
        if (teclas.d || teclas.ArrowRight) {
            posicaoX += velocidade;
            boneco.style.transform = "scaleX(1)"; // Olha para a direita
        }
        // IR PARA A ESQUERDA (A ou Seta Esquerda)
        if (teclas.a || teclas.ArrowLeft) {
            posicaoX -= velocidade;
            boneco.style.transform = "scaleX(-1)"; // Olha para a esquerda
        }
        // IR PARA CIMA (W ou Seta Para Cima)
        if (teclas.w || teclas.ArrowUp) {
            posicaoY += velocidade; // Sobe no cenário
        }
        // IR PARA BAIXO (S ou Seta Para Baixo)
        if (teclas.s || teclas.ArrowDown) {
            posicaoY -= velocidade; // Desce no cenário
        }
        
        // Aplica os novos valores de posição no CSS do personagem
        boneco.style.left = posicaoX + "px";
        boneco.style.bottom = posicaoY + "px"; // Altera a altura dinamicamente
    }
    
    requestAnimationFrame(atualizarJogo);
}

// Inicializa o sistema
atualizarJogo();