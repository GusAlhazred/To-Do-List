const btn = {
    agregar: document.querySelector("[data-btn-agregar]")
}
const listaTareas = []

class DatosTarea {
    constructor (ingresoTarea, prioridadTarea){
        this.tarea = ingresoTarea,
        this.prioridadTarea = prioridadTarea,
        this.id= listaTareas.length;
    }
}
let nroTarea=0;

const completarTarea = (e) => {
    const btn = e.target;
    const padre = e.target.parentElement;
    console.log(padre)
    padre.classList.toggle("tareaCompleta");

}


const generarBtnDone = () => {
    // <input type="button" class="btn btnCompleto" value="✓" data-btn-done${nroTarea}>
    const btnDone = document.createElement("input");
    btnDone.type="button";
    btnDone.classList.add("btn", "btnCompleto");
    btnDone.value="✓"
    btnDone.id=`btnDone${listaTareas.length}`;
    btnDone.addEventListener("click", completarTarea);
    return btnDone;
}
const borrarTarea = (e) => {
    const padre = e.target.parentElement;
    padre.remove()
}
const generarBtnBorrar = () => {
    //<input class="btn btnSacar"type="button" value="✘"> 
    const btnBorrar = document.createElement("input");
    btnBorrar.type="button";
    btnBorrar.classList.add("btn", "btnSacar");
    btnBorrar.value="✘"
    btnBorrar.id=`btnSacar${listaTareas.length}`;
    btnBorrar.addEventListener("click", borrarTarea);
    return btnBorrar;
}
const generarNroTarea = () => {
    // <label for="">Nro:</label><input class="prioridad" type="number" value="${nroTarea}" disabled></input>
    const nroTareaInput = document.createElement("input");
    nroTareaInput.type = "number";
    nroTareaInput.classList.add("prioridad")
    nroTareaInput.value=listaTareas.length+1;
    nroTareaInput.disabled= true;
    return nroTareaInput;
}
const generarLblNroTarea=() => {
    const lblNroTarea = document.createElement("label");
    lblNroTarea.innerText = "Nro: ";
    return lblNroTarea;
}

const generarDescripcionTarea = (tarea) => {
    const descripcionTarea = document.createElement("p");
    descripcionTarea.innerText = tarea;
    descripcionTarea.classList.add("tarea")
    return descripcionTarea;
}


const crearTarea = (evento) => {
    evento.preventDefault();
    const nroTarea = listaTareas.length+1;
    const inputTarea = document.querySelector("[data-txt-agregar]"); //Input
    const value = inputTarea.value; 
    const tareaDatos = new DatosTarea(value,nroTarea);                            
    inputTarea.value= "";
    const lista = document.querySelector("[data-lista-tareas]"); //Contenedor tareas
    const tarea = document.createElement("div"); //cada tarea
    tarea.appendChild(generarLblNroTarea());
    tarea.appendChild(generarNroTarea());
    tarea.appendChild(generarDescripcionTarea(value));
    tarea.appendChild(generarBtnDone());
    tarea.appendChild(generarBtnBorrar());
    console.log(tarea);
    lista.appendChild(tarea);
    listaTareas.push(tareaDatos);
    console.log(listaTareas)
}


btn.agregar.addEventListener("click", crearTarea)


