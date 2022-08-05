const btnSwitch = document.querySelector("[data-switch]");
const bodyJs = document.querySelector("body");

let temaGuardado= JSON.parse(localStorage.getItem("theme")) || "";

const toggleDarkMode = () => {
    btnSwitch.classList.toggle("active");
    bodyJs.classList.toggle("dark");
    console.log(bodyJs);
    console.log(bodyJs.classList.contains("dark"));
    bodyJs.classList.contains("dark") ? 
        JSON.stringify(localStorage.setItem("theme", "dark"))  :
        JSON.stringify(localStorage.setItem("theme", "light"));
    
}

const pintarDarkMode = () => {
    bodyJs.classList? Pintar todo de darkmode : Pintar todo normal;
}

pintarDarkMode();

btnSwitch.addEventListener("click", toggleDarkMode)