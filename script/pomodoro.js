const tiempoIntervalosTrabajo = 25,
    tiempoIntervalosDescanso = 5,
    reloj = document.querySelector(".reloj"),
    btnPomodoro = document.querySelector("[data-btnPomodoro]"),
    btnReinicio = document.querySelector("[data-btnPomodoroReinicio]"),
    containerReloj = document.querySelector("[data-pomodoroTimer]"),
    descripcionPomodoro = document.querySelector("[data-pomodoroDescripcion]"),
    btnTrabajo = document.querySelector("[data-btnTrabajo]"),
    btnDescansoCorto = document.querySelector("[data-btnDescansoCorto]"),
    btnDescansoLargo = document.querySelector("[data-btnDescansoLargo]"),
    infoNroVuelta = document.querySelector("[data-infoVueltas]");

let tiempoActual,
    correrReloj,
    trabajoActivo = true,
    relojTerminado = true,
    estaPausado = false,
    nroVuelta = 0,
    nroEjecutacion = 0;
    btnReinicioActivo = false;


const fixTrabajar = () => {
    trabajoActivo = true;
    nroVuelta = 0;
    nroEjecutacion = 0;
    infoNroVuelta.innerHTML="Modo Trabajo"
}

const fixDescansoCorto = () => {
    trabajoActivo = false;
    nroVuelta = 0;
    nroEjecutacion = 0;
    infoNroVuelta.innerHTML= "Modo Descanso Rapido";
}

const fixDescansoLargo = () => {
    trabajoActivo = false;
    nroVuelta = 4;
    infoNroVuelta.innerHTML = "Modo Descanso Largo"
}

const agregarListenersAModoBtn = () => {
    btnTrabajo.addEventListener("click", fixTrabajar);
    btnDescansoCorto.addEventListener("click", fixDescansoCorto);
    btnDescansoLargo.addEventListener("click", fixDescansoLargo)

}

const esticaReinicio = () => {
    containerReloj.classList.remove("pomodoroTimerConcentrate");
    containerReloj.classList.remove("pomodoroTimerRelaxLargo");
    containerReloj.classList.remove("pomodoroTimerRelax");
    descripcionPomodoro.innerHTML = "Empezar!"
}

const esteticaTrabajar = () => {
    containerReloj.classList.add("pomodoroTimerConcentrate");
    containerReloj.classList.remove("pomodoroTimerRelaxLargo");
    containerReloj.classList.remove("pomodoroTimerRelax");
    descripcionPomodoro.innerHTML="Concentrate!!"

}

const esteticaRelax = () => {
    containerReloj.classList.remove("pomodoroTimerConcentrate");
    containerReloj.classList.add("pomodoroTimerRelax");
    descripcionPomodoro.innerHTML="A relajaaaaar"
}
const esteticaRelaxLargo = () => {
    containerReloj.classList.remove("pomodoroTimerConcentrate");
    containerReloj.classList.add("pomodoroTimerRelaxLargo");
    descripcionPomodoro.innerHTML="A relajaaaaar"
}

const configTrabajo = () => {
    trabajoActivo=false
    tiempoActual = tiempoIntervalosTrabajo *60;
    esteticaTrabajar();
}

const configRelaxLargo = () => {
    trabajoActivo=true;
    tiempoActual = tiempoIntervalosDescanso *60 * 3;
    esteticaRelaxLargo();
    nroEjecutacion =0;
    nroVuelta = 0;
}
const configRelaxCorto = () => {
    trabajoActivo=true;
    tiempoActual = tiempoIntervalosDescanso *60 ;
    esteticaRelax();
}




const seteoReloj = () => {
    if ((trabajoActivo) && (nroVuelta <= 4)) {
        configTrabajo();    
    } else if (nroVuelta === 4)  {
        configRelaxLargo();
    } else {
        configRelaxCorto();
    }
    relojTerminado=false;
    
    nroEjecutacion++;
    nroEjecutacion % 2 ===0? nroVuelta++ : nroVuelta;
    console.log("Ejecucion: ", nroEjecutacion)
    console.log("Vuelta: ", nroVuelta)
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
        correrReloj = setInterval(refrescarReloj, 1);
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
        agregarListenersAModoBtn();
        btnReinicioActivo?  btnReinicioActivo = false : cartel();
    }
    tiempoActual--;
}

const cartel = () =>{
    Swal.fire({
        title: 'Terminooo!',
        text: 'Dale play otra vez para seguir con el proximo bracket! No pierdas el ritmo!',
        icon: 'success',
        // confirmButtonText: 'Dale que va!',
        toast: true,
        position: "top-right",
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true
    })
}

const empezarReloj = () => {
    seteoReloj();
    modificarBtnPomodoro();
    infoNroVuelta.innerHTML = "Nro Vuelta: " + (Math.floor((nroEjecutacion-1)/2) +1);
    correrReloj = setInterval(refrescarReloj, 1);

    btnTrabajo.addEventRemove("click", fixTrabajar);
    btnDescansoCorto.addEventRemove("click", fixDescansoCorto);
    btnDescansoLargo.addEventRemove("click", fixDescansoLargo);
}


const reinicioPomodoro = () => {
    tiempoActual = 0;
    btnReinicioActivo= true;
    refrescarReloj();
    trabajoActivo = true,
    relojTerminado = true;
    estaPausado = false;
    nroVuelta = 0;
    nroEjecutacion = 0;
    esteticaPausa();
    esticaReinicio();
    infoNroVuelta.innerHTML ="";
}





btnPomodoro.addEventListener("click", empezarReloj)
btnReinicio.addEventListener("click", reinicioPomodoro);
agregarListenersAModoBtn();