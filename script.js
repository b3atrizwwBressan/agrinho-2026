// ==========================================
// 1. MAPEAMENTO DOS ELEMENTOS DO HTML
// ==========================================
const gameBoard = document.querySelector('.game-board');
const boneco = document.getElementById('personagem');
const botaoPlay = document.getElementById('btn-play');
const caixaMensagem = document.getElementById('caixa-mensagem');
const transicao = document.getElementById('transicao-preta'); // Nova div preta

// ==========================================
// 2. VARIÁVEIS DE CONTROLE DO JOGO
// ==========================================
let posicaoX = 50;
let posicaoY = 50;
const velocidad = 8;
let cenarioAtual = 2; // Começa movimentação no cenário 2
let fraseAtual = 0;
let jogoIniciado = false;
let dialogosTerminados = false;

const dialogos = [
    "Uma certa pessoa precisa de sua ajuda...",
    "Procure por ele em sua casa, ele irá te explicar tudo que precisa saber!",
    "Boa sorte na sua jornada!",
    "Para andar, basta somente clicar A-S-D-W"
];

// Dicionário do teclado
const teclas = { 
    a: false, w: false, s: false, d: false, 
    ArrowLeft: false, ArrowUp: false, ArrowDown: false, ArrowRight: false 
};

// ==========================================
// 3. LOGICA DO BOTÃO E DIÁLOGOS
// ==========================================
botaoPlay.addEventListener('click', () => {
    // Se o jogo ainda não começou, mostra a primeira frase
    if (!jogoIniciado && fraseAtual === 0 && !dialogosTerminados) {
        jogoIniciado = true;
        caixaMensagem.style.display = 'block';
        caixaMensagem.textContent = dialogos[fraseAtual];
        botaoPlay.textContent = "Avançar"; 
        boneco.style.display = 'block'; // Mostra o boneco
    } else {
        // Se já começou, passa para a próxima frase
        passarDialogo();
    }
});

function passarDialogo() {
    fraseAtual++;

    if (fraseAtual < dialogos.length) {
        caixaMensagem.textContent = dialogos[fraseAtual];
    } else {
        // DIÁLOGOS TERMINARAM: Inicia o efeito
        dialogosTerminados = true;
        jogoIniciado = false; // Trava o teclado temporariamente
        
        caixaMensagem.style.display = 'none'; // Some o texto
        botaoPlay.style.display = 'none';     // Some o botão play
        
        transicao.classList.add('ativo');     // Escurece a tela

        // Espera 1.5 segundos (tempo do fade) para mudar o cenário por trás do preto
        setTimeout(() => {
            boneco.style.display = 'none';    // Sumiu o personagem
            
            gameBoard.classList.remove('cenario2');
            gameBoard.classList.add('cenario_clique'); // Cenário novo de fundo
            
            transicao.classList.remove('ativo'); // Clareia a tela de novo
            
            ativarCliqueNoMeio(); // Libera o clique no meio
        }, 1500); 
    }
}

// ==========================================
// 4. SISTEMA DE CLIQUE NO MEIO DA TELA
// ==========================================
function activarCliqueNoMeio() {
    gameBoard.addEventListener('click', function funcaoClique() {
        // Escurece de novo ao clicar no meio da tela
        transicao.classList.add('ativo');

        setTimeout(() => {
            gameBoard.classList.remove('cenario_clique');
            gameBoard.classList.add('cenario3'); // Vai para o cenário 3 final
            
            // Se quiser que o boneco reapareça no cenário 3, descomente as duas linhas abaixo:
            // boneco.style.display = 'block';
            // jogoIniciado = true;

            transicao.classList.remove('ativo'); // Mostra o novo cenário
        }, 1500);

        // Remove o evento para o clique só funcionar uma vez
        gameBoard.removeEventListener('click', funcaoClique);
    });
}

// ==========================================
// 5. EVENTOS DO TECLADO DO BONECO
// ==========================================
window.addEventListener('keydown', (evento) => {
    const teclaPressionada = evento.key.toLowerCase();
    if (jogoIniciado && (teclaPressionada in teclas || evento.key in teclas)) {
        if (teclaPressionada in teclas) teclas[teclaPressionada] = true;
        if (evento.key in teclas) teclas[evento.key] = true;
        boneco.classList.add('movendo');
    }
});

window.addEventListener('keyup', (evento) => {
    const teclaSolta = evento.key.toLowerCase();
    if (teclaSolta in teclas) teclas[teclaSolta] = false;
    if (evento.key in teclas) teclas[evento.key] = false;
    
    const nenhumaTeclaPressionada = !teclas.a && !teclas.w && !teclas.s && !teclas.d && 
                                    !teclas.ArrowLeft && !teclas.ArrowUp && !teclas.ArrowDown && !teclas.ArrowRight;

    if (nenhumaTeclaPressionada) {
        boneco.classList.remove('movendo');
    }
});

// ==========================================
// 6. LOOP DE MOVIMENTAÇÃO (FRAME POR FRAME)
// ==========================================
function atualizarJogo() {
    if (jogoIniciado) {
        if (teclas.d || teclas.ArrowRight) {
            posicaoX += velocidad;
            boneco.style.transform = "scaleX(1)";
        }
        if (teclas.a || teclas.ArrowLeft) {
            posicaoX -= velocidad;
            boneco.style.transform = "scaleX(-1)";
        }
        if (teclas.w || teclas.ArrowUp) {
            posicaoY += velocidad;
        }
        if (teclas.s || teclas.ArrowDown) {
            posicaoY -= velocidad;
        }

        // Limites da tela para não sumir
        const larguraCenario = gameBoard.clientWidth;
        if (posicaoX < 0) posicaoX = 0;
        if (posicaoY < 0) posicaoY = 0;

        // Se encostar na borda direita no cenário 2, também muda cenário por andar (Opcional)
        if (cenarioAtual === 2 && posicaoX >= (larguraCenario - 64)) {
            gameBoard.classList.remove('cenario2');
            gameBoard.classList.add('cenario3');
            cenarioAtual = 3;
            posicaoX = 10; 
        }

        boneco.style.left = posicaoX + "px";
        boneco.style.bottom = posicaoY + "px";
    }
    requestAnimationFrame(atualizarJogo);
}

// Inicia o motor do jogo
atualizarJogo();