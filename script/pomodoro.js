const tiempoIntervalosTrabajo = 25,
    tiempoIntervalosDescanso = 5,
    reloj = document.querySelector(".reloj"),
    btnPomodoro = document.querySelector("[data-btnPomodoro]"),
    btnReinicio = document.querySelector("[data-btnPomodoroReinicio]"),
    containerReloj = document.querySelector("[data-pomodoroTimer]"),
    descripcionPomodoro = document.querySelector("[data-pomodoroDescripcion]");

let tiempoActual,
    correrReloj,
    trabajoActivo = true,
    relojTerminado = true;
    estaPausado = false;

const esticaReinicio = () => {
    containerReloj.classList.remove("pomodoroTimerConcentrate");
    containerReloj.classList.remove("pomodoroTimerRelax");
    descripcionPomodoro.innerHTML = "Empezar!"
}

const esteticaTrabajar = () => {
    containerReloj.classList.add("pomodoroTimerConcentrate");
    containerReloj.classList.remove("pomodoroTimerRelax");
    descripcionPomodoro.innerHTML="Concentrate!!"

}

const esteticaRelax = () => {
    containerReloj.classList.remove("pomodoroTimerConcentrate");
    containerReloj.classList.add("pomodoroTimerRelax");
    descripcionPomodoro.innerHTML="A relajaaaaar"
}

const seteoReloj = () => {
    if (trabajoActivo){
        trabajoActivo=false
        tiempoActual = tiempoIntervalosTrabajo *60;
        esteticaTrabajar();
    } else {
        trabajoActivo=true;
        tiempoActual = tiempoIntervalosDescanso *60;
        esteticaRelax();
    }
    relojTerminado=false
}

const esteticaPausa= () => {
    btnPomodoro.innerHTML = `<i class="fa-solid fa-play"></i>`;
}

const esteticaPlay = () => {
    btnPomodoro.innerHTML = `<i class="fa-solid fa-pause"></i>`;
}

const pausarReloj = () => {
    if (estaPausado){
        estaPausado = false;
        correrReloj = setInterval(refrescarReloj, 1000);
        esteticaPlay();
    } else {
        estaPausado = true;
        clearInterval(correrReloj);
        esteticaPausa();
    }
}


const modificarBtnPomodoro = () => {
    if (relojTerminado){
        btnPomodoro.removeEventListener("click", pausarReloj);
        btnPomodoro.addEventListener("click", empezarReloj);
        esteticaPausa();
    } else {
        btnPomodoro.removeEventListener("click", empezarReloj);
        btnPomodoro.addEventListener("click", pausarReloj);
        esteticaPlay();
    }
    
}

const refrescarReloj = () => {
    let minutos = Math.floor(tiempoActual/60);
    let segundos = tiempoActual % 60;
    
    minutos < 10? minutos= "0"+minutos : minutos;
    segundos < 10? segundos= "0"+segundos : segundos;
    reloj.innerHTML = `${minutos}:${segundos}`;
    if (tiempoActual <= 0){
        clearInterval(correrReloj);
        console.log(correrReloj);
        relojTerminado=true;
        modificarBtnPomodoro();
    }
    tiempoActual--;
}

const empezarReloj = () => {
    seteoReloj();
    modificarBtnPomodoro();
    correrReloj = setInterval(refrescarReloj, 1000);
    console.log(correrReloj);

}


const reinicioPomodoro = () => {
    tiempoActual = 0;
    refrescarReloj()
    trabajoActivo = true,
    relojTerminado = true;
    estaPausado = false;
    esteticaPausa()
    esticaReinicio()
    
}

btnPomodoro.addEventListener("click", empezarReloj)
btnReinicio.addEventListener("click", reinicioPomodoro);
