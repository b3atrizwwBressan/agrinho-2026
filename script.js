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


// ==========================================
// CONTROLES DO TECLADO (A-W-S-D e Setas)
// ==========================================

const teclas = { 
    a: false, w: false, s: false, d: false, 
    ArrowLeft: false, ArrowUp: false, ArrowDown: false, ArrowRight: false 
};

// Quando APERTA qualquer tecla de andar, muda para o GIF andando
window.addEventListener('keydown', (evento) => {
    const teclaPressionada = evento.key.toLowerCase();

    // Verifica se a tecla pressionada existe no nosso objeto de teclas
    if (jogoIniciado && (teclaPressionada in teclas || evento.key in teclas)) {
        if (teclaPressionada in teclas) teclas[teclaPressionada] = true;
        if (evento.key in teclas) teclas[evento.key] = true;
        
        boneco.classList.add('movendo'); // Troca para o GIF
    }
});

// Quando SOLTA a tecla, verifica se não há mais NENHUMA pressionada para voltar a ficar parado
window.addEventListener('keyup', (evento) => {
    const teclaSolta = evento.key.toLowerCase();

    if (teclaSolta in teclas) teclas[teclaSolta] = false;
    if (evento.key in teclas) teclas[evento.key] = false;
    
    // Checa se o jogador soltou absolutamente tudo
    const nenhumaTeclaPressionada = !teclas.a && !teclas.w && !teclas.s && !teclas.d && 
                                    !teclas.ArrowLeft && !teclas.ArrowUp && !teclas.ArrowDown && !teclas.ArrowRight;

    if (nenhumTeclaPressionada) {
        boneco.classList.remove('movendo'); // Volta para a imagem parada
    }
});


//