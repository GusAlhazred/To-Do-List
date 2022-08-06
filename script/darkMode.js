const btnSwitch = document.querySelector("[data-switch]");
const bodyJs = document.querySelector("body");

let temaGuardado= JSON.parse(localStorage.getItem("theme")) || "light";

const pintarBoton = () => {
    
}


const toggleDarkMode = () => {
    bodyJs.classList.contains("dark") ? temaGuardado="light": temaGuardado="dark";
    let temaGuardar = JSON.stringify(temaGuardado);
    localStorage.setItem("theme", temaGuardar);
    pintarDarkMode()
}



const pintarDarkMode = () => {
    if (temaGuardado === "dark"){
        btnSwitch.classList.add("active");
        bodyJs.classList.add("dark");
    } else {
        btnSwitch.classList.remove("active");
        bodyJs.classList.remove("dark");
        
    }
}

pintarDarkMode();



btnSwitch.addEventListener("click", toggleDarkMode)