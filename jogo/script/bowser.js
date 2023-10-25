//obj
const gameBoard = document.querySelector('.game-board')
const comandos = document.querySelector('.comandos')
const contadorPontos = document.querySelector('.contador-pontos')
const reset = document.querySelector('.reset')
const mario = document.querySelector('.mario')
const fireBall = document.querySelector('.fireBall')
const bowser = document.querySelector('.bowser')
const morteBowser = document.querySelector('.morteBowser')
const casco = document.querySelector('.casco')
const koopaLemmy= document.querySelector('.koopaLemmy')
const fantasma = document.querySelector('.fantasma')
const balaBill = document.querySelector('.balaBill')
const botaoStart = document.querySelector('.start')
//audio
const somMorte = document.getElementById('trilhaMorte')
const trilhaBowser = document.getElementById('trilhaBowser')
const trilhaVitoria = document.getElementById('trilhaVitoria')
//variaveis pré declaradas
let sensorVitoria = false
let morte = 0
let tamanhoMario = 120
let pulo = true
let disparar = true
let vidaBowser = 10
let inimigoFase1 = true
let dispararLemmySensor = true
let dispararCascoSensor = true
let dispararFantasmaSensor = true
let fireBallJump = false
let sensorStart = false
let contador =  0


//start
function start() {
//tempo
    function contarTempo(){
        if(morte==0 && sensorVitoria == false){
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
    gameBoard.style.display= "block"
    trilhaBowser.play()
    trilhaBowser.loop=true
    return sensorStart = true

}

//eventos para iniciar o jogo
botaoStart.onclick = start
document.addEventListener("keypress", function(event,which){
    if(event.which === 32 && sensorStart === false){
        start()
    }
})


function vitoria () {
    if(contador <350){
    fantasma.style.display= "none"
    koopaLemmy.style.display= "none"
    bowser.style.display= "none"
    morteBowser.style.display="block"
    disparar = false
    pulo = false
    setInterval(vitoriaConsequencia,1000)
    trilhaBowser.pause()
    trilhaVitoria.play()
    }
}
function vitoriaConsequencia(){
    morteBowser.style.display = "none"
    contador = 15000000
    contadorPontos.innerHTML = contador
}

//comandos do mario
document.addEventListener('keydown', jump)
document.addEventListener('mousedown', dispararFireball)

//lógica do comando disparar fireball
function dispararFireball() {
    if(disparar==true && pulo==false && sensorVitoria==false){
        fireBall.style.display = "block"
        fireBall.classList.add('fireBallAnimationJump')
        setTimeout(stopFireBall,1700)
        
        fireBallJump = true
        return disparar = false
    }else if (disparar==true && sensorVitoria==false){
        fireBall.style.display = "block"
        fireBall.classList.add('fireBallAnimation')
        setTimeout(stopFireBall,1700)
        return disparar = false
    }

}

function stopFireBall() {
    fireBall.classList.remove('fireBallAnimation','fireBallAnimationJump')
    fireBall.style.display= "none"
    fireBallJump = false
    return disparar = true
}
//lógica do comando jump
function jump() {
    if(pulo==true){
        mario.classList.add('jump')
        setTimeout(stopJump,500)
        return pulo=false
    }
}

function stopJump() {
    mario.classList.remove('jump')
    return pulo = true
}

//lógica lançamento de fases e inimigos

function dispararFase1() {
    if(dispararCascoSensor==true && sensorStart==true && contador<50){
        casco.style.display = "block"
        casco.classList.add('cascoAnimation')
        setTimeout(stopFase1,500)
        return dispararCascoSensor = false
    }else if(dispararLemmySensor == true && contador>50 && contador<350){
        koopaLemmy.style.display = "block"
        koopaLemmy.classList.add('koopaLemmyAnimation')
        setTimeout(stopFase1,880)
        return dispararLemmySensor = false
    }
}

function stopFase1() {
    if(dispararCascoSensor == false){
        casco.classList.remove('cascoAnimation')
        casco.style.display= "none"
        return dispararCascoSensor = true
    }else{
        koopaLemmy.classList.remove('koopaLemmyAnimation')
        koopaLemmy.style.display= "none"
        return dispararLemmySensor = true
    }
}

function dispararFantasmaFunction(){
    if(sensorStart==true && contador>100 &&  contador < 310 &&dispararFantasmaSensor==true){
        fantasma.style.display = "block"
        fantasma.classList.add('fantasmaAnimation')
        setTimeout(stopFantasma,1900)
        return dispararFantasmaSensor = false
    }
}

function stopFantasma() {
    if(dispararFantasmaSensor==false){
        fantasma.classList.remove('fantasmaAnimation')
        fantasma.style.display= "none"
        return dispararFantasmaSensor = true
        }
}

//final antecipado
function final (){
    if(contador==351 && vidaBowser>0){
        koopaLemmy.style.display = "none"
        bowser.style.display="none"
        balaBill.style.display ="block"
        balaBill.classList.add('balaBillAnimation')
    }
}

//lógica de impacto
function impacto(){
    const posicaoBowser = +window.getComputedStyle(bowser).left.replace('px','')
    const posicaoMario = +window.getComputedStyle(mario).left.replace('px','')
    const posicaoFireBall = +window.getComputedStyle(fireBall).left.replace('px','')
    const posicaoCasco = +window.getComputedStyle(casco).left.replace('px','')
    const posicaoLemmy = +window.getComputedStyle(koopaLemmy).left.replace('px','')
    const posicaoFantasma = +window.getComputedStyle(fantasma).left.replace('px','')
    const posicaoBalaBoss = +window.getComputedStyle(balaBill).left.replace('px','')

//efeito da fireball no bowser
    bowser.classList.remove('hitEfect')
    
//fireBall impacto
    if(posicaoFireBall>=posicaoBowser){
        fireBall.style.display = "none"
        vidaBowser -- 
        bowser.classList.add('hitEfect')
    }
    if(posicaoFireBall>=posicaoFantasma && fireBallJump==true&& pulo == false){
        fireBall.style.display = "none"
        fantasma.style.display = "none"
        
    }

//casco, lemmy e fantasma impacto
    if(posicaoMario>=posicaoCasco && pulo==true){
        casco.style.left= `50px`
        return morte++
    }
    if(posicaoMario>=posicaoBalaBoss){
        return morte++
    }
    if(posicaoMario>=posicaoLemmy && pulo==true){
        koopaLemmy.style.left= `50px`
        return morte++
    }
    if(posicaoMario>=posicaoFantasma && pulo==false){
        fantasma.style.left= `50px`
        return morte++
    }

//evento de morte
    if(morte>=1 && morte<3){
///efeitos sonoros e visuais da morte
        trilhaBowser.pause()
        somMorte.play()
        somMorte.volume = 0.9
        morte++
        console.log(morte)
        dispararCascoSensor = false
        gameBoard.style.animation = 'none'
        mario.style.animation= 'none'
        disparar = false
        mario.src="../style/imagens/morte.png"
        mario.style.width="60px"
        mario.style.left = "50px"
        mario.style.top = "250px"
//resetar pagina
        function resetarPagina(){
            location.reload()
        }
        document.addEventListener('keyup', resetarPagina)
    }
//morte do bowser    
    if(vidaBowser<1){
    vitoria()
    return sensorVitoria = true
    }
}

//loops para o circular do jogo
const loop = setInterval(impacto,100)
setInterval(dispararFase1,100)
setInterval(dispararFantasmaFunction,1500)
setInterval(final,100)
