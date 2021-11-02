let TIME_LIMIT;
localStorage.getItem("CurrentTime") === null ? TIME_LIMIT = 1500 : TIME_LIMIT = localStorage.getItem("CurrentTime")*60;

let nombreTareaSeleccionada=document.querySelector('.task');
let numeroPomodoros=document.querySelector('.numeroPomodoros');   
let title = document.getElementById("title");

//funcion que al dar click en el boton pomodoro se asigne en el temporizador 25 minutos
function asignarPomodoro(){    
    TIME_LIMIT=1500   
    document.getElementById("base-timer-label").innerHTML =  formatTime(1500)
    localStorage.setItem("CurrentTime", (TIME_LIMIT/60));
    localStorage.removeItem("CurrentTitle");
    for(let i=0; i< todasTareas.length; i++){
        todasTareas[i].style.background="#191C4C";  
    }
    nombreTareaSeleccionada.innerHTML=``;    
    numeroPomodoros.innerHTML=``;
}

//funcion que al dar click en el boton Short Break se asigne en el temporizador 5 minutos
function asignarShortBreak(){
   TIME_LIMIT=300
   document.getElementById("base-timer-label").innerHTML =  formatTime(300)
   localStorage.setItem("CurrentTime", (TIME_LIMIT/60));
   localStorage.removeItem("CurrentTitle");
   for(let i=0; i< todasTareas.length; i++){
    todasTareas[i].style.background="#191C4C";  
}
    nombreTareaSeleccionada.innerHTML=``;
    numeroPomodoros.innerHTML=``;
}

//funcion que al dar click en el boton Long Break se asigne en el temporizador 10 minutos
function asignarLongBreak(){
   TIME_LIMIT=900
   document.getElementById("base-timer-label").innerHTML =  formatTime(900)
   localStorage.setItem("CurrentTime", (TIME_LIMIT/60));
   localStorage.removeItem("CurrentTitle");
   for(let i=0; i< todasTareas.length; i++){
    todasTareas[i].style.background="#191C4C";  
}
   nombreTareaSeleccionada.innerHTML=``;
   numeroPomodoros.innerHTML=``;
}

let timePassed = 0;
let  timeLeft= TIME_LIMIT;
let nuevaTarea = document.getElementById("nuevaTarea");
let añadirNuevaTarea = document.getElementById("añadirNuevaTarea");
let todoTareas = document.querySelector(".todoTareas");
let section = document.getElementById("section");
let insertarTarea = document.getElementById("insertarTarea");
let botonAñadir = document.getElementById("botonAñadir");
let checkboxTareas;
let texto;
let lineaTareaRealizada;
let textoTarea;
let todasTareas;
let bordeSeleccionado;

function cerrar(){
    let contenerdorEdicionCrear = document.getElementById("contenerdorEdicionCrear");
    contenerdorEdicionCrear.style.display="none";
    añadirNuevaTarea.innerHTML=`<div id="añadirNuevaTarea"><button onclick="crearNuevaTarea()" id="botonAñadir">+ añadir nueva tarea </button></div>`;
}

let tiempo = "25";
function crearNuevaTarea(){
    botonAñadir.style.display = "none";
    añadirNuevaTarea.innerHTML +=`
    <div class="contenerdorEdicionCrear" id="contenerdorEdicionCrear">
    <div class="seccionTareaYDescripcion">
       <label for="">
       <h6>Tarea</h6>
       <input type="text" name="" id="titulo" placeholder="¿En qué estás trabajando?">
       </label>
       <label for="">
       <h6>Descripcion</h6> 
       <textarea name="" id="descripcion"></textarea>
       </label>
    </div>
    <div class="seccionTiemposPomodoro">
       <h6>Duración del pomodoro</h6>  
        <div class="botonesTiempos">                       
           <button class="botonTiempoPomodoro" value="10" id="duracion1">10:00</button>
           <button class="botonTiempoPomodoro" value="15" id="duracion2">15:00</button>
           <button class="botonTiempoPomodoro" value="25" id="duracion3">25:00</input>
           <label for="">
           <h6>Minutos personalizados:</h6>  
               <input class="custom" type="number" id="custom" id="custom">
           </label>
        </div>

        <div class="botonesCancelarYGuardar">
           <button class="cancelar" onclick="cerrar()">Cancelar</button>
           <button type="submit" class="guardar" id="guardar" onclick="crear()">Guardar</button>
        </div>  
    </div>
</div>  
    `
document.querySelectorAll('.botonesTiempos button').forEach(button => button.addEventListener('click', ()=> tiempo = button.value));
};

function crear(e){
    titulo = document.getElementById("titulo").value;
    descripcion = document.getElementById("descripcion").value;
    custom = document.getElementById("custom").value;
    let finalizado = false;
    let tiempo1;
    let pomodoros = 0;
    if(custom != ""){
        tiempo1 = custom;
    }else{
        tiempo1 = tiempo
    }
    let tarea = {titulo, descripcion, tiempo1, finalizado, pomodoros};
    if(localStorage.getItem("tareas") == null){
        let tareas = []
        tareas.push(tarea)
        localStorage.setItem("tareas",JSON.stringify(tareas))
    }else{
        let tareas = JSON.parse(localStorage.getItem("tareas"))
        tareas.push(tarea)
        localStorage.setItem("tareas",JSON.stringify(tareas))
    }
    location.reload();
    todoTareas.reset();
    e.preventDefault();
    agregar();
}

function agregar(){
    let tareas = JSON.parse(localStorage.getItem("tareas"));
    if (tareas != null) {        
        insertarTarea.innerHTML = ""
        for(let i=0; i< tareas.length; i++){
            let titulo = tareas[i].titulo;
            insertarTarea.innerHTML +=`
                <div class="tarea" onClick="seleccionoTarea('${titulo}')">
                    <input type="checkbox" id="checkbox" onChange="tareaRealizada()">    
                    <div class="tareaCheckbox">           
                    <p id="textoInput">${titulo}</p>
                    <div class="lineaTareaRealizada"></div>
                    </div>
                    <button id="botonEditar" onclick="eliminar('${titulo}')"><img src="../images/trash.svg" id="trash"></button>
                    <button id="botonEditar" onclick="editar('${titulo}')"><img src="../images/edit-icon.svg"></button>
                </div>   
            `
        }
        todasTareas=document.querySelectorAll('.tarea');
        bordeSeleccionado=document.querySelectorAll('.bordeSeleccionado');   
        lineaTareaRealizada=document.querySelectorAll('.lineaTareaRealizada');    
        checkboxTareas=document.querySelectorAll('#checkbox');
        texto=document.querySelectorAll('#textoInput');
    }
};
agregar();

function editar(titulo){
    let tareas = JSON.parse(localStorage.getItem("tareas"));
    for(let i=0; i<tareas.length; i++){
        if(tareas[i].titulo === titulo){
            añadirNuevaTarea.innerHTML = `
            <div class="contenerdorEdicionCrear" id="contenerdorEdicionCrear">
    <div class="seccionTareaYDescripcion">
       <label for="">
       <h6>Tarea</h6>
        <input type="text" name="" id="newTitulo" value="${tareas[i].titulo}">
       </label>
       <label for="">
       <h6>Descripcion</h6> 
        <textarea name="" id="newDescripcion">${tareas[i].descripcion}</textarea>
       </label>
    </div>
    <div class="seccionTiemposPomodoro">
       <h6>Duración del pomodoro</h6>  
        <div class="botonesTiempos">                       
           <button class="botonTiempoPomodoro" value="10" id="duracion1">10:00</button>
           <button class="botonTiempoPomodoro" value="15" id="duracion2">15:00</button>
           <button class="botonTiempoPomodoro" value="25" id="duracion3">25:00</input>
           <label for="">
           <h6>Minutos personalizados:</h6>  
               <input class="custom" type="number" id="newCustom" id="custom">
           </label>
        </div>
        <div class="botonesCancelarYGuardar">
                    <button class="cancelar" onclick="cerrar()">Cancelar</button>
                    <button type="submit" class="guardar" id="guardar" onclick="actualizar('${i}')">Guardar</button>
                    </div>  
                </div>
            </div>      
            `
            document.querySelectorAll('.botonesTiempos button').forEach(button => button.addEventListener('click', ()=> tiempo = button.value));
        }
    }
}

function actualizar(i){
    let tareas = JSON.parse(localStorage.getItem("tareas"));
    tareas[i].titulo = document.getElementById("newTitulo").value;
    tareas[i].descripcion = document.getElementById("newDescripcion").value;
    let documento = document.getElementById("newCustom").value;
    if(documento != ""){
        tareas[i].tiempo1 = document.getElementById("newCustom").value;
    }else{
        tareas[i].tiempo1 = tiempo;
    }    
    tareas[i].titulo == "" ? alert("No ha ingresado ningun titulo") : localStorage.setItem("tareas",JSON.stringify(tareas));
    localStorage.setItem("CurrentTitle", tareas[i].titulo);  
    location.reload();
};

function eliminar(titulo){
    let tareas = JSON.parse(localStorage.getItem("tareas"));
    for(let i=0; i<tareas.length; i++){
        if(tareas[i].titulo === titulo){
            tareas.splice(i,1);
            localStorage.removeItem("CurrentTitle");
        }
    }
    localStorage.setItem("tareas",JSON.stringify(tareas));
    agregar();
    location.reload();
}

function getInputValue(){
    let tiempo;
    document.querySelectorAll('.botonesTiempos button').forEach(button => button.addEventListener('click', ()=> tiempo = button.value));
    return tiempo;  
}

function startTimer() {
    if (timeLeft >= 0 ) {
        setInterval(() => prueba(), 1000);        
    }
}

const FULL_DASH_ARRAY = 283;
let aHalf = TIME_LIMIT/2;
let lessThatAHalf= TIME_LIMIT/4;

const COLOR_CODES = {
    moreThanAHalf: {
      color: "green"
    },
    aHalf: {
      color: "orange",
      let: aHalf,
    },
    lessThatAHalf: {
      color: "red",
      let: lessThatAHalf,
    }
};
  
let remainingPathColor = COLOR_CODES.moreThanAHalf.color;

function setRemainingPathColor(timeLeft) {
    const { lessThatAHalf, aHalf, moreThanAHalf } = COLOR_CODES;
    if (timeLeft <= lessThatAHalf.let) {
      document.getElementById("base-timer-path-remaining").classList.remove(aHalf.color);
      document.getElementById("base-timer-path-remaining").classList.add(lessThatAHalf.color);
    } else if (timeLeft <= aHalf.let) {
      document.getElementById("base-timer-path-remaining").classList.remove(moreThanAHalf.color);
      document.getElementById("base-timer-path-remaining").classList.add(aHalf.color);
    }
}

function calculateTimeFraction() {
    const rawTimeFraction = timeLeft / TIME_LIMIT;
    return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}
  
function setCircleDasharray() {
    const circleDasharray = `${(calculateTimeFraction() * FULL_DASH_ARRAY).toFixed(0)} 283`;
    document.getElementById("base-timer-path-remaining").setAttribute("stroke-dasharray", circleDasharray);
  }

let isPlaying = false;
let alertaPersonalizada;
function prueba(){
    if (timeLeft >= 0 ) {
        document.querySelector('.btnPlay').addEventListener('click', () => (isPlaying = true));  
        document.querySelector('.btnPause').addEventListener('click', () => isPlaying = false); 
        if(isPlaying === true){
            timePassed = timePassed += 1;
            timeLeft = TIME_LIMIT - timePassed;
            setCircleDasharray()
            setRemainingPathColor(timeLeft)
            timeLeft >= 0 ? (document.getElementById("base-timer-label").innerHTML = formatTime(timeLeft),
            title.innerHTML = "Time Remaining "+formatTime(timeLeft))
            : (coutPomodoros(), localStorage.setItem("PomodoroFinalizado", 1), playAlert(), location.reload());
            alertaPersonalizada =  localStorage.getItem("CurrentTitle");
        }        
    }
}
let snd = new Audio("../audio/alarma.mp3")

function playAlert(){
    localStorage.getItem("PomodoroFinalizado") != null ? (snd.play(), alert(`El pomodoro ${alertaPersonalizada} ha finalizado`)) : null;
}


function coutPomodoros(){
    let tareas = JSON.parse(localStorage.getItem("tareas"));
    tareas.forEach(element =>{
        let contador = element.pomodoros;
        contador++;
        localStorage.getItem("CurrentTitle") === element.titulo ?  element.pomodoros = contador : null
        localStorage.setItem("tareas", JSON.stringify(tareas))
    })   
}

startTimer();

function createTemplateForTimer(){
    document.querySelector('.timer').innerHTML = `
    <div class="base-timer">
        <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <g class="base-timer__circle">
                <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
                <path
                    id="base-timer-path-remaining"
                    stroke-dasharray="283"
                    class="base-timer__path-remaining ${remainingPathColor}"
                    d="
                    M 50, 50
                    m -45, 0
                    a 45,45 0 1,0 90,0  
                    a 45,45 0 1,0 -90,0
                    "
                ></path>
            </g>
        </svg>
        <span id="base-timer-label" class="base-timer__label">
            ${formatTime(timeLeft)}
        </span>
    </div>
    `;    
}

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    seconds < 10 ? seconds = `0${seconds}` : null;
    return `${minutes}:${seconds}`;
}

createTemplateForTimer();

//funcion que al seleccionar la tarea se tache como realizada
function tareaRealizada(){
    let tareas = JSON.parse(localStorage.getItem("tareas"));
    if (tareas != null) {   
        for(let i=0; i<tareas.length; i++){
            for(let i=0;i<checkboxTareas.length;i++){
                if(tareas[i].finalizado===true){
                    texto[i].style.color="#C4C4C4";
                    checkboxTareas[i].style.background="#C4C4C4";
                    lineaTareaRealizada[i].style.display= "block";
                    
                }else{
                    texto[i].style.color="#00C7FA";
                    checkboxTareas[i].style.background="#00C7FA";
                    lineaTareaRealizada[i].style.display= "none";
                }
            }
        }
    }
}
tareaRealizada()

//funcion que al seleccionar la tarea el titulo se muestre en el pomodoro
let conversion
function seleccionoTarea(titulo){
    nombreTareaSeleccionada.innerHTML=`${titulo}`;     
    let tareas = JSON.parse(localStorage.getItem("tareas"));
        for(let i=0; i< tareas.length; i++){
            for(let i=0; i< todasTareas.length; i++){
                if(titulo==tareas[i].titulo){
                    todasTareas[i].style.background="#191f70";                
                    localStorage.setItem("CurrentTime", tareas[i].tiempo1);
                    localStorage.setItem("CurrentTitle", tareas[i].titulo);                        
                    numeroPomodoros.innerHTML=`${tareas[i].pomodoros} pomodoros`;
                    conversion=(tareas[i].tiempo1*60)
                    TIME_LIMIT=conversion;
                    document.getElementById("base-timer-label").innerHTML =  formatTime(conversion)
                }else{
                    todasTareas[i].style.background="#191C4C";  
                }
            }
        }
        mantenerTareaSeleccionada() ;
}

//funcion mantiene la tarea selecciona cuando se recarga la pagina
function mantenerTareaSeleccionada(){
    let tareas = JSON.parse(localStorage.getItem("tareas"));
    let titulos =localStorage.getItem("CurrentTitle");
    for(let i=0; i< tareas.length; i++){ 
        if(localStorage.getItem("CurrentTitle") != null ){
            nombreTareaSeleccionada.innerHTML=`${titulos}`;  
            tareas[i].titulo == localStorage.getItem("CurrentTitle") ? (tareas[i].pomodoros == 1 ? numeroPomodoros.innerHTML=`${tareas[i].pomodoros} pomodoro`: numeroPomodoros.innerHTML=`${tareas[i].pomodoros} pomodoros`,todasTareas[i].style.background="#191f70" ): null;
        }        
    }          
}
mantenerTareaSeleccionada()

//funcion que al dar click en el boton pediente muestra todas las tareas pendientes
function mostrarTareasPendientes(){
    let tareas = JSON.parse(localStorage.getItem("tareas"));
    if (tareas != null) {   
        for(let i=0; i<tareas.length; i++){
            for(let i=0;i<todasTareas.length;i++){
                if(tareas[i].finalizado===false){
                    todasTareas[i].style.display= "flex";
                }else{
                    todasTareas[i].style.display= "none";        
                }
            }
        }
    }
}

//funcion que al dar click en el boton realizado, muestra todas las tareas realizadas
function mostrarTareasRealizadas(){
    let tareas = JSON.parse(localStorage.getItem("tareas"));
    if (tareas != null) {   
        for(let i=0; i<tareas.length; i++){
            for(let i=0;i<todasTareas.length;i++){
                if(tareas[i].finalizado===true){
                    todasTareas[i].style.display= "flex";
                }else{
                    todasTareas[i].style.display= "none";
                }      
            }
        }
    }
}

function subirRealizado(){
    let titulo;
    let arr = JSON.parse(localStorage.getItem("tareas"));
    document.querySelectorAll('.tarea input[type="checkbox"]').forEach(tarea => tarea.addEventListener('click', ()=>{
        titulo = tarea.parentElement.querySelector('.tareaCheckbox p').textContent;
        arr.forEach(element =>{(element.titulo === titulo ? element.finalizado = tarea.checked: null, localStorage.setItem("tareas", JSON.stringify(arr)))})
    }));
}
subirRealizado()

//funcion atajo de teclas
window.onkeydown=tecla;
function tecla(event){
num = event.keyCode;
if(num==80){asignarPomodoro()}
if(num==83){asignarShortBreak()}
if(num==76){asignarLongBreak()}
}


