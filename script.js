$(document).ready(function() {
    let pontos = 0;
    let tempo = 30;
    let tempoLimite;
    let intervalo;
    let tamanhoAlvo = 100;
    let tempoInicial = 30;
    let dificuldadeAtual = 'medio';
    let yam = $('#yamyam')[0];
    let burp = $('#burp')[0];

    function carregarRecordes() {
        const recordes = JSON.parse(localStorage.getItem('recordes')) || {};
        return recordes;
    }

    function salvarRecorde(dificuldade, pontos) {
        let recordes = carregarRecordes();
        if (!recordes[dificuldade] || pontos > recordes[dificuldade]) {
            recordes[dificuldade] = pontos;
            localStorage.setItem('recordes', JSON.stringify(recordes));
        }
    }

    function atualizarRecorde() {
        const recordes = carregarRecordes();
        $('#recorde').text('Recorde: ' + (recordes[dificuldadeAtual] || 0));
    }

    function ajustarDificuldade() {
        const dificuldade = $('#dificuldade').val();
        if (dificuldade === 'really?') {
            tamanhoAlvo = 200;
            tempoInicial = 50;
        } else if (dificuldade === 'facil') {
            tamanhoAlvo = 100;
            tempoInicial = 40;
        } else if (dificuldade === 'medio') {
            tamanhoAlvo = 75;
            tempoInicial = 30;
        } else if (dificuldade === 'dificil') {
            tamanhoAlvo = 50;
            tempoInicial = 20;
        } else if (dificuldade === 'deus') {
            tamanhoAlvo = 25;
            tempoInicial = 10;
        }
        dificuldadeAtual = dificuldade;
        pontos = 0;
        $('#pontos').text('Pontuação: ' + pontos);
        tempo = tempoInicial;
        $('#tempo').text('Tempo: ' + tempo + 's');
        $('#galinha').css({ height: tamanhoAlvo + 'px', width: 'auto' });
        $('#brocolis').css({ height: tamanhoAlvo + 'px', width: 'auto' });
        atualizarRecorde();
    }

    function mover() {
        let left = Math.floor(Math.random() * ($('#tela-do-jogo').width() - $('#galinha').width()));
        let top = Math.floor(Math.random() * ($('#tela-do-jogo').height() - $('#galinha').height()));

        let chance = Math.random();
        let elementoAtual;

        if (chance < 0.9) {
            elementoAtual = '#galinha';
            $('#brocolis').hide();
        } else {
            elementoAtual = '#brocolis';
            $('#galinha').hide();
        }

        $(elementoAtual).css({
            left: left + 'px',
            top: top + 'px',
            position: 'absolute'
        }).show();

        clearTimeout(tempoLimite);
        tempoLimite = setTimeout(mover, 1000);
    }

    function atualizarPontos() {
        pontos++;
        $('#pontos').text('Pontuação: ' + pontos);
    }

    function atualizarTempo() {
        tempo--;
        $('#tempo').text('Tempo: ' + tempo + 's');

        if (tempo <= 0) {
            $('#galinha').hide();
            $('#brocolis').hide();
            salvarRecorde(dificuldadeAtual, pontos);
            $('#pontuacao-final').text(pontos);
            $('#modal').show();
            clearInterval(intervalo);
            clearTimeout(tempoLimite);
        }
    }

    function reiniciarJogo() {
        $('#modal').hide();
        ajustarDificuldade();
        mover();
        intervalo = setInterval(atualizarTempo, 1000);
    }

    $('#galinha').click(function() {
        if (tempo > 0) {
            atualizarPontos();
            mover();
            yam.currentTime = 0;
            yam.play();
        }
    });

    $('#brocolis').click(function() {
        if (tempo > 0) {
            pontos -= 2;
            if (pontos < 0) pontos = 0;
            $('#pontos').text('Pontuação: ' + pontos);
            mover();
            burp.currentTime = 0;
            burp.play();
        }
    });

    $('#tela-do-jogo').click(function(event) {
        if (tempo > 0 && !$(event.target).is('#galinha, #brocolis')) {
            pontos--;
            if (pontos < 0) pontos = 0;
            $('#pontos').text('Pontuação: ' + pontos);
        }
    });

    $('#dificuldade').change(function() {
        ajustarDificuldade();
    });

    $('#reiniciar').click(function() {
        reiniciarJogo();
    });

    ajustarDificuldade();
    mover();
    intervalo = setInterval(atualizarTempo, 1000);
});

document.addEventListener("DOMContentLoaded", function() {
    var audio = document.getElementById("musica-fundo");
    var musicButton = document.getElementById("toggle-music");
    var musicIcon = document.getElementById("music-icon");
    var isPlaying = true;

    // Inicialização: Reproduzir a música
    audio.play().catch(function() {
        document.body.addEventListener('click', function() {
            audio.play();
        }, { once: true });
    });

    // Alternar música e ícone
    musicButton.addEventListener("click", function() {
        if (isPlaying) {
            audio.pause();
            musicIcon.src = "imgs/music-off.png";
            musicIcon.alt = "Música Desligada";
        } else {
            audio.play();
            musicIcon.src = "imgs/music-on.png";
            musicIcon.alt = "Música Ligada";
        }
        isPlaying = !isPlaying;
    });
});













