function start() { // Inicio da função start()

    $("#inicio").hide();
    $("#comecar").html(" <div class='main-game'>" +
                            "<div class='genius'>" +
                                "<div class='azul'></div>" +
                                "<div class='amarelo'></div>" +
                                "<div class='vermelho'></div>" +
                                "<div class='verde'></div>" +
                            "</div>" +
                        "</div>");
                        
    let order = [];
    let clickedOrder = [];
    let score = 0;

    //0 - verde
    //1 - vermelho
    //2 - amarelo
    //3 - azul

    const azul = document.querySelector('.azul');
    const vermelho = document.querySelector('.vermelho');
    const verde = document.querySelector('.verde');
    const amarelo = document.querySelector('.amarelo');


    //cria ordem aleatória de cores
    let shuffleOrder = () => {
        let colorOrder = Math.floor(Math.random() * 4);
        order[order.length] = colorOrder;
        clickedOrder = []

        for(let i in order){
            let elementColor = createColorElement(order[i]);
            lightColor(elementColor, Number(i) + 1);
        }
    }

    //acender a próxima cor
    let lightColor = (elementColor, Number) => {
        Number = Number * 500;
        setTimeout(() => {
            elementColor.classList.add('selecionada');
        }, Number - 250);
        setTimeout(() => {
            elementColor.classList.remove('selecionada');
        }, 500);

    }

    //checa se os botões clicados são os mesmos da ordem gerada no jogo
    let checkOrder = () => {
        for(let i in clickedOrder) {
            if(clickedOrder[i] != order[i]) {
                gameover();
                break;
            }
        }
        
        if(clickedOrder.length == order.length) {
            alert(`Pontuação: ${score}\nVocê acertou! Iniciando próximo nível!`);
            nextLevel();
        }
    }

    //função para o clique do usuário
    let click = (color) => {
        clickedOrder[clickedOrder.length] = color;
        createColorElement(color).classList.add('selecionada');

        setTimeout(() => {
            createColorElement(color).classList.remove('selecionada');
            checkOrder();
        },250);

    }

    //função que retorna a cor
    let createColorElement = (color) => {
        if(color == 0) {
            return verde;
        } else if(color == 1){
            return vermelho;
        } else if(color == 2){
            return amarelo;
        } else if(color == 3){
            return azul;
        }
    }

    //função para próximo nivel
    let nextLevel = () => {
        score++;
        shuffleOrder();
    }

    //função para game over
    let gameover = () => {
        alert(`Pontuação: ${score}!\Você perdeu o jogo!\nClique em OK para iniciar um novo jogo!`);

        order = [];
        clickedOrder = [];

        playgame();
    }

    //função para iniciar o jogo
    let playgame = () => {
        alert('Bem-vindo ao game! Iniciando novo jogo!');
        score = 0;

        nextLevel();
    }

    // verde.addEventListener('click', click(0));
    // vermelho.addEventListener('click', click(1));
    // amarelo.addEventListener('click', click(2));
    // azul.addEventListener('click', click(3));

    verde.onclick = () => click(0);
    vermelho.onclick = () => click(1);
    amarelo.onclick = () => click(2);
    azul.onclick = () => click(3);

    //inicio do jogo
    playgame();

}