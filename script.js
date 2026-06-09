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
    "Bem-vindo à Renascimento Rural!",
    "Faça um quiz educativo",
    "Aprenda o quanto você sabe sobre agroforte e futuro sustentável!",
    "Boa sorte em seu teste!",
    "Haverá um total de 5 questões!"
];

// ========================================================
// REESTRUTURADO: PERGUNTAS DO QUIZ E VARIÁVEIS DE PLACAR
// ========================================================
const perguntasQuiz = [
    {
        pergunta: "Qual das seguintes práticas ajuda a preservar o solo e a água, sendo um pilar do agronegócio sustentável?",
        alternativas: ["Rotações de culturas.", "Desmatamento total da propriedade.", "Queimada anual da palhada.", "Uso excessivo e sem controle da água."],
        correta: 1 
    },
    {
        pergunta: "Como a tecnologia digital (como drones e sensores) contribui para o 'Agro Forte' e sustentável?",
        alternativas: ["A) Substituindo completamente a necessidade de cuidar do solo", "B) Permitindo a aplicação exata de insumos apenas onde é necessário", "C) Aumentando o consumo de energia e combustíveis fósseis sem critérios", "D) Forçando o agricultor a abandonar as sementes tradicionais"],
        correta: 2
    },
    {
        pergunta: "O que significa o conceito de Integração Lavoura-Pecuária-Floresta (ILPF)?",
        alternativas: ["A) Uma estratégia que produz grãos, carne e madeira na mesma área", "B) A separação rígida de fazendas para que nenhuma se misture", "C) A proibição do cultivo de árvores perto de criações de animais", "D) A substituição total de pastagens por desertos artificiais"],
        correta: 1
    },
    {
        pergunta: "Qual é a principal vantagem do Sistema de Plantio Direto para a conservação ambiental?",
        alternativas: ["A) Deixar a terra totalmente exposta ao sol e à chuva", "B) Evitar o revolvimento do solo e manter os restos vegetais na superfície", "C) Exigir a aração profunda do terreno a cada novo ciclo", "D) Acelerar a evaporação da água do solo"],
        correta: 2
    }
];

let perguntaAtual = 0; // Controla qual pergunta está aparecendo
let acertos = 0;       // Controla quantas perguntas o jogador acertou
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
            // AS FRASES ACABARAM -> ABRE O QUIZ E MANTÉM O MOVIMENTO!
            caixaMensagem.innerText = "";
            caixaMensagem.style.display = 'none';
            
            jogoIniciado = true; 
            
            // Abre o painel do quiz transparente na tela
            caixaQuiz.classList.remove('escondido');
            
            // Reseta o placar caso o jogador esteja rejogando
            perguntaAtual = 0;
            acertos = 0;
            
            carregarPerguntaQuiz(perguntaAtual); 
            
            console.log("Diálogo encerrado! Quiz aberto e personagem livre para andar.");
        }
    }
});

// ========================================================
// MODIFICADO: FUNÇÃO DO QUIZ ATUALIZA O PLACAR DINAMICAMENTE
// ========================================================
function carregarPerguntaQuiz(indice) {
    const dados = perguntasQuiz[indice];
    const totalPerguntas = perguntasQuiz.length;
    
    // Mostra a pergunta junto com o placar atualizado ex: (Acertou 1/4)
    perguntaQuiz.innerHTML = `${dados.pergunta} <br><small style="color: #aaa; font-size: 14px;">Acertou: ${acertos}/${totalPerguntas}</small>`;
    
    opcoesQuiz.innerHTML = ""; 

    dados.alternativas.forEach((alternativa, i) => {
        const botao = document.createElement('button');
        botao.classList.add('btn-resposta');
        botao.textContent = alternativa;
        
        botao.addEventListener('click', () => {
            // Se acertar, adiciona +1 no contador de acertos
            if (i === dados.correta) {
                alert("Acertou! Muito bem.");
                acertos++;
            } else {
                alert("Resposta incorreta!");
            }
            
            // Avança para a próxima pergunta da lista
            perguntaAtual++;
            
            // Se ainda tiver perguntas na lista, carrega a próxima
            if (perguntaAtual < totalPerguntas) {
                carregarPerguntaQuiz(perguntaAtual);
            } else {
                // Se responder todas as perguntas, mostra o resultado final e fecha o quiz
                alert(`Quiz concluído! Seu resultado final foi: ${acertos}/${totalPerguntas}`);
                caixaQuiz.classList.add('escondido');
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