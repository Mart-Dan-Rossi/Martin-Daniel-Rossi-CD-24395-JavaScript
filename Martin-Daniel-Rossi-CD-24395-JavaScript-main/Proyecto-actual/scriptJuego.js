//El punto final de este proyecto es conseguir desarrollar un juego de rol de baloncesto.



































/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

DEJO COMENTADAS PARTES CUYA FUNCIONALIDAD QUEDA OBSOLETA COMPARADO CON LO QUE
SE PUEDE LOGRAR CON LAS HERRAMIENTAS APRENDIDAS EN LA CLASE DE EVENTOS.
TAL VEZ MÁS ADELANTE NECESITE ALGO DE AHÍ POR ESO LO CONSERVO DE ESTA FORMA.

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/







































/*Muestro si es una partida nueva o una continuada en un p*/
//Creo el p
const p = document.createElement("p");
//Le pongo contenido al p
p.innerText = localStorage.getItem("tipoDePartida");
//Ubico el p en el HTML
document.body.head.appendChild(p);

//Si comienzo una nueva partida cambio el valor de este dato en el local storage esta información para que si entra directo a esta página le aparezca como continuada (pretendo hacer que en un futuro por defecto se continúen las partidas)
localStorage.setItem("tipoDePartida", "Continuar juego");

/*Defino valiables necesarias*/
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


let finDePartido = false;
let resultadoDado;




//Creación de jugadores
class Jugador {
    constructor(nombre, altura, peso, capacidadAtletica, defensaPerimetral, defensaInterna, capacidadReboteadora, anotacionExterior, anotacionInterior, creacionDeJuego, ubicacionX, ubicacionY) {
        this.nombre = nombre;
        this.altura = altura;
        this.peso = peso;
        this.capacidadAtletica = capacidadAtletica;
        this.defensaPerimetral = defensaPerimetral;
        this.defensaInterna = defensaInterna;
        this.capacidadReboteadora = capacidadReboteadora;
        this.anotacionExterior = anotacionExterior;
        this.anotacionInterior = anotacionInterior;
        this.creacionDeJuego = creacionDeJuego;
        this.ubicacionX = ubicacionX;/*Utilizo la ubicación X para determinar en que punto del largo de la cancha se encuentran los jugadores*/
        this.ubicacionY = ubicacionY;/*Utilizo la ubicación Y para determinar en que punto del ancho de la cancha se encuentran los jugadores*/
        this.conPelota = false;/*Determina si el jugador tiene la posesión de la pelota*/
        this.turnoUsado = false;/*Determina si el jugador ya ha realizado una acción en este "Instante"*/
        this.ultimaAccion = "Todavía no realizó ninguna acción";/*Recuerda cuál fué la última acción realizada por el jugador*/
        this.puntosDeAccion = 0;/*Determina de cuántos puntos de acción dispone el jugador en su turno*/
        this.nuevospuntosDeAccion = ()=>{
            if (this.altura <= 192) {
                resultadoDado = dadoDe20();
                this.puntosDeAccion = 2;
                if (resultadoDado > 6) {
                    ++this.puntosDeAccion;
                }
            }
            else if ((this.altura > 192) && (this.altura <= 208)) {
                resultadoDado = dadoDe20();
                this.puntosDeAccion = 2;
                if (resultadoDado > 10) {
                    ++this.puntosDeAccion;
                }
            }
            else if (this.altura > 208) {
                resultadoDado = dadoDe20();
                this.puntosDeAccion = 1;
                if ((resultadoDado > 3) && (resultadoDado <16)) {
                    ++this.puntosDeAccion;
                }
                else if (resultadoDado >=16) {
                    ++this.puntosDeAccion;
                }
            }
        };
        //AGREGAR terminar método para mover jugadores
        /*this.nuevaPosicion = (equipoYNumero)=>{
            mostrarPosicionesJugadores();
            alert(`Importante recordar que moverse a los lados cuesta 1 "punto de acción" y hacerlo en diagonal cuesta 1,5 "puntos de acción"`);
            //Creo Array que contiene posiciones que están ocupadas por otros jugadores y condiciones para llenar este array.
            const posicionesOcupadas = [];
            //Si el que se mueve es del equipo B
            if (equipoYNumero.slice(0,2).toUpperCase() == "B") {
                if (listaJugadoresB[[Number(equipoYNumero.slice(-1)-1)]].puntosDeAccion >= 1) {
                    //Corroboro lugares a los que se puede mover el jugador
                    //Primer búcle va a buscar en posiciones X
                    for (let o=-1; o<=1; o++){
                        //Segundo búcle va a buscar en posiciones Y
                        for (let i=-1; i<=1; i++){
                            //Tercer búcle es usado para ir cambiando de jugadores
                            for (let u=0; u<5; u++){
                                //Comparo con posiciones del equipo B
                                if ((listaJugadoresB[u].ubicacionX == listaJugadoresB[Number(equipoYNumero.slice(-1)-1)][ubicacionX+o]) && (listaJugadoresB[u].ubicacionY == listaJugadoresB[Number(equipoYNumero.slice(-1)-1)][ubicacionY+i])){
                                    let posicion = [listaJugadoresB[u].ubicacionX, listaJugadoresB[u].ubicacionY];
                                    posicionesOcupadas.push(posicion);
                                }
                                //Quito la comparación con el mismo jugador
                                if ((listaJugadoresB[Number(equipoYNumero.slice(-1)-1)][ubicacionX+o] == listaJugadoresB[Number(equipoYNumero.slice(-1)-1)][ubicacionX]) && (listaJugadoresB[Number(equipoYNumero.slice(-1)-1)][ubicacionY+i] == listaJugadoresB[Number(equipoYNumero.slice(-1)-1)][ubicacionY])){
                                    posicionesOcupadas.pop();
                                }
                                //Comparo con posiciones del equipo A
                                if ((listaJugadoresA[u].ubicacionX == listaJugadoresB[Number(equipoYNumero.slice(-1)-1)][ubicacionX+o]) && (listaJugadoresA[u].ubicacionY == listaJugadoresB[Number(equipoYNumero.slice(-1)-1)][ubicacionY+i])){
                                    let posicion = [listaJugadoresA[u].ubicacionX, listaJugadoresA[u].ubicacionY];
                                    posicionesOcupadas.push(posicion);
                                }
                                //Si no tiene puntos para ir a las diagonales pero sí a los lados
                                if (listaJugadoresB[[Number(equipoYNumero.slice(-1)-1)]].puntosDeAccion < 1.5) {
                                    posicion = [listaJugadoresB[Number(equipoYNumero.slice(-1)-1)][ubicacionX+1], listaJugadoresB[Number(equipoYNumero.slice(-1)-1)][ubicacionY+1]];
                                    posicionesOcupadas.push(posicion);
                                    posicion = [listaJugadoresB[Number(equipoYNumero.slice(-1)-1)][ubicacionX+1], listaJugadoresB[Number(equipoYNumero.slice(-1)-1)][ubicacionY-1]];
                                    posicionesOcupadas.push(posicion);
                                    posicion = [listaJugadoresB[Number(equipoYNumero.slice(-1)-1)][ubicacionX-1], listaJugadoresB[Number(equipoYNumero.slice(-1)-1)][ubicacionY+1]];
                                    posicionesOcupadas.push(posicion);
                                    posicion = [listaJugadoresB[Number(equipoYNumero.slice(-1)-1)][ubicacionX-1], listaJugadoresB[Number(equipoYNumero.slice(-1)-1)][ubicacionY-1]];
                                    posicionesOcupadas.push(posicion);
                                }
                            }
                        }
                    }
                }
                else if (listaJugadoresB[[Number(equipoYNumero.slice(-1)-1)]].puntosDeAccion > 1){
                    alert(`Usted no dispone de suficientes "puntos de acción" para realizar esta acción`)
                }
            }
            //Si el que se mueve es del equipo A
            else if (equipoYNumero.slice(0,2).toUpperCase() == "A") {
                if (listaJugadoresA[[Number(equipoYNumero.slice(-1)-1)]].puntosDeAccion >= 1) {
                    //Corroboro lugares a los que se puede mover el jugador
                    //Primer búcle va a buscar en posiciones X
                    for (let o=-1; o<=1; o++){
                        //Segundo búcle va a buscar en posiciones Y
                        for (let i=-1; i<=1; i++){
                            //Tercer búcle es usado para ir cambiando de jugadores
                            for (let u=0; u<5; u++){
                                let posicion;
                                //Comparo con posiciones del equipo B
                                if ((listaJugadoresB[u].ubicacionX == listaJugadoresA[Number(equipoYNumero.slice(-1)-1)][ubicacionX+o]) && (listaJugadoresB[u].ubicacionY == listaJugadoresA[Number(equipoYNumero.slice(-1)-1)][ubicacionY+i])){
                                    posicion = [listaJugadoresB[u].ubicacionX, listaJugadoresB[u].ubicacionY];
                                    posicionesOcupadas.push(posicion);
                                }
                                //Comparo con posiciones del equipo A
                                if ((listaJugadoresA[u].ubicacionX == listaJugadoresA[Number(equipoYNumero.slice(-1)-1)][ubicacionX+o]) && (listaJugadoresA[u].ubicacionY == listaJugadoresA[Number(equipoYNumero.slice(-1)-1)][ubicacionY+i])){
                                    posicion = [listaJugadoresA[u].ubicacionX, listaJugadoresA[u].ubicacionY];
                                    posicionesOcupadas.push(posicion);
                                }
                                //Quito la comparación con el mismo jugador
                                if ((listaJugadoresA[Number(equipoYNumero.slice(-1)-1)][ubicacionX+o] == listaJugadoresA[Number(equipoYNumero.slice(-1)-1)][ubicacionX]) && (listaJugadoresA[Number(equipoYNumero.slice(-1)-1)][ubicacionY+i] == listaJugadoresA[Number(equipoYNumero.slice(-1)-1)][ubicacionY])){
                                    posicionesOcupadas.pop();
                                }
                                //Si no tiene puntos para ir a las diagonales pero sí a los lados
                                if (listaJugadoresA[[Number(equipoYNumero.slice(-1)-1)]].puntosDeAccion < 1.5) {
                                    posicion = [listaJugadoresA[Number(equipoYNumero.slice(-1)-1)][ubicacionX+1], listaJugadoresA[Number(equipoYNumero.slice(-1)-1)][ubicacionY+1]];
                                    posicionesOcupadas.push(posicion);
                                    posicion = [listaJugadoresA[Number(equipoYNumero.slice(-1)-1)][ubicacionX+1], listaJugadoresA[Number(equipoYNumero.slice(-1)-1)][ubicacionY-1]];
                                    posicionesOcupadas.push(posicion);
                                    posicion = [listaJugadoresA[Number(equipoYNumero.slice(-1)-1)][ubicacionX-1], listaJugadoresA[Number(equipoYNumero.slice(-1)-1)][ubicacionY+1]];
                                    posicionesOcupadas.push(posicion);
                                    posicion = [listaJugadoresA[Number(equipoYNumero.slice(-1)-1)][ubicacionX-1], listaJugadoresA[Number(equipoYNumero.slice(-1)-1)][ubicacionY-1]];
                                    posicionesOcupadas.push(posicion);
                                }
                            }
                        }
                    }
                }
                else if (listaJugadoresA[[Number(equipoYNumero.slice(-1)-1)]].puntosDeAccion > 1){
                    alert(`Usted no dispone de suficientes "puntos de acción" para realizar esta acción`)
                }
            }
            alert(`El jugador se puede mover a cualquier posición de las cercanas exceptuando las siguientes ${posicionesOcupadas} porque están ocupadas o por falta de puntos`);
            const posicionesQueRodeanAlJugador = [];

            //A dónde se va a mover?

        }*/
    }
}

const jugadorA1 = new Jugador(`${prompt("Introduzca el nombre y apellido del base del equipo A")}(A1)`,180, 180, 70, 100, 10, 20, 70, 60, 95, 14, 1);
const jugadorA2 = new Jugador(`${prompt("Introduzca el nombre y apellido del del escolta equipo A")}(A2)`,198, 205, 90, 80, 30, 40, 90, 50, 70, 14, 5);
const jugadorA3 = new Jugador(`${prompt("Introduzca el nombre y apellido del del alero equipo A")}(A3)`,206, 195, 70, 60, 60, 60, 60, 60, 40, 14, 10);
const jugadorA4 = new Jugador(`${prompt("Introduzca el nombre y apellido del del ala-pivot equipo A")}(A4)`,208, 205, 50, 40, 75, 80, 30, 80, 30, 14, 14);
const jugadorA5 = new Jugador(`${prompt("Introduzca el nombre y apellido del del pivot equipo A")}(A5)`,218, 225, 50, 5, 95, 95, 10, 100, 15, 14, 7);

const jugadorB1 = new Jugador(`${prompt("Introduzca el nombre y apellido del base del equipo B")}(B1)`,180, 180, 70, 100, 10, 20, 70, 60, 95, 15, 2);
const jugadorB2 = new Jugador(`${prompt("Introduzca el nombre y apellido del escolta del equipo B")}(B2)`,198, 205, 90, 80, 30, 40, 90, 50, 70, 15, 6);
const jugadorB3 = new Jugador(`${prompt("Introduzca el nombre y apellido del alero del equipo B")}(B3)`,206, 195, 70, 60, 60, 60, 60, 60, 40, 15, 11);
const jugadorB4 = new Jugador(`${prompt("Introduzca el nombre y apellido del ala-pivot del equipo B")}(B4)`,208, 205, 50, 40, 75, 80, 30, 80, 30, 15, 15);
const jugadorB5 = new Jugador(`${prompt("Introduzca el nombre y apellido del pivot del equipo B")}(B5)`,218, 225, 50, 5, 95, 95, 10, 100, 15, 15, 8);

//Creo arrays para guardar información de los equipos
const listaJugadoresA = [jugadorA1, jugadorA2, jugadorA3, jugadorA4, jugadorA5];
const listaJugadoresB = [jugadorB1, jugadorB2, jugadorB3, jugadorB4, jugadorB5];

//Creo objeto para costos de "puntos de acción" para cada acción
const costeAccionesDefensa = {moverseRecto: 1, moverseDiagonal: 1.5, intentarUnRoboAlPortadorDeLaPelota: 1, intentarInterceptarPase: 1, esperaAtosigante: 1, esperaCautelosa: 0.5}
const costeAccionesAtaque = {moverseRecto: 1, moverseDiagonal: 1.5, pase: 0.5, dribblingRecto: 1, dribblingDiagonal: 1.5, esperarSinBalon: 1, esperarEnTripleAmenaza: 0.5}

/*Creo función compuesta que permite a los "coach" ver las habilidades de los jugadores
const mostrarPosicionesJugadores = () => {
    alert(`Las ubicaciones del equipo "A" son:`);
        for (let i=0; i<5; i++) {
            let concatenado = "";
            //Creo un búcle para que la información sea recopilada en "concatenado" (no quiero toda la información, sino la que respecta sólo a las ubicaciones de los jugadores)
            for (habilidades in listaJugadoresA[i]){
                if ((habilidades == "nombre") || (habilidades == "ubicacionX") || (habilidades == "ubicacionY")) {
                    concatenado= concatenado+ `
                    ${habilidades}: ${listaJugadoresA[i][habilidades]}`;
                }
            }
        //Muestro la info del primer equipo
        alert(concatenado);
        }
        //Repito para mostrar al otro equipo
        alert(`Las ubicaciones del equipo "B" son:`);
        for (let i=0; i<5; i++) {
            let concatenado = "";
            for (habilidades in listaJugadoresB[i]){
                if ((habilidades == "nombre") || (habilidades == "ubicacionX") || (habilidades == "ubicacionY")) {
                    concatenado= concatenado+ `
                    ${habilidades}: ${listaJugadoresB[i][habilidades]}`;
                }
            }
        //La info del segundo equipo
        alert(concatenado);
        }
}
const verJugadores = ()=> {
    //Creo función para que los coach puedan ver las posiciones de los jugadores en este momento
    const posicionJugadores = (p)=> {
        let coachVeUbicacionJugadores = "";//Esto queda vacío para que se inicie el búcle        
        while ((coachVeUbicacionJugadores != "SI") && (coachVeUbicacionJugadores != "NO")){
            //El búcle pide respuesta de los usuarios
            coachVeUbicacionJugadores = prompt(p).toUpperCase();
            //Corrobora si la respuesta fue cargada de forma correcta
            if ((coachVeUbicacionJugadores != "SI") && (coachVeUbicacionJugadores != "NO")){
                alert(`Por favor escriba "Si" o "No" para responder a la pregunta`);
            }
            else {
                //Devuelve valor correcto cortando el búcle
                return coachVeUbicacionJugadores;
            }
        }
    }
    //Redacto la pregunta que será realizada a los usuarios al correrse "posicionJugadores()"
    let primeraPregunta = "Desea ver la ubicación de los jugadores? (Si/No)";
    while (posicionJugadores(primeraPregunta) == "SI") {//Tras corroborar que la respuesta fué bien cargada veo cuál fué. La negativa corta el búcle
        mostrarPosicionesJugadores();
        primeraPregunta = "Desea volver a ver la ubicación de los jugadores? (Si/No)"
    }
    //Creo función que pregunte a los "coach" si quieren realizar esta acción
    const verHabilidadesGenerales = (p)=> {
        let coachVeJugadores = "";//Esto queda vacío para que se inicie el búcle        
        while ((coachVeJugadores != "SI") && (coachVeJugadores != "NO")){
            //El búcle pide respuesta de los usuarios
            coachVeJugadores = prompt(p).toUpperCase();
            //Corrobora si la respuesta fue cargada de forma correcta
            if ((coachVeJugadores != "SI") && (coachVeJugadores != "NO")){
                alert(`Por favor escriba "Si" o "No" para responder a la pregunta`);
            }
            else {
                //Devuelve valor correcto cortando el búcle
                return coachVeJugadores;
            }
        }
    }
    //Redacto la pregunta que será realizada a los usuarios al correrse "verHabilidadesGenerales()"
    let laPregunta = "Desea ver las habilidades de los jugadores? (Si/No)";

    
    while (verHabilidadesGenerales(laPregunta) == "SI") {//Tras corroborar que la respuesta fué bien cargada veo cuál fué. La negativa corta el búcle
        alert(`Los datos y habilidades del equipo "A" son:`);
        for (let i=0; i<5; i++) {
            let concatenado = "";
            //Creo un búcle para que la información sea recopilada en "concatenado" (no quiero toda la información, sino la que respecta sólo a habilidades de los jugadores)
            for (habilidades in listaJugadoresA[i]){
                if ((habilidades != "ubicacionX") && (habilidades != "ubicacionY") && (habilidades != "conPelota") && (habilidades != "turnoUsado") && (habilidades != "ultimaAccion") && (habilidades != "puntosDeAccion") && (habilidades != "nuevospuntosDeAccion") && (habilidades !="nuevaPosicion")) {
                    concatenado= concatenado+ `
                    ${habilidades}: ${listaJugadoresA[i][habilidades]}`;
                }
            }
        //Muestro la info del primer equipo
        alert(concatenado);
        }
        //Repito para mostrar al otro equipo
        alert(`Los datos y habilidades del equipo "B" son:`);
        for (let i=0; i<5; i++) {
            let concatenado = "";
            for (habilidades in listaJugadoresB[i]){
                if ((habilidades != "ubicacionX") && (habilidades != "ubicacionY") && (habilidades != "conPelota") && (habilidades != "turnoUsado") && (habilidades != "ultimaAccion") && (habilidades != "puntosDeAccion") && (habilidades != "nuevospuntosDeAccion") && (habilidades !="nuevaPosicion")) {
                    concatenado= concatenado+ `
                    ${habilidades}: ${listaJugadoresB[i][habilidades]}`;
                }
            }
        //La info del segundo equipo
        alert(concatenado);
        }
        //Creo función para preguntar a los "coach" si quieren filtrar alguna información
        const quiereVerDestacadosPorHabilidad = (p)=>{
            let coachVeHabilidadesQueDestacan = "";//Esto queda vacío para que se inicie el búcle
            //El búcle va a corroborar si la respusta fue bien cargada
            while ((coachVeHabilidadesQueDestacan != "SI") && (coachVeHabilidadesQueDestacan != "NO")){
                coachVeHabilidadesQueDestacan = prompt(p).toUpperCase();//Realizo la pregunta
                if ((coachVeHabilidadesQueDestacan != "SI") && (coachVeHabilidadesQueDestacan != "NO")){
                    alert(`Por favor escriba "Si" o "No" para responder a la pregunta`);//Lo que devuelvo si fué mal cargado
                }
                else {
                    //Devuelve valor correcto cortando el búcle
                    return coachVeHabilidadesQueDestacan;
                }
            }
        }
        
        let otraPregunta = "Desea ver los que destacan en una habilidad?(Si/No)";//Esta es la pregunta que será hecha a los usuarios
        //Tras corroborar que la respuesta fué bien cargada veo cuál fué esta
        while (quiereVerDestacadosPorHabilidad(otraPregunta) == "SI"){
            //Si el usuario afirma creo función para corroborar que la respuesta a la próxima pregunta esté bien cargada
            //Si la respuesta es negativa se corta el búcle por lo que continúa con lo próximo
            const cualQuiereVer = (p)=>{
                let coachQuiereVerTalHabilidad = "";/*Dejo esto vacío para que se inicie el búcle
                //El búcle va a corroborar que esté bien cargada la respuesta
                while ((coachQuiereVerTalHabilidad != "ALTURA") && (coachQuiereVerTalHabilidad != "PESO") && (coachQuiereVerTalHabilidad != "CAPACIDADATLETICA") && (coachQuiereVerTalHabilidad != "DEFENSAPERIMETRAL") && (coachQuiereVerTalHabilidad != "DEFENSAINTERNA") && (coachQuiereVerTalHabilidad != "CAPACIDADREBOTEADORA") && (coachQuiereVerTalHabilidad != "ANOTACIONEXTERIOR") && (coachQuiereVerTalHabilidad != "ANOTACIONINTERIOR") && (coachQuiereVerTalHabilidad != "CREACIONDEJUEGO")){
                    coachQuiereVerTalHabilidad = prompt(p).toUpperCase();//Hago la pregunta
                    if ((coachQuiereVerTalHabilidad != "ALTURA") && (coachQuiereVerTalHabilidad != "PESO") && (coachQuiereVerTalHabilidad != "CAPACIDADATLETICA") && (coachQuiereVerTalHabilidad != "DEFENSAPERIMETRAL") && (coachQuiereVerTalHabilidad != "DEFENSAINTERNA") && (coachQuiereVerTalHabilidad != "CAPACIDADREBOTEADORA") && (coachQuiereVerTalHabilidad != "ANOTACIONEXTERIOR") && (coachQuiereVerTalHabilidad != "ANOTACIONINTERIOR") && (coachQuiereVerTalHabilidad != "CREACIONDEJUEGO")){
                        alert(`Por favor escriba una habilidad tal cuál la lee para responder a la pregunta`);
                    }
                    else {
                        //Si la respuesta fue bien cargada la devuelvo cortando el búcle
                        return coachQuiereVerTalHabilidad;
                    }
                }
            }
            //Esta es la pregunta que hago
            let preguntoHabilidad = "¿De cuál habilidad le interesa ver los destacados?? (Altura, peso, capacidadAtletica, defensaPerimetral, defensaInterna, capacidadReboteadora, anotacionExterior, anotacionInterior o creacionDeJuego)";
            //Guardo en esta variable la respuesta a la pregunta
            let respuestaParaFiltros = cualQuiereVer(preguntoHabilidad);
            let listaJugadoresFiltrados;


            //Creo arrays que van a servir para armar una función que simplifique la creación de los filtros.

            //Creo un filtro por cada tipo de habilidad--------------------------------------
            if (respuestaParaFiltros == "ALTURA") {
                let alturaFiltrada = prompt("Introduzca la altura mínima (cm) por la que filtrar (ej. 210)");
                const filtroJugadoresAltosEquipoA = listaJugadoresA.filter(habilidades => habilidades.altura >= alturaFiltrada);
                const filtroJugadoresAltosEquipoB = listaJugadoresB.filter(habilidades => habilidades.altura >= alturaFiltrada);
                filtroJugadoresAltosEquipoA.forEach((jugador) =>{
                    listaJugadoresFiltrados = listaJugadoresFiltrados + `
                    ${jugador.nombre}`;
                })
                alert(`Los jugadores que miden más de ${alturaFiltrada}cm del equipo A son ${listaJugadoresFiltrados}`);
                listaJugadoresFiltrados = "";
                filtroJugadoresAltosEquipoB.forEach((jugador) =>{
                    listaJugadoresFiltrados = listaJugadoresFiltrados + `
                    ${jugador.nombre}`;
                })
                alert(`Los jugadores que miden más de ${alturaFiltrada}cm del equipo B son ${listaJugadoresFiltrados}`);
                listaJugadoresFiltrados = "";
            }
            else if (respuestaParaFiltros == "PESO") {
                let pesoFiltrado = prompt(`Introduzca el peso mínimo (Kg) por el que filtrar (ej. "98")`);
                const filtroJugadoresPesadosEquipoA = listaJugadoresA.filter(habilidades => habilidades.peso >= pesoFiltrado);
                const filtroJugadoresPesadosEquipoB = listaJugadoresB.filter(habilidades => habilidades.peso >= pesoFiltrado);
                filtroJugadoresPesadosEquipoA.forEach((jugador) =>{
                    listaJugadoresFiltrados = listaJugadoresFiltrados + `
                    ${jugador.nombre}`;
                })
                alert(`Los jugadores que pesan más de ${pesoFiltrado}Kg del equipo A son ${listaJugadoresFiltrados}`);
                listaJugadoresFiltrados = "";
                filtroJugadoresPesadosEquipoB.forEach((jugador) =>{
                    listaJugadoresFiltrados = listaJugadoresFiltrados + `
                    ${jugador.nombre}`;
                })
                alert(`Los jugadores que pesan más de ${pesoFiltrado}Kg del equipo B son ${listaJugadoresFiltrados}`);
                listaJugadoresFiltrados = "";
            }
            else if (respuestaParaFiltros == "CAPACIDADATLETICA") {
                let capacidadAtleticaFiltrado = prompt(`Introduzca la capacidad atlética mínima por la que filtrar (ej. "80")`);
                const filtroJugadoresAtleticosEquipoA = listaJugadoresA.filter(habilidades => habilidades.capacidadAtletica >= capacidadAtleticaFiltrado);
                const filtroJugadoresAtleticosEquipoB = listaJugadoresB.filter(habilidades => habilidades.capacidadAtletica >= capacidadAtleticaFiltrado);
                filtroJugadoresAtleticosEquipoA.forEach((jugador) =>{
                    listaJugadoresFiltrados = listaJugadoresFiltrados + `
                    ${jugador.nombre}`;
                })
                alert(`Los jugadores que tienen una valoración mínima de ${capacidadAtleticaFiltrado} capacidad atlética del equipo A son ${listaJugadoresFiltrados}`);
                listaJugadoresFiltrados = "";
                filtroJugadoresAtleticosEquipoB.forEach((jugador) =>{
                    listaJugadoresFiltrados = listaJugadoresFiltrados + `
                    ${jugador.nombre}`;
                })
                alert(`Los jugadores que tienen una valoración mínima de ${capacidadAtleticaFiltrado} capacidad atlética del equipo B son ${listaJugadoresFiltrados}`);
                listaJugadoresFiltrados = "";
            }
            else if (respuestaParaFiltros == "DEFENSAPERIMETRAL") {
                let defensaPerimetralFiltrado = prompt(`Introduzca la defensa perimetral mínima por la que filtrar (ej. "80")`);
                const filtroDefensoresPerimetroEquipoA = listaJugadoresA.filter(habilidades => habilidades.defensaPerimetral >= defensaPerimetralFiltrado);
                const filtroDefensoresPerimetroEquipoB = listaJugadoresB.filter(habilidades => habilidades.defensaPerimetral >= defensaPerimetralFiltrado);
                filtroDefensoresPerimetroEquipoA.forEach((jugador) =>{
                    listaJugadoresFiltrados = listaJugadoresFiltrados + `
                    ${jugador.nombre}`;
                })
                alert(`Los jugadores que tienen una valoración mínima de ${defensaPerimetralFiltrado} de defensa perimetral del equipo A son ${listaJugadoresFiltrados}`);
                listaJugadoresFiltrados = "";
                filtroDefensoresPerimetroEquipoB.forEach((jugador) =>{
                    listaJugadoresFiltrados = listaJugadoresFiltrados + `
                    ${jugador.nombre}`;
                })
                alert(`Los jugadores que tienen una valoración mínima de ${defensaPerimetralFiltrado} de defensa perimetral del equipo B son ${listaJugadoresFiltrados}`);
                listaJugadoresFiltrados = "";
            }
            else if (respuestaParaFiltros == "DEFENSAINTERNA") {
                let defensaInternaFiltrado = prompt(`Introduzca la defensa interna mínima por la que filtrar (ej. "80")`);
                const filtroDefensoresInternosEquipoA = listaJugadoresA.filter(habilidades => habilidades.defensaInterna >= defensaInternaFiltrado);
                const filtroDefensoresInternosEquipoB = listaJugadoresB.filter(habilidades => habilidades.defensaInterna >= defensaInternaFiltrado);
                filtroDefensoresInternosEquipoA.forEach((jugador) =>{
                    listaJugadoresFiltrados = listaJugadoresFiltrados + `
                    ${jugador.nombre}`;
                })
                alert(`Los jugadores que tienen una valoración mínima de ${defensaInternaFiltrado} de defensa interna del equipo A son ${listaJugadoresFiltrados}`);
                listaJugadoresFiltrados = "";
                filtroDefensoresInternosEquipoB.forEach((jugador) =>{
                    listaJugadoresFiltrados = listaJugadoresFiltrados + `
                    ${jugador.nombre}`;
                })
                alert(`Los jugadores que tienen una valoración mínima de ${defensaInternaFiltrado} de defensa interna del equipo B son ${listaJugadoresFiltrados}`);
                listaJugadoresFiltrados = "";
            }
            else if (respuestaParaFiltros == "CAPACIDADREBOTEADORA") {
                let capacidadReboteadoraFiltrado = prompt(`Introduzca la capacidad reboteadora mínima por la que filtrar (ej. "80")`);
                const filtroCapacidadReboteadoraEquipoA = listaJugadoresA.filter(habilidades => habilidades.capacidadReboteadora >= capacidadReboteadoraFiltrado);
                const filtroCapacidadReboteadoraEquipoB = listaJugadoresB.filter(habilidades => habilidades.capacidadReboteadora >= capacidadReboteadoraFiltrado);
                filtroCapacidadReboteadoraEquipoA.forEach((jugador) =>{
                    listaJugadoresFiltrados = listaJugadoresFiltrados + `
                    ${jugador.nombre}`;
                })
                alert(`Los jugadores que tienen una valoración mínima de ${capacidadReboteadoraFiltrado} de capacidad reboteadora del equipo A son ${listaJugadoresFiltrados}`);
                listaJugadoresFiltrados = "";
                filtroCapacidadReboteadoraEquipoB.forEach((jugador) =>{
                    listaJugadoresFiltrados = listaJugadoresFiltrados + `
                    ${jugador.nombre}`;
                })
                alert(`Los jugadores que tienen una valoración mínima de ${capacidadReboteadoraFiltrado} de capacidad reboteadora del equipo B son ${listaJugadoresFiltrados}`);
                listaJugadoresFiltrados = "";
            }
            else if (respuestaParaFiltros == "ANOTACIONEXTERIOR") {
                let anotacionExteriorFiltrado = prompt(`Introduzca la anotación exterior mínima por la que filtrar (ej. "80")`);
                const filtroAnotacionExteriorEquipoA = listaJugadoresA.filter(habilidades => habilidades.anotacionExterior >= anotacionExteriorFiltrado);
                const filtroAnotacionExteriorEquipoB = listaJugadoresB.filter(habilidades => habilidades.anotacionExterior >= anotacionExteriorFiltrado);
                filtroAnotacionExteriorEquipoA.forEach((jugador) =>{
                    listaJugadoresFiltrados = listaJugadoresFiltrados + `
                    ${jugador.nombre}`;
                })
                alert(`Los jugadores que tienen una valoración mínima de ${anotacionExteriorFiltrado} de anotación exterior del equipo A son ${listaJugadoresFiltrados}`);
                listaJugadoresFiltrados = "";
                filtroAnotacionExteriorEquipoB.forEach((jugador) =>{
                    listaJugadoresFiltrados = listaJugadoresFiltrados + `
                    ${jugador.nombre}`;
                })
                alert(`Los jugadores que tienen una valoración mínima de ${anotacionExteriorFiltrado} de anotación exterior del equipo B son ${listaJugadoresFiltrados}`);
                listaJugadoresFiltrados = "";
            }
            else if (respuestaParaFiltros == "ANOTACIONINTERIOR") {
                let anotacionInteriorFiltrado = prompt(`Introduzca la anotación interior mínima por la que filtrar (ej. "80")`);
                const filtroAnotacionInteriorEquipoA = listaJugadoresA.filter(habilidades => habilidades.anotacionInterior >= anotacionInteriorFiltrado);
                const filtroAnotacionInteriorEquipoB = listaJugadoresB.filter(habilidades => habilidades.anotacionInterior >= anotacionInteriorFiltrado);
                filtroAnotacionInteriorEquipoA.forEach((jugador) =>{
                    listaJugadoresFiltrados = listaJugadoresFiltrados + `
                    ${jugador.nombre}`;
                })
                alert(`Los jugadores que tienen una valoración mínima de ${anotacionInteriorFiltrado} de anotación interior del equipo A son ${listaJugadoresFiltrados}`);
                listaJugadoresFiltrados = "";
                filtroAnotacionInteriorEquipoB.forEach((jugador) =>{
                    listaJugadoresFiltrados = listaJugadoresFiltrados + `
                    ${jugador.nombre}`;
                })
                alert(`Los jugadores que tienen una valoración mínima de ${anotacionInteriorFiltrado} de anotación interior del equipo B son ${listaJugadoresFiltrados}`);
                listaJugadoresFiltrados = "";
            }
            else if (respuestaParaFiltros == "CREACIONDEJUEGO") {
                let creacionDeJuegoFiltrado = prompt(`Introduzca la creación de juego mínima por la que filtrar (ej. "80")`);
                const filtroCreacionDeJuegoEquipoA = listaJugadoresA.filter(habilidades => habilidades.creacionDeJuego >= creacionDeJuegoFiltrado);
                const filtroCreacionDeJuegoEquipoB = listaJugadoresB.filter(habilidades => habilidades.creacionDeJuego >= creacionDeJuegoFiltrado);
                filtroCreacionDeJuegoEquipoA.forEach((jugador) =>{
                    listaJugadoresFiltrados = listaJugadoresFiltrados + `
                    ${jugador.nombre}`;
                })
                alert(`Los jugadores que tienen una valoración mínima de ${creacionDeJuegoFiltrado} de creación de juego del equipo A son ${listaJugadoresFiltrados}`);
                listaJugadoresFiltrados = "";
                filtroCreacionDeJuegoEquipoB.forEach((jugador) =>{
                    listaJugadoresFiltrados = listaJugadoresFiltrados + `
                    ${jugador.nombre}`;
                })
                alert(`Los jugadores que tienen una valoración mínima de ${creacionDeJuegoFiltrado} de creación de juego del equipo B son ${listaJugadoresFiltrados}`);
                listaJugadoresFiltrados = "";
            }

            //Cambio la pregunta que se le hará al usuario para que quede mejor redactada
            otraPregunta = "Desea ver los que destacan en una otra habilidad?(Si/No)"
        }
        //Cambio la pregunta que se le hará al usuario para que quede mejor redactada
        laPregunta = "Desea ver las habilidades de los jugadores nuevamente? (Si/No)"
    }
    alert("Continuamos con el encuentro");
}
verJugadores();

//Funciones para los dados
// Retorna un número aleatorio entre min (incluido) y max (excluido);
/*function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}*/
/*Función que sirve para lanzar un dado de 20 caras*/
function dadoDe20(){
    return Math.random() * (21-1)+1;
}

/*Se disputa el salto entre 2 para comenzar el partido*/
alert("El árbitro se dispone en mitad de cancha a lanzar el balón hacia arriba para iniciar del encuentro. Lo lanza y..");
//Creo un bucle para resolver quién consigue más puntos considerando las estadísticas que influyen en esta acción y lo que sacan con el dado
let saltoA = 0;
let saltoB = 0;
//Si empatan vuelve a comenzar el ciclo
while (saltoA == saltoB){
    //Calculo cuántos puntos consigue cada jugador para esta acción
    saltoA = dadoDe20() + listaJugadoresA[4].altura+listaJugadoresA[4].capacidadAtletica;
    alert(`${listaJugadoresA[4].nombre} consigue ${saltoA} puntos en el salto`);
    saltoB = dadoDe20() + listaJugadoresB[4].altura+listaJugadoresB[4].capacidadAtletica;
    alert(`${listaJugadoresB[4].nombre} consigue ${saltoB} puntos en el salto`);
    //Comparo el desempeño de los jugadores y devuelvo lo que ocurre considerando los resultados
    let resultadoSalto = saltoA-saltoB;
    if (resultadoSalto > 0){
        alert(`El salto lo gana el equipo A y la pelota ahora está en posesión de ${listaJugadoresA[0].nombre}`);
        listaJugadoresA[0].conPelota = true;
        listaJugadoresA[0].ultimaAccion = `${listaJugadoresA[0].nombre} recibe un pase`;
        console.log(`${listaJugadoresA[0].ultimaAccion}`);
        listaJugadoresA[4].ultimaAccion = `${listaJugadoresA[4].nombre} gana el salto`;
        console.log(`${listaJugadoresA[4].ultimaAccion}`);
    }
    else if (resultadoSalto < 0){
        alert(`El salto lo gana el equipo B y la pelota ahora está en posesión de ${listaJugadoresB[0].nombre}`);
        listaJugadoresB[0].conPelota = true;
        listaJugadoresB[0].ultimaAccion = `${listaJugadoresB[0].nombre} recibe un pase`;
        console.log(`${listaJugadoresB[0].ultimaAccion}`);
        listaJugadoresB[4].ultimaAccion = `${listaJugadoresB[4].nombre} gana el salto`;
        console.log(`${listaJugadoresB[4].ultimaAccion}`);
    }
    else{
        alert("Ambos jugadores alcanzan el balón al mismo tiempo, la disputa por el salto sigue!");
    }
};
/*Creo función que calcule los puntos de acción que tendrán los jugadores en el próximo "instante"*/
const comienzaInstante = ()=>{
    for (let i=0; i<=4; i++){
        listaJugadoresA[i].nuevospuntosDeAccion();
        listaJugadoresB[i].nuevospuntosDeAccion();
    }
}

/*Creo funcion para comprobar quién tiene la posesión del balón*/
const queEquipoAtaca = ()=> {
    for (let i=0; i < 5; i++) {
        if (listaJugadoresA[i].conPelota == true) {
            return "A";
        }
        else if (listaJugadoresB[i].conPelota == true) {
            return "B";
        }
    }
}

/*Creo función para determinar si algún jugador aún tiene su "turno" sin usar en este "instante"*/
const algunoTieneTurno = () => {
    //Creo arrays que van a llenarse con los jugadores que cumplan con la condición
    const jugadoresAConTurno = [];
    const jugadoresBConTurno = [];
    //Creo búcle que se fijará si los jugadores cumplen con la condición o no
    for (let i=0; i < 5; i++) {
        if (listaJugadoresA[i].turnoUsado == false){
            //Si se cumple la condición se guarda la información en los nuevos arrays
            jugadoresAConTurno.push(`${listaJugadoresA[i].nombre}`);
        }
        if (listaJugadoresB[i].turnoUsado == false){
            //Si se cumple la condición se guarda la información en los nuevos arrays
            jugadoresBConTurno.push(`${listaJugadoresB[i].nombre}`);
        }
    }
    //Devuelvo ambos array como otro array (que los contiene a ambos) para poder exportar ambos equipos con una única función
    const turnoEnAlgunEquipo = [jugadoresAConTurno, jugadoresBConTurno];
    //Devuelvo este {ultinmo array}
    return turnoEnAlgunEquipo;
}
/*Creo herramientas que van a servir para que los coach seleccionen al jugador con el que quieren jugar en este "turno"
const herramientaParaElegirJugadorDefensor = ()=>{
    let defensorQueRealizaUnaAccion;
    alert(`El equipo que ataca es el equipo ${queEquipoAtaca()} por lo que el otro equipo comienza eligiendo con qué jugador va a realizar una acción`);
    //Utilizo función creada con anterioridad para comprobar qué jugadores tienen un "turno" aún disponible
    const turnoEnAlgunEquipo = algunoTieneTurno();
    const listaDeJugadoresConTurnoA = `${turnoEnAlgunEquipo[0]}`;
    const listaDeJugadoresConTurnoB = `${turnoEnAlgunEquipo[1]}`;
    //Pido que el defensor, en este caso "B", elija con qué jugador con "turno" disponible quiere jugar
    if ((turnoEnAlgunEquipo != undefined) && (queEquipoAtaca() == "A")) {
        defensorQueRealizaUnaAccion = prompt(`Los jugadores de equipo B con turno son ${listaDeJugadoresConTurnoB}. Por favor seleccione a alguno intoduciendo la letra del equipo y el número que tiene asignado como jugador (ej. "B2")`).toUpperCase();
        //Respuestas a posibles errores
        let ultimaLetraPrompt = Number(defensorQueRealizaUnaAccion.slice(-1));
        let primeraLetraPrompt = (defensorQueRealizaUnaAccion.charAt(0));
        if ((defensorQueRealizaUnaAccion.length != 2) || (listaJugadoresB[ultimaLetraPrompt-1] == undefined)){
            return "Dato mal escrito";
        }
        else if (primeraLetraPrompt != "B") {
            return "Su equipo es el B, cargue bien el dato por favor";
        }
        else if (listaJugadoresB[ultimaLetraPrompt-1].turnoUsado == true){
            return `Este jugador no cuenta con más "turnos" en este "instante"`;
        }
        //Respuesta jugador seleccionado
        else {
            return defensorQueRealizaUnaAccion;
        }
    }
    //Pido que el defensor, en este caso "A", elija con qué jugador con "turno" disponible quiere jugar
    else if ((turnoEnAlgunEquipo != undefined) && (queEquipoAtaca() == "B")) {
        defensorQueRealizaUnaAccion = prompt(`Los jugadores de equipo A con turno son ${listaDeJugadoresConTurnoA}. Por favor seleccione a alguno intoduciendo la letra del equipo y el número que tiene asignado como jugador (ej. "A2")`).toUpperCase();
        //Respuestas a posibles errores
        let ultimaLetraPrompt = Number(defensorQueRealizaUnaAccion.slice(-1));
        let primeraLetraPrompt = defensorQueRealizaUnaAccion.charAt(0);
        if ((defensorQueRealizaUnaAccion.length != 2) || (listaJugadoresA[ultimaLetraPrompt-1] == undefined)){
            return "Dato mal escrito";
        }
        else if (primeraLetraPrompt != "A") {
            return "Su equipo es el A, cargue bien el dato por favor";
        }
        else if (listaJugadoresA[ultimaLetraPrompt-1].turnoUsado == true){
            return `Este jugador no cuenta con más "turnos" en este "instante"`
        }
        //Respuesta jugador seleccionado
        else {
            return defensorQueRealizaUnaAccion;
        }
    }
    else {
        return "A ningún jugador de tu equipo le queda turno en este instante";
    }
}*/
/*const herramientaParaElegirJugadorAtacante = ()=>{
    let atacanteQueRealizaUnaAccion;
    alert(`Ahora es turno del equipo ${queEquipoAtaca()} de que elija con qué jugador va a realizar una acción`);
    //Utilizo función creada con anterioridad para comprobar qué jugadores tienen un "turno" aún disponible
    const turnoEnAlgunEquipo = algunoTieneTurno();
    const listaDeJugadoresConTurnoA = `${turnoEnAlgunEquipo[0]}`;
    const listaDeJugadoresConTurnoB = `${turnoEnAlgunEquipo[1]}`;
    //Pido que el atacante, en este caso "A", elija con qué jugador con "turno" disponible quiere jugar
    if ((turnoEnAlgunEquipo != undefined) && (queEquipoAtaca() == "A")) {
        atacanteQueRealizaUnaAccion = prompt(`Los jugadores de equipo A con turno son ${listaDeJugadoresConTurnoA}. Por favor seleccione a alguno intoduciendo la letra del equipo y el número que tiene asignado como jugador (ej. "A2")`).toUpperCase();
        //Respuestas a posibles errores
        let ultimaLetraPrompt = Number(atacanteQueRealizaUnaAccion.slice(-1));
        let primeraLetraPrompt = atacanteQueRealizaUnaAccion.charAt(0);
        if ((atacanteQueRealizaUnaAccion.length != 2) || (listaJugadoresA[ultimaLetraPrompt] == undefined)){
            return "Dato mal escrito";
        }
        else if (primeraLetraPrompt != "A") {
            return "Su equipo es el A, cargue bien el dato por favor";
        }
        else if (listaJugadoresA[ultimaLetraPrompt].turnoUsado == true){
            return `Este jugador no cuenta con más "turnos" en este "instante"`
        }
        //Respuesta jugador seleccionado
        else {
            return atacanteQueRealizaUnaAccion;
        }
    }
    //Pido que el atacante, en este caso "B", elija con qué jugador con "turno" disponible quiere jugar
    else if ((turnoEnAlgunEquipo != undefined) && (queEquipoAtaca() == "B")) {
        atacanteQueRealizaUnaAccion = prompt(`Los jugadores de equipo B con turno son ${listaDeJugadoresConTurnoB}. Por favor seleccione a alguno intoduciendo la letra del equipo y el número que tiene asignado como jugador (ej. "B2").`).toUpperCase();
        //Respuestas a posibles errores
        let ultimaLetraPrompt = Number(atacanteQueRealizaUnaAccion.slice(-1));
        let primeraLetraPrompt = atacanteQueRealizaUnaAccion.charAt(0);
        if ((atacanteQueRealizaUnaAccion.length != 2) || (listaJugadoresB[ultimaLetraPrompt] == undefined)){
            return "Dato mal escrito";
        }
        else if (primeraLetraPrompt != "B") {
            return "Su equipo es el B, cargue bien el dato por favor";
        }
        else if (listaJugadoresB[ultimaLetraPrompt].turnoUsado == true){
            return `Este jugador no cuenta con más "turnos" en este "instante"`
        }
        //Respuesta jugador seleccionado
        else {
            return atacanteQueRealizaUnaAccion;
        }
    }
    //Respuesta por si ningún equipo tiene "turnos" disponibles
    else {
        return "A ningún jugador de tu equipo le queda turno en este instante";
    }
}*/

/*Creo funciones que pide al coach que corresponda que seleccione con quién va a realizar su próxima acción
const coachDefensorEligeJugador = ()=>{
    //Utilizando funciones previas indico si el "coach" ingresó bien la data pedida
    while (true){
        //Si la info fué mal cargada va a continuar en búcle pidiendo la info y respondiendo que fué mal cargada
        let respuestaSeleccionJugadorEquipoDefensor = herramientaParaElegirJugadorDefensor();
        if ((respuestaSeleccionJugadorEquipoDefensor == "Dato mal escrito") || (respuestaSeleccionJugadorEquipoDefensor == "Su equipo es el A, cargue bien el dato por favor") || (respuestaSeleccionJugadorEquipoDefensor == `Este jugador no cuenta con más "turnos" en este "instante"`) || (respuestaSeleccionJugadorEquipoDefensor == "Su equipo es el B, cargue bien el dato por favor")){
            alert(respuestaSeleccionJugadorEquipoDefensor);
            alert("Por favor cargue de nuevo el dato pedido");
        }
        //Si la info fué cargada de forma correcta respondo cuál fué el jugador elegido y corto el bucle
        else {
            alert(`El jugador elegido por el coach defensor para actuar en este turno es el ${respuestaSeleccionJugadorEquipoDefensor}`);
            return respuestaSeleccionJugadorEquipoDefensor
        }
    }
}
const coachAtacanteEligeJugador = ()=>{
    //Utilizando funciones previas indico si el "coach" ingresó bien la data pedida
    while (true){
        //Si la info fué mal cargada va a continuar en búcle pidiendo la info y respondiendo que fué mal cargada
        let respuestaSeleccionJugadorEquipoAtacante = herramientaParaElegirJugadorAtacante();
        if ((respuestaSeleccionJugadorEquipoAtacante == "Dato mal escrito") || (respuestaSeleccionJugadorEquipoAtacante == "Su equipo es el A, cargue bien el dato por favor") || (respuestaSeleccionJugadorEquipoAtacante == `Este jugador no cuenta con más "turnos" en este "instante"`) || (respuestaSeleccionJugadorEquipoAtacante == "Su equipo es el B, cargue bien el dato por favor")){
            alert(respuestaSeleccionJugadorEquipoAtacante);
            alert("Por favor cargue de nuevo el dato pedido");
        }
        //Si la info fué cargada de forma correcta respondo cuál fué el jugador elegido y corto el bucle
        else {
            alert(`El jugador elegido por el coach atacante para actuar en este turno es el ${respuestaSeleccionJugadorEquipoAtacante}`);
            return respuestaSeleccionJugadorEquipoAtacante
        }
    }
}*/

/*Creo función para que el coach elija la acción que va a realizar
const accionARealizarDefensa = (p)=> {
    let coachElijeAccion = "";//Esto queda vacío para que se inicie el búcle        
    while ((coachElijeAccion != "MOVERSE") && (coachElijeAccion != "INTENTAR UN ROBO AL PORTADOR DE LA PELOTA") && (coachElijeAccion != "INTENTAR INTERCEPTAR PASE") && (coachElijeAccion != "ESPERA ATOSIGANTE") && (coachElijeAccion != "ESPERA CAUTELOSA")) {
        //El búcle pide respuesta de los usuarios
        coachElijeAccion = prompt(p).toUpperCase();
        //Corrobora si la respuesta fue cargada de forma correcta
        if ((coachElijeAccion != "MOVERSE") && (coachElijeAccion != "INTENTAR UN ROBO AL PORTADOR DE LA PELOTA") && (coachElijeAccion != "INTENTAR INTERCEPTAR PASE") && (coachElijeAccion != "ESPERA ATOSIGANTE") && (coachElijeAccion != "ESPERA CAUTELOSA")) {
            alert(`Por favor escriba una acción defensiva de las presentadas para responder a la pregunta`);
        }
        else {
            //Devuelve valor correcto cortando el búcle
            return coachElijeAccion;
        }
    }
}
const turnoJugadorDefensor = (jugador)=>{
    
    if (queEquipoAtaca() == "A") {
        while (listaJugadoresB[Number(jugador.slice(-1)-1)][puntosDeAccion] > 0){
            //Redacto la pregunta que será realizada a los usuarios al correrse "accionARealizarDefensa()"
            let primeraPregunta = `Qué acción defensiva desea realizar? (Dispone de ${listaJugadoresB[Number(jugador.slice(-1)-1)][puntosDeAccion]} pts este turno) (Moverse / Intentar un robo al portador de la pelota / Intentar interceptar pase / Espera atosigante / Espera cautelosa)`;
            //Realizo la pregunta al usuario pasandolo por mi corroborador de escritura
            let queHaceElDefensor = accionARealizarDefensa(primeraPregunta);
            //Respondo en función de lo que decide
            if (queHaceElDefensor == "MOVERSE") {
                    
                }
            }
    }
}*/
//Continúa el partido luego del salto lo pongo en búcle puesto que la dinámica del juego es cíclica
while (finDePartido == false) {
    comienzaInstante();

    /*verJugadores();
    let jugadorDefensorElegido = coachDefensorEligeJugador();
    turnoJugadorDefensor(jugadorDefensorElegido);
    verJugadores();
    let jugadorAtacanteElegido = coachAtacanteEligeJugador();*/

    //AGREGAR que comparar iniciativas
    //AGREGAR elegir la acción a realizar por parte de cada jugador elegido

    
    
    finDePartido = true;
}