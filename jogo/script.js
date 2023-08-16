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
const balaBill = document.querySelector('.bala')
const trofeu = document.querySelector('.trofeu')
//audio
const somMorte = document.getElementById('trilhaMorte')
const trilha1 = document.getElementById('trilha1')
const trilhaVitoria = document.getElementById('trilhaVitoria')
//variaveis preDeclaradas
let sensorVitoria = false
let morte = 0
let fase3 = false
let tamanhoMario = 120
let pulo = true
//start
const botaoStart = document.querySelector('.start')
let sensorStart = false
let contador =  0


    function start() {
        
        //tempo\\
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
        
        //funcionamento do start\\
        document.querySelector('.start').style.display= "none"
        comandos.style.display= 'none'
        gameBoard.style.display= "block"
        trilha1.play()
        trilha1.loop=true
        return sensorStart = true
    
}

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

document.addEventListener('keydown', jump)
document.addEventListener('mousedown', diminuir)
document.addEventListener('click', aumentar)

    function impacto(){
        const posicaoTubo = tubo.offsetLeft;
        const posicaoMario = +window.getComputedStyle(mario).bottom.replace('px','')
        if(posicaoTubo < 95 && posicaoMario <90 && posicaoTubo>0){

            tubo.style.animation= 'none'
            tubo.style.left= `${posicaoTubo}px`

            morte++
        }
    
//impacto koopaVoa
        const posicaoKoopa1 = koopaVoador1.offsetLeft
        const posicaoKoopa2 = koopaVoador2.offsetLeft
        const posicaoKoopa3 = koopaVoador3.offsetLeft

        if(posicaoKoopa1 <40 && posicaoMario<140 && posicaoKoopa1>0 && sensorStart == true){
            koopaVoador1.style.animation = "none"
            koopaVoador1.style.left= `${posicaoKoopa1}px`
            morte++

        }

        if(posicaoKoopa2 <40 && posicaoMario>140 && posicaoKoopa2>0 && sensorStart == true){
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

//caso morra  
        if(morte==1){
            //resetar pagina\\
            comandos.style.display= 'none'
            reset.style.display = "inline-block"
            function resetarPagina(){
                location.reload()
                
            }
            document.addEventListener('keyup', resetarPagina)
            trilha1.pause()
            somMorte.play()
            somMorte.volume = 0.9
            morte++
            console.log(morte)

            gameBoard.style.animation = 'none'
            mario.style.animation= 'none'
            mario.style.left= `${posicaoMario}px`

            
            
            mario.src="morte.png"
            mario.style.width="60px"
            if(fase3==true){
                fase3 = false
            } 
        }
}

    function vitoria(){
            gameBoard.style.animation = 'none'
            comandos.style.display= 'none'
            gameBoard.style.background = 'linear-gradient(rgb(19, 115, 224),white)'
            document.querySelector('.vitoria').style.display = 'inline-block'
            nuvem1.style.display = 'none'
            nuvem2.style.display = 'none'
            trilha1.pause()
            trilhaVitoria.play()
            trofeu.style.display= "none"
            mario.src="vitoria.png"
            mario.style.width= '60px'
            mario.style.left= `${50}%`
            mario.style.bottom= `${0}px`
            fase3 = false
            pulo = false
            sensorVitoria = true
    }

const loop = setInterval(impacto,10)




    function lancamentoDeInimigos(){
        //fase2
        if(contador == 100){
            gameBoard.style.background = 'linear-gradient(red,white)'
            tubo.style.display = "none"
            koopaVoador1.style.display = "block"
            koopaVoador2.style.display = "block"
            koopaVoador3.style.display = "block"
            console.log("fase 2")
        }
        //fase 3
        if(contador==250){
//tudo.style apenas para teste da fase 3            
//            tubo.style.display = "none"
            comandos.innerHTML= 'Click for <a>DECREASE</a>'
            comandos.style.display= 'inline-block'
            gameBoard.style.background = 'linear-gradient(black,white)'
            //tubo.style.display = "block"
            koopaVoador1.style.display= "none"
            koopaVoador2.style.display = "none"
            koopaVoador3.style.display = "none"
            balaBill.style.display= "block"
            console.log("fase 3")
            return fase3 = true
        }
        if(contador==300){
            trofeu.style.display = 'block'
        }

    }

setInterval(lancamentoDeInimigos,100)
