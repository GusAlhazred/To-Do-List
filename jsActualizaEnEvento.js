const btnAgregar = document.querySelector("[data-btn-agregar]");
const arrayListaTareas = [];
let  max=0;

class DatosTarea {
    constructor (id,nro,tarea,hecha){
        this.id=id,
        this.nro= nro,
        this.tarea = tarea,
        this.hecha = hecha
    }
}

const borrarTarea = (e) => {
    const posicion=parseInt(e.target.dataset.id)-1;
    // console.log(btnId)
    arrayListaTareas.splice(posicion,1);
    
    for (i=posicion; i< arrayListaTareas.length; i++){
        arrayListaTareas[i].nro=i+1;
    }
    console.log(arrayListaTareas)
    dibujarArray();
}

const terminarTarea = (e) => {
    const posicion = e.target.dataset.id-1;
    arrayListaTareas[posicion].hecha===false ? arrayListaTareas[posicion].hecha=true : arrayListaTareas[posicion].hecha=false;
    dibujarArray();
    
}

const dibujarArray= () => {
    const lista = document.querySelector("[data-lista-tareas]");
    let i=0;
    lista.innerHTML= "";
    for (tareaListada of arrayListaTareas){
        i++;
        const tarea = document.createElement("div");
        
        const nroTareaLabel = document.createElement("label");
        nroTareaLabel.innerText = "Tarea Nro: ";
        tarea.appendChild(nroTareaLabel);
        
        const nroTarea = document.createElement("input");
        nroTarea.value = tareaListada.nro;
        nroTarea.classList.add("prioridad");
        nroTarea.disabled = true;
        tarea.appendChild(nroTarea);
        
        const lblTarea = document.createElement("label");
        lblTarea.innerText = "Descripcion: ";
        tarea.appendChild(lblTarea);
        
        const descripcionTarea = document.createElement("p");
        descripcionTarea.classList.add("tarea");
        descripcionTarea.innerText = tareaListada.tarea;
        tarea.appendChild(descripcionTarea);
        
        const btnHecho = document.createElement("input");
        btnHecho.type="button";
        btnHecho.value = "✓";
        btnHecho.classList.add ("btn", "btnCompleto");
        btnHecho.dataset.id= i;
        tarea.appendChild(btnHecho);
        btnHecho.addEventListener ("click", terminarTarea)
        
        const btnBorrar = document.createElement("input");
        btnBorrar.type="button";
        btnBorrar.value = "✘";
        btnBorrar.classList.add ("btn", "btnSacar");
        btnBorrar.dataset.id= i;
        tarea.appendChild(btnBorrar);
        btnBorrar.addEventListener("click", borrarTarea)

        tareaListada.hecha? tarea.classList.add("tareaCompleta") : tarea.classList.remove("tareaCompleta");

        
        lista.appendChild(tarea)
    }
}

const agregarLista= (e) => {
    e.preventDefault();    
    const input = document.querySelector("[data-txt-agregar]");
    const descripcionTarea = input.value;
    input.value = "";
    const nuevaTarea = new DatosTarea(arrayListaTareas.length, arrayListaTareas.length+1, descripcionTarea, false)
    arrayListaTareas.push(nuevaTarea);
    console.log(arrayListaTareas);
    dibujarArray()
    max++;
    console.log(descripcionTarea);
}


btnAgregar.addEventListener("click", agregarLista);