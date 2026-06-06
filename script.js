// Seleciona o botão e o áudio do HTML
const botaoPlay = document.getElementById('btn-play');
const musica = document.getElementById('musica-jogo');

// Adiciona o evento de clique no botão
botaoPlay.addEventListener('click', function() {
    musica.play();
    console.log("A música começou a tocar!");
});