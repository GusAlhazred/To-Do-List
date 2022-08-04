const btnAgregar = document.querySelector("[data-btn-agregar]");
const btnReiniciar = document.querySelector("[data-btn-reiniciar]");
let arrayListaTareas = JSON.parse(localStorage.getItem("tareas")) || [];

class DatosTarea {
    constructor (nro,tarea,hecha){
        this.nro= nro,
        this.tarea = tarea,
        this.hecha = hecha
    }
}

const borrarTarea = (e) => {
    const posicion=parseInt(e.target.dataset.id)-1;
    arrayListaTareas.splice(posicion,1);
    
    for (i=posicion; i< arrayListaTareas.length; i++){
        arrayListaTareas[i].nro=i+1;
    }
    dibujarArray();
}

const terminarTarea = (e) => {
    const posicion = e.target.dataset.id-1;
    arrayListaTareas[posicion].hecha===false ? arrayListaTareas[posicion].hecha=true : arrayListaTareas[posicion].hecha=false;
    dibujarArray();
    
}

const generarLblNroTarea = () => {
    const nroTareaLabel = document.createElement("label");
    nroTareaLabel.innerText = "Tarea Nro: ";
    return(nroTareaLabel)
}
const generarNroTarea = () => {
    const nroTarea = document.createElement("input");
    nroTarea.value = tareaListada.nro;
    nroTarea.classList.add("prioridad");
    nroTarea.disabled = true;
    return(nroTarea)
}
const generarLblDescripcionTarea = () => {
    const lblTarea = document.createElement("label");
    lblTarea.innerText = "Descripcion: ";
    return(lblTarea)
}
const generarDescripcionTarea = () => {
    const descripcionTarea = document.createElement("p");
    descripcionTarea.classList.add("tarea");
    descripcionTarea.innerText = tareaListada.tarea;
    descripcionTarea.classList.add("descripcionTarea");
    return(descripcionTarea)
}
const generarBtnCompletarTarea = (i) => {
    const btnHecho = document.createElement("input");
    btnHecho.type="button";
    btnHecho.value = "✓";
    btnHecho.classList.add ("btn", "btnCompleto");
    btnHecho.dataset.id= i;
    btnHecho.addEventListener ("click", terminarTarea)
    return(btnHecho)    
}
const generarBtnBorrarTarea = (i) => {
    
    const btnBorrar = document.createElement("input");
    btnBorrar.type="button";
    btnBorrar.value = "✘";
    btnBorrar.classList.add ("btn", "btnSacar");
    btnBorrar.dataset.id= i;
    btnBorrar.addEventListener("click", borrarTarea);
    return(btnBorrar)
}





const dibujarArray= () => {
    const lista = document.querySelector("[data-lista-tareas]");
    let i=0;
    lista.innerHTML= "";
    for (tareaListada of arrayListaTareas){
        i++;
        const tarea = document.createElement("div");       
        
        tarea.appendChild(generarLblNroTarea());
        
        tarea.appendChild(generarNroTarea());

        tarea.appendChild(generarLblDescripcionTarea());
        
        tarea.appendChild(generarDescripcionTarea());        

        tarea.appendChild(generarBtnCompletarTarea(i));
        
        tarea.appendChild(generarBtnBorrarTarea(i));

        tareaListada.hecha? tarea.classList.add("tareaCompleta") : tarea.classList.remove("tareaCompleta");
        
        lista.appendChild(tarea)
    }
    const arrayListaTareasStr= JSON.stringify(arrayListaTareas);
    console.log(arrayListaTareasStr)
    localStorage.setItem("tareas", arrayListaTareasStr)
}

const agregarLista= (e) => {
    e.preventDefault();    
    const input = document.querySelector("[data-txt-agregar]");
    const descripcionTarea = input.value;
    input.value = "";
    const nuevaTarea = new DatosTarea(arrayListaTareas.length+1, descripcionTarea, false)
    arrayListaTareas.push(nuevaTarea);
    console.log(arrayListaTareas);
    dibujarArray()
    console.log(descripcionTarea);
}

const reiniciarLista = (e) => {
    e.preventDefault()
    arrayListaTareas=[];
    localStorage.removeItem("tareas")
    dibujarArray();
}


btnAgregar.addEventListener("click", agregarLista);
btnReiniciar.addEventListener("click", reiniciarLista);
dibujarArray();