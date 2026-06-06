// Seleciona o botão e o áudio do HTML
const botaoPlay = document.getElementById('btn-play');
const musica = document.getElementById('musica-jogo');
// Seleciona também o game-board para podermos mudar o fundo dele
const gameBoard = document.querySelector('.game-board');

// Adiciona o evento de clique no botão
botaoPlay.addEventListener('click', function() {
    musica.play();
    console.log("A música começou a tocar!");

    // 1. Faz a tela escurecer adicionando a classe do CSS
    gameBoard.classList.add('escurecer');

    // 2. Espera 500 milissegundos (o tempo do efeito de fechar a tela)
    setTimeout(function() {
        
        // 3. Troca o cenário de fundo e esconde o botão de Play
        gameBoard.classList.add('cenario2');
        botaoPlay.style.display = 'none'; 

        // 4. Remove o efeito preto para o novo cenário aparecer
        gameBoard.classList.remove('escurecer');

    }, 500);
});