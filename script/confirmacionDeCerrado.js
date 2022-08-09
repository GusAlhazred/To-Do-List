const confirmar = (e) => {
    const mensajeCerrar = "Desea cerrar la ventana? Los cambios del reloj se perderan";
    e.returnValue = mensajeCerrar;
    return mensajeCerrar;
}

window.addEventListener("beforeunload", confirmar);