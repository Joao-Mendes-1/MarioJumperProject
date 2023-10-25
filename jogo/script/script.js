//obj
const gameBoard = document.querySelector('.game-board')
const comandos = document.querySelector('.comandos')
const contadorPontos = document.querySelector('.contador-pontos')
const reset = document.querySelector('.reset')
const nuvem1 = document.querySelector('.nuvem1')
const nuvem2 = document.querySelector('.nuvem2')
const mario = document.querySelector('.mario')
const tubo = document.querySelector('.tubo')
const koopaVoador1 = document.querySelector('.koopa-voa1')
const koopaVoador2 = document.querySelector('.koopa-voa2')
const koopaVoador3 = document.querySelector('.koopa-voa3')
const balaBill = document.querySelector('.balaBill')
const trofeu = document.querySelector('.trofeu')
const key = document.querySelector('.key')
const usarChave = document.querySelector('.finalBoss')
const mensagem = document.getElementById('mensagem')
const portaBowser = document.querySelector('.portaBowser')
const botaoStart = document.querySelector('.start')
//audio
const somMorte = document.getElementById('trilhaMorte')
const trilha1 = document.getElementById('trilha1')
const trilhaVitoria = document.getElementById('trilhaVitoria')
//variaveis pré declaradas
let sensorVitoria = false
let morte = 0
let keyPoint = false
let fase3 = false
let tamanhoMario = 120
let pulo = true
let sensorStart = false
let contador = 0

//start
    function start() {
        
//tempo
        function contarTempo(){
            if(morte==0 && sensorVitoria == false){
                console.log(contador)
                contarPonto()
                return contador++
            } 
        }
        setInterval(contarTempo,100)
//contar ponto
        function contarPonto(){
            contadorPontos.innerHTML = contador
        }
        
//funcionamento do start
        document.querySelector('.start').style.display= "none"
        comandos.style.display= 'none'
        gameBoard.style.display= "block"
        trilha1.play()
        trilha1.loop=true
        return sensorStart = true
    
}
//eventos para iniciar o jogo
botaoStart.onclick = start
document.addEventListener("keypress", function(event,which){
    if(event.which === 32 && sensorStart === false){
        start()
    }
})

//lógica do jogo
//mario
    function stopJump() {
        mario.classList.remove('jump')
    }
    function jump() {
        if(pulo==true){
            mario.classList.add('jump')
            setTimeout(stopJump,500)

        }

    }
    function diminuir(){
        if(fase3==true){
            mario.style.width = "90px"
            pulo = false
            return tamanhoMario = 90
            
        }
        
    }
    function aumentar(){
        if(fase3==true){
            mario.style.width = "120px"
            pulo = true
            return tamanhoMario = 120
        }
        
    }
//comandos do Mario
document.addEventListener('keydown', jump)
document.addEventListener('mousedown', diminuir)
document.addEventListener('click', aumentar)

//lógica dos impactos
    function impacto(){

//instanciando o impacto do objeto "mario"
        const posicaoMario = +window.getComputedStyle(mario).bottom.replace('px','')
        
//instanciando o impacto do objeto "tubo"
        const posicaoTubo = tubo.offsetLeft;
//lógica do impacto tubo
        if(posicaoTubo < 95 && posicaoMario <90 && posicaoTubo>0){

            tubo.style.animation= 'none'
            tubo.style.left= `${posicaoTubo}px`

            morte++
        }
    
//instanciando o impacto dos objetos "koopaVoador"
        const posicaoKoopa1 = koopaVoador1.offsetLeft
        const posicaoKoopa2 = koopaVoador2.offsetLeft
        const posicaoKoopa3 = koopaVoador3.offsetLeft
//lógica do impacto koopaVoa
        if(posicaoKoopa1 <40 && posicaoMario<140 && posicaoKoopa1>0 && sensorStart == true){
            koopaVoador1.style.animation = "none"
            koopaVoador1.style.left= `${posicaoKoopa1}px`
            morte++

        }

        if(posicaoKoopa2 <40 && posicaoMario>130 && posicaoKoopa2>0 && sensorStart == true){ //o mais alto
            koopaVoador2.style.animation = "none"
            koopaVoador2.style.left= `${posicaoKoopa2}px`
            morte++

        }

        if(posicaoKoopa3 <40 && posicaoMario<165 && posicaoKoopa3>0 && sensorStart == true){
            koopaVoador3.style.animation = "none"
            koopaVoador3.style.left= `${posicaoKoopa3}px`
            morte++

        }
    
    
    
//impacto bala
        const posicaoBala = balaBill.offsetLeft

        if(posicaoBala < 95 && posicaoBala<0 && tamanhoMario>90  && sensorStart == true){
            
            balaBill.style.left= `${posicaoBala}px`
            morte++

        } 
//impacto trofeu
        const posicaoTrofeu = trofeu.offsetLeft    
    
        if(posicaoTrofeu<70 && posicaoMario>10 &&  posicaoTrofeu > 0 && sensorStart==true && fase3==true){
            balaBill.style.display = 'none'
            trofeu.style.left= `${posicaoTrofeu}px`

            vitoria()
        }
//impacto key
        const posicaoKey = key.offsetLeft
        
        if(posicaoKey<70 && posicaoMario<35 &&  posicaoKey > 0 && sensorStart==true){
            keyPoint = true
            key.style.display = "none"
        }


//evento de morte
        if(morte==1){
//efeitos sonoros e visuais da morte
            trilha1.pause()
            somMorte.play()
            somMorte.volume = 0.9
            morte++
            console.log(morte)
            gameBoard.style.animation = 'none'
            mario.style.animation= 'none'
            mario.style.left= `${posicaoMario}px`
            mario.src="style/imagens/morte.png"
            mario.style.width="60px"
            if(fase3==true){
                fase3 = false
            } 
//reset da pagina
            comandos.style.display= 'none'
            reset.style.display = "inline-block"
            function resetarPagina(){
                location.reload()
            }
            document.addEventListener('keyup', resetarPagina)
        }
}

//vencer o jogo
    function vitoria(){
//desaparecimento dos objetos presentes na tela
            gameBoard.style.animation = 'none'
            comandos.style.display= 'none'
            gameBoard.style.background = 'linear-gradient(rgb(19, 115, 224),white)'
            nuvem1.style.display = 'none'
            nuvem2.style.display = 'none'
            trofeu.style.display= "none"
//aparecimento de alguns objetos na tela
            document.querySelector('.vitoria').style.display = 'inline-block'
            mario.src="style/imagens/vitoria.png"
            mario.style.width= '60px'
            mario.style.left= `${50}%`
            mario.style.bottom= `${0}px`
//mostrar opção chave
            usarChave.style.display = "flex"
//efeitos sonoros
            trilha1.pause()
            trilhaVitoria.play()
//desativando comandos iniciais
            fase3 = false
            pulo = false
            sensorVitoria = true
    }

//loop presente para o circular continuo da função "impacto" dentro do jogo
const loop = setInterval(impacto,10)

//o lançamento constante de inimigos nas fases 2 e 3
    function lancamentoDeInimigos(){
//fase2 inicia no número 100 do contador
        if(contador == 100){
//efeitos visuais e desaparecimento do objeto "tubo"
            gameBoard.style.background = 'linear-gradient(red,white)'
            tubo.style.display = "none"
            koopaVoador1.style.display = "block"
            koopaVoador2.style.display = "block"
            koopaVoador3.style.display = "block"
            key.style.display = "block"
        }

//desaparecer a key entre a fase 2 e 3
        if(contador >=140){
            key.style.display = "none"
        }

//fase 3 inicia no número 250 do contador
        if(contador==250){
//tubo.style apenas para teste da fase 3            
            //tubo.style.display = "none"
//avisos de comando para a fase 3
            comandos.innerHTML= 'Click for <a>DECREASE</a>'
            comandos.style.display= 'inline-block'
//efeitos visuais e desaparecimento dos objetos "koopa"
            gameBoard.style.background = 'linear-gradient(black,white)'
            koopaVoador1.style.display= "none"
            koopaVoador2.style.display = "none"
            koopaVoador3.style.display = "none"
            balaBill.style.display= "block"
//retorno da fase3 = true para o funcionamento de elementos presentes apenas na fase3: trofeu, comandos do mario
            return fase3 = true
        }
//lançamento do objeto trofeu
        if(contador==300){
            trofeu.style.display = 'block'
        }
    }
//loop do lançamento de inimigos para o funcionar do jogo
setInterval(lancamentoDeInimigos,100)

//criação da fase do bowser

//verificação da chave na porta do bowser
function mostrarFase(){
    if(keyPoint == true){
    usarChave.style.display = "none"
    portaBowser.style.display = "flex"
    }else{
        usarChave.style.display = "none"
        mensagem.style.display = "flex"
    }
}

//link do index do bowser
let url = "bowser/bowser.html"

//função de entrar no link
function entrar(url){
    let win = window.open(url, '_blank')
    win.focus()
}

//evento do click na porta
usarChave.addEventListener('click', mostrarFase)
portaBowser.addEventListener('click', function(){
    entrar(url)
})