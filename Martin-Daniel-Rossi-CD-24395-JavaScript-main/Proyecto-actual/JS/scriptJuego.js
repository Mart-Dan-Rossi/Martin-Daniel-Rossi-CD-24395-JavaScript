//El punto final de este proyecto es conseguir desarrollar un juego de rol de baloncesto. Resolución mínima recomendada de 1452px de ancho (De momento no es responsive, muy probablemente nunca lo sea)


//PARA PROBAR LA PARTE DE MOVERSE PONÉ EN EL BUSCADOR "/*MOVERSE*/" Y DESCOMENTÁ ESAS SECCIONES QUE TERMINAN EN "/*FIN SECCION MOVERSE*/".
//COMO SEGUÍ TRABAJANDO LUEGO DE TOMAR LA DESICIÓN DE QUITAR ESA PARTE
//TAL VEZ SEA RECOMENDABLE COMENTAR LAS LÍNEAS QUE AGREGAN LOS EVENTOS DISPARADORES DE LAS OTRAS POSIBLES ACCIONES.
//EL ERROR PUNTUALMENTE ESTÁ MARCADO CON "/*EMPIEZA ERROR*/" Y "/*TERMINA ERROR*/"
//TAMBIÉN DEJÉ UNA ACOTACIÓN RELEVANTE A LA EXPLICACIÓN DEL ERROR. LA PODES ENCONTRAR BUSCANDO "/*EL ERROR ANTES" ETC.

//OTRO ERROR MARCADO CON "/*ERROR ACA*/". MISMO TIPO DE PROBLEMA. NO SE BORRAN EVENTOS. LO "SALVO" NO PONIENDO NUEVOS EVENTOS (O SEA EVITANDO QUE SE EMPIECEN A DISPARAR 2
//VECES CUANDO CLICKEO EN ESA CASILLA). SIN EMBARGO SI CUANDO NO ESTÁ RESALTADA LA CASILLA SE LA CLICKEA SE ROMPE TODO.
//A RAÍZ DE ESTE ERROR EVITO USAR LA FUNCIONALIDAD (QUE PODRÍA EJECUTARLA PONIENDO BOTONES ABAJO EN VEZ DE CLICKEANDO EN LOS JUGADORES PERO REALMENTE PREFIERO
//DEJARLO ASÍ HASTA SABER POR QUÉ MOTIVO NO SE ESTÁN BORRANDO LOS EVENTOS ESOS Y HACERLO DE LA FORMA QUE TENÍA PENSADO DE ANTEMANO QUE ES ILUMINANDO A LOS JUGADORES
//Y CLICKEARLOS EN EL TABLERO. ME RESULTA QUE ES LA FORMA MÁS APROPIADA POR MOTIVO DE MANTENER LAS FORMAS DE USO Y FACILITARLE LA COMPRENSIÓN DE CÓMO JUGAR
//A LOS USUARIOS).
//PARA PROBAR ESTE SEGMENTO SÓLO HACE FALTA DESCOMENTAR LOS RENGLONES QUE APARECEN ENTRE "/*ERROR ACA*/" Y "/*FIN SECCION ERROR*/"


/*Defino valiables necesarias*/
let nombre;
let altura;
let peso;
let capacidadAtletica;
let defensaPerimetral;
let defensaInterna;
let capacidadReboteadora ;
let anotacionExterior;
let anotacionInterior;
let creacionDeJuego;
let ubicacionX;
let ubicacionY;
let conPelota;
let turnoUsado;
let ultimaAccion = "Todavía no realizó ninguna acción";
let puntosDeAccion;

let resultadoDado;
const guardoJugadorSeleccionado = [];

let instantesEnPeriodo = 360;
let periodo = 1;


let saltoA = 0;
let saltoB = 0;

let comparoIniciativas;
let equiposJugadoresElegidos;
let rolJugadoresElegidos;

let cuentoVuelta=2;
let esPrimeraVuelta = true;

let puntosEquipoA=0;
let puntosEquipoB=0;
const arrayConPuntosPorEquipo= [puntosEquipoA, puntosEquipoB];

let locutorDice;
let textoLocutor = document.getElementById("relatoPartido");

const letraEquipo = ["A","B"];
//Pretendo agregar más imágenes que determinen de forma visual las habilidades de los jugadores, por eso creo estos array.
const imgHabilidadesDeJugadoresAAtacantes ={
    defecto: `../Img/AAtaca.png`
};
const imgHabilidadesDeJugadoresBAtacantes ={
    defecto: `../Img/BAtaca.png`
};
const imgHabilidadesAmbosEquiposAtacando = [imgHabilidadesDeJugadoresAAtacantes, imgHabilidadesDeJugadoresBAtacantes];
const imgHabilidadesDeJugadoresADefensores ={
    defecto: `../Img/ADefiende.png`
}
const imgHabilidadesDeJugadoresBDefensores ={
    defecto: `../Img/BDefiende.png`
}
const imgHabilidadesAmbosEquiposDefendiendo = [imgHabilidadesDeJugadoresADefensores, imgHabilidadesDeJugadoresBDefensores];
const imgConPelota = [`../Img/ACHabilAtacaCPelota.png`, `../Img/BCHabilAtacaCPelota.png`];

//Creo objeto para costos de "puntos de acción" para cada acción
const costeAccionesDefensa ={moverseRecto: 1, moverseDiagonal: 1.5, intentarUnRoboAlPortadorDeLaPelota: 1, intentarInterceptarPase: 1, esperaAtosigante: 1, esperaCautelosa: 0.5};
const costeAccionesAtaque ={moverseRecto: 1, moverseDiagonal: 1.5, pase: 0.5, dribblingRecto: 1, dribblingDiagonal: 1.5, esperarSinBalon: 1, esperarEnTripleAmenaza: 0.5, tiro: 1};

//Creación de jugadores
class Jugador{
    constructor(nombre, altura, peso, capacidadAtletica, defensaPerimetral, defensaInterna, capacidadReboteadora, anotacionExterior, anotacionInterior, creacionDeJuego){
        //Atributos físicos
        this.nombre = nombre;
        this.altura = altura;
        this.peso = peso;
        this.capacidadAtletica = capacidadAtletica;//Atributo mixto
        //Atributos defensivos
        this.defensaPerimetral = defensaPerimetral;
        this.defensaInterna = defensaInterna;
        this.capacidadReboteadora = capacidadReboteadora;//Atributo mixto
        //Atributos ofensivos
        this.anotacionExterior = anotacionExterior;
        this.anotacionInterior = anotacionInterior;
        this.creacionDeJuego = creacionDeJuego;
    }
}
class EstadoDelJugador{
    constructor(ubicacionX, ubicacionY){
        this.ubicacionX = ubicacionX;/*Utilizo la ubicación X para determinar en que punto del largo de la cancha se encuentran los jugadores*/
        this.ubicacionY = ubicacionY;/*Utilizo la ubicación Y para determinar en que punto del ancho de la cancha se encuentran los jugadores*/    
        this.conPelota = false;/*Determina si el jugador tiene la posesión de la pelota*/
        this.turnoUsado = false;/*Determina si el jugador ya ha realizado una acción en este "Instante"*/
        this.ultimaAccion = "Todavía no realizó ninguna acción";/*Recuerda cuál fué la última acción realizada por el jugador*/
        this.puntosDeAccion = 0;/*Determina de cuántos puntos de acción dispone el jugador en su turno*/
        this.nombre = "";
        
    }
}

let botonPase = document.getElementById("pase");
let botonTiro = document.getElementById("tiro");
let botonTerminarTurno = document.getElementById("terminarTurno");
let botonConfirmar = document.getElementById("confirmar");


/*Creo una función que sirve para asignar nuevos puntos de acción a los jugadores al comenzar cada turno*/
const nuevosPuntosDeAccion = ()=>{
    textoLocutor.innerHTML+=`<br><p>Comienza un nuevo turno por lo que los jugadores reponen sus puntos de acción</p>`;
    //Búcle que selecciona equipo
    for (listas in estadosAmbosEquipos){
        //Búcle que selecciona cada jugador dentro de cada equipo
        for (jugadores in estadosAmbosEquipos[listas]){
            //Por las dudas reseteo los puntos de acción
            estadosAmbosEquipos[listas][jugadores].puntosDeAccion = 0;
            //Los jugadores más bajos tienen más chances de conseguir 3 puntos de acción y no tienen chances de conseguir sólo 1
            if (ambosEquipos[listas][jugadores].altura <= 192){
                estadosAmbosEquipos[listas][jugadores].puntosDeAccion = 2;
                resultadoDado = dadoDe20();
                if (resultadoDado > 6){
                    estadosAmbosEquipos[listas][jugadores].puntosDeAccion += 1;
                }
            }
            //Los jugadores promedio tienen menos chances que los bajos de conseguir 3 puntos de acción y no tienen chances de conseguir sólo 1
            else if ((ambosEquipos[listas][jugadores].altura > 192) && (ambosEquipos[listas][jugadores].altura <= 208)){
                estadosAmbosEquipos[listas][jugadores].puntosDeAccion = 2;
                resultadoDado = dadoDe20();
                if (resultadoDado > 10){
                    estadosAmbosEquipos[listas][jugadores].puntosDeAccion += 1;
                }
            }
            //Los jugadores altos tienen chances de quedarse con un solo punto de acción y pocas de conseguir 3
            else if (ambosEquipos[listas][jugadores].altura > 208){
                estadosAmbosEquipos[listas][jugadores].puntosDeAccion = 1;
                resultadoDado = dadoDe20();
                if ((resultadoDado > 3) && (resultadoDado <16)){
                    estadosAmbosEquipos[listas][jugadores].puntosDeAccion += 1;
                }
                if (resultadoDado >=16){
                    estadosAmbosEquipos[listas][jugadores].puntosDeAccion += 1;
                }
            }
        }
    }
};

//Contruyo habilidades jugadores
const jugadorA1 = new Jugador(`(A1)`,180, 80, 70, 100, 10, 20, 70, 60, 95);
const jugadorA2 = new Jugador(`(A2)`,198, 98, 90, 80, 30, 40, 90, 50, 70);
const jugadorA3 = new Jugador(`(A3)`,206, 106, 70, 60, 60, 60, 60, 60, 40);
const jugadorA4 = new Jugador(`(A4)`,208, 108, 50, 40, 75, 80, 30, 80, 30);
const jugadorA5 = new Jugador(`(A5)`,218, 120, 50, 5, 95, 95, 10, 100, 15);

const jugadorB1 = new Jugador(`(B1)`,180, 80, 70, 100, 10, 20, 70, 60, 95);
const jugadorB2 = new Jugador(`(B2)`,198, 98, 90, 80, 30, 40, 90, 50, 70);
const jugadorB3 = new Jugador(`(B3)`,206, 106, 70, 60, 60, 60, 60, 60, 40);
const jugadorB4 = new Jugador(`(B4)`,208, 108, 50, 40, 75, 80, 30, 80, 30);
const jugadorB5 = new Jugador(`(B5)`,218, 120, 50, 5, 95, 95, 10, 100, 15);

//Creo arrays para guardar información de los equipos
const listaJugadoresA = [jugadorA1, jugadorA2, jugadorA3, jugadorA4, jugadorA5];
const listaJugadoresB = [jugadorB1, jugadorB2, jugadorB3, jugadorB4, jugadorB5];
const ambosEquipos = [listaJugadoresA, listaJugadoresB];



//Contruyo estados de jugadores
const estadoJugadorA1 = new EstadoDelJugador(13, 1);
const estadoJugadorA2 = new EstadoDelJugador(13, 5);
const estadoJugadorA3 = new EstadoDelJugador(13, 10);
const estadoJugadorA4 = new EstadoDelJugador(13, 14);
const estadoJugadorA5 = new EstadoDelJugador(14, 8);

const estadoJugadorB1 = new EstadoDelJugador(16, 2);
const estadoJugadorB2 = new EstadoDelJugador(16, 6);
const estadoJugadorB3 = new EstadoDelJugador(16, 11);
const estadoJugadorB4 = new EstadoDelJugador(16, 15);
const estadoJugadorB5 = new EstadoDelJugador(15, 8);


//Creo arraus para guardar esta infomación por equipo
const listaEstadosJugadoresA = [estadoJugadorA1, estadoJugadorA2, estadoJugadorA3, estadoJugadorA4, estadoJugadorA5];
const listaEstadosJugadoresB = [estadoJugadorB1, estadoJugadorB2, estadoJugadorB3, estadoJugadorB4, estadoJugadorB5];
const estadosAmbosEquipos = [listaEstadosJugadoresA, listaEstadosJugadoresB];

//Inserto los nomrbes a los estados de jugadores
for (i=0; i<2; i++){
    for (jugador in listaEstadosJugadoresA){
        estadosAmbosEquipos[i][jugador]["nombre"] = ambosEquipos[i][jugador]["nombre"];
    }
}


//Funciones para los dados
//Retorna un número aleatorio entre min (incluido) y max (excluido);
/*function getRandomArbitrary(min, max){
    return Math.random() * (max - min) + min;
}*/
/*Función que sirve para lanzar un dado de 20 caras*/
function dadoDe20(){
    return Math.random() * (21-1)+1;
}


/*Animo el logo del juego*/
$(document).ready(function () {
    $(".animacion1").animate({opacity: "0.5"}, "slow", ()=>{
        $(".animacion1").animate({opacity:"1"}, "slow", ()=>{
            console.log("Ya animé el logo");
        })
    });
});


/*Traigo un JSON que contiene info de jugadores*/
const miJSON = "../JSON/jugadores.json";
//Le pongo un evento al botón submit
$("#formMuestroJugadoresJson").submit((evt)=>{
    evt.preventDefault();
    let jugadorJSONelegido;
    //Creo un array con nombres de jugadores
    const listaIDJugadoresJSON = ["ginobili", "scola", "nocioni"];
    //Creo un bucle para obtener el dato que necesito (El valor del id del jugador que es seleccionado con los input radious)
    for (jugador in listaIDJugadoresJSON){
        if (document.querySelector('input[name="jugador"]:checked') == document.querySelector(`#${listaIDJugadoresJSON[jugador]}`)){
            jugadorJSONelegido = parseInt(jugador);
        }
    }
    //Traigo el JSON de jugadores
    fetch(miJSON)
    .then((response)=>response.json())
    .then((json)=>{
        //Vacío el div
        $("#muestroJugadores").html("");
        //Introduzco el html necesario con los datos apropiados
        $("#muestroJugadores").append(`<h3>Informacion de ${json[jugadorJSONelegido].nombre}</h3>
        <ul>
            <li><h4>Número en la selección:</h4><p>${json[jugadorJSONelegido].NºSeleccion}</p></li>
            <li><h4>Lugar y fecha de nacimiento:</h4><p>${json[jugadorJSONelegido].nacimiento}</p></li>
            <li><h4>Estatura:</h4><p>${json[jugadorJSONelegido].estatura}</p></li>
            <li><h4>Fecha del retiro:</h4><p>${json[jugadorJSONelegido].retiro}</p></li>
            <li><h4>Puesto de draft en la NBA:</h4><p>${json[jugadorJSONelegido].draftNBA}</p></li>
        </ul>
        <img class="fotoJugadoresSeleccion" src="${json[jugadorJSONelegido].imagen}" alt="foto de ${json[jugadorJSONelegido].nombre}">`)
    });
});

//Creo un p con JQuery
$(`#contenedorBotonesConfiguracion`).append('<span id="colorDeFondoC" class="boton">Cambiar color de fondo a celeste</span>');
$(`#contenedorBotonesConfiguracion`).append('<span id="colorDeFondoD" class="boton">Cambiar a color de fondo por defecto</span>');
//Cambio el color del fondo al clickear el boton anterior
let elBody = document.querySelector("body");
let botonCambioColorC = document.querySelector("#colorDeFondoC");
let botonCambioColorD = document.querySelector("#colorDeFondoD");
$("#colorDeFondoC").on("click",()=>{
    elBody.setAttribute("class", "bgCeleste");
    botonCambioColorD.setAttribute("class", "boton");
    botonCambioColorC.setAttribute("class", "botonColorActivado");
});
$("#colorDeFondoD").on("click", ()=>{
    elBody.setAttribute("class", "bodyJuego");
    botonCambioColorC.setAttribute("class", "boton");
    botonCambioColorD.setAttribute("class", "botonColorActivado");
});
/*Muestro si es una partida nueva o una continuada en un p*/
//Creo el p
const p = document.createElement("p");
//Le pongo contenido al p
p.innerText = localStorage.getItem("tipoDePartida");
//Ubico el p en el HTML
document.querySelector("header").appendChild(p);
//Pongo el "tipoDePartida" del local storage como continuar juego. En un futuro voy a permitir reanudar partidas y por defecto quiero que se continúe por si entran a este html andes de pasar por la página de inicio.
localStorage.setItem("tipoDePartida", "Continuar juego");



/*Eventos que permiten tocar botón para que aparezca la información de los jugadores al pasar el cursor sobre ellos*/
$("#mostrarStatsJugadoresEquipoA").click(()=>{
    $(".statsQueAparecenA").toggle("slow");
});
$("#mostrarStatsJugadoresEquipoB").click(()=>{
    $(".statsQueAparecenB").toggle("slow");
});

//Agrego eventos a jugadores para seleccionar la información requerida
const funciónParaAgregarEventosQueMuestranInfoDeLosJugadores = ()=>{
    //Hago bucle para recorrer jugadores
    for (let equipo=0; equipo <2; equipo++){
        for (let i=0; i < 5; i++){
            //Llamo a cada jugador de cada equipo
            let jugadoresParaMostrarInfo = document.getElementById(`${estadosAmbosEquipos[equipo][i]["ubicacionX"]}_${estadosAmbosEquipos[equipo][i]["ubicacionY"]}`);
            //Creo el evento de cada jugador
            jugadoresParaMostrarInfo.addEventListener("mouseover", muestroInfo);
            //El evento de cada jugador disparará lo siguiente
            function muestroInfo(){
                const arrayNombresStats = ["nombre", "altura", "peso", "capacidadAtletica", "defensaPerimetral", "defensaInterna", "capacidadReboteadora", "anotacionExterior", "anotacionInterior", "creacionDeJuego"]
                const arrayNombresStatsA = ["nombreA", "alturaA", "pesoA", "capacidadAtleticaA", "defensaPerimetralA", "defensaInternaA", "capacidadReboteadoraA", "anotacionExteriorA", "anotacionInteriorA", "creacionDeJuegoA"]
                const arrayNombresStatsB = ["nombreB", "alturaB", "pesoB", "capacidadAtleticaB", "defensaPerimetralB", "defensaInternaB", "capacidadReboteadoraB", "anotacionExteriorB", "anotacionInteriorB", "creacionDeJuegoB"]
                for (stat in arrayNombresStats){
                    //Si es del equipo A
                    if (equipo==0){
                        document.getElementById(`${arrayNombresStatsA[stat]}`).innerHTML= ambosEquipos[equipo][i][`${arrayNombresStats[stat]}`];
                    }
                    //Si es del equipo B
                    else if (equipo==1){
                            document.getElementById(`${arrayNombresStatsB[stat]}`).innerHTML= ambosEquipos[equipo][i][`${arrayNombresStats[stat]}`];
                    }
                }
            }      
        }
    }
}



/*AGREGAR Marco zonas de tiro*/


/*Creo funcion para comprobar quién tiene la posesión del balón*/
const queEquipoAtaca = ()=>{
    for (let i=0; i < 5; i++){
        if (listaEstadosJugadoresA[i].conPelota == true){
            return "A";
        }
        else if (listaEstadosJugadoresB[i].conPelota == true){
            return "B";
        }
        else{
            console.log("error");
        }
    }
}

const queEquipoDefiende = ()=>{
    for (let i=0; i < 5; i++){
        if (listaEstadosJugadoresA[i].conPelota == true){
            return "B";
        }
        else if (listaEstadosJugadoresB[i].conPelota == true){
            return "A";
        }
        else{
            console.log("error");
        }
    }
}

const queEquipoEs= (ataqueODefensa) =>{
    if (ataqueODefensa == 0){
        return "A";
    }
    else if (ataqueODefensa == 1){
        return "B";
    }
    else{
        console.log("error");
    }
}

const queEquipoAtacaNumero = ()=>{
    for (let i=0; i < 5; i++){
        if (listaEstadosJugadoresA[i].conPelota == true){
            return 0;
        }
        else if (listaEstadosJugadoresB[i].conPelota == true){
            return 1;
        }
        else{
            console.log("error");
        }
    }
}

const queEquipoDefiendeNumero = ()=>{
    for (let i=0; i < 5; i++){
        if (listaEstadosJugadoresA[i].conPelota == true){
            return 1;
        }
        else if (listaEstadosJugadoresB[i].conPelota == true){
            return 0;
        }
        else{
            console.log("error");
        }
    }
}
const posicionYALetra = (i)=>{
    let arrayLetrasParaNombrarCasillasEjeY= ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O"]
    //El bucle lo uso para recorrer este array de letras
    for (cantidadLetras in arrayLetrasParaNombrarCasillasEjeY){
        if (estadosAmbosEquipos[i][jugador]["ubicacionY"] == Number(cantidadLetras) + 1){
            return `${arrayLetrasParaNombrarCasillasEjeY[cantidadLetras]}`;       
        }
    }
}

/*Agrego función que ponga imagenes de jugadores en la ubicación en la que se encuentren*/
const muestroPosicionesEnCancha = ()=>{
    for (let i=0; i < 2; i++){
        //El segundo bucle lo uso para recorrer listaEstadosJugadores(A/B) (elije el jugador)
        for (jugador in estadosAmbosEquipos[i]){
            //De cada jugador tomo sus posiciones X e Y y las junto en un string compatible con los ID de los divs que representan las casillas de la cancha
            let idDivs = `${estadosAmbosEquipos[i][jugador]["ubicacionX"]}_${estadosAmbosEquipos[i][jugador]["ubicacionY"]}`;
            let posicionJugador = document.getElementById(idDivs);
            let concateno = "";
            if (queEquipoAtaca() == letraEquipo[i]){
                concateno += `<img src="${imgHabilidadesAmbosEquiposAtacando[i]["defecto"]}" alt="${ambosEquipos[i][jugador].nombre} se encuentra en ${posicionYALetra(i)}${estadosAmbosEquipos[i][jugador]["ubicacionX"]}">`;
            }
            else if (queEquipoDefiende() == letraEquipo[i]){
                concateno += `<img src="${imgHabilidadesAmbosEquiposDefendiendo[i]["defecto"]}" alt="${ambosEquipos[i][jugador].nombre} se encuentra en ${posicionYALetra(i)}${estadosAmbosEquipos[i][jugador]["ubicacionX"]}">`;
            }
            if (estadosAmbosEquipos[i][jugador].conPelota == true){
                concateno += `<img src="${imgConPelota[i]}" alt="${ambosEquipos[i][jugador].nombre} se encuentra en posesión de la pelota">`;
            }
            posicionJugador.innerHTML = concateno;
        }
    }
}


/*Creo función que sirve para generar botón resaltado*/
//El parámetro tiene que tener el nombre de la acción a realizar (Es el ID del elemento HTML que se va a mostrar en pantalla)
const resaltoBotones = (nombreDelBoton)=>{
    const button = document.getElementById(nombreDelBoton);
    //Le saco el class que oculta al botón y pongo uno nuevo que lo resalta
    button.setAttribute("class", "boton");
}

const muestroBotonObscuro = (nombreDelBoton)=>{
    const button = document.getElementById(nombreDelBoton);
    //Le saco el class que oculta al botón y pongo uno nuevo que lo opaca
    button.setAttribute("class", "botonNoSeleccionable");
}

const ocultoBoton = (nombreDelBoton)=>{
    const button = document.getElementById(nombreDelBoton);
    //Le pongo el class que oculta al botón sacando los demás class
    button.setAttribute("class", "noDisplay");
}

//Creo una función que despinta botones seleccionados previamente y pinta al seleccionado ahora
const pintoBotonSeleccionado = (ponerComoVariableElEventoDelBoton)=>{
    let botonClickeadoAhora = document.getElementById(`${ponerComoVariableElEventoDelBoton.target.id}`);
            let botonesClickeadosAntes = document.querySelector(".botonActivado");
            if (botonesClickeadosAntes != null){
                botonesClickeadosAntes.classList.remove("botonActivado");
                botonesClickeadosAntes.classList.add("boton");
            }
            botonClickeadoAhora.classList.remove("boton");
            botonClickeadoAhora.classList.add("botonActivado");
}

/*Creo función refresca estados de los jugadores en el "instante" que está comenzando*/
const comienzaInstante = ()=>{
    //Imprimo en el tablero la información relacionada al tiempo restante y puntos
    let tanteadorA=document.getElementById("tanteadorA");
    let tanteadorB=document.getElementById("tanteadorB");
    let relojPartido=document.getElementById("relojPartido");
    function segundosAString(seconds) {
        let minute = Math.floor((seconds / 60) % 60);
        minute = (minute < 10)? '0' + minute : minute;
        let second = seconds % 60;
        second = (second < 10)? '0' + second : second;
        return minute + ':' + second;
    }

    tanteadorA.innerHTML= `${arrayConPuntosPorEquipo[0]}`;
    tanteadorB.innerHTML= `${arrayConPuntosPorEquipo[1]}`;
    relojPartido.innerHTML= `${segundosAString(instantesEnPeriodo)}`;
    for (equipo in estadosAmbosEquipos){
        for (let i=0; i<5; i++){
            //Indico que los jugadores todavía no usaron su turno en este nuevo instante
            estadosAmbosEquipos[equipo][jugador]["turnoUsado"] = false;
            //Doy nuevos puntos de acción
            nuevosPuntosDeAccion();
        }
    }
}


/*Creo función para que los coach vean qué jugadres tienen puntos de acción*/
//El parámetro contiene la función "queEquipoDefiendeNumero" o "queEquipoAtacaNumero" según toque al coach atacante o defensor.
const muestroJugadoresConTurno = (ataqueODefensa)=>{
    textoLocutor.innerHTML+=`<br><p>Los jugadores que tienen turno aparecen marcados con verde claro</p>`;
    //Utilizo esta herramienta para contar la cantidad de jugadores a los que les queda turno en este instante
    let cuentoJugadoresConTurno = 0;
    for (jugador in estadosAmbosEquipos[ataqueODefensa]){
        if (estadosAmbosEquipos[ataqueODefensa][jugador].turnoUsado == false){
            //Sumo cantidad de jugadores con turno
            cuentoJugadoresConTurno++;
            
            //De cada jugador tomo sus posiciones X e Y y las junto en un string compatible con los ID de los divs que representan las casillas de la cancha
            let posicionJugador = document.getElementById(`${estadosAmbosEquipos[ataqueODefensa][jugador]["ubicacionX"]}_${estadosAmbosEquipos[ataqueODefensa][jugador]["ubicacionY"]}`);
            //Agrego atributo que va a colorear el fondo en la casilla en la que se encuentran estos jugadores
            posicionJugador.classList.add(`fondoVerde`);
            posicionJugador.classList.add(`jugador${queEquipoEs(ataqueODefensa)}${jugador}`);            
        }
    }
    //Considero si hay jugadores con turno o no y a quién toca jugar para ver por dónde continúo
    if ((ataqueODefensa == queEquipoDefiendeNumero()) && (cuentoJugadoresConTurno != 0)){
        coachElijeJugador(queEquipoDefiendeNumero());
    }
    //Considero si hay jugadores con turno o no y a quién toca jugar para ver por dónde continúo
    else if ((ataqueODefensa == queEquipoAtacaNumero()) && (cuentoJugadoresConTurno != 0)){
        coachElijeJugador(queEquipoAtacaNumero());
    }
    else if (cuentoJugadoresConTurno == 0){

    }
}


/*Creo función para que los coach seleccionen el jugador con el que van a realizar una acción*/
const coachElijeJugador = (ataqueODefensa)=>{
    //Defino esta variable que va a ser de utilidad para nombrar a los jugadores
    let jugadorElegible;
    //Con un bucle me fijo cuáles jugadores tienen turnos pendientes en este instante
    for (let i=0; i < 5; i++){
        //Creo evento que va a suceder cuando clickeemos en alguno de los divs que contienen a los jugadores
        /*ERROR*/ //Salvo el error poniendo la segunda condición, la que va después del &&. En realidad el error está en que no se borran los eventos del turno anterior por lo que para que no se dupliquen los eventos pongo esa variable
        if ((estadosAmbosEquipos[ataqueODefensa][i]["turnoUsado"] == false) && (esPrimeraVuelta==true)){
            //Llamo a los jugadores que tienen turno
            jugadorElegible = document.querySelector(`.jugador${queEquipoEs(ataqueODefensa)}${Number(estadosAmbosEquipos[ataqueODefensa][i]["nombre"][2])-1}`);
            //Creo evento con la función seleccionoJugador
            jugadorElegible.addEventListener("click", seleccionoJugador);
        }
        /*FIN ERROR*/
        
        //Función que se ejecuta con ese evento
        function seleccionoJugador(evt){
            textoLocutor.innerHTML+=`<br><p>El jugador clickeado se ha pintado de verde obscuro. Si desea confirmas su selección presione el botón confirmar</p>`;
            //Muestro el botón llamado confirmar
            resaltoBotones("confirmar")
            //Reseteo color de a quienes corresponda a seleccionable ("fondoVerde") Para que no figure más de un elegido
            let jugadorSeleccionado = document.querySelector(".fondoSeleccionado");
            //Pongo una puerta lógica para que no falle en la primera selección
            if (jugadorSeleccionado != null){
                jugadorSeleccionado.classList.add("fondoVerde");
                jugadorSeleccionado.classList.remove("fondoSeleccionado");
            }
            //Al jugador seleccionado lo muestro con otro color de fondo
            evt.currentTarget.classList.remove(`fondoVerde`);
            evt.currentTarget.classList.add(`fondoSeleccionado`);
            //Guardo temporalmente el jugador seleccionado
            sessionStorage.setItem(ataqueODefensa, `${queEquipoEs(ataqueODefensa)}${(i+1)}`);
            
            funcionalidadBotonConfirmarJugador(ataqueODefensa);
        }
    }
    //Herramienta para "salvar" que se pongan varias veces los eventos
    if (cuentoVuelta > 0){
        cuentoVuelta--;
    }
    if (cuentoVuelta == 0){
        esPrimeraVuelta=false;
    }
    /*Pongo evento al botón confirmar*/ //No sacar esta función de coachElijeJugador porque se rompe
    const funcionalidadBotonConfirmarJugador = (ataqueODefensa)=>{
        let botonConfirmar = document.querySelector("#confirmar");
        botonConfirmar.addEventListener("click", funcionalidad);
        
        //Función que se ejecuta con ese evento
        function funcionalidad(){
            textoLocutor.innerHTML+=`<br><p>Se confirma la selección de ese jugador</p>`;
            //Guardo en el sesienStorage el jugador seleccionado
            if (guardoJugadorSeleccionado.length>1){
                guardoJugadorSeleccionado.pop();
            }
            guardoJugadorSeleccionado.push(sessionStorage.getItem(ataqueODefensa));
        
            //Llamo a los divs que tienen class para colorear su fondo (que tienen eventos click)
            let conFondoSeleccionado = document.getElementsByClassName("fondoSeleccionado");
            let conFondoVerde = document.getElementsByClassName("fondoVerde");
            
            /*ERROR ACA*/ //Por algún motivo no se remueve el evento por más de que el elemento está bien llamado y la función bien escrita. Esto mismo me pasaba cuando movía a los jugadores por la cancha. Acá es "salvable" porque están siempre en el mismo lugar. Igual si clickean en la casilla que debería ya no tener el evento se rompe todo pero si esto pasa con los jugadores moviendose por la cancha todas las casillas romperian eventualmente el programa.
            // for (let i=0; i < 5; i++){
                //Remuevo evento que sucede cuando clickeemos en alguno de los divs que contienen a los jugadores
                // if (estadosAmbosEquipos[ataqueODefensa][i]["turnoUsado"] == false){
                //     //Llamo a los jugadores que tienen turno
                //     jugadorElegible = document.querySelector(`.jugador${queEquipoEs(ataqueODefensa)}${Number(estadosAmbosEquipos[ataqueODefensa][i]["nombre"][2])-1}`);
                //     //Creo evento con la función seleccionoJugador
                //     jugadorElegible.removeEventListener("click", seleccionoJugador);
                // }
            // }
            /*FIN SECCION ERROR*/

            //Mientras siga habiendo divs con clases de este estilo voy a seguir borrando el primero que encuentro (Hay q matarlos a todos) y eliminando los eventos que tenga
            while (conFondoVerde.length > 0){
                conFondoVerde[0].classList.remove("fondoVerde");
            }
            while (conFondoSeleccionado.length > 0){
                conFondoSeleccionado[0].classList.add(`fondoJugadorActivo${queEquipoEs(ataqueODefensa)}`);
                conFondoSeleccionado[0].classList.remove("fondoSeleccionado");
            }
        
            //Oculto nuevamente el botón
            botonConfirmar.setAttribute("class", "noDisplay");        
            //Remuevo evento de boton confirmar
            botonConfirmar.removeEventListener("click", funcionalidad);
        
            if (ataqueODefensa == queEquipoDefiendeNumero()){
                muestroJugadoresConTurno(queEquipoAtacaNumero());
            }
            else if (ataqueODefensa == queEquipoAtacaNumero()){
                comparoIniciativasDeJugadoresElegidos();
            }
        }
    }
}

/*Creo una función que asegura que guardoJugadorSeleccionado no contenga jugadores elegidos previamente*/
const borroJugadoresSeleccionadosPreviamente = ()=>{
    while (guardoJugadorSeleccionado.length>0){
        guardoJugadorSeleccionado.pop();
    }
}
    
/*Creo una función que compara las iniciativas de los jugadores*/
const comparoIniciativasDeJugadoresElegidos = ()=>{
    //Guardo a ambos jugadores por separado en variables
    let jugador1 = guardoJugadorSeleccionado[0];
    let jugador2 = guardoJugadorSeleccionado[1];
    //Guardo el equipo al que pertenece cada uno de estos jugadores en variables
    let equipoJugador1 = jugador1[0];
    let equipoJugador2 = jugador2[0];
    //Cambio los valores del equipo al que pertenecen para poder usarlos para llamar arrays (considerar que siempre el jugador1 es el jugador que defiende)
    if (equipoJugador1 == "A"){
        equipoJugador1 = 0;
    }
    else if (equipoJugador1 == "B"){
        equipoJugador1 = 1;
    }
    if (equipoJugador2 == "A"){
        equipoJugador2 = 0;
    }
    else if (equipoJugador2 == "B"){
        equipoJugador2 = 1;
    }
    //Meto esas variables en un array
    equiposJugadoresElegidos = [equipoJugador1, equipoJugador2]
    //Guardo el rol de cada jugador (1, 2, 3, 4 o 5) en variables
    let rolJugador1 = jugador1[1];
    let rolJugador2 = jugador2[1];
    //Meto esas variables en un array
    rolJugadoresElegidos = [rolJugador1, rolJugador2]
    //Creo las variables donde se almacenarán las iniciativas
    let iniciativaJugador1 = 0;
    let iniciativaJugador2 = 0;
    //Comeinzo a calcular las iniciativas.
    //El cálculo se hace utilizando ciertas habilidades dependiendo de la posición en la que se encuentran
    comparoIniciativas = 0;
    
    const calculoSiDefensorEstaCercaDelAro = ()=>{
        iniciativaJugador1 = dadoDe20()*2 + ((ambosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["altura"]-165)/0.65) + ((ambosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["peso"]-65)/0.55) + ambosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["capacidadAtletica"]*1.2 + ambosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["defensaInterna"]*2;
    }
    const calculoSiDefensorEstaMedianamenteCercaPeroNoTanto= ()=>{
        iniciativaJugador1 = dadoDe20()*2 + ((ambosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["altura"]-165)/0.65)*0.75 + ((ambosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["peso"]-65)/0.55)*0.75 + ambosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["capacidadAtletica"]*1.2 + ambosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["defensaInterna"]*2*0.75 + ambosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["defensaPerimetral"]*2*0.25;
    }
    const calculoSiDefensorEstaEnMediaDistancia= ()=>{
        iniciativaJugador1 = dadoDe20()*2 + ((ambosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["altura"]-165)/0.65)*0.25 + ((ambosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["peso"]-65)/0.55)*0.25 + ambosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["capacidadAtletica"]*1.2 + ambosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["defensaInterna"]*2*0.25 + ambosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["defensaPerimetral"]*2*0.75;
    }
    const calculoSiDefensorEstaLejos= ()=>{
        iniciativaJugador1 = dadoDe20()*2 + ambosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["capacidadAtletica"]*1.2 + ambosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["defensaPerimetral"]*2*2;
    }
    const calculoSiAtacanteEstaCercaDelAro= ()=>{
        iniciativaJugador2 = dadoDe20()*2 + ((ambosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["altura"]-165)/0.65) + ((ambosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["peso"]-65)/0.55) + ambosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["capacidadAtletica"]*1.2 + ambosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["anotacionInterior"] + ambosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["creacionDeJuego"];
    }
    const calculoSiAtacanteEstaMedianamenteCercaPeroNoTanto=()=>{
        iniciativaJugador2 = dadoDe20()*2 + ((ambosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["altura"]-165)/0.65)*0.75 + ((ambosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["peso"]-65)/0.55)*0.75 + ambosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["capacidadAtletica"]*1.2 + ambosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["anotacionInterior"]*0.75 + ambosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["anotacionExterior"]*0.25 + ambosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["creacionDeJuego"];
    }
    const calculoSiAtacanteEstaEnMediaDistancia= ()=>{
        iniciativaJugador2 = dadoDe20()*2 + ((ambosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["altura"]-165)/0.65)*0.25 + ((ambosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["peso"]-65)/0.55)*0.25 + ambosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["capacidadAtletica"]*1.2 + ambosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["anotacionInterior"]*0.25 + ambosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["anotacionExterior"]*0.75 + ambosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["creacionDeJuego"];
    }
    const calculoSiAtacanteEstaLejos= ()=>{
        iniciativaJugador2 = dadoDe20()*2 + ambosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["capacidadAtletica"]*1.2 + ambosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["anotacionExterior"]*2*2 + ambosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["creacionDeJuego"];
    }
    while (comparoIniciativas ==  0){
        //Cálculos para jugador defensor
        //Si el equipo defensor es el A
        if (equiposJugadoresElegidos[0] == 0){
            //Si está cerca del aro
            if ((estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionX"] < 3) && (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionY"] > 5) && (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionY"] < 11) || (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionX"] < 5) && (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionY"] > 6) && (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionY"] < 10)){
                calculoSiDefensorEstaCercaDelAro();
            }
            //Si está medianamente cerca pero no tanto
            else if ((estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionX"] < 4) && (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionY"] == 5) || (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionX"] < 6) && (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionX"] > 2) && (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionY"] == 6) || (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionX"] == 5) && (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionY"] > 6) && (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionY"] < 10) || (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionX"] < 6) && (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionX"] > 2) && (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionY"] == 10) || (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionX"] < 4) && (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionY"] == 11)){
                calculoSiDefensorEstaMedianamenteCercaPeroNoTanto();
            }
            //Si está en media distancia
            else if ((estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionX"] < 2) && (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionY"] == 3) || (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionX"] < 5) && (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionY"] == 4) || (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionX"] < 6) && (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionX"] > 3) && (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionY"] == 5) || (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionX"] == 6) && (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionY"] > 5) && (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionY"] < 11) || (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionX"] < 6) && (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionX"] > 3) && (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionY"] == 11) || (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionX"] < 5) && (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionY"] == 12) || (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionX"] == 1) && (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionY"] == 13)){
                calculoSiDefensorEstaEnMediaDistancia();
            }
            //Si está lejos
            else if ((estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionY"] == 1) || (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionY"] == 2) || (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionY"] == 14) || (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionY"] == 15) || (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionX"] > 1) && (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionY"] == 3) || (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionX"] > 4) && (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionY"] == 4) || (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionX"] > 5) && (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionY"] == 5) || (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionX"] > 6) && (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionY"] > 5) && (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionY"] < 11) || (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionX"] > 5) && (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionY"] == 11) || (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionX"] > 4) && (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionY"] == 12) || (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionX"] > 1) && (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionY"] == 13)){
                calculoSiDefensorEstaLejos();
            }
        
            //Cálculos para jugador atacante
            //Si está cerca del aro
            if ((estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionX"] < 3) && (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionY"] > 5) && (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionY"] < 11) || (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionX"] < 5) && (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionY"] > 6) && (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionY"] < 10)){
                calculoSiAtacanteEstaCercaDelAro();
            }
            //Si está medianamente cerca pero no tanto
            else if ((estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionX"] < 4) && (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionY"] == 5) || (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionX"] < 6) && (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionX"] > 2) && (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionY"] == 6) || (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionX"] == 5) && (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionY"] > 6) && (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionY"] < 10) || (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionX"] < 6) && (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionX"] > 2) && (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionY"] == 10) || (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionX"] < 4) && (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionY"] == 11)){
                calculoSiAtacanteEstaMedianamenteCercaPeroNoTanto();
            }
            //Si está en media distancia
            else if ((estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionX"] < 2) && (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionY"] == 3) || (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionX"] < 5) && (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionY"] == 4) || (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionX"] < 6) && (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionX"] > 3) && (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionY"] == 5) || (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionX"] == 6) && (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionY"] > 5) && (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionY"] < 11) || (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionX"] < 6) && (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionX"] > 3) && (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionY"] == 11) || (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionX"] < 5) && (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionY"] == 12) || (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionX"] == 1) && (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionY"] == 13)){
                calculoSiAtacanteEstaEnMediaDistancia();
            }
            //Si está lejos
            else if ((estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionY"] == 1) || (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionY"] == 2) || (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionY"] == 14) || (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionY"] == 15) || (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionX"] > 1) && (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionY"] == 3) || (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionX"] > 4) && (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionY"] == 4) || (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionX"] > 5) && (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionY"] == 5) || (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionX"] > 6) && (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionY"] > 5) && (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionY"] < 11) || (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionX"] > 5) && (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionY"] == 11) || (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionX"] > 4) && (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionY"] == 12) || (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionX"] > 1) && (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionY"] == 13)){
                calculoSiAtacanteEstaLejos();
            }
        }
        //Si el equipo defensor es el B
        else if (equiposJugadoresElegidos[0] == 1){
            //Si está cerca del aro
            if ((estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionX"] > 26) && (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionY"] > 5) && (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionY"] < 11) || (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionX"] > 24) && (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionY"] > 6) && (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionY"] < 10)){
                calculoSiDefensorEstaCercaDelAro();
            }
            //Si está medianamente cerca pero no tanto
            else if ((estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionX"] > 24) && (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionY"] == 5) || (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionX"] > 22) && (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionX"] < 27) && (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionY"] == 6) || (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionX"] == 24) && (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionY"] > 6) && (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionY"] < 10) || (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionX"] > 22) && (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionX"] < 27) && (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionY"] == 10) || (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionX"] > 25) && (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionY"] == 11)){
                calculoSiEstaMedianamenteCercaPeroNoTanto();
            }
            //Si está en media distancia
            else if ((estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionX"] > 27) && (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionY"] == 3) || (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionX"] > 24) && (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionY"] == 4) || (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionX"] > 23) && (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionX"] < 26) && (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionY"] == 5) || (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionX"] == 23) && (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionY"] > 5) && (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionY"] < 11) || (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionX"] > 23) && (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionX"] < 26) && (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionY"] == 11) || (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionX"] > 24) && (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionY"] == 12) || (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionX"] == 28) && (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionY"] == 13)){
                calculoSiEstaEnMediaDistancia();
            }
            //Si está lejos
            else if ((estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionY"] == 1) || (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionY"] == 2) || (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionY"] == 14) || (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionY"] == 15) || (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionX"] < 28) && (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionY"] == 3) || (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionX"] < 25) && (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionY"] == 4) || (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionX"] < 24) && (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionY"] == 5) || (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionX"] < 23) && (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionY"] > 5) && (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionY"] < 11) || (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionX"] < 24) && (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionY"] == 11) || (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionX"] < 25) && (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionY"] == 12) || (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionX"] < 28) && (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionY"] == 13)){
                calculoSiDefensorEstaLejos();
            }
        
            //Cálculos para jugador atacante
            //Si está cerca del aro
            if ((estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionX"] > 26) && (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionY"] > 5) && (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionY"] < 11) || (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionX"] > 24) && (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionY"] > 6) && (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionY"] < 10)){
                calculoSiAtacanteEstaCercaDelAro();
            }
            //Si está medianamente cerca pero no tanto
            else if ((estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionX"] > 24) && (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionY"] == 5) || (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionX"] > 22) && (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionX"] < 27) && (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionY"] == 6) || (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionX"] == 24) && (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionY"] > 6) && (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionY"] < 10) || (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionX"] > 22) && (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionX"] < 27) && (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionY"] == 10) || (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionX"] > 25) && (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionY"] == 11)){
                calculoSiAtacanteEstaMedianamenteCercaPeroNoTanto();
            }
            //Si está en media distancia
            else if ((estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionX"] > 27) && (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionY"] == 3) || (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionX"] > 24) && (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionY"] == 4) || (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionX"] > 23) && (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionX"] < 26) && (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionY"] == 5) || (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionX"] == 23) && (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionY"] > 5) && (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionY"] < 11) || (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionX"] > 23) && (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionX"] < 26) && (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionY"] == 11) || (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionX"] > 24) && (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionY"] == 12) || (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionX"] == 28) && (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionY"] == 13)){
                calculoSiAtacanteEstaEnMediaDistancia();
            }
            //Si está lejos
            else if ((estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionY"] == 1) || (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionY"] == 2) || (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionY"] == 14) || (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionY"] == 15) || (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionX"] < 28) && (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionY"] == 3) || (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionX"] < 25) && (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionY"] == 4) || (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionX"] < 24) && (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionY"] == 5) || (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionX"] < 23) && (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionY"] > 5) && (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionY"] < 11) || (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionX"] < 24) && (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionY"] == 11) || (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionX"] < 25) && (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionY"] == 12) || (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionX"] < 28) && (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionY"] == 13)){
                calculoSiAtacanteEstaLejos();
            }
        }
    
        //Comparo las iniciativas
        comparoIniciativas = iniciativaJugador1 - iniciativaJugador2;
    }
    
    if (comparoIniciativas > 0){
        textoLocutor.innerHTML+=`<br><p>Le toca al que defiende</p>`;
        //Cambio color de fondo para que destaque por sobre el otro jugador elegido
        let herramientaParaCambiarFondoAlQueJuegaAhora;
        if (equiposJugadoresElegidos[0] == 0){
            herramientaParaCambiarFondoAlQueJuegaAhora = document.querySelector(".fondoJugadorActivoA");
            if (herramientaParaCambiarFondoAlQueJuegaAhora == null){
                herramientaParaCambiarFondoAlQueJuegaAhora = document.querySelector(".fondoSeleccionadoYLeToca")
            }
            herramientaParaCambiarFondoAlQueJuegaAhora.classList.add("fondoSeleccionadoYLeToca");
            herramientaParaCambiarFondoAlQueJuegaAhora.classList.remove("fondoJugadorActivoA");
        }
        else if (equiposJugadoresElegidos[0] == 1){
            herramientaParaCambiarFondoAlQueJuegaAhora = document.querySelector(".fondoJugadorActivoB");
            if (herramientaParaCambiarFondoAlQueJuegaAhora == null){
                herramientaParaCambiarFondoAlQueJuegaAhora = document.querySelector(".fondoSeleccionadoYLeToca")
            }
            herramientaParaCambiarFondoAlQueJuegaAhora.classList.add("fondoSeleccionadoYLeToca");
            herramientaParaCambiarFondoAlQueJuegaAhora.classList.remove("fondoJugadorActivoB");
        }
        //Función para que el jugador defensor elija su acción
        muestroPosiblesAccionesDefensa(equiposJugadoresElegidos[0], (rolJugadoresElegidos[0]-1));
    }
    else if (comparoIniciativas < 0){
        textoLocutor.innerHTML+=`<br><p>Le toca al que defiende</p>`;
        //Cambio color de fondo para que destaque por sobre el otro jugador elegido
        let herramientaParaCambiarFondoAlQueJuegaAhora;
        if (equiposJugadoresElegidos[1] == 0){
            herramientaParaCambiarFondoAlQueJuegaAhora = document.querySelector(".fondoJugadorActivoA");
            if (herramientaParaCambiarFondoAlQueJuegaAhora == null){
                herramientaParaCambiarFondoAlQueJuegaAhora = document.querySelector(".fondoSeleccionadoYLeToca")
            }
            herramientaParaCambiarFondoAlQueJuegaAhora.classList.add("fondoSeleccionadoYLeToca");
            herramientaParaCambiarFondoAlQueJuegaAhora.classList.remove("fondoJugadorActivoA");
        }
        else if (equiposJugadoresElegidos[1] == 1){
            herramientaParaCambiarFondoAlQueJuegaAhora = document.querySelector(".fondoJugadorActivoB");
            if (herramientaParaCambiarFondoAlQueJuegaAhora == null){
                herramientaParaCambiarFondoAlQueJuegaAhora = document.querySelector(".fondoSeleccionadoYLeToca")
            }
            herramientaParaCambiarFondoAlQueJuegaAhora.classList.add("fondoSeleccionadoYLeToca");
            herramientaParaCambiarFondoAlQueJuegaAhora.classList.remove("fondoJugadorActivoB");
        }
        //Función para que el jugador atacante elija su acción
        muestroPosiblesAccionesAtaque(equiposJugadoresElegidos[1], (rolJugadoresElegidos[1]-1));
    }
}

/*Función para que el jugador elija la acción que va a realizar*/
//Creo función para mostrar botones de acción posibles para cada jugador (Separar las acciones defensivas de las ofensivas).
//(Los parámetros son usados para cargar los datos de los jugadores elegidos)
const muestroPosiblesAccionesDefensa = (equipo, jugador)=>{
    textoLocutor.innerHTML+=`<br><p>De los botones que aparecieron, los iluminados son las posibles acciones que puede realizar el jugador seleccionado</p>`;
    /*MOVERSE*/
    //Creo evento que sucederá al activarse el evento del botón "moverse"  (modificar este evento para que primero permita seleccionarlo y luego ponerle los eventos al tablero con el botón confirmar como los demás botones)
    // function funcionalidadBotonMoverse(evt){
        //     pintoBotonSeleccionado(evt);
        //     mostrarOpcionesDeDondeMoverse(equipo, jugador);
        //     permitoSeleccionarOpcionesDeDondeMoverse(equipo, jugador);
        // }
        /*FIN SEGMENTO MOVERSE*/
        
        
        
        //Creo función que será de utilidad para la que le
        function quitoBotonesTerminarTurno (){
            //Quito eventos de los botones y los oculto
            botonConfirmar.removeEventListener("click", quitoBotonesTerminarTurno);
            ocultoBoton("terminarTurno");
            ocultoBoton("confirmar");
            funcionalidadBotonTerminarTurnoD();
        }
        //Creo funcionalidad para confirmar que deseo terminar el turno
        function pidoConfirmarEleccionTerminarTurno (evt){
            pintoBotonSeleccionado(evt);
            resaltoBotones("confirmar");
            botonTerminarTurno.removeEventListener("click", pidoConfirmarEleccionTerminarTurno);
            botonConfirmar.addEventListener("click", quitoBotonesTerminarTurno);
        }
        /*Creo funciónes para terminar turno*/
        function funcionalidadBotonTerminarTurnoD(){
            //Llamo a los jugadores con fondo seleccionado para poder quitarle el fondo
            let jugadoresConFondoElegido= document.getElementsByClassName(`fondoSeleccionadoYLeToca`);
            //Quito el color de fondo del jugador que acaba de terminar su turno
            jugadoresConFondoElegido[0].classList.remove(`fondoSeleccionadoYLeToca`);
            
            
            //Le quito los puntos de acción restantes e indico que el turno ya fue usado
            estadosAmbosEquipos[equipo][jugador]["puntosDeAccion"] = 0;
            estadosAmbosEquipos[equipo][jugador]["turnoUsado"] = true;
            //Si el equipo que comenzó eligiendo sus acciones fué el atacante
            if (comparoIniciativas < 0){
                //Continúo al próximo instante
                borroJugadoresSeleccionadosPreviamente();
                funcionGestionReloj();
                muestroJugadoresConTurno(queEquipoDefiendeNumero());
            }
            //Si el equipo que comenzó eligiendo sus acciones fué el defensor
            else if (comparoIniciativas > 0){
                //Pinto como seleccionado y que le toca al jugador elegido rival quitandole el otro fondo
                let otroJugador = document.getElementsByClassName(`fondoJugadorActivo${queEquipoEs(equiposJugadoresElegidos[1])}`);
                if (otroJugador.length != 0){
                    otroJugador[0].classList.add("fondoSeleccionadoYLeToca");
                    otroJugador[0].classList.remove(`fondoJugadorActivo${queEquipoEs(equiposJugadoresElegidos[1])}`);
                }
        
                //Continúo por que el atacante elija sus acciones
                muestroPosiblesAccionesAtaque(equiposJugadoresElegidos[1], (rolJugadoresElegidos[1]-1));
            }
        }
    
    //Comprobar puntos de acción para saber cuáles son las posibles acciones. Poner obscuras las posibilidades que no alcanzan los puntos no ponerles eventos.
    if (estadosAmbosEquipos[equipo][jugador]["puntosDeAccion"] > 1){
        //Llamo el boton terminar turno para darle funcionalidad
        botonTerminarTurno.addEventListener("click", pidoConfirmarEleccionTerminarTurno);
        resaltoBotones("terminarTurno");
        /*MOVERSE*/
        //resaltoBotones("moverse");

        //TERMINAR
        // let botonMoverse = document.getElementById("moverse");
        // botonMoverse.addEventListener("click", funcionalidadBotonMoverse);

        //----TERMINAR----



        // resaltoBotones("intentarUnRoboAlPortadorDeLaPelota");
        // resaltoBotones("intentarInterceptarPase");
        // resaltoBotones("esperaAtosigante");
        // resaltoBotones("esperaCautelosa");
        // muestroBotonObscuro("confirmar");

        /*FIN SEGMENTO MOVERSE*/
    }
    
    else if ((estadosAmbosEquipos[equipo][jugador]["puntosDeAccion"] > 0.5) && (estadosAmbosEquipos[equipo][jugador]["puntosDeAccion"] <1)){
        //Llamo el boton terminar turno para darle funcionalidad
        botonTerminarTurno.addEventListener("click", pidoConfirmarEleccionTerminarTurno);
        resaltoBotones("terminarTurno");
        /*MOVERSE*/
        // muestroBotonObscuro("moverse");
        // muestroBotonObscuro("intentarUnRoboAlPortadorDeLaPelota");
        // muestroBotonObscuro("intentarInterceptarPase");
        // muestroBotonObscuro("esperaAtosigante");
        // resaltoBotones("esperaCautelosa");
        //muestroBotonObscuro("confirmar");

        /*FIN SEGMENTO MOVERSE*/
    }
    //Skipeo a la acción correspondiente dependiendo de si es el primer equipo en jugar o el segundo
    else if (estadosAmbosEquipos[equipo][jugador]["puntosDeAccion"] < 0.5){
        funcionalidadBotonTerminarTurnoA();
    }
}


const muestroPosiblesAccionesAtaque = (equipo, jugador)=>{
    textoLocutor.innerHTML+=`<br><p>De los botones que aparecieron, los iluminados son las posibles acciones que puede hacer el jugador seleccionado</p>`;
    //Creo función que será de utilidad para armar el choclo que continúa
    function cambioColoresAApropiados(evt){
        let botonActivado = document.querySelector(".botonActivado");
        botonActivado.setAttribute("class", "boton");
        pintoBotonSeleccionado(evt);
    }
    /*Estas funciones se van a aplicar cuando el jugador tenga 1 o más puntos de acción y la posesión de la pelota*/
    //Creo función que se complementa con la que le sigue
    function quitoBotonesTerminarTurnoConPelotaYMasDeUnPuntoDeAccion(){
        //Quito eventos de los botones y los oculto
        botonConfirmar.removeEventListener("click", quitoBotonesTerminarTurnoConPelotaYMasDeUnPuntoDeAccion);
        ocultoBoton("confirmar")
        botonPase.removeEventListener("click", cambioAEleccionPaseConMasDeUnPuntoDeAccionDesdeTerminarTurno);
        ocultoBoton("pase");
        botonTiro.removeEventListener("click", cambioAEleccionTiroDesdeTerminarTurno);
        ocultoBoton("tiro");
        ocultoBoton("terminarTurno");
        //Ejecuto función que termina el turno
        funcionalidadBotonTerminarTurnoA()
    }
    //Creo funcionalidad para confirmar que deseo terminar el turno
    function pidoConfirmarEleccionTerminarTurnoConPelotaYMasDeUnPuntoDeAccion (evt){
        textoLocutor.innerHTML+=`<br><p>Confirme si quiere realizar esta acción</p>`;
        pintoBotonSeleccionado(evt);
        resaltoBotones("confirmar");
        botonConfirmar.addEventListener("click", quitoBotonesTerminarTurnoConPelotaYMasDeUnPuntoDeAccion);
        //Quito eventos base de otros botones
        botonPase.removeEventListener("click", pidoConfirmarEleccionPaseConMasDeUnPuntoDeAccion);
        botonTiro.removeEventListener("click", pidoConfirmarEleccionTiro);
        botonTerminarTurno.removeEventListener("click", pidoConfirmarEleccionTerminarTurnoConPelotaYMasDeUnPuntoDeAccion);
        
        //Meto eventos que serán transición cíclica a otros botones
        botonPase.addEventListener("click", cambioAEleccionPaseConMasDeUnPuntoDeAccionDesdeTerminarTurno);
        botonTiro.addEventListener("click", cambioAEleccionTiroDesdeTerminarTurno);
    }
    
    //Creo función que se complementa con la que le sigue
    function quitoBotonesPaseConMasDeUnPuntoDeAccion(){
        //Quito eventos de los botones y los oculto
        botonConfirmar.removeEventListener("click", quitoBotonesPaseConMasDeUnPuntoDeAccion);
        ocultoBoton("confirmar")
        ocultoBoton("pase");
        botonTiro.removeEventListener("click", cambioAEleccionTiroDesdePase);
        ocultoBoton("tiro");
        botonTerminarTurno.removeEventListener("click", cambioAEleccionTerminarTurnoConMasDeUnPuntoDeAccionDesdePase);
        ocultoBoton("terminarTurno");
        //Ejecuto función que termina el turno
        funcionalidadBotonPase()
    }
    //Creo funcionalidad para confirmar que deseo hacer un pase
    function pidoConfirmarEleccionPaseConMasDeUnPuntoDeAccion (evt){
        textoLocutor.innerHTML+=`<br><p>Confirme si quiere realizar esta acción</p>`;
        pintoBotonSeleccionado(evt);
        resaltoBotones("confirmar");
        botonConfirmar.addEventListener("click", quitoBotonesPaseConMasDeUnPuntoDeAccion);
        //Quito eventos base de otros botones
        botonPase.removeEventListener("click", pidoConfirmarEleccionPaseConMasDeUnPuntoDeAccion)
        botonTiro.removeEventListener("click", pidoConfirmarEleccionTiro);
        botonTerminarTurno.removeEventListener("click", pidoConfirmarEleccionTerminarTurnoConPelotaYMasDeUnPuntoDeAccion);
        
        //Meto eventos que serán transición cíclica a otros botones
        botonTiro.addEventListener("click", cambioAEleccionTiroDesdePase);
        botonTerminarTurno.addEventListener("click", cambioAEleccionTerminarTurnoConMasDeUnPuntoDeAccionDesdePase);
    }
    
    //Creo función que se complementa con la que le sigue
    function quitoBotonesEleccionTiro(){
        //Quito eventos de los botones y los oculto
        botonConfirmar.removeEventListener("click", quitoBotonesEleccionTiro);
        ocultoBoton("confirmar")
        botonPase.removeEventListener("click", cambioAEleccionPaseDesdeTiro);
        ocultoBoton("pase");
        ocultoBoton("tiro");
        botonTerminarTurno.removeEventListener("click", cambioAEleccionTerminarTurnoDesdeTiro);
        ocultoBoton("terminarTurno");
        //Ejecuto función que termina el turno
        funcionalidadBotonTiro()
    }
    //Creo funcionalidad para confirmar que deseo hacer un tiro
    function pidoConfirmarEleccionTiro (evt){
        textoLocutor.innerHTML+=`<br><p>Confirme si quiere realizar esta acción</p>`;
        pintoBotonSeleccionado(evt);
        resaltoBotones("confirmar");
        botonConfirmar.addEventListener("click", quitoBotonesEleccionTiro);
        //Quito eventos base de otros botones
        botonPase.removeEventListener("click", pidoConfirmarEleccionPaseConMasDeUnPuntoDeAccion)
        botonTiro.removeEventListener("click", pidoConfirmarEleccionTiro);
        botonTerminarTurno.removeEventListener("click", pidoConfirmarEleccionTerminarTurnoConPelotaYMasDeUnPuntoDeAccion);
        
        //Meto eventos que serán transición cíclica a otros botones
        botonPase.addEventListener("click", cambioAEleccionPaseDesdeTiro);
        botonTerminarTurno.addEventListener("click", cambioAEleccionTerminarTurnoDesdeTiro);
    }
    
    //Creo función que se complementa con la que le sigue
    function quitoBotonesPaseConMasDeUnPuntoDeAccionDesdeTerminarTurno(){
        //Quito eventos de los botones y los oculto
        botonConfirmar.removeEventListener("click", quitoBotonesPaseConMasDeUnPuntoDeAccionDesdeTerminarTurno);
        ocultoBoton("confirmar")
        ocultoBoton("pase");
        botonTiro.removeEventListener("click", cambioAEleccionTiroDesdePase);
        ocultoBoton("tiro");
        botonTerminarTurno.removeEventListener("click", cambioAEleccionTerminarTurnoConMasDeUnPuntoDeAccionDesdePase);
        ocultoBoton("terminarTurno");
        //Ejecuto función que termina el turno
        funcionalidadBotonPase()
    }
    function cambioAEleccionPaseConMasDeUnPuntoDeAccionDesdeTerminarTurno(evt){
        textoLocutor.innerHTML+=`<br><p>Confirme si quiere realizar esta acción</p>`;
        
        cambioColoresAApropiados(evt);
        
        //Cambio evento del boton confirmar
        botonConfirmar.removeEventListener("click", quitoBotonesTerminarTurnoConPelotaYMasDeUnPuntoDeAccion);
        botonConfirmar.addEventListener("click", quitoBotonesPaseConMasDeUnPuntoDeAccionDesdeTerminarTurno);
    
        //Cambio eventos de los otros botones a botones cíclicos
        botonPase.removeEventListener("click", cambioAEleccionPaseConMasDeUnPuntoDeAccionDesdeTerminarTurno);
        botonTiro.removeEventListener("click", cambioAEleccionTiroDesdeTerminarTurno);
    
        //Agrego nuevos eventos
        botonTiro.addEventListener("click", cambioAEleccionTiroDesdePase);
        botonTerminarTurno.addEventListener("click", cambioAEleccionTerminarTurnoConMasDeUnPuntoDeAccionDesdePase);
    }
    
    //Creo función que se complementa con la que le sigue
    function quitoBotonesTiroDesdeTerminarTurno(){
        //Quito eventos de los botones y los oculto
        botonConfirmar.removeEventListener("click", quitoBotonesTiroDesdeTerminarTurno);
        ocultoBoton("confirmar");
        botonPase.removeEventListener("click", cambioAEleccionPaseDesdeTiro);
        ocultoBoton("pase");
        ocultoBoton("tiro");
        botonTerminarTurno.removeEventListener("click", cambioAEleccionTerminarTurnoDesdeTiro);
        ocultoBoton("terminarTurno");
        //Ejecuto función que termina el turno
        funcionalidadBotonTiro()
    }
    function cambioAEleccionTiroDesdeTerminarTurno(evt){
        textoLocutor.innerHTML+=`<br><p>Confirme si quiere realizar esta acción</p>`;
        
        cambioColoresAApropiados(evt);
        
        //Cambio evento del boton confirmar
        botonConfirmar.removeEventListener("click", quitoBotonesTerminarTurnoConPelotaYMasDeUnPuntoDeAccion);
        botonConfirmar.addEventListener("click", quitoBotonesTiroDesdeTerminarTurno);
    
        //Cambio eventos de los otros botones a botones cíclicos
        botonPase.removeEventListener("click", cambioAEleccionPaseConMasDeUnPuntoDeAccionDesdeTerminarTurno);
        botonTiro.removeEventListener("click", cambioAEleccionTiroDesdeTerminarTurno);
    
        //Agrego nuevos eventos
        botonPase.addEventListener("click", cambioAEleccionPaseDesdeTiro);
        botonTerminarTurno.addEventListener("click", cambioAEleccionTerminarTurnoDesdeTiro);
    }
    
    //Creo función que se complementa con la que le sigue
    function quitoBotonesTiroDesdePase(){
        //Quito eventos de los botones y los oculto
        botonConfirmar.removeEventListener("click", quitoBotonesTiroDesdePase);
        ocultoBoton("confirmar");
        botonPase.removeEventListener("click", cambioAEleccionPaseDesdeTiro);
        ocultoBoton("pase");
        ocultoBoton("tiro");
        botonTerminarTurno.removeEventListener("click", cambioAEleccionTerminarTurnoDesdeTiro);
        ocultoBoton("terminarTurno");
        //Ejecuto función que termina el turno
        funcionalidadBotonTiro()
    }
    function cambioAEleccionTiroDesdePase(evt){
        textoLocutor.innerHTML+=`<br><p>Confirme si quiere realizar esta acción</p>`;
        cambioColoresAApropiados(evt);
        
        //Cambio evento del boton confirmar
        botonConfirmar.removeEventListener("click", quitoBotonesPaseConMasDeUnPuntoDeAccion);
        botonConfirmar.addEventListener("click", quitoBotonesTiroDesdePase);
    
        //Cambio eventos de los otros botones a botones cíclicos
        botonTiro.removeEventListener("click", cambioAEleccionTiroDesdePase);
        botonTerminarTurno.removeEventListener("click", cambioAEleccionTerminarTurnoConMasDeUnPuntoDeAccionDesdePase);
    
        //Agrego nuevos eventos
        botonPase.addEventListener("click", cambioAEleccionPaseDesdeTiro);
        botonTerminarTurno.addEventListener("click", cambioAEleccionTerminarTurnoDesdeTiro);
    }
    
    //Creo función que se complementa con la que le sigue
    function quitoBotonesTerminarTurnoConPelotaYMasDeUnPuntoDeAccionDesdePase(){
        //Quito eventos de los botones y los oculto
        botonConfirmar.removeEventListener("click", quitoBotonesTerminarTurnoConPelotaYMasDeUnPuntoDeAccionDesdePase);
        ocultoBoton("confirmar");
        botonPase.removeEventListener("click", cambioAEleccionPaseConMasDeUnPuntoDeAccionDesdeTerminarTurno);
        ocultoBoton("pase");
        botonTiro.removeEventListener("click", cambioAEleccionTiroDesdeTerminarTurno);
        ocultoBoton("tiro");
        ocultoBoton("terminarTurno");
        //Ejecuto función que termina el turno
        funcionalidadBotonTerminarTurnoA()
    }
    function cambioAEleccionTerminarTurnoConMasDeUnPuntoDeAccionDesdePase(evt){
        textoLocutor.innerHTML+=`<br><p>Confirme si quiere realizar esta acción</p>`;
        cambioColoresAApropiados(evt);
        
        //Cambio evento del boton confirmar
        botonConfirmar.removeEventListener("click", quitoBotonesPaseConMasDeUnPuntoDeAccion);
        botonConfirmar.addEventListener("click", quitoBotonesTerminarTurnoConPelotaYMasDeUnPuntoDeAccionDesdePase);
    
        //Cambio eventos de los otros botones a botones cíclicos
        botonTiro.removeEventListener("click", cambioAEleccionTiroDesdePase);
        botonTerminarTurno.removeEventListener("click", cambioAEleccionTerminarTurnoConMasDeUnPuntoDeAccionDesdePase);
    
        //Agrego nuevos eventos
        botonPase.addEventListener("click", cambioAEleccionPaseConMasDeUnPuntoDeAccionDesdeTerminarTurno);
        botonTiro.addEventListener("click", cambioAEleccionTiroDesdeTerminarTurno);
    }
    
    //Creo función que se complementa con la que le sigue
    function quitoBotonesPaseDesdeTiro(){
        //Quito eventos de los botones y los oculto
        botonConfirmar.removeEventListener("click", quitoBotonesPaseDesdeTiro);
        ocultoBoton("confirmar");
        ocultoBoton("pase");
        botonTiro.removeEventListener("click", cambioAEleccionTiroDesdePase);
        ocultoBoton("tiro");
        botonTerminarTurno.removeEventListener("click", cambioAEleccionTerminarTurnoConMasDeUnPuntoDeAccionDesdePase);
        ocultoBoton("terminarTurno");
        //Ejecuto función que termina el turno
        funcionalidadBotonPase()
    }
    function cambioAEleccionPaseDesdeTiro(evt){
        textoLocutor.innerHTML+=`<br><p>Confirme si quiere realizar esta acción</p>`;
        cambioColoresAApropiados(evt);
        
        //Cambio evento del boton confirmar
        botonConfirmar.removeEventListener("click", quitoBotonesEleccionTiro);
        botonConfirmar.addEventListener("click", quitoBotonesPaseDesdeTiro);
    
        //Cambio eventos de los otros botones a botones cíclicos
        botonPase.removeEventListener("click", cambioAEleccionPaseDesdeTiro);
        botonTerminarTurno.removeEventListener("click", cambioAEleccionTerminarTurnoDesdeTiro);
    
        //Agrego nuevos eventos
        botonTiro.addEventListener("click", cambioAEleccionTiroDesdePase);
        botonTerminarTurno.addEventListener("click", cambioAEleccionTerminarTurnoConMasDeUnPuntoDeAccionDesdePase);
    }
    
    function quitoBotonesTerminarTurnoDesdeTiro(){
        //Quito eventos de los botones y los oculto
        botonConfirmar.removeEventListener("click", quitoBotonesTerminarTurnoDesdeTiro);
        ocultoBoton("confirmar");
        botonPase.removeEventListener("click", cambioAEleccionPaseDesdeTiro);
        ocultoBoton("pase");
        botonTiro.removeEventListener("click", cambioAEleccionTiroDesdeTerminarTurno);
        ocultoBoton("tiro");
        ocultoBoton("terminarTurno");
        //Ejecuto función que termina el turno
        funcionalidadBotonTiro()
    }
    function cambioAEleccionTerminarTurnoDesdeTiro(evt){
        textoLocutor.innerHTML+=`<br><p>Confirme si quiere realizar esta acción</p>`;
        cambioColoresAApropiados(evt);
        
        //Cambio evento del boton confirmar
        botonConfirmar.removeEventListener("click", quitoBotonesEleccionTiro);
        botonConfirmar.addEventListener("click", quitoBotonesTerminarTurnoDesdeTiro);
    
        //Cambio eventos de los otros botones a botones cíclicos
        botonPase.removeEventListener("click", cambioAEleccionPaseDesdeTiro);
        botonTerminarTurno.removeEventListener("click", cambioAEleccionTerminarTurnoDesdeTiro);
    
        //Agrego nuevos eventos
        botonTiro.addEventListener("click", cambioAEleccionTiroDesdeTerminarTurno);
        botonPase.addEventListener("click", cambioAEleccionPaseDesdeTiro);
    }
    /*Fin de funciones que actúan cuando el jugador tiene 1 o más puntos de accióin y la posesión de la pelota*/
    
    
    
    /*Estas funciones se van a aplicar cuando el jugador tenga menos de 1 punto de acción y la posesión de la pelota*/
    function quitoBotonesTerminarTurnoConPelotaConMenosDeUnPuntoDeAccion(){
        //Quito eventos de los botones y los oculto
        botonConfirmar.removeEventListener("click", quitoBotonesTerminarTurnoConPelotaConMenosDeUnPuntoDeAccion);
        ocultoBoton("confirmar")
        botonPase.removeEventListener("click", cambioAEleccionPaseConMenosDeUnPuntoDeAccionDesdeTerminarTurno);
        ocultoBoton("pase");
        ocultoBoton("tiro");
        ocultoBoton("terminarTurno");
        //Ejecuto función que termina el turno
        funcionalidadBotonTerminarTurnoA()
    }
    function pidoConfirmarEleccionTerminarTurnoConPelotaConMenosDeUnPuntoDeAccion (evt){
        pintoBotonSeleccionado(evt);
        resaltoBotones("confirmar");
        textoLocutor.innerHTML+=`<br><p>Confirme si quiere realizar esta acción</p>`;
        botonConfirmar.addEventListener("click", quitoBotonesTerminarTurnoConPelotaConMenosDeUnPuntoDeAccion);
        //Quito eventos base de otros botones
        botonPase.removeEventListener("click", pidoConfirmarEleccionPaseConMenosDeUnPuntoDeAccion);
        botonTerminarTurno.removeEventListener("click", pidoConfirmarEleccionTerminarTurnoConPelotaConMenosDeUnPuntoDeAccion);
    
        //Meto eventos que serán transición cíclica a otros botones
        botonPase.addEventListener("click", cambioAEleccionPaseConMenosDeUnPuntoDeAccionDesdeTerminarTurno);
    }
    
    function quitoBotonesPaseConMenosDeUnPuntoDeAccion(){
        //Quito eventos de los botones y los oculto
        botonConfirmar.removeEventListener("click", quitoBotonesPaseConMenosDeUnPuntoDeAccion);
        ocultoBoton("confirmar")
        ocultoBoton("pase");
        ocultoBoton("tiro");
        botonTerminarTurno.removeEventListener("click", cambioAEleccionTerminarTurnoConMenosDeUnPuntoDeAccionDesdePase);
        ocultoBoton("terminarTurno");
        //Ejecuto función que termina el turno
        funcionalidadBotonPase()
    }
    function pidoConfirmarEleccionPaseConMenosDeUnPuntoDeAccion (evt){
        pintoBotonSeleccionado(evt);
        // resaltoBotones("pase");
        botonConfirmar.addEventListener("click", quitoBotonesPaseConMenosDeUnPuntoDeAccion);
        //Quito eventos base de otros botones
        botonPase.removeEventListener("click", pidoConfirmarEleccionPaseConMenosDeUnPuntoDeAccion);
        botonTerminarTurno.removeEventListener("click", pidoConfirmarEleccionTerminarTurnoConPelotaConMenosDeUnPuntoDeAccion);
    
        //Meto eventos que serán transición cíclica a otros botones
        botonTerminarTurno.addEventListener("click", cambioAEleccionTerminarTurnoConMenosDeUnPuntoDeAccionDesdePase);
    }
    
    function quitoBotonesPaseConMenosDeUnPuntoDeAccionDesdeTerminarTurno(){
        //Quito eventos de los botones y los oculto
        botonConfirmar.removeEventListener("click", quitoBotonesPaseConMenosDeUnPuntoDeAccionDesdeTerminarTurno);
        ocultoBoton("confirmar")
        ocultoBoton("pase");
        ocultoBoton("tiro");
        botonTerminarTurno.removeEventListener("click", cambioAEleccionTerminarTurnoConMenosDeUnPuntoDeAccionDesdePase);
        ocultoBoton("terminarTurno");
        //Ejecuto función que termina el turno
        funcionalidadBotonPase()
    }
    function cambioAEleccionPaseConMenosDeUnPuntoDeAccionDesdeTerminarTurno (evt){
        textoLocutor.innerHTML+=`<br><p>Confirme si quiere realizar esta acción</p>`;
        cambioColoresAApropiados(evt);
        
        //Cambio evento del boton confirmar
        botonConfirmar.removeEventListener("click", quitoBotonesTerminarTurnoConPelotaConMenosDeUnPuntoDeAccion);
        botonConfirmar.addEventListener("click", quitoBotonesPaseConMenosDeUnPuntoDeAccionDesdeTerminarTurno);
    
        //Cambio eventos de los otros botones a botones cíclicos
        botonPase.removeEventListener("click", cambioAEleccionPaseConMenosDeUnPuntoDeAccionDesdeTerminarTurno);
    
        //Agrego nuevos eventos
        botonTerminarTurno.addEventListener("click", cambioAEleccionTerminarTurnoConMenosDeUnPuntoDeAccionDesdePase);
    }
    
    function quitoBotonesTerminarTurnoConMenosDeUnPuntoDeAccionDesdePase(){
        //Quito eventos de los botones y los oculto
        botonConfirmar.removeEventListener("click", quitoBotonesTerminarTurnoConMenosDeUnPuntoDeAccionDesdePase);
        ocultoBoton("confirmar")        
        botonPase.removeEventListener("click", cambioAEleccionPaseConMenosDeUnPuntoDeAccionDesdeTerminarTurno);
        ocultoBoton("pase");
        ocultoBoton("tiro");
        ocultoBoton("terminarTurno");
        //Ejecuto función que termina el turno
        funcionalidadBotonTerminarTurnoA()
    }
    function cambioAEleccionTerminarTurnoConMenosDeUnPuntoDeAccionDesdePase (evt){
        textoLocutor.innerHTML+=`<br><p>Confirme si quiere realizar esta acción</p>`;
        cambioColoresAApropiados(evt);
        
        //Cambio evento del boton confirmar
        botonConfirmar.removeEventListener("click", quitoBotonesPaseConMenosDeUnPuntoDeAccion);
        botonConfirmar.addEventListener("click", quitoBotonesTerminarTurnoConMenosDeUnPuntoDeAccionDesdePase);
    
        //Cambio eventos de los otros botones a botones cíclicos
        botonTerminarTurno.removeEventListener("click", cambioAEleccionTerminarTurnoConMenosDeUnPuntoDeAccionDesdePase);
    
        //Agrego nuevos eventos
        botonPase.addEventListener("click", cambioAEleccionPaseConMenosDeUnPuntoDeAccionDesdeTerminarTurno);
    }
    /*Fin de funciones que actúan cuando el jugador tiene menos de 1 punto de accióin y la posesión de la pelota*/
    
    
    
    /*Estas funciones se van a aplicar cuando el jugador no tenga la posesión de la pelota*/
    function quitoBotonesEleccionTerminarTurnoSinPelota(){
        //Quito eventos de los botones y los oculto
        botonConfirmar.removeEventListener("click", quitoBotonesEleccionTerminarTurnoSinPelota);
        ocultoBoton("confirmar")
        ocultoBoton("pase");
        ocultoBoton("tiro");
        ocultoBoton("terminarTurno");
        //Ejecuto función que termina el turno
        funcionalidadBotonTerminarTurnoA()
    }
    function pidoConfirmarEleccionTerminarTurnoSinPelota (evt){
        pintoBotonSeleccionado(evt);
        resaltoBotones("confirmar");
        textoLocutor.innerHTML+=`<br><p>Confirme si quiere realizar esta acción</p>`;
        botonConfirmar.addEventListener("click", quitoBotonesEleccionTerminarTurnoSinPelota);
        //Quito eventos base de otros botones
        botonTerminarTurno.removeEventListener("click", pidoConfirmarEleccionTerminarTurnoSinPelota);
    }
    /*Fin de funciones que actúan cuando el jugador no tenga la posesión de la pelota*/
    
    
    //Creo evento que sucederá al activarse el evento del botón "pase"
    function funcionalidadBotonPase (){
        //Decido dejarlo de lado hasta resolver el tema de que no puedo remover los eventListeners
    }
    
    //Creo evento que sucederá al activarse el evento del botón "tiro"
    function funcionalidadBotonTiro(){
        let puntosAtacante = 0;
        let puntosDefensa = 0;
        let comparoAYD;
        let resultadoDados = dadoDe20()+dadoDe20()+dadoDe20()+dadoDe20()+dadoDe20();
        let encesta=false;
        let elEquipoDefensor;

        const luegoDelTiro= ()=>{
            
            //Si erra
            if (encesta==false){
                calculoQuienGanaRebote();
            }

            //Si encesta
            else if (encesta==true){
                arrayConPuntosPorEquipo[equipo]=+2
                if (equipo==0){
                    estadosAmbosEquipos[1][0].conPelota=true;
                }
                else if (equipo==1){
                    estadosAmbosEquipos[0][0].conPelota=true;
                }
                //AGREGAR actualizo marcador
            }
            funcionGestionReloj();
            muestroPosicionesEnCancha();
            comienzaInstante();
            muestroJugadoresConTurno(queEquipoDefiendeNumero());
        }
        
        function calculoQuienGanaRebote(){
            //WORKING
            //Creo un array que contendrá los puntos que consiguen para ganar el rebote
            const puntosEquipoAParaGanarRebotes =[];
            const puntosEquipoBParaGanarRebotes =[];
            let puntosParaReboteDeEsteJugador;
            let maximosPuntosA;
            let maximosPuntosB;
            let comparoMaximosPuntosParaRebote=0;
            
            //Hago un búcle para que no pueda haber empate (Hay un dado que eventualmente va a desempatar)
            while (comparoMaximosPuntosParaRebote==0){
                //Hago un bucle que recorre los equipos (e)
                for (let e=0; e <2; e++){
                    //Hago un bucle para recorrer a los jugadores (j)
                    for (j in estadosAmbosEquipos[e]){
                            puntosParaReboteDeEsteJugador= dadoDe20()*0.75 + ambosEquipos[e][j].capacidadReboteadora *1.5 + ambosEquipos[e][j].capacidadAtletica;
                        //Dependiendo de hacia qué dirección se encuentre usará una u otra forma de calcular
                        if (estadosAmbosEquipos[e][j].ubicacionY < 8){
                            puntosParaReboteDeEsteJugador-= (8 - estadosAmbosEquipos[e][j].ubicacionY) * 3;
                        }
                        else if (estadosAmbosEquipos[e][j].ubicacionY > 8){
                            puntosParaReboteDeEsteJugador-=  (estadosAmbosEquipos[e][j].ubicacionY -8) * 3;
                        }
                        if (e==0){
                            if (estadosAmbosEquipos[e][j].ubicacionX ==28){
                                puntosParaReboteDeEsteJugador-=  1* 3;
                            }
                            else if (estadosAmbosEquipos[e][j].ubicacionX < 27){
                                puntosParaReboteDeEsteJugador-= (27 - estadosAmbosEquipos[e][j].ubicacionX) * 3;
                            }
                            puntosEquipoAParaGanarRebotes.push(puntosParaReboteDeEsteJugador);
                        }
                        else if (e==1){
                            if (estadosAmbosEquipos[e][j].ubicacionX ==1){
                                puntosParaReboteDeEsteJugador-=  1* 3;
                            }
                            else if (estadosAmbosEquipos[e][j].ubicacionX > 2){
                                puntosParaReboteDeEsteJugador-= (estadosAmbosEquipos[e][j].ubicacionX -2) * 3;
                            }
                            puntosEquipoBParaGanarRebotes.push(puntosParaReboteDeEsteJugador);
                        }
                    }
                }
                //Hago un bucle para ver cuál es el jugador que más puntos tiene de cada equipo
                for (let j=0; j <5; j++){
                    if (j==0){
                        maximosPuntosA= puntosEquipoAParaGanarRebotes[j];
                        maximosPuntosB= puntosEquipoBParaGanarRebotes[j];
                    }
                    else if (0<j){
                        if (maximosPuntosA < puntosEquipoAParaGanarRebotes[j]){
                            maximosPuntosA = puntosEquipoAParaGanarRebotes[j];
                        }
                        if (maximosPuntosB < puntosEquipoBParaGanarRebotes[j]){
                            maximosPuntosB= puntosEquipoBParaGanarRebotes[j];
                        }
                    }
                }
                //Comparo a ver qué equipo tiene más puntos para ganar el rebote
                comparoMaximosPuntosParaRebote= maximosPuntosA-maximosPuntosB;    
            }

            
            //Una vez sé qué equipo ganó veo cuál de sus jugadores fué el que ganó el rebote
            //Si ganó el equipo A
            if (comparoMaximosPuntosParaRebote > 0){
                //Creo un búcle para recorrer a los jugadores
                for (let j=0; j <5; j++){
                    if (maximosPuntosA == puntosEquipoAParaGanarRebotes[j]){
                        textoLocutor.innerHTML+=`<br><p>El lanzamiento no es bueno!</p>`;
                        textoLocutor.innerHTML+=`<br><p>${ambosEquipos[0][j].nombre} se queda con el rebote</p>`;
                        estadosAmbosEquipos[0][j].conPelota= true;
                    }
                }
            }
            //Si ganó el equipo B
            if (comparoMaximosPuntosParaRebote < 0){
                //Creo un búcle para recorrer a los jugadores
                for (let j=0; j <5; j++){
                    if (maximosPuntosB == puntosEquipoBParaGanarRebotes[j]){
                        textoLocutor.innerHTML+=`<br><p>El lanzamiento no es bueno!</p>`;
                        textoLocutor.innerHTML+=`<br><p>${ambosEquipos[1][j].nombre} se queda con el rebote</p>`;
                        estadosAmbosEquipos[1][j].conPelota= true;
                    }
                }
            }
        }
        //AGREGAR restar puntos de acción
        if(equipo==0){
            elEquipoDefensor=1;
        }
        else if(equipo==1){
            elEquipoDefensor=0;
        }
        const calculoTiroCercaDelAro = (o)=>{
            //Calculo cuántos puntos tiene el atacante cuando tira sólo
            textoLocutor.innerHTML+=`<br><p>${ambosEquipos[equipo][jugador].nombre} se eleva para lanzar de al lado del aro!</p>`;
            puntosAtacante= ambosEquipos[equipo][jugador]["capacidadAtletica"]*1.5 + ambosEquipos[equipo][jugador]["anotacionInterior"]*3.5;
            //Calculo cuánto molestan las defensas (d) en el tiro
            //Para eso hago un búcle que busque si hay jugadores defensores cerca del tirador
            //Bucle que recorre eje x +/- 1
            for (let x=-1; x <1; x++){
                //Bucle que recorre eje y +/- 1
                for (let y=-1; y <1; y++){
                    //Bucle para recorrer a los jugadores del otro equipo
                    for (let d=0; d <5; d++){
                        if ((estadosAmbosEquipos[equipo][jugador]["ubicacionX"] + x == estadosAmbosEquipos[o][d]["ubicacionX"]) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] + y == estadosAmbosEquipos[o][d]["ubicacionY"])){
                            textoLocutor.innerHTML+=`<br><p>${ambosEquipos[o][d].nombre} trata de molestar el lanzamiento!</p>`;
                            puntosDefensa += (ambosEquipos[o][d].altura * 0.75 - ambosEquipos[equipo][jugador].altura)*1.25 + ambosEquipos[o][d]["capacidadAtletica"]*0.75 + ambosEquipos[o][d]["defensaInterna"]*3 + (ambosEquipos[o][d]["peso"]*0.75 - ambosEquipos[equipo][jugador]["peso"]) - ambosEquipos[equipo][jugador]["creacionDeJuego"]*0.25;
                        }
                    }
                }
            }
            
            comparoAYD = puntosAtacante-puntosDefensa;
            //Dependiendo de cómo vaya la comparación entre el ataque y la defensa el jugador va a tener que sacar una mejor o una peor tirada de dados para conseguir encestar
            if ((0 <= comparoAYD)&&(comparoAYD<=49)&&(resultadoDados>90)){
                encesta=true;
                textoLocutor.innerHTML+=`<br><p>Consigue la canasta!</p>`;
            }
            else if ((50 <= comparoAYD)&&(comparoAYD<=99)&&(resultadoDados>=80)){
                encesta=true;
                textoLocutor.innerHTML+=`<br><p>Consigue la canasta!</p>`;
            }
            else if ((100 <= comparoAYD)&&(comparoAYD<=149)&&(resultadoDados>=70)){
                encesta=true;
                textoLocutor.innerHTML+=`<br><p>Consigue la canasta!</p>`;
            }
            else if ((150 <= comparoAYD)&&(comparoAYD<=199)&&(resultadoDados>=60)){
                encesta=true;
                textoLocutor.innerHTML+=`<br><p>Consigue la canasta!</p>`;
            }
            else if ((200 <= comparoAYD)&&(comparoAYD<=249)&&(resultadoDados>=50)){
                encesta=true;
                textoLocutor.innerHTML+=`<br><p>Consigue la canasta!</p>`;
            }
            else if ((250 <= comparoAYD)&&(comparoAYD<=299)&&(resultadoDados>=40)){
                encesta=true;
                textoLocutor.innerHTML+=`<br><p>Consigue la canasta!</p>`;
            }
            else if ((300 <= comparoAYD)&&(comparoAYD<=349)&&(resultadoDados>=30)){
                encesta=true;
                textoLocutor.innerHTML+=`<br><p>Consigue la canasta!</p>`;
            }
            else if ((350 <= comparoAYD)&&(comparoAYD<=349)&&(resultadoDados>=21)){
                encesta=true;
                textoLocutor.innerHTML+=`<br><p>Consigue la canasta!</p>`;
            }
            else if ((400 <= comparoAYD)&&(comparoAYD<=449)&&(resultadoDados>=13)){
                encesta=true;
                textoLocutor.innerHTML+=`<br><p>Consigue la canasta!</p>`;
            }
            else if ((450 <= comparoAYD)&&(resultadoDados>=6)){
                encesta=true;
                textoLocutor.innerHTML+=`<br><p>Consigue la canasta!</p>`;
            }
        }
        const calculoTiroCercaPeroNoTanto= (o)=>{
            textoLocutor.innerHTML+=`<br><p>${ambosEquipos[equipo][jugador].nombre} se eleva para lanzar muy cerca del aro!</p>`;
            //Calculo cuántos puntos tiene el atacante cuando tira sólo
            puntosAtacante= ambosEquipos[equipo][jugador]["capacidadAtletica"] + ambosEquipos[equipo][jugador]["anotacionInterior"]*3 + ambosEquipos[equipo][jugador]["anotacionExterior"];
            //Calculo cuánto molestan las defensas (d) en el tiro
            //Para eso hago un búcle que busque si hay jugadores defensores cerca del tirador
            //Bucle que recorre eje x +/- 1
            for (let x=-1; x <1; x++){
                //Bucle que recorre eje y +/- 1
                for (let y=-1; y <1; y++){
                    //Bucle para recorrer a los jugadores del otro equipo
                    for (let d=0; d <5; d++){
                        if ((estadosAmbosEquipos[equipo][jugador]["ubicacionX"] + x == estadosAmbosEquipos[o][d]["ubicacionX"]) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] + y == estadosAmbosEquipos[o][d]["ubicacionY"])){
                            textoLocutor.innerHTML+=`<br><p>${ambosEquipos[o][d].nombre} trata de molestar el lanzamiento!</p>`;
                            puntosDefensa += (ambosEquipos[o][d].altura * 0.75 - ambosEquipos[equipo][jugador].altura) + ambosEquipos[o][d]["capacidadAtletica"]*0.75 + ambosEquipos[o][d]["defensaInterna"]*2 + ambosEquipos[o][d]["defensaPerimetral"] + (ambosEquipos[o][d]["peso"]*0.75 - ambosEquipos[equipo][jugador]["peso"])*0.75 - ambosEquipos[equipo][jugador]["creacionDeJuego"]*0.25;
                        }
                    }
                }
            }
        
            comparoAYD = puntosAtacante-puntosDefensa;
            //Dependiendo de cómo vaya la comparación entre el ataque y la defensa el jugador va a tener que sacar una mejor o una peor tirada de dados para conseguir encestar
            if ((50 <= comparoAYD)&&(comparoAYD<=99)&&(resultadoDados>=90)){
                encesta=true;
                textoLocutor.innerHTML+=`<br><p>Consigue la canasta!</p>`;
            }
            else if ((100 <= comparoAYD)&&(comparoAYD<=149)&&(resultadoDados>=80)){
                encesta=true;
                textoLocutor.innerHTML+=`<br><p>Consigue la canasta!</p>`;
            }
            else if ((150 <= comparoAYD)&&(comparoAYD<=199)&&(resultadoDados>=70)){
                encesta=true;
                textoLocutor.innerHTML+=`<br><p>Consigue la canasta!</p>`;
            }
            else if ((200 <= comparoAYD)&&(comparoAYD<=249)&&(resultadoDados>=60)){
                encesta=true;
                textoLocutor.innerHTML+=`<br><p>Consigue la canasta!</p>`;
            }
            else if ((250 <= comparoAYD)&&(comparoAYD<=299)&&(resultadoDados>=50)){
                encesta=true;
                textoLocutor.innerHTML+=`<br><p>Consigue la canasta!</p>`;
            }
            else if ((300 <= comparoAYD)&&(comparoAYD<=349)&&(resultadoDados>=40)){
                encesta=true;
                textoLocutor.innerHTML+=`<br><p>Consigue la canasta!</p>`;
            }
            else if ((350 <= comparoAYD)&&(comparoAYD<=349)&&(resultadoDados>=31)){
                encesta=true;
                textoLocutor.innerHTML+=`<br><p>Consigue la canasta!</p>`;
            }
            else if ((400 <= comparoAYD)&&(comparoAYD<=449)&&(resultadoDados>=23)){
                encesta=true;
                textoLocutor.innerHTML+=`<br><p>Consigue la canasta!</p>`;
            }
            else if ((450 <= comparoAYD)&&(resultadoDados>=16)){
                encesta=true;
                textoLocutor.innerHTML+=`<br><p>Consigue la canasta!</p>`;
            }
        }
        const calculoTiroMediaDistancia= (o)=>{
            textoLocutor.innerHTML+=`<br><p>${ambosEquipos[equipo][jugador].nombre} se eleva para lanzar de media distancia!</p>`;
            //Calculo cuántos puntos tiene el atacante cuando tira sólo
            puntosAtacante=  ambosEquipos[equipo][jugador]["anotacionInterior"]*1.25 + ambosEquipos[equipo][jugador]["anotacionExterior"]*3;
            //Calculo cuánto molestan las defensas (d) en el tiro
            //Para eso hago un búcle que busque si hay jugadores defensores cerca del tirador
            //Bucle que recorre eje x +/- 1
            for (let x=-1; x <1; x++){
                //Bucle que recorre eje y +/- 1
                for (let y=-1; y <1; y++){
                    //Bucle para recorrer a los jugadores del otro equipo
                    for (let d=0; d <5; d++){
                        if ((estadosAmbosEquipos[equipo][jugador]["ubicacionX"] + x == estadosAmbosEquipos[o][d]["ubicacionX"]) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] + y == estadosAmbosEquipos[o][d]["ubicacionY"])){
                            textoLocutor.innerHTML+=`<br><p>${ambosEquipos[o][d].nombre} trata de molestar el lanzamiento!</p>`;
                            puntosDefensa += (ambosEquipos[o][d].altura * 0.75 - ambosEquipos[equipo][jugador].altura) + ambosEquipos[o][d]["capacidadAtletica"]*0.75 + ambosEquipos[o][d]["defensaInterna"]*0.75 + ambosEquipos[o][d]["defensaPerimetral"]*2 - (ambosEquipos[o][d]["peso"]*0.75 - ambosEquipos[equipo][jugador]["peso"])*0.25 - ambosEquipos[equipo][jugador]["creacionDeJuego"]*0.5;
                        }
                    }
                }
            }
        
            comparoAYD = puntosAtacante-puntosDefensa;
            //Dependiendo de cómo vaya la comparación entre el ataque y la defensa el jugador va a tener que sacar una mejor o una peor tirada de dados para conseguir encestar
            if ((50 <= comparoAYD)&&(comparoAYD<=99)&&(resultadoDados>=94)){
                encesta=true;
                textoLocutor.innerHTML+=`<br><p>Consigue la canasta!</p>`;
            }
            else if ((100 <= comparoAYD)&&(comparoAYD<=149)&&(resultadoDados>=87)){
                encesta=true;
                textoLocutor.innerHTML+=`<br><p>Consigue la canasta!</p>`;
            }
            else if ((150 <= comparoAYD)&&(comparoAYD<=199)&&(resultadoDados>=80)){
                encesta=true;
                textoLocutor.innerHTML+=`<br><p>Consigue la canasta!</p>`;
            }
            else if ((200 <= comparoAYD)&&(comparoAYD<=249)&&(resultadoDados>=73)){
                encesta=true;
                textoLocutor.innerHTML+=`<br><p>Consigue la canasta!</p>`;
            }
            else if ((250 <= comparoAYD)&&(comparoAYD<=299)&&(resultadoDados>=66)){
                encesta=true;
                textoLocutor.innerHTML+=`<br><p>Consigue la canasta!</p>`;
            }
            else if ((300 <= comparoAYD)&&(comparoAYD<=349)&&(resultadoDados>=59)){
                encesta=true;
                textoLocutor.innerHTML+=`<br><p>Consigue la canasta!</p>`;
            }
            else if ((350 <= comparoAYD)&&(comparoAYD<=349)&&(resultadoDados>=52)){
                encesta=true;
                textoLocutor.innerHTML+=`<br><p>Consigue la canasta!</p>`;
            }
            else if ((400 <= comparoAYD)&&(comparoAYD<=449)&&(resultadoDados>=45)){
                encesta=true;
                textoLocutor.innerHTML+=`<br><p>Consigue la canasta!</p>`;
            }
            else if ((450 <= comparoAYD)&&(resultadoDados>=40)){
                encesta=true;
                textoLocutor.innerHTML+=`<br><p>Consigue la canasta!</p>`;
            }
        }
        const calculoTiroFueraDeLineaDe3= (o)=>{
            textoLocutor.innerHTML+=`<br><p>${ambosEquipos[equipo][jugador].nombre} se eleva intentar un triple!</p>`;
            //Calculo cuántos puntos tiene el atacante cuando tira sólo
            puntosAtacante=  ambosEquipos[equipo][jugador]["anotacionExterior"]*4;
            //Calculo cuánto molestan las defensas (d) en el tiro
            //Para eso hago un búcle que busque si hay jugadores defensores cerca del tirador
            //Bucle que recorre eje x +/- 1
            for (let x=-1; x <1; x++){
                //Bucle que recorre eje y +/- 1
                for (let y=-1; y <1; y++){
                    //Bucle para recorrer a los jugadores del otro equipo
                    for (let d=0; d <5; d++){
                        if ((estadosAmbosEquipos[equipo][jugador]["ubicacionX"] + x == estadosAmbosEquipos[o][d]["ubicacionX"]) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] + y == estadosAmbosEquipos[o][d]["ubicacionY"])){
                            textoLocutor.innerHTML+=`<br><p>${ambosEquipos[o][d].nombre} trata de molestar el lanzamiento!</p>`;
                            puntosDefensa += (ambosEquipos[o][d].altura * 0.75 - ambosEquipos[equipo][jugador].altura) + ambosEquipos[o][d]["capacidadAtletica"]*0.75 + ambosEquipos[o][d]["defensaPerimetral"]*3 - (ambosEquipos[o][d]["peso"]*0.75 - ambosEquipos[equipo][jugador]["peso"])*0.5 - ambosEquipos[equipo][jugador]["creacionDeJuego"]*0.75;
                        }
                    }
                }
            }
        
            comparoAYD = puntosAtacante-puntosDefensa;
            //Dependiendo de cómo vaya la comparación entre el ataque y la defensa el jugador va a tener que sacar una mejor o una peor tirada de dados para conseguir encestar
            if ((50 <= comparoAYD)&&(comparoAYD<=99)&&(resultadoDados>=90)){
                encesta=true;
                textoLocutor.innerHTML+=`<br><p>Consigue la canasta!</p>`;
            }
            else if ((100 <= comparoAYD)&&(comparoAYD<=149)&&(resultadoDados>=80)){
                encesta=true;
                textoLocutor.innerHTML+=`<br><p>Consigue la canasta!</p>`;
            }
            else if ((150 <= comparoAYD)&&(comparoAYD<=199)&&(resultadoDados>=74)){
                encesta=true;
                textoLocutor.innerHTML+=`<br><p>Consigue la canasta!</p>`;
            }
            else if ((200 <= comparoAYD)&&(comparoAYD<=249)&&(resultadoDados>=68)){
                encesta=true;
                textoLocutor.innerHTML+=`<br><p>Consigue la canasta!</p>`;
            }
            else if ((250 <= comparoAYD)&&(comparoAYD<=299)&&(resultadoDados>=60)){
                encesta=true;
                textoLocutor.innerHTML+=`<br><p>Consigue la canasta!</p>`;
            }
            else if ((300 <= comparoAYD)&&(comparoAYD<=349)&&(resultadoDados>=55)){
                encesta=true;
                textoLocutor.innerHTML+=`<br><p>Consigue la canasta!</p>`;
            }
            else if ((350 <= comparoAYD)&&(comparoAYD<=349)&&(resultadoDados>=50)){
                encesta=true;
                textoLocutor.innerHTML+=`<br><p>Consigue la canasta!</p>`;
            }
            else if ((400 <= comparoAYD)&&(resultadoDados>=45)){
                encesta=true;
                textoLocutor.innerHTML+=`<br><p>Consigue la canasta!</p>`;
            }
            //Si encesta por ser un triple voy a sumar un punto extra
            if (encesta==true){
                arrayConPuntosPorEquipo[equipo]++;
            }
        }
        const calculoSiTiraUnTripleLargo= (o)=>{
            textoLocutor.innerHTML+=`<br><p>${ambosEquipos[equipo][jugador].nombre} toma un triple largo!</p>`;
            //Calculo cuántos puntos tiene el atacante cuando tira sólo
            puntosAtacante=  ambosEquipos[equipo][jugador]["anotacionExterior"]*4;
            //Calculo cuánto molestan las defensas (d) en el tiro
            //Para eso hago un búcle que busque si hay jugadores defensores cerca del tirador
            //Bucle que recorre eje x +/- 1
            for (let x=-1; x <1; x++){
                //Bucle que recorre eje y +/- 1
                for (let y=-1; y <1; y++){
                    //Bucle para recorrer a los jugadores del otro equipo
                    for (let d=0; d <5; d++){
                        if ((estadosAmbosEquipos[equipo][jugador]["ubicacionX"] + x == estadosAmbosEquipos[o][d]["ubicacionX"]) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] + y == estadosAmbosEquipos[o][d]["ubicacionY"])){
                            textoLocutor.innerHTML+=`<br><p>${ambosEquipos[o][d].nombre} trata de molestar el lanzamiento!</p>`;
                            puntosDefensa += (ambosEquipos[o][d].altura * 0.75 - ambosEquipos[equipo][jugador].altura)*0.75 + ambosEquipos[o][d]["capacidadAtletica"]*0.75 + ambosEquipos[o][d]["defensaPerimetral"]*3.25 - (ambosEquipos[o][d]["peso"]*0.5 - ambosEquipos[equipo][jugador]["peso"])*0.75 - ambosEquipos[equipo][jugador]["creacionDeJuego"]*0.5;
                        }
                    }
                }
            }
        
            comparoAYD = puntosAtacante-puntosDefensa;
            //Dependiendo de cómo vaya la comparación entre el ataque y la defensa el jugador va a tener que sacar una mejor o una peor tirada de dados para conseguir encestar
            if ((50 <= comparoAYD)&&(comparoAYD<=99)&&(resultadoDados>=98)){
                encesta=true;
                textoLocutor.innerHTML+=`<br><p>Consigue la canasta!</p>`;
            }
            else if ((100 <= comparoAYD)&&(comparoAYD<=149)&&(resultadoDados>=90)){
                encesta=true;
                textoLocutor.innerHTML+=`<br><p>Consigue la canasta!</p>`;
            }
            else if ((150 <= comparoAYD)&&(comparoAYD<=199)&&(resultadoDados>=80)){
                encesta=true;
                textoLocutor.innerHTML+=`<br><p>Consigue la canasta!</p>`;
            }
            else if ((200 <= comparoAYD)&&(comparoAYD<=249)&&(resultadoDados>=74)){
                encesta=true;
                textoLocutor.innerHTML+=`<br><p>Consigue la canasta!</p>`;
            }
            else if ((250 <= comparoAYD)&&(comparoAYD<=299)&&(resultadoDados>=64)){
                encesta=true;
                textoLocutor.innerHTML+=`<br><p>Consigue la canasta!</p>`;
            }
            else if ((300 <= comparoAYD)&&(comparoAYD<=349)&&(resultadoDados>=58)){
                encesta=true;
                textoLocutor.innerHTML+=`<br><p>Consigue la canasta!</p>`;
            }
            else if ((350 <= comparoAYD)&&(comparoAYD<=349)&&(resultadoDados>=53)){
                encesta=true;
                textoLocutor.innerHTML+=`<br><p>Consigue la canasta!</p>`;
            }
            else if ((400 <= comparoAYD)&&(resultadoDados>=47)){
                encesta=true;
                textoLocutor.innerHTML+=`<br><p>Consigue la canasta!</p>`;
            }
            //Si encesta por ser un triple voy a sumar un punto extra
            if (encesta==true){
                arrayConPuntosPorEquipo[equipo]++;
            }
        }
        const calculoSiEsUnTripleDeMediaCancha= (o)=>{
            textoLocutor.innerHTML+=`<br><p>${ambosEquipos[equipo][jugador].nombre} trata un lanzamiento desde media cancha!</p>`;
            //Calculo cuántos puntos tiene el atacante cuando tira sólo
            puntosAtacante=  ambosEquipos[equipo][jugador]["anotacionExterior"]*3.75;
            //Calculo cuánto molestan las defensas (d) en el tiro
            //Para eso hago un búcle que busque si hay jugadores defensores cerca del tirador
            //Bucle que recorre eje x +/- 1
            for (let x=-1; x <1; x++){
                //Bucle que recorre eje y +/- 1
                for (let y=-1; y <1; y++){
                    //Bucle para recorrer a los jugadores del otro equipo
                    for (let d=0; d <5; d++){
                        if ((estadosAmbosEquipos[equipo][jugador]["ubicacionX"] + x == estadosAmbosEquipos[o][d]["ubicacionX"]) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] + y == estadosAmbosEquipos[o][d]["ubicacionY"])){
                            textoLocutor.innerHTML+=`<br><p>${ambosEquipos[o][d].nombre} trata de molestar el lanzamiento!</p>`;
                            puntosDefensa += (ambosEquipos[o][d].altura * 0.75 - ambosEquipos[equipo][jugador].altura)*0.75 + ambosEquipos[o][d]["capacidadAtletica"]*0.75 + ambosEquipos[o][d]["defensaPerimetral"]*3.25 - (ambosEquipos[o][d]["peso"]*0.5 - ambosEquipos[equipo][jugador]["peso"]) - ambosEquipos[equipo][jugador]["creacionDeJuego"]*0.5;
                        }
                    }
                }
            }
        
            comparoAYD = puntosAtacante-puntosDefensa;
            //Dependiendo de cómo vaya la comparación entre el ataque y la defensa el jugador va a tener que sacar una mejor o una peor tirada de dados para conseguir encestar
            if ((100 <= comparoAYD)&&(comparoAYD<=149)&&(resultadoDados>=98)){
                encesta=true;
                textoLocutor.innerHTML+=`<br><p>Consigue la canasta!</p>`;
            }
            else if ((150 <= comparoAYD)&&(comparoAYD<=199)&&(resultadoDados>=90)){
                encesta=true;
                textoLocutor.innerHTML+=`<br><p>Consigue la canasta!</p>`;
            }
            else if ((200 <= comparoAYD)&&(comparoAYD<=249)&&(resultadoDados>=84)){
                encesta=true;
                textoLocutor.innerHTML+=`<br><p>Consigue la canasta!</p>`;
            }
            else if ((250 <= comparoAYD)&&(comparoAYD<=299)&&(resultadoDados>=77)){
                encesta=true;
                textoLocutor.innerHTML+=`<br><p>Consigue la canasta!</p>`;
            }
            else if ((300 <= comparoAYD)&&(comparoAYD<=349)&&(resultadoDados>=70)){
                encesta=true;
                textoLocutor.innerHTML+=`<br><p>Consigue la canasta!</p>`;
            }
            else if ((350 <= comparoAYD)&&(resultadoDados>=64)){
                encesta=true;
                textoLocutor.innerHTML+=`<br><p>Consigue la canasta!</p>`;
            }
            //Si encesta por ser un triple voy a sumar un punto extra
            if (encesta==true){
                arrayConPuntosPorEquipo[equipo]++;
            }
        }
        const calculoSiElTripleEsDeAtrasDeMitadDeCancha= (o)=>{
            textoLocutor.innerHTML+=`<br><p>${ambosEquipos[equipo][jugador].nombre} lanza desde saturno!</p>`;
            //Calculo cuántos puntos tiene el atacante cuando tira sólo
            puntosAtacante=  ambosEquipos[equipo][jugador]["anotacionExterior"]*3.5;
            //Calculo cuánto molestan las defensas (d) en el tiro
            //Para eso hago un búcle que busque si hay jugadores defensores cerca del tirador
            //Bucle que recorre eje x +/- 1
            for (let x=-1; x <1; x++){
                //Bucle que recorre eje y +/- 1
                for (let y=-1; y <1; y++){
                    //Bucle para recorrer a los jugadores del otro equipo
                    for (let d=0; d <5; d++){
                        if ((estadosAmbosEquipos[equipo][jugador]["ubicacionX"] + x == estadosAmbosEquipos[o][d]["ubicacionX"]) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] + y == estadosAmbosEquipos[o][d]["ubicacionY"])){
                            textoLocutor.innerHTML+=`<br><p>${ambosEquipos[o][d].nombre} trata de molestar el lanzamiento!</p>`;
                            puntosDefensa += (ambosEquipos[o][d].altura * 0.75 - ambosEquipos[equipo][jugador].altura)*0.75 + ambosEquipos[o][d]["capacidadAtletica"]*0.5 + ambosEquipos[o][d]["defensaPerimetral"]*3.5 - (ambosEquipos[o][d]["peso"]*0.25 - ambosEquipos[equipo][jugador]["peso"]*0.75) - ambosEquipos[equipo][jugador]["creacionDeJuego"]*0.25;
                        }
                    }
                }
            }
        
            comparoAYD = puntosAtacante-puntosDefensa;
            //Dependiendo de cómo vaya la comparación entre el ataque y la defensa el jugador va a tener que sacar una mejor o una peor tirada de dados para conseguir encestar
            if ((200 <= comparoAYD)&&(comparoAYD<=249)&&(resultadoDados>=98)){
                encesta=true;
                textoLocutor.innerHTML+=`<br><p>Consigue la canasta!</p>`;
            }
            else if ((250 <= comparoAYD)&&(comparoAYD<=299)&&(resultadoDados>=93)){
                encesta=true;
                textoLocutor.innerHTML+=`<br><p>Consigue la canasta!</p>`;
            }
            else if ((300 <= comparoAYD)&&(comparoAYD<=349)&&(resultadoDados>=86)){
                encesta=true;
                textoLocutor.innerHTML+=`<br><p>Consigue la canasta!</p>`;
            }
            else if ((350 <= comparoAYD)&&(resultadoDados>=78)){
                encesta=true;
                textoLocutor.innerHTML+=`<br><p>Consigue la canasta!</p>`;
            }
            //Si encesta por ser un triple voy a sumar un punto extra
            if (encesta==true){
                arrayConPuntosPorEquipo[equipo]++;
            }
        }
        const calculoSiTiraDesdeLaOtraPuntaDeLaCancha= (o)=>{
            textoLocutor.innerHTML+=`<br><p>${ambosEquipos[equipo][jugador].nombre} hace un intento desesperado para encestar desde su propio aro!</p>`;
            //Calculo cuántos puntos tiene el atacante cuando tira sólo
            puntosAtacante=  ambosEquipos[equipo][jugador]["anotacionExterior"]*3;
            //Calculo cuánto molestan las defensas (d) en el tiro
            //Para eso hago un búcle que busque si hay jugadores defensores cerca del tirador
            //Bucle que recorre eje x +/- 1
            for (let x=-1; x <1; x++){
                //Bucle que recorre eje y +/- 1
                for (let y=-1; y <1; y++){
                    //Bucle para recorrer a los jugadores del otro equipo
                    for (let d=0; d <5; d++){
                        if ((estadosAmbosEquipos[equipo][jugador]["ubicacionX"] + x == estadosAmbosEquipos[o][d]["ubicacionX"]) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] + y == estadosAmbosEquipos[o][d]["ubicacionY"])){
                            textoLocutor.innerHTML+=`<br><p>${ambosEquipos[o][d].nombre} trata de molestar el lanzamiento!</p>`;
                            puntosDefensa += (ambosEquipos[o][d].altura * 0.75 - ambosEquipos[equipo][jugador].altura)*0.75 + ambosEquipos[o][d]["capacidadAtletica"]*0.5 + ambosEquipos[o][d]["defensaPerimetral"]*3.5 - (ambosEquipos[o][d]["peso"]*0.25 - ambosEquipos[equipo][jugador]["peso"]*0.75) - ambosEquipos[equipo][jugador]["creacionDeJuego"]*0.25;
                        }
                    }
                }
            }
        
            comparoAYD = puntosAtacante-puntosDefensa;
            //Dependiendo de cómo vaya la comparación entre el ataque y la defensa el jugador va a tener que sacar una mejor o una peor tirada de dados para conseguir encestar
            if ((250 <= comparoAYD)&&(comparoAYD<=299)&&(resultadoDados>=99)){
                encesta=true;
                textoLocutor.innerHTML+=`<br><p>Consigue la canasta!</p>`;
            }
            else if ((300 <= comparoAYD)&&(comparoAYD<=349)&&(resultadoDados>=95)){
                encesta=true;
                textoLocutor.innerHTML+=`<br><p>Consigue la canasta!</p>`;
            }
            else if ((350 <= comparoAYD)&&(resultadoDados>=88)){
                encesta=true;
                textoLocutor.innerHTML+=`<br><p>Consigue la canasta!</p>`;
            }
            //Si encesta por ser un triple voy a sumar un punto extra
            if (encesta==true){
                arrayConPuntosPorEquipo[equipo]++;
            }
        }
        //Si el equipo que ataca es el A
        if (equipo == 0){
            //Le saco la poseción de la pelota al que tira
            estadosAmbosEquipos[equipo][jugador].conPelota=false;
            //Y está cerca del aro
            if ((estadosAmbosEquipos[equipo][jugador]["ubicacionX"] == 28) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 5) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] == 28) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 11) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 28) && (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 26) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 6) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 28) && (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 26) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 10) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 27) && (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 25) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] >= 7) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] <= 9)){
                calculoTiroCercaDelAro(elEquipoDefensor);
            }
            //O si está a cerca pero no tanto
            else if ((estadosAmbosEquipos[equipo][jugador]["ubicacionX"] == 28) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] >= 7) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] <= 9) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] == 28) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] >= 3) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] <= 4) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] == 28) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] >= 12) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] <= 13) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 27) && (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 26) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] >= 4) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] <= 5) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 27) && (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 26) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] >= 11) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] <= 12) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] == 25) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] >= 5) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] <= 6) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 25) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] >= 10) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] <= 11) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] == 24) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] >= 6) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] <= 10)){
                calculoTiroCercaPeroNoTanto(elEquipoDefensor);
            }
            
            //O si está a media distancia
            else if ((estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 28) && (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 24) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 2) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 28) && (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 24) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 14) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 27) && (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 23) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 3) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 27) && (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 23) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 13) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 25) && (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 22) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 4) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 25) && (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 22) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 12) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 24) && (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 21) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 5) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 24) && (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 21) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 11) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 23) && (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 21) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] >= 6) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] <= 10)){
                calculoTiroMediaDistancia(elEquipoDefensor);
            }
            //O si está fuera de la línea de 3
            else if ((estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 22) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 1) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 22) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 15) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 23) && (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 21) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 2) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 23) && (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 21) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 14) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 22) && (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 20) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 3) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 22) && (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 20) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 13) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] == 21) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 4) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] == 21) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 12) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 20) && (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 19) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] >= 4) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] <= 12)){
                calculoTiroFueraDeLineaDe3(elEquipoDefensor);
            }
            //O si está en un triple largo
            else if ((estadosAmbosEquipos[equipo][jugador]["ubicacionX"] == 15) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 8) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] == 16) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] >= 4) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] <= 12) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] == 17) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] >= 3) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] <= 13) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] == 18) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] >= 2) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] <= 14) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] == 19) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] <= 3) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] == 19) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] >= 13) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] == 20) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] <= 2) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] == 20) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] >= 14) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] == 21) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 1) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] == 21) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 15)){
                calculoSiTiraUnTripleLargo(elEquipoDefensor);
            }
            //O si está en un triple de media cancha
            else if ((estadosAmbosEquipos[equipo][jugador]["ubicacionX"] == 10) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 8) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 11) && (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 14) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] >= 5) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] <= 12) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] == 15) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] >= 5) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] <= 7) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] == 15) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] >= 9) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] <= 11) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 12) && (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 15) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 4) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 12) && (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 15) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 12) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 26) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 13) && (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 16) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 3) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 13) && (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 16) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 13) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 14) && (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 17) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 2) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 14) && (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 17) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 2) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 14) && (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 17) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 14) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 15) && (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 18) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 1) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 15) && (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 18) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 15)){
                calculoSiEsUnTripleDeMediaCancha(elEquipoDefensor);
            }
            //O si está detrás de media cancha
            else if ((estadosAmbosEquipos[equipo][jugador]["ubicacionX"] == 6) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 8) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 7) && (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 9) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] >= 5) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] <= 11) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] == 10) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] >= 5) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] <= 7) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] == 10) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] >= 9) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] <= 11) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 8) && (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 11) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 4) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 8) && (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 11) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 12) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 9) && (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 12) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 3) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 9) && (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 12) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 13) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 10) && (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 13) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 2) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 10) && (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 13) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 14) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 11) && (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 14) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 1) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 11) && (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 14) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 15)){
                calculoSiElTripleEsDeAtrasDeMitadDeCancha(elEquipoDefensor);
            }
            //O si está en la otra punta de la cancha
            else if((estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 6) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] <= 7) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 6) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] >= 9) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 5) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] <= 5) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] == 7) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] <= 4) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] == 7) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] >= 12) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] == 8) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] <= 3) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] == 8) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] >= 13) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] == 9) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] <= 2) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] == 9) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] >= 14) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] == 10) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 1) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] == 10) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 15)){
                calculoSiTiraDesdeLaOtraPuntaDeLaCancha(elEquipoDefensor);
            }
        }


        //Si el equipo que ataca es el B
        if (equipo == 1){
            //Le saco la poseción de la pelota al que tira
            estadosAmbosEquipos[equipo][jugador].conPelota=false;
            //Y está cerca del aro
            if ((estadosAmbosEquipos[equipo][jugador]["ubicacionX"] == 1) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] >= 5) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] <= 6) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] == 1) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] >= 10) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] <= 11) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 2) && (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 3) && (estadosAmbosEquipos[equipo][jugador]["ubicaciony"] >= 6) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] <= 10) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] == 4) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] >= 7) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] <= 9)){
                calculoTiroCercaDelAro(elEquipoDefensor);
            }
            //O si está a cerca pero no tanto
            else if ((estadosAmbosEquipos[equipo][jugador]["ubicacionX"] == 1) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] >= 3) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] <= 4) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] == 1) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] >= 7) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] <= 9) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] == 1) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] >= 12) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] <= 13) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 2) && (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 3) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] >= 4) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] <= 5) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 2) && (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 3) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] >= 11) && (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 12) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] == 4) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] >= 5) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] <= 6) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] == 4) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] >= 10) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] <= 11) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] == 5) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] >= 6) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] <= 10)){
                calculoTiroCercaPeroNoTanto(elEquipoDefensor);
            }
            
            //O si está a media distancia
            else if ((estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 6) && (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 8) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] >= 5) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] <= 11) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] == 5) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 5) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] == 5) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 11) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 4) && (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 7) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 4) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 4) && (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 7) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 12) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 2) && (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 6) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 3) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 2) && (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 6) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 13) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 5) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 2) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 5) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 14)){
                calculoTiroMediaDistancia(elEquipoDefensor);
            }
            //O si está fuera de la línea de 3
            else if ((estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 7) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 1) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 7) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 15) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 8) && (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 6) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 2) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 8) && (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 6) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 14) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 9) && (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 7) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 3) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 9) && (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 7) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 13) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 10) && (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 8) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 4) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 10) && (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 8) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 12) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 10) && (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 9) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] >= 5) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] <= 11)){
                calculoTiroFueraDeLineaDe3(elEquipoDefensor);
            }
            //O si está en un triple largo
            else if ((estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 10) && (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 8) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 1) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 10) && (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 8) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 15) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 11) && (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 9) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 2) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 11) && (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 9) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 14) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 12) && (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 10) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 3) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 12) && (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 10) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 13) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 13) && (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 11) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 4) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 12) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] == 14) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 8)){
                calculoSiTiraUnTripleLargo(elEquipoDefensor);
            }
            //O si está en un triple de media cancha
            else if ((estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 14) && (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 11) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 1) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 14) && (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 11) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 15) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 15) && (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 12) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 2) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 15) && (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 12) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 14) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 16) && (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 13) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 3) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 16) && (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 13) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 13) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 17) && (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 14) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 4) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 17) && (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 14) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 12) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 18) && (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 14) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] >= 5) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] <= 7) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 18) && (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 14) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] >= 9) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] <= 11) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 19) && (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 15) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 8)){
                calculoSiEsUnTripleDeMediaCancha(elEquipoDefensor);
            }
            //O si está detrás de media cancha
            else if ((estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 18) && (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 15) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 1) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 18) && (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 15) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 15) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 19) && (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 16) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 2) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 19) && (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 16) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 14) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 20) && (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 17) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 3) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 20) && (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 17) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 13) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 21) && (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 18) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 4) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 21) && (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 18) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 12) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 22) && (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 19) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] >= 5) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] <= 7) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 22) && (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 19) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] >= 9) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] <= 11) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] <= 23) && (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 20) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 8)){
                calculoSiElTripleEsDeAtrasDeMitadDeCancha(elEquipoDefensor)
            }
            //O si está en la otra punta de la cancha
            else if((estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 19) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 1) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 19) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 15) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 20) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 2) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 20) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 14) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 21) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 3) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 21) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 13) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 22) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 4) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 22) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 12) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 23) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] >= 5) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] <= 7) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 23) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] >= 9) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] <= 11) || (estadosAmbosEquipos[equipo][jugador]["ubicacionX"] >= 24) && (estadosAmbosEquipos[equipo][jugador]["ubicacionY"] == 8)){
                calculoSiTiraDesdeLaOtraPuntaDeLaCancha(elEquipoDefensor);
            }
        }
        luegoDelTiro();
    }


    
    //Creo función para terminar turno
    function funcionalidadBotonTerminarTurnoA(){
        textoLocutor.innerHTML+=`<br><p>Ha pasado su turno</p>`;
        //Llamo a los jugadores con fondo seleccionado para poder quitarle el fondo
        let jugadoresConFondoElegido= document.getElementsByClassName(`fondoSeleccionadoYLeToca`);
        //Quito el color de fondo del jugador que acaba de terminar su turno
        jugadoresConFondoElegido[0].classList.remove(`fondoSeleccionadoYLeToca`);
    
    
        //Le quito los puntos de acción restantes e indico que el turno ya fue usado
        estadosAmbosEquipos[equipo][jugador]["puntosDeAccion"] = 0;
        estadosAmbosEquipos[equipo][jugador]["turnoUsado"] = true;
        //Si el equipo que comenzó eligiendo sus acciones fué el defensor
        if (comparoIniciativas > 0){
            //Continúo al próximo instante
            borroJugadoresSeleccionadosPreviamente();
            funcionGestionReloj();
            muestroJugadoresConTurno(queEquipoDefiendeNumero());
        }
        //Si el equipo que comenzó eligiendo sus acciones fué el atacante
        else if (comparoIniciativas < 0){
            //Pinto como seleccionado y que le toca al jugador elegido rival quitandole el otro fondo
            let otroJugador = document.getElementsByClassName(`fondoJugadorActivo${queEquipoEs(equiposJugadoresElegidos[0])}`);
            if (otroJugador.length != 0){
                otroJugador[0].classList.add("fondoSeleccionadoYLeToca");
                otroJugador[0].classList.remove(`fondoJugadorActivo${queEquipoEs(equiposJugadoresElegidos[0])}`);
            }
    
            //Continúo por que el defensor elija sus acciones
            muestroPosiblesAccionesDefensa(equiposJugadoresElegidos[0], (rolJugadoresElegidos[0]-1));
        }
    }
    /*MOVERSE*/
    //Creo evento que sucederá al activarse el evento del botón "moverse" (modificar este evento para que primero permita seleccionarlo y luego ponerle los eventos al tablero con el botón confirmar como los demás botones)
    // function funcionalidadBotonMoverse(evt){
        //     pintoBotonSeleccionado(evt);
        //     mostrarOpcionesDeDondeMoverse(equipo, jugador);
        //     permitoSeleccionarOpcionesDeDondeMoverse(equipo, jugador);
        // }
    /*FIN SEGMENTO MOVERSE*/
        

    

    //Comprobar puntos de acción para saber cuáles son las posibles acciones. Poner obscuras las posibilidades que no alcanzan los puntos no ponerles eventos.
    if (estadosAmbosEquipos[equipo][jugador]["puntosDeAccion"] > 1){
        //Siempre resalto el boton de terminar turno xq es una opción que no depende de ninguna condición
        resaltoBotones("terminarTurno");
        
        /*MOVERSE*/
        // resaltoBotones("moverse");
        // let botonMoverse = document.getElementById("moverse");
        // botonMoverse.addEventListener("click", funcionalidadBotonMoverse);
        
        /*FIN SEGMENTO MOVERSE*/
        
        //Si además tiene la pelota resalto botones de pase y tiro y les pongo eventos
        if (estadosAmbosEquipos[equipo][jugador]["conPelota"] == true){
            textoLocutor.innerHTML+=`<br><p>${ambosEquipos[equipo][jugador].nombre} aún tiene más de un punto de acción y está en poseción del balón</p>`;
            // resaltoBotones("pase");
            resaltoBotones("tiro");
            botonPase.addEventListener("click", pidoConfirmarEleccionPaseConMasDeUnPuntoDeAccion);
            botonTiro.addEventListener("click", pidoConfirmarEleccionTiro);
            botonTerminarTurno.addEventListener("click", pidoConfirmarEleccionTerminarTurnoConPelotaYMasDeUnPuntoDeAccion);
        }
        //Si no tiene la pelota dejo obscuros los botones de pase y tiro
        else if (estadosAmbosEquipos[equipo][jugador]["conPelota"] != true){
            textoLocutor.innerHTML+=`<br><p>${ambosEquipos[equipo][jugador].nombre} aún tiene más de un punto de acción</p>`;
            muestroBotonObscuro("pase");
            muestroBotonObscuro("tiro");
            botonTerminarTurno.addEventListener("click", pidoConfirmarEleccionTerminarTurnoSinPelota);
        }

        muestroBotonObscuro("confirmar");
    }
    else if ((estadosAmbosEquipos[equipo][jugador]["puntosDeAccion"] > 0.5) && (estadosAmbosEquipos[equipo][jugador]["puntosDeAccion"] < 1)){
        //Siempre resalto el boton de terminar turno xq es una opción que no depende de ninguna condición
        resaltoBotones("terminarTurno");
        
        /*MOVERSE*/
        // muestroBotonObscuro("moverse");
        
        /*FIN SEGMENTO MOVERSE*/
        if (estadosAmbosEquipos[equipo][jugador]["conPelota"] == true){
            textoLocutor.innerHTML+=`<br><p>${ambosEquipos[equipo][jugador].nombre} tiene menos de un punto de acción y está en poseción del balón</p>`;
            // resaltoBotones("pase");
            botonPase.addEventListener("click", pidoConfirmarEleccionPaseConMasDeUnPuntoDeAccion);
        }
        else if (estadosAmbosEquipos[equipo][jugador]["conPelota"] != true){
            textoLocutor.innerHTML+=`<br><p>${ambosEquipos[equipo][jugador].nombre} tiene menos de un punto de acción</p>`;
            muestroBotonObscuro("pase");
        }
        muestroBotonObscuro("tiro");
        muestroBotonObscuro("confirmar");
    }
    //Hago que skipee a la acción correspondiente dependiendo de si es el primer equipo en jugar o el segundo
    else if (estadosAmbosEquipos[equipo][jugador]["puntosDeAccion"] < 0.5){
        textoLocutor.innerHTML+=`<br><p>${ambosEquipos[equipo][jugador].nombre} ya no tiene más puntos de acción</p>`;
        funcionalidadBotonTerminarTurno();
    }
}

/*MOVERSE*/

// let lugarEnElQueEstaba;
// let posiblesLugaresALosQueMoverse;
// const mostrarOpcionesDeDondeMoverse = (equipo, jugador)=>{
//     //AGREGAR borrar acciones activadas por otros event listeners de otras opciones de acción

//     //De cada jugador tomo sus posiciones X e Y y las junto para generar strings compatibles con los ID de los divs que representarán las casillas a las que se pueden mover los jugadores
//     //Creo un array en el que se contarán las ubicaciones ocupadas de las que rodean al jugador elegido
//     const arrayIdLugaresOcupados = [];
//     //Creo un array en el que estarán los posibles lugares a los que moverse
//     const arrayIdPosiblesMovimientos = [];

//     //Guardo la posición en la que estaba para luego calcular si se mueve en diagonal o a los costados
//     lugarEnElQueEstaba = [estadosAmbosEquipos[equipo][jugador][("ubicacionX")], estadosAmbosEquipos[equipo][jugador][("ubicacionY")]];

//     //Creo función que será de utilidad
//     const creoBuclesParaRecorrerLasPosicionesDeLosJugadores =(i, u, equipo, jugador)=>{
//         //Creo bucles para recorrer a los jugadores
//         for (equipoComparado in estadosAmbosEquipos){
//             for (jugadorComparado in estadosAmbosEquipos[equipoComparado]){
//                 //Si coincide la posición de cualquier jugador con la posicón que estoy escaneando introduzco valor al array de posiciones ocupadas
//                 if ((estadosAmbosEquipos[equipoComparado][jugadorComparado]["ubicacionX"] == estadosAmbosEquipos[equipo][jugador][("ubicacionX")] + i) && (estadosAmbosEquipos[equipoComparado][jugadorComparado]["ubicacionY"] == estadosAmbosEquipos[equipo][jugador][("ubicacionY")] + u)){
//                     arrayIdLugaresOcupados.push(`Ey! Existo! Voy a conquistar el mundooo!`);
//                 }
//             }
//         }
//         //Guardo la ubicación que estoy registrando
//         arrayIdPosiblesMovimientos.push(`${estadosAmbosEquipos[equipo][jugador][("ubicacionX")] + i }_${estadosAmbosEquipos[equipo][jugador][("ubicacionY")] + u}`);
//         //Si no tengo puntos suficientes para moverme en diagonal y la ubicación registrada es en diagonal la borro
//         if ((estadosAmbosEquipos[equipo][jugador][("puntosDeAccion")] < 1.5) && (arrayIdLugaresOcupados.length == 0)){
//             if ((i == -1) && (u == -1) || (i == -1) && (u == 1) || (i == 1) && (u == -1) || (i == 1) && (u == 1)){
//                 arrayIdPosiblesMovimientos.pop();
//             }
//         }
//         //Si en ese lugar se encontró a algún jugador ocupando el espacio borro la ubicación registrada
//         else if (arrayIdLugaresOcupados.length > 0){
//             arrayIdPosiblesMovimientos.pop();
//             //Y le digo "pues no mi ciela, ud. no va conquistar nada, su existencia es más ínfima que kilo de helado en verano" al array que cuenta los lugares ocupados
//             arrayIdLugaresOcupados.pop();
//         }
//     } 
    
//     //Creo bucles para las posiciones que rodean al jugador
//     //Si se encuentra en el borde izquiero del tablero
//     if (estadosAmbosEquipos[equipo][jugador][("ubicacionX")]==1){
//         for (let i = 0; i<2; i++){
//             for (let u = -1; u<2; u++){
//                 creoBuclesParaRecorrerLasPosicionesDeLosJugadores(i, u, equipo, jugador);
//             }
//         }
//     }
//     //Si se encuentra en el borde derecho del tablero
//     else if (estadosAmbosEquipos[equipo][jugador][("ubicacionX")]==28){
//         for (let i = -1; i<1; i++){
//             for (let u = -1; u<2; u++){
//                 creoBuclesParaRecorrerLasPosicionesDeLosJugadores(i, u, equipo, jugador);
//             }
//         }
//     }
//     //Si se encuentra en el borde superior del tablero
//     else if (estadosAmbosEquipos[equipo][jugador][("ubicacionY")]==1){
//         for (let i = -1; i<2; i++){
//             for (let u = 0; u<2; u++){
//                 creoBuclesParaRecorrerLasPosicionesDeLosJugadores(i, u, equipo, jugador);
//             }
//         }
//     }
//     //Si se encuentra en el borde inferior del tablero
//     else if (estadosAmbosEquipos[equipo][jugador][("ubicacionY")]==15){
//         for (let i = -1; i<2; i++){
//             for (let u = -1; u<1; u++){
//                 creoBuclesParaRecorrerLasPosicionesDeLosJugadores(i, u, equipo, jugador);
//             }
//         }
//     }
//     //Si no se encuentra en el borde del tablero
//     else if ((estadosAmbosEquipos[equipo][jugador][("ubicacionX")]!=1)&&(estadosAmbosEquipos[equipo][jugador][("ubicacionX")]!=28)&&(estadosAmbosEquipos[equipo][jugador][("ubicacionY")]!=1)&&(estadosAmbosEquipos[equipo][jugador][("ubicacionY")]!=15)){
//         for (let i = -1; i<2; i++){
//             for (let u = -1; u<2; u++){
//                 creoBuclesParaRecorrerLasPosicionesDeLosJugadores(i, u, equipo, jugador);
//             }
//         }
//     }

//     //A los valores que están en el array de posibles movimientos les pongo un fondo verde
//     for (posicionArray in arrayIdPosiblesMovimientos){
//         posiblesLugaresALosQueMoverse = document.getElementById(arrayIdPosiblesMovimientos[posicionArray]);
//         posiblesLugaresALosQueMoverse.className += " fondoVerde";
//     }
// }

// const permitoSeleccionarOpcionesDeDondeMoverse= (equipo, jugador)=>{
//     let casillaSeleccionada;
//     //Agrego eventos a los nuevos espacios en verde
//     posiblesLugaresALosQueMoverse = document.querySelectorAll(".fondoVerde");
//     for(let i=0; i < posiblesLugaresALosQueMoverse.length; i++){
//         posiblesLugaresALosQueMoverse[i].addEventListener("click", funcionalidad);
//     }

//     //Creo función que va a permitir llevar a cabo esta acción
//     function funcionalidad(evt){
//         //Muestro el botón llamado confirmar
//         resaltoBotones("confirmar");
//         //Reseteo las casillas que están en verde por si cambia de desición y selecciona otro
//         let conFondoSeleccionado = document.querySelector(".fondoSeleccionado");
//         //Pongo una puerta lógica para que no falle en la primera selección
//         if (conFondoSeleccionado != null){
//             conFondoSeleccionado.classList.add("class", `fondoVerde`);
//             conFondoSeleccionado.classList.remove("class", `fondoSeleccionado`);
//         }
//         //Al jugador seleccionado lo muestro con otro color de fondo
//         evt.currentTarget.classList.remove("class", `fondoVerde`);
//         evt.currentTarget.classList.add("class", `fondoSeleccionado`);
//         casillaSeleccionada = evt.currentTarget;
        
//         funcionParaConfirmarSeleccionDeDondeMoverse();
//     }
    
//     //Separo de esta forma para que funcione el removeEventListener
//     //Pongo evento al botón confirmar
//     const funcionParaConfirmarSeleccionDeDondeMoverse= ()=>{
//         let botonConfirmar = document.getElementById("confirmar");
//         botonConfirmar.addEventListener("click", confirmarSeleccionarDondeMoverse);

//         //Función que se ejecuta con este evento
//         function confirmarSeleccionarDondeMoverse(){
//             //Llamo distintos elementos que serán modificados
//             let conFondoVerde = document.getElementsByClassName("fondoVerde");
//             let conFondoSeleccionado = document.getElementsByClassName("fondoSeleccionado");
//             let conFondoJugadorActual = document.querySelector(".fondoSeleccionadoYLeToca");
//             let claseATransferir = "";
            
//             //WORKING restar los puntos de acción correspondientes
//             //Para eso veo a dónde es que se confirmó el movimiento y comparo sus ubicaciones x e y con las posiciones x e y de la ubicación en la que estába hasta este momento
//             for (x=-1; x < 2; x++){
//                 for (y=-1; y < 2; y++){
//                     //Si la posición obtenida por id (formada por el x y el y de la posición anterior sumando las x e y de los búcles) es igual a la nueva posición y las x e y de los bucles indican que es una diagonal
//                     if ((document.getElementById(`${lugarEnElQueEstaba[0] + x}_${lugarEnElQueEstaba[1] + y}`) == conFondoSeleccionado[0]) && (x == -1) && (y == -1) || (document.getElementById(`${lugarEnElQueEstaba[0] + x}_${lugarEnElQueEstaba[1] + y}`) == conFondoSeleccionado[0]) && (x == -1) && (y == 1) || (document.getElementById(`${lugarEnElQueEstaba[0] + x}_${lugarEnElQueEstaba[1] + y}`) == conFondoSeleccionado[0]) && (x == 1) && (y == -1) || (document.getElementById(`${lugarEnElQueEstaba[0] + x}_${lugarEnElQueEstaba[1] + y}`) == conFondoSeleccionado[0]) && (x == 1) && (y == 1)){
//                         //Si el equipo es el atacante quiero que reste los puntos por moverse en diagonal indicado en el obj costeAccionesAtaque
//                         if (equipo == queEquipoAtacaNumero()){
//                             estadosAmbosEquipos[equipo][jugador].puntosDeAccion -= costeAccionesAtaque.moverseDiagonal;
//                         }
//                         //Hago lo propio para la defensa
//                         else if (equipo == queEquipoDefiendeNumero()){
//                             estadosAmbosEquipos[equipo][jugador].puntosDeAccion -= costeAccionesDefensa.moverseDiagonal;
//                         }
//                     }
//                     //Idem pero si se mueve sólo en un eje
//                     else if ((document.getElementById(`${lugarEnElQueEstaba[0] + x}_${lugarEnElQueEstaba[1] + y}`) == conFondoSeleccionado[0]) && (x == -1) && (y == 0) || (document.getElementById(`${lugarEnElQueEstaba[0] + x}_${lugarEnElQueEstaba[1] + y}`) == conFondoSeleccionado[0]) && (x == 1) && (y == 0) || (document.getElementById(`${lugarEnElQueEstaba[0] + x}_${lugarEnElQueEstaba[1] + y}`) == conFondoSeleccionado[0]) && (x == 0) && (y == -1) || (document.getElementById(`${lugarEnElQueEstaba[0] + x}_${lugarEnElQueEstaba[1] + y}`) == conFondoSeleccionado[0]) && (x == 0) && (y == 1)){
//                         //Si el equipo es el atacante quiero que reste los puntos por moverse a los lados indicado en el obj costeAccionesAtaque
//                         if (equipo == queEquipoAtacaNumero()){
//                             estadosAmbosEquipos[equipo][jugador].puntosDeAccion -= costeAccionesAtaque.moverseRecto;

//                         }
//                         //Hago lo propio para la defensa
//                         else if (equipo == queEquipoDefiendeNumero()){
//                             estadosAmbosEquipos[equipo][jugador].puntosDeAccion -= costeAccionesDefensa.moverseRecto;
//                         }
//                     }
//                     if (document.getElementById(`${lugarEnElQueEstaba[0] + x}_${lugarEnElQueEstaba[1] + y}`) == conFondoSeleccionado[0]){
//                         estadosAmbosEquipos[equipo][jugador].ubicacionX += x;
//                         estadosAmbosEquipos[equipo][jugador].ubicacionY += y;
//                     }
//                 }
//             }


//             //Paso el contenido de la etiqueta del jugador desde la casilla anteriror a la nueva
//             casillaSeleccionada.innerHTML= conFondoJugadorActual.innerHTML
            
//             /*EL ERROR ANTES LO ESCRIBÍ LITERALMENTE IGUAL A ESTO Y TAMPOCO FUNCIONABA PERO ACÁ SÍ FUNCIONA POR ALGÚN MOTIVO*/
//             //Mientras siga habiendo fondos coloreados los voy a borrar y a sus eventos
//             while (conFondoVerde.length > 0){
//                 conFondoVerde[0].removeEventListener("click", funcionalidad);
//                 conFondoVerde[0].classList.remove("class", "fondoVerde");
//             }   
//             /*FIN ACOTACIÓN DE ERROR*/ 

//             //Guardo las clases de la casilla anterior a la nueva
//             for (let clases = 0; conFondoJugadorActual.classList.length > clases; clases++){
//                 if (claseATransferir != ""){
//                     claseATransferir += ` ${conFondoJugadorActual.classList[clases]}`;
//                 }    
//                 else if (claseATransferir == ""){
//                     claseATransferir += conFondoJugadorActual.classList[clases];
//                 }    
//             }    
//             //Borro esta clase que está pintando la casilla anterior
//             conFondoJugadorActual.setAttribute("class", "");

//             //Termino de pasar clases y borro eventos
//             while (conFondoSeleccionado.length > 0){
//                 conFondoSeleccionado[0].removeEventListener("click", funcionalidad);
//                 conFondoSeleccionado[0].setAttribute("class", `${claseATransferir}`);
//             }    
            
//             //Borro el evento del boton confirmar
//             botonConfirmar.removeEventListener("click", confirmarSeleccionarDondeMoverse);
//             //Oculto nuevamente el botón
//             botonConfirmar.setAttribute("class", "noDisplay");
            
//             //Borro la información del jugador de la casilla anterior
//             conFondoJugadorActual.innerHTML = "";

//             //Oculto boton moverse
//             ocultoBoton("moverse");
            
//             //Vuelvo a corrar la función que corresponda (Recuerdo que estas llevarán a donde corresponda dependiendo de si hay puntos para otra acción o no)
//             if (equipo == queEquipoAtacaNumero()){
//                 ocultoBoton("pase");
//                 ocultoBoton("tiro");
//                 muestroPosiblesAccionesAtaque(equipo, jugador);
//             }
//             else if (equipo == queEquipoDefiendeNumero()){
//                 muestroPosiblesAccionesDefensa(equipo, jugador);
//             }
//         }
//     }
// }
/*FIN SEGMENTO MOVERSE*/

const funcionGestionReloj= ()=>{
    //Resto un instante al contador de instantes
    instantesEnPeriodo--;

    //AGREGAR reloj de período
    
    //Si se acaban los instantes en el período
    if (instantesEnPeriodo == 0){
        //Reseteo el reloj del periodo
        instantesEnPeriodo = 360;
        //Sumo uno al contador de periodos
        periodo++;
        //Si el periodo que termino fue el 1ro
        if (periodo == 2){
            mitadPartido()
        }
        //Si ya pasaron 2 periodos cambio el valor de finDePartido para terminar el juego
        if (periodo == 3){
            //AGREGAR esta función
            textoLocutor.innerHTML+=`<br><p>Finaliza el encuentro! Marcador nos muestra que el equipo A terminó con ${arrayConPuntosPorEquipo[0]} puntos y el equipo B terminó con ${arrayConPuntosPorEquipo[1]} puntos!</p>`;
            terminoPartido();
        }
    }
}


/*Se disputa el salto entre 2 para comenzar el partido*/
textoLocutor.innerHTML+=`<br><p>El árbitro se dispone en mitad de cancha a lanzar el balón hacia arriba para iniciar del encuentro. Lo lanza y..</p>`;
//Creo un bucle para resolver quién consigue más puntos considerando las estadísticas que influyen en esta acción y lo que sacan con el dado

//Si empatan vuelve a comenzar el ciclo
while (saltoA == saltoB){
    //Calculo cuántos puntos consigue cada jugador para esta acción
    saltoA = dadoDe20() + listaJugadoresA[4].altura+listaJugadoresA[4].capacidadAtletica;
    textoLocutor.innerHTML+=`<br><p>${listaJugadoresA[4].nombre} consigue ${saltoA} puntos en el salto</p>`;
    saltoB = dadoDe20() + listaJugadoresB[4].altura+listaJugadoresB[4].capacidadAtletica;
    textoLocutor.innerHTML+=`<br><p>${listaJugadoresB[4].nombre} consigue ${saltoB} puntos en el salto</p>`;
    //Comparo el desempeño de los jugadores y devuelvo lo que ocurre considerando los resultados
    let resultadoSalto = saltoA-saltoB;
    if (resultadoSalto > 0){
        textoLocutor.innerHTML+=`<br><p>El salto lo gana el equipo A y la pelota ahora está en posesión de ${listaJugadoresA[0].nombre}</p>`;
        listaEstadosJugadoresA[0].conPelota = true;
        listaEstadosJugadoresA[4].ultimaAccion = `${listaJugadoresA[4].nombre} gana el salto`;
        listaEstadosJugadoresA[0].ultimaAccion = `${listaJugadoresA[0].nombre} recibe un pase`;
        textoLocutor.innerHTML+=`<br><p>${listaEstadosJugadoresA[0].ultimaAccion}</p>`;
        textoLocutor.innerHTML+=`<br><p>${listaEstadosJugadoresA[4].ultimaAccion}</p>`;
    }
    else if (resultadoSalto < 0){
        textoLocutor.innerHTML+=`<br><p>El salto lo gana el equipo B y la pelota ahora está en posesión de ${listaJugadoresB[0].nombre}</p>`;
        listaEstadosJugadoresB[0].conPelota = true;
        listaEstadosJugadoresB[4].ultimaAccion = `${listaJugadoresB[4].nombre} gana el salto`;
        listaEstadosJugadoresB[0].ultimaAccion = `${listaJugadoresB[0].nombre} recibe un pase`;
        textoLocutor.innerHTML+=`<br><p>${listaEstadosJugadoresB[0].ultimaAccion}</p>`;
        textoLocutor.innerHTML+=`<br><p>${listaEstadosJugadoresB[4].ultimaAccion}</p>`;
    }
    else{
        textoLocutor.innerHTML+=`<br><p>Ambos jugadores alcanzan el balón al mismo tiempo, la disputa por el salto sigue!</p>`;
    }
};
//Continúa el partido luego del salto

//Refresco datos para el instante acutal
muestroPosicionesEnCancha();
funciónParaAgregarEventosQueMuestranInfoDeLosJugadores();
comienzaInstante();

//Esto dispara funciones (muestroJugadoresConTurno, coachElijeJugador, funcionalidadBotonConfirmarJugador estas para ambos equipos y a continuación comparo iniciativas y muestro opciones que tienen los jugadores)
muestroJugadoresConTurno(queEquipoDefiendeNumero());
//La cadena de funciones previa completa todas las acciones de este instante


//AGREGAR Indico quién ganó el partido