const botaoPlay = document.getElementById('btn-play');
const musica = document.getElementById('musica-jogo');
const gameBoard = document.querySelector('.game-board');
const caixaMensagem = document.getElementById('caixa-mensagem');
const boneco = document.getElementById('personagem');
const transicao = document.getElementById('transicao-preta');

// NOVOS ELEMENTOS DO QUIZ
const caixaQuiz = document.getElementById('caixa-quiz');
const perguntaQuiz = document.getElementById('pergunta-quiz');
const opcoesQuiz = document.getElementById('opcoes-quiz');

let posicaoX = 50; 
let posicaoY = 50; 
const velocidad = 8;

// 1. Criamos a lista de frases que vão aparecer em sequência
const dialogos = [
    "Bem-vindo à Renascimento Rural! O jogo começou.",
    "Uma certa pessoa precisa de sua ajuda...",
    "Procure por ele em sua casa, ele irá te explicar tudo que precisa saber!",
    "Boa sorte na sua jornada!",
    "Para andar, basta somente clicar A-S-D-W"
];

// ESTRUTURA DO SEU QUIZ
const perguntasQuiz = [
    {
        pergunta: "Qual dessas teclas faz o personagem andar para a esquerda?",
        alternativas: ["W", "A", "S", "D"],
        correta: 1 
    }
];

let fraseAtual = 0; 
let jogoIniciado = false; 

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

        jogoIniciado = true; 
    }, 500);
});

// 2. Evento que detecta o clique na caixa de mensagem para avançar
caixaMensagem.addEventListener('click', function() {
    if (jogoIniciado) {
        fraseAtual++; 

        // Se ainda sobrarem frases na lista, mostra a próxima
        if (fraseAtual < dialogos.length) {
            caixaMensagem.innerText = dialogos[fraseAtual];
        } else {
            // ========================================================
            // AS FRASES ACABARAM -> ABRE O QUIZ E MANTÉM O MOVIMENTO!
            // ========================================================
            caixaMensagem.innerText = "";
            caixaMensagem.style.display = 'none';
            
            // MODIFICAÇÃO AQUI: Deixamos jogoIniciado como true para o teclado continuar ativo!
            jogoIniciado = true; 
            
            // Abre o painel do quiz transparente na tela
            caixaQuiz.classList.remove('escondido');
            carregarPerguntaQuiz(0); 
            
            console.log("Diálogo encerrado! Quiz aberto e personagem livre para andar.");
        }
    }
});

// Função que gerencia a montagem da pergunta e alternativas do Quiz
function carregarPerguntaQuiz(indice) {
    const dados = perguntasQuiz[indice];
    perguntaQuiz.textContent = dados.pergunta;
    opcoesQuiz.innerHTML = ""; 

    dados.alternativas.forEach((alternativa, i) => {
        const botao = document.createElement('button');
        botao.classList.add('btn-resposta');
        botao.textContent = alternativa;
        
        botao.addEventListener('click', () => {
            if (i === dados.correta) {
                alert("Acertou! Muito bem.");
                caixaQuiz.classList.add('escondido'); // Fecha o quiz ao acertar
                // O jogador continua andando normalmente sem interrupção
            } else {
                alert("Resposta incorreta! Tente novamente.");
            }
        });
        
        opcoesQuiz.appendChild(botao);
    });
}

// Mantido por segurança (intocado)
function passarDialogo() {
    fraseAtual++;
    if (fraseAtual < dialogos.length) {
        caixaMensagem.textContent = dialogos[fraseAtual];
    } else {
        caixaMensagem.style.display = 'none'; 
        transicao.classList.add('ativo'); 
        setTimeout(() => {
            boneco.style.display = 'none'; 
            gameBoard.classList.remove('cenario1'); 
            gameBoard.classList.add('cenario_clique'); 
            transicao.classList.remove('ativo'); 
            ativarCliqueNoMeio();
        }, 1500); 
    }
}

// ==========================================
// CONTROLES DO TECLADO (A-W-S-D e Setas)
// ==========================================
const teclas = { 
    a: false, w: false, s: false, d: false, 
    ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false 
};

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
// LOOP DE MOVIMENTAÇÃO (4 DIREÇÕES)
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
        
        boneco.style.left = posicaoX + "px";
        boneco.style.bottom = posicaoY + "px"; 
    }
    requestAnimationFrame(atualizarJogo);
}

atualizarJogo();

function activarCliqueNoMeio() {
    jogoIniciado = false; 
    gameBoard.addEventListener('click', function funcaoClique() {
        transicao.classList.add('ativo');
        setTimeout(() => {
            gameBoard.classList.remove('cenario_clique');
            gameBoard.classList.add('cenario3'); 
            transicao.classList.remove('ativo');
        }, 1500);
        gameBoard.removeEventListener('click', funcaoClique);
    });
}