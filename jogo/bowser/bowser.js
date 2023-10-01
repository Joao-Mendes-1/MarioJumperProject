const gameBoard = document.querySelector('.game-board')
const comandos = document.querySelector('.comandos')
const contadorPontos = document.querySelector('.contador-pontos')
const reset = document.querySelector('.reset')
const mario = document.querySelector('.mario')
const fireFlower = document.querySelector('.fireFlower')
const fireBall = document.querySelector('.fireBall')
const bowser = document.querySelector('.bowser')
const morteBowser = document.querySelector('.morteBowser')
const casco = document.querySelector('.casco')
const koopaLemmy= document.querySelector('.koopaLemmy')
const fantasma = document.querySelector('.fantasma')
const balaBoss = document.querySelector('.balaBoss')
//audio
const somMorte = document.getElementById('trilhaMorte')
const trilhaBowser = document.getElementById('trilhaBowser')
const trilhaVitoria = document.getElementById('trilhaVitoria')

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

//start
const botaoStart = document.querySelector('.start')
let sensorStart = false
let contador =  0

function start() {
    //tempo\\
    function contarTempo(){
        if(morte==0 && sensorVitoria == false){
            contarPonto()
        return contador++

        } 
    }
    setInterval(contarTempo,100)

    function contarPonto(){
        contadorPontos.innerHTML = contador
    }
    
    document.querySelector('.start').style.display= "none"
    gameBoard.style.display= "block"
    trilhaBowser.play()
    trilhaBowser.loop=true
    return sensorStart = true

}

botaoStart.onclick = start
document.addEventListener("keypress", function(event,which){
    if(event.which === 32 && sensorStart === false){
        start()
    }
})

function sumirComBowser(){
    morteBowser.style.display = "none"
    contador = 15000000
    contadorPontos.innerHTML = contador

}
function vitoria () {
    if(contador <350){
    fantasma.style.display= "none"
    koopaLemmy.style.display= "none"
    bowser.style.display= "none"
    morteBowser.style.display="block"
    disparar = false
    pulo = false
    setInterval(sumirComBowser,1000)
    trilhaBowser.pause()
    trilhaVitoria.play()
    }
}

document.addEventListener('keydown', jump)
document.addEventListener('mousedown', dispararFireball)

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




function stopInimigos() {
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

function stopFantasma() {
    if(dispararFantasmaSensor==false){
        fantasma.classList.remove('fantasmaAnimation')
        fantasma.style.display= "none"
        return dispararFantasmaSensor = true
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

function dispararFase1() {
    if(dispararCascoSensor==true && sensorStart==true && contador<50){
        casco.style.display = "block"
        casco.classList.add('cascoAnimation')
        setTimeout(stopInimigos,500)
        return dispararCascoSensor = false
    }else if(dispararLemmySensor == true && contador>50 && contador<350){
        koopaLemmy.style.display = "block"
        koopaLemmy.classList.add('koopaLemmyAnimation')
        setTimeout(stopInimigos,880)
        return dispararLemmySensor = false
    }
}
function final (){
    if(contador==351 && vidaBowser>0){
        koopaLemmy.style.display = "none"
        bowser.style.display="none"
        balaBoss.style.display ="block"
        balaBoss.classList.add('balaBossAnimation')
    }

}


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


// impacto
function impacto(){
    const posicaoBowser = +window.getComputedStyle(bowser).left.replace('px','')
    const posicaoMario = +window.getComputedStyle(mario).left.replace('px','')
    const posicaoFireBall = +window.getComputedStyle(fireBall).left.replace('px','')
    const posicaoCasco = +window.getComputedStyle(casco).left.replace('px','')
    const posicaoLemmy = +window.getComputedStyle(koopaLemmy).left.replace('px','')
    const posicaoFantasma = +window.getComputedStyle(fantasma).left.replace('px','')
    const posicaoBalaBoss = +window.getComputedStyle(balaBoss).left.replace('px','')

    //hitBowser
    bowser.classList.remove('hitEfect')
    
//fireBall
    if(posicaoFireBall>=posicaoBowser){
        fireBall.style.display = "none"
        vidaBowser -- 
        bowser.classList.add('hitEfect')
    }
    if(posicaoFireBall>=posicaoFantasma && fireBallJump==true&& pulo == false){
        fireBall.style.display = "none"
        fantasma.style.display = "none"
        
    }

//casco, lemmy e fantasma
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

//caso morra  
    if(morte>=1 && morte<3){
        //resetar pagina\\
        function resetarPagina(){
        location.reload()
        }
        document.addEventListener('keyup', resetarPagina)
        trilhaBowser.pause()
        somMorte.play()
        somMorte.volume = 0.9
        morte++
        console.log(morte)
        dispararCascoSensor = false
        gameBoard.style.animation = 'none'
        mario.style.animation= 'none'
        disparar = false
        mario.src="../../style/imagens/morte.png"
        mario.style.width="60px"
        mario.style.left = "50px"
        mario.style.top = "250px"
    }
    if(vidaBowser<1){
    vitoria()
    return sensorVitoria = true
    }
}
const loop = setInterval(impacto,100)
setInterval(dispararFase1,100)
setInterval(dispararFantasmaFunction,1500)
setInterval(final,100)
