// const btnAgergar = document.querySelector(btnAgergar);
const btn = {
    agregar: document.querySelector(".btnAgregar"),
    sacar: document.querySelectorAll(".btnSacar"),
    completo: document.querySelectorAll(".btnCompleto")
}
const nuevaTarea = document.querySelector("#textoAgregar")
const portaLista = document.querySelector(".portaLista")
const tareas =[];

class tarea {
    constructor(tarea, prioridad){
        this.tarea = tarea,
        this.prioridad = prioridad
    }
}

const validarIngreso = () => {
    console.log(nuevaTarea.value.trim())
    if (!(nuevaTarea.value.trim()==="")){
        nuevaTarea.className = "tareaInvalida"
        // nuevaTarea.classList.add("tareaInvalida")
        // nuevaTarea.classList.remove("tareaValida")
        
    }else{
        nuevaTarea.className = "tareaValida"
        // nuevaTarea.classList.remove("tareaInvalida")
        // nuevaTarea.classList.add("tareaValida")
    }
    
    
}
nuevaTarea.addEventListener("input", validarIngreso);

const dibujarTabla = () => {
    portaLista.innerHTML="";
    // tareas.sort(function(a, b) {return a-b});
    for (cadaTarea of tareas){
        portaLista.innerHTML+= `<div><label for="">Nro:</label><input class="prioridad" type="number" disabled value="${cadaTarea.prioridad+1}"><label for="tarea">Tarea: </label><p class="tarea">${cadaTarea.tarea}</p><input type="button" class="btn btnCompleto" value="✓" onclick="tareaCumplida()"><input class="btn btnSacar"type="button" onclick="sacarTarea()" value="✘"></div>`;
    }
}
// const sacarTarea = (e) => {
//     console.log(e.target.classList);
//     if (e.target.classList.contains("btnSacar")){
//         const prioridadTarea = e.target.getAttribute("id");
        
//     }
//     dibujarTabla();
// }

const agregarTarea = () => {
    const tareaAAgregar = new tarea(nuevaTarea.value, tareas.length) //Falta validar el ingreso
    tareas.push(tareaAAgregar);
    dibujarTabla();
    nuevaTarea.value="";
    console.log(btn.sacar)
}
btn.agregar.addEventListener("click", agregarTarea);
// btn.sacar.addEventListener("click", sacarTarea);
