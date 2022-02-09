//El punto final de este proyecto es conseguir desarrollar un juego de rol de baloncesto.


/*Muestro si es una partida nueva o una continuada en un p*/
//Creo el p
const p = document.createElement("p");
//Le pongo contenido al p
p.innerText = localStorage.getItem("tipoDePartida");
//Ubico el p en el HTML
document.querySelector("header").appendChild(p);
//Pongo el "tipoDePartida" del local storage como continuar juego. En un futuro voy a permitir reanudar partidas y por defecto quiero que se continúe por si entran a este html andes de pasar por la página de inicio.
localStorage.setItem("tipoDePartida", "Continuar juego");


//Funciones para los dados
// Retorna un número aleatorio entre min (incluido) y max (excluido);
/*function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}*/
/*Función que sirve para lanzar un dado de 20 caras*/
function dadoDe20(){
    return Math.random() * (21-1)+1;
}

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

let finDePeriodo= false;
let finDePartido = false;
let resultadoDado;




//Creación de jugadores
class Jugador {
    constructor(nombre, altura, peso, capacidadAtletica, defensaPerimetral, defensaInterna, capacidadReboteadora, anotacionExterior, anotacionInterior, creacionDeJuego) {
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
class EstadoDelJugador {
    constructor(ubicacionX, ubicacionY) {
        this.ubicacionX = ubicacionX;/*Utilizo la ubicación X para determinar en que punto del largo de la cancha se encuentran los jugadores*/
        this.ubicacionY = ubicacionY;/*Utilizo la ubicación Y para determinar en que punto del ancho de la cancha se encuentran los jugadores*/    
        this.conPelota = false;/*Determina si el jugador tiene la posesión de la pelota*/
        this.turnoUsado = false;/*Determina si el jugador ya ha realizado una acción en este "Instante"*/
        this.ultimaAccion = "Todavía no realizó ninguna acción";/*Recuerda cuál fué la última acción realizada por el jugador*/
        this.puntosDeAccion = 0;/*Determina de cuántos puntos de acción dispone el jugador en su turno*/
        this.nombre = "";
            
    }
}


/*Creo una función que sirve para asignar nuevos puntos de acción a los jugadores al comenzar cada turno*/
const nuevosPuntosDeAccion = ()=> {
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
                if (resultadoDado > 6) {
                    estadosAmbosEquipos[listas][jugadores].puntosDeAccion += 1;
                }
            }
            //Los jugadores promedio tienen menos chances que los bajos de conseguir 3 puntos de acción y no tienen chances de conseguir sólo 1
            else if ((ambosEquipos[listas][jugador].altura > 192) && (ambosEquipos[listas][jugador].altura <= 208)) {
                estadosAmbosEquipos[listas][jugadores].puntosDeAccion = 2;
                resultadoDado = dadoDe20();
                if (resultadoDado > 10) {
                    estadosAmbosEquipos[listas][jugadores].puntosDeAccion += 1;
                }
            }
            //Los jugadores altos tienen chances de quedarse con un solo punto de acción y pocas de conseguir 3
            else if (ambosEquipos[listas][jugador].altura > 208) {
                estadosAmbosEquipos[listas][jugadores].puntosDeAccion = 1;
                resultadoDado = dadoDe20();
                if ((resultadoDado > 3) && (resultadoDado <16)) {
                    estadosAmbosEquipos[listas][jugadores].puntosDeAccion += 1;
                }
                else if (resultadoDado >=16) {
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
//Creo objeto para costos de "puntos de acción" para cada acción
const costeAccionesDefensa = {moverseRecto: 1, moverseDiagonal: 1.5, intentarUnRoboAlPortadorDeLaPelota: 1, intentarInterceptarPase: 1, esperaAtosigante: 1, esperaCautelosa: 0.5};
const costeAccionesAtaque = {moverseRecto: 1, moverseDiagonal: 1.5, pase: 0.5, dribblingRecto: 1, dribblingDiagonal: 1.5, esperarSinBalon: 1, esperarEnTripleAmenaza: 0.5, tiro: 1};


/*Muestro habilidades de los jugadores*/
//Creo arrays que van a servir para hacer esto
const listaHabilidades = ["nombre", "altura", "peso", "capacidadAtletica", "defensaPerimetral", "defensaInterna", "capacidadReboteadora", "anotacionExterior", "anotacionInterior", "creacionDeJuego"];
const habilidadesResumidas = ["Nombre", "Alt", "Peso", "Cap atl", "Def per", "Def int", "Cap reb", "3ple", "Anot int", "Creación"];
const rangosHabilidad = ["puntosMuyBajos", "puntosBajos", "puntosMediosBajos", "puntosMedios", "puntosMediosAltos", "puntosAltos", "puntosMuyAltos", "sobreHumano"];
const rangosAlturas = [0, 164, 175, 184, 194, 203, 213, 222, 232];
const rangosPesos = [0, 73, 82, 91, 99, 108, 116, 125, 140];
const rangosSobreCien = [0, 14, 29, 43, 57, 71, 86, 100, 115];

let dataTablaA = document.getElementById("idTablaA");
let dataTablaB = document.getElementById("idTablaB");
const ambasTablas = [dataTablaA, dataTablaB];


/*Agregar Marco zonas de tiro*/






/*Hago tablas con un bucle para poder seleccionar en cada iteración los datos correspondientes a uno de los equipos*/
for (let u=0; u < 2; u++){
    ambasTablas[u].innerHTML = "";
    
    let tabla = `<table class="tablaHabilidades"><tr>`;
    //Creo títulos
    for (titulos of habilidadesResumidas){
        //Cada título
        tabla += `<th class="thHabilidades" colspan="2">${titulos}</th>`;
    }
    tabla += `</tr>`;
    //Creo filas de stats
    for (jugador in ambosEquipos[u]) {
        tabla += `<tr>`;
        //Inserto cada dato a cada espacio
        for (habilidades in ambosEquipos[u][jugador]){
            //Pongo condicionales para que los distintos puntos tomen distintos colores dependiendo el valor
            //Como nombre, altura y peso no se miden sobre la cantidad de puntos que se le puede poner a los jugadores les hago un bucle especial a cada uno
            if (habilidades == "nombre"){
                //Agrego una casilla con el nombre
                tabla += `<td class="tdHabilidades" colspan="2">`;
                tabla += `${ambosEquipos[u][jugador][habilidades]}`;
                tabla += `</td>`;
            }
            else if (habilidades == "altura") {
                for (let i=0; i < 8; i++){
                    //En estos bucles uso un if para que en cada vuelta se fije si el valor está entre ciertos rangos, si lo está agrega la casilla con el valor y un class que determina su color
                    if ((rangosAlturas[i] < ambosEquipos[u][jugador][habilidades]) && (ambosEquipos[u][jugador][habilidades] <= rangosAlturas[i+1])) {
                        tabla += `<td class="tdHabilidades ${rangosHabilidad[i]}" colspan="2">`;
                        tabla += `${ambosEquipos[u][jugador][habilidades]}`;
                        tabla += `</td>`;
                    }
                }
            }
            //Repito lo anterior en los siguientes else if
            else if (habilidades == "peso") {
                for (let i=0; i < 8; i++){
                    if ((rangosPesos[i] < ambosEquipos[u][jugador][habilidades]) && (ambosEquipos[u][jugador][habilidades] <= rangosPesos[i+1])) {
                        tabla += `<td class="tdHabilidades ${rangosHabilidad[i]}" colspan="2">`;
                        tabla += `${ambosEquipos[u][jugador][habilidades]}`;
                        tabla += `</td>`;
                    }
                }
            }
            else if ((habilidades != "nombre") && (habilidades != "altura") && (habilidades != "peso")){
                for (let i=0; i < 8; i++){
                    if ((rangosSobreCien[i] < ambosEquipos[u][jugador][habilidades]) && (ambosEquipos[u][jugador][habilidades] <= rangosSobreCien[i+1])) {
                        tabla += `<td class="tdHabilidades ${rangosHabilidad[i]}" colspan="2">`;
                        tabla += `${ambosEquipos[u][jugador][habilidades]}`;
                        tabla += `</td>`;
                    }
                }
            }
        }
        //Cierro el tr
        tabla += `</tr>`;
    }
    //Cierro la tabla
    tabla +="</table>";
    //Imprimo la tabla A
    ambasTablas[u].innerHTML = tabla;
}


/*Creo funcion para comprobar quién tiene la posesión del balón*/
const queEquipoAtaca = ()=> {
    for (let i=0; i < 5; i++) {
        if (listaEstadosJugadoresA[i].conPelota == true) {
            return "A";
        }
        else if (listaEstadosJugadoresB[i].conPelota == true) {
            return "B";
        }
    }
}

queEquipoEs= (ataqueODefensa) =>{
    if (ataqueODefensa == 0){
        return "A";
    }
    else {
        return "B";
    }
}

const queEquipoAtacaNumero = ()=>{
    if (queEquipoAtaca() == "A") {
        return 0;
    }
    else {
        return 1;
    }
}

const queEquipoDefiendeNumero = ()=> {
    if (queEquipoAtacaNumero() == 0){
        return 1;
    }
    else {
        return 0;
    }
}
/*Agrego función que ponga imagenes de jugadores en la ubicación en la que se encuentren*/
//El primer bucle lo uso para recorrer estadosAmbosEquipos (elije el equipo)
const letraEquipo = ["A","B"]; 
//Pretengo agregar más imágenes que determinen de forma visual las habilidades de los jugadores, por eso creo estos array.
const imgHabilidadesDeJugadoresAAtacantes = {
    defecto: `../Img/AAtaca.png`
};
const imgHabilidadesDeJugadoresBAtacantes = {
    defecto: `../Img/BAtaca.png`
};

const imgHabilidadesAmbosEquiposAtacando = [imgHabilidadesDeJugadoresAAtacantes, imgHabilidadesDeJugadoresBAtacantes];


const imgHabilidadesDeJugadoresADefensores = {
    defecto: `../Img/ADefiende.png`
}
const imgHabilidadesDeJugadoresBDefensores = {
    defecto: `../Img/BDefiende.png`
}

const imgHabilidadesAmbosEquiposDefendiendo = [imgHabilidadesDeJugadoresADefensores, imgHabilidadesDeJugadoresBDefensores];

const imgConPelota = [`../Img/ACHabilAtacaCPelota.png`, `../Img/BCHabilAtacaCPelota.png`];

const posicionYAletra = ()=>{
    for (let i=0; i < 2; i++){
        if (estadosAmbosEquipos[i][jugador]["ubicacionY"] == 1){
            return "A";       
        }
        else if (estadosAmbosEquipos[i][jugador]["ubicacionY"] == 2){
            return "B";
        }
        else if (estadosAmbosEquipos[i][jugador]["ubicacionY"] == 3){
            return "C";
        }
        else if (estadosAmbosEquipos[i][jugador]["ubicacionY"] == 4){
            return "D";
        }
        else if (estadosAmbosEquipos[i][jugador]["ubicacionY"] == 5){
            return "E";
        }
        else if (estadosAmbosEquipos[i][jugador]["ubicacionY"] == 6){
            return "F";
        }
        else if (estadosAmbosEquipos[i][jugador]["ubicacionY"] == 7){
            return "G";
        }
        else if (estadosAmbosEquipos[i][jugador]["ubicacionY"] == 8){
            return "H";
        }
        else if (estadosAmbosEquipos[i][jugador]["ubicacionY"] == 9){
            return "I";
        }
        else if (estadosAmbosEquipos[i][jugador]["ubicacionY"] == 10){
            return "J";
        }
        else if (estadosAmbosEquipos[i][jugador]["ubicacionY"] == 11){
            return "K";
        }
        else if (estadosAmbosEquipos[i][jugador]["ubicacionY"] == 12){
            return "L";
        }
        else if (estadosAmbosEquipos[i][jugador]["ubicacionY"] == 13){
            return "M";
        }
        else if (estadosAmbosEquipos[i][jugador]["ubicacionY"] == 14){
            return "N";
        }
        else if (estadosAmbosEquipos[i][jugador]["ubicacionY"] == 15){
            return "O";
        }
    }
}
const muestroPosicionesEnCancha = ()=>{
    for (let i=0; i < 2; i++){
        //El segundo bucle lo uso para recorrer listaEstadosJugadores(A/B) (elije el jugador)
        for (jugador in estadosAmbosEquipos[i]) {
            //De cada jugador tomo sus posiciones X e Y y las junto en un string compatible con los ID de los divs que representan las casillas de la cancha
            let idDivs = `${estadosAmbosEquipos[i][jugador]["ubicacionX"]}_${estadosAmbosEquipos[i][jugador]["ubicacionY"]}`;
            let posicionJugador = document.getElementById(idDivs);
            let concateno = "";
            if (queEquipoAtaca() == letraEquipo[i]) {
                concateno += `<img src="${imgHabilidadesAmbosEquiposAtacando[i]["defecto"]}" alt="${ambosEquipos[i][jugador].nombre} se encuentra en ${posicionYAletra()}${estadosAmbosEquipos[i][jugador]["ubicacionX"]}">`;
            }
            else {
                concateno += `<img src="${imgHabilidadesAmbosEquiposDefendiendo[i]["defecto"]}" alt="${ambosEquipos[i][jugador].nombre} se encuentra en ${posicionYAletra()}${estadosAmbosEquipos[i][jugador]["ubicacionX"]}">`;
            }
            if (estadosAmbosEquipos[i][jugador].conPelota == true) {
                concateno += `<img src="${imgConPelota[i]}" alt="${ambosEquipos[i][jugador].nombre} se encuentra en poseción de la pelota">`;
            }
            posicionJugador.innerHTML = concateno;
        }
    }
}

/*Se disputa el salto entre 2 para comenzar el partido*/
console.log("El árbitro se dispone en mitad de cancha a lanzar el balón hacia arriba para iniciar del encuentro. Lo lanza y..");
//Creo un bucle para resolver quién consigue más puntos considerando las estadísticas que influyen en esta acción y lo que sacan con el dado
let saltoA = 0;
let saltoB = 0;
//Si empatan vuelve a comenzar el ciclo
while (saltoA == saltoB){
    //Calculo cuántos puntos consigue cada jugador para esta acción
    saltoA = dadoDe20() + listaJugadoresA[4].altura+listaJugadoresA[4].capacidadAtletica;
    console.log(`${listaJugadoresA[4].nombre} consigue ${saltoA} puntos en el salto`);
    saltoB = dadoDe20() + listaJugadoresB[4].altura+listaJugadoresB[4].capacidadAtletica;
    console.log(`${listaJugadoresB[4].nombre} consigue ${saltoB} puntos en el salto`);
    //Comparo el desempeño de los jugadores y devuelvo lo que ocurre considerando los resultados
    let resultadoSalto = saltoA-saltoB;
    if (resultadoSalto > 0){
        console.log(`El salto lo gana el equipo A y la pelota ahora está en posesión de ${listaJugadoresA[0].nombre}`);
        listaEstadosJugadoresA[0].conPelota = true;
        listaEstadosJugadoresA[0].ultimaAccion = `${listaJugadoresA[0].nombre} recibe un pase`;
        console.log(`${listaEstadosJugadoresA[0].ultimaAccion}`);
        listaEstadosJugadoresA[4].ultimaAccion = `${listaJugadoresA[4].nombre} gana el salto`;
        console.log(`${listaEstadosJugadoresA[4].ultimaAccion}`);
    }
    else if (resultadoSalto < 0){
        console.log(`El salto lo gana el equipo B y la pelota ahora está en posesión de ${listaJugadoresB[0].nombre}`);
        listaEstadosJugadoresB[0].conPelota = true;
        listaEstadosJugadoresB[0].ultimaAccion = `${listaJugadoresB[0].nombre} recibe un pase`;
        console.log(`${listaEstadosJugadoresB[0].ultimaAccion}`);
        listaEstadosJugadoresB[4].ultimaAccion = `${listaJugadoresB[4].nombre} gana el salto`;
        console.log(`${listaEstadosJugadoresB[4].ultimaAccion}`);
    }
    else{
        console.log("Ambos jugadores alcanzan el balón al mismo tiempo, la disputa por el salto sigue!");
    }
};
/*Creo función que sirve para generar botón resaltado*/
//El parámetro tiene que tener el nombre de la acción a realizar (Es el ID del elemento HTML que se va a mostrar en pantalla)
const resaltoBotones = (nombreDelBoton)=>{
    const button = document.getElementById(nombreDelBoton);
    //Le saco el class que oculta al botón y pongo uno nuevo que lo resalta
    button.setAttribute("class", "resaltarBoton");
}

const muestroBotonObscuro = (nombreDelBoton)=>{
    const button = document.getElementById(nombreDelBoton);
    //Le saco el class que oculta al botón y pongo uno nuevo que lo opaca
    button.setAttribute("class", "botonOpaco");
}

const ocultoBoton = (nombreDelBoton)=>{
    const button = document.getElementById(nombreDelBoton);
    //Le pongo el class que oculta al botón sacando los demás class
    button.setAttribute("class", "noDisplay");
}


/*Creo función que calcule los puntos de acción que tendrán los jugadores en el próximo "instante"*/
const comienzaInstante = ()=>{
    for (listas in estadosAmbosEquipos) {
        for (let i=0; i<5; i++){
            nuevosPuntosDeAccion();
        }
    }
}

/*Creo función para determinar si algún jugador aún tiene su "turno" sin usar en este "instante"*/

const jugadoresAConTurno = [];
const jugadoresBConTurno = [];
const turnoEnAlgunEquipo = [jugadoresAConTurno, jugadoresBConTurno];
const algunoTieneTurno = () => {
    //Creo arrays que van a llenarse con los jugadores que cumplan con la condición
    //Creo búcle que se fijará si los jugadores cumplen con la condición o no
    for (let i=0; i < 5; i++) {
        if (estadosAmbosEquipos[0][i].turnoUsado == false){
            //Si se cumple la condición se guarda la información en los nuevos arrays
            jugadoresAConTurno.push(listaJugadoresA[i]);
        }
    }
    for (let i=0; i < 5; i++) {
        if (estadosAmbosEquipos[1][i].turnoUsado == false){
            //Si se cumple la condición se guarda la información en los nuevos arrays
            jugadoresBConTurno.push(listaJugadoresB[i]);
        }
    }
    //Devuelvo ambos array como otro array (que los contiene a ambos) para poder exportar ambos equipos con una única función
    //Devuelvo este {ultinmo array}
    return turnoEnAlgunEquipo;
}
/*Creo función para que los coach vean qué jugadres tienen puntos de acción*/
//El parámetro contiene la función "queEquipoDefiendeNumero" o "queEquipoAtacaNumero" según toque al coach atacante o defensor.
const muestroJugadoresConTurno = (ataqueODefensa)=> {
    for (jugador in estadosAmbosEquipos[ataqueODefensa]) {
        //De cada jugador tomo sus posiciones X e Y y las junto en un string compatible con los ID de los divs que representan las casillas de la cancha
        if (estadosAmbosEquipos[ataqueODefensa][jugador].turnoUsado == false) {
            let idDivs = `${estadosAmbosEquipos[ataqueODefensa][jugador]["ubicacionX"]}_${estadosAmbosEquipos[ataqueODefensa][jugador]["ubicacionY"]}`;
            let posicionJugador = document.getElementById(idDivs);
            //Agrego atributo que va a colorear el fondo en la casilla en la que se encuentran estos jugadores
            posicionJugador.classList.add(`fondoVerde jugador${queEquipoEs(ataqueODefensa)}${jugador}`);
        }
    }
    if (ataqueODefensa == queEquipoAtacaNumero()) {
        coachElijeJugador(queEquipoAtacaNumero());
    }
}


/*Creo función para que los coach seleccionen el jugador con el que van a realizar una acción*/
const coachElijeJugador = (ataqueODefensa)=>{
    //Con un bucle me fijo cuáles jugadores tienen turnos pendientes en este instante
    for (let i=0; i < turnoEnAlgunEquipo[ataqueODefensa].length; i++){
        //Creo una variable que contenga a los jugadores
        let jugadorElegible = document.querySelector(`.jugador${queEquipoEs(ataqueODefensa)}${Number(turnoEnAlgunEquipo[ataqueODefensa][i]["nombre"][2])-1}`);
        //Defino esta variable que va a ser de utilidad para nombrar a los jugadores
        //Creo evento que va a suceder cuando clickeemos en alguno de los divs que contienen a los jugadores
        jugadorElegible.addEventListener("click", (evt)=>{
            //Muestro el botón llamado confirmar
            resaltoBotones("confirmar")
            //Reseteo los jugadores a los que muestro por si decide seleccionar a otro que vuelva el primer seleccionado a verse como no seleccionado
            muestroJugadoresConTurno(ataqueODefensa);
            //Al jugador seleccionado lo muestro con otro color de fondo
            evt.currentTarget.classList.remove(`fondoVerde`);
            evt.currentTarget.classList.add(`fondoSeleccionado`);
            sessionStorage.setItem(ataqueODefensa, `${queEquipoEs(ataqueODefensa)}${(i+1)}`);
        });
    }
    //Una vez visualizado el botón le doy una funcionalidad
    let botonConfirmar = document.querySelector("#confirmar");
    botonConfirmar.addEventListener("click", ()=>{
        //Guardo en el sesienStorage el jugador seleccionado
        if (guardoJugadorSeleccionado[0] == guardoJugadorSeleccionado[1]){
            guardoJugadorSeleccionado.pop();
        }
        if (guardoJugadorSeleccionado.length < 2){
            guardoJugadorSeleccionado.push(sessionStorage.getItem(ataqueODefensa));
        }
        //Llamo a los divs que tienen class para colorear su fondo
        let conFondoSeleccionado = document.getElementsByClassName("fondoSeleccionado");
        let conFondoVerde = document.getElementsByClassName("fondoVerde");
        //Mientras siga habiendo divs con clases de este estilo voy a seguir borrando el primero que encuentro (Hay q matarlos a todos)
        while (conFondoVerde.length > 0) {
            conFondoVerde[0].classList.remove("fondoVerde");
        }
        while (conFondoSeleccionado.length > 0) {
            conFondoSeleccionado[0].classList.remove("fondoSeleccionado");
        }
        //Oculto nuevamente el botón
        botonConfirmar.setAttribute("class", "noDisplay");
        //Si fue turno del defensor quiero que al activar el botón que confirma vuelva a comenzar el proceso pero para el atacante
        if (ataqueODefensa == queEquipoDefiendeNumero()){
            return muestroJugadoresConTurno(queEquipoAtacaNumero())
        }
        //Si ya se hicieron ambas selecciones paso a comparar las inciativas
        else if (ataqueODefensa == queEquipoAtacaNumero()){
            return comparoIniciativasDeJugadoresElegidos();
        }
    })
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
    else {
        equipoJugador1 = 1;
    }
    if (equipoJugador2 == "A"){
        equipoJugador2 = 0;
    }
    else {
        equipoJugador2 = 1;
    }
    //Meto esas variables en un array
    let equiposJugadoresElegidos = [equipoJugador1, equipoJugador2]
    //Guardo el rol de cada jugador (1, 2, 3, 4 o 5) en variables
    let rolJugador1 = jugador1[1];
    let rolJugador2 = jugador2[1];
    //Meto esas variables en un array
    let rolJugadoresElegidos = [rolJugador1, rolJugador2]
    //Creo las variables donde se almacenarán las iniciativas
    let iniciativaJugador1 = 0;
    let iniciativaJugador2 = 0;
    //Comeinzo a calcular las iniciativas.
    //El cálculo se hace utilizando ciertas habilidades dependiendo de la posición en la que se encuentran
    let comparoIniciativas = 0;
    while (comparoIniciativas ==  0) {
        //Cálculos para jugador defensor
        //Si está cerca del aro
        if ((estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionX"] > 26) && (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionY"] > 5) && (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionY"] < 11) || (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionX"] > 24) && (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionY"] > 6) && (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionY"] < 10)){
            iniciativaJugador1 = dadoDe20()*2 + ((ambosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["altura"]-165)/0.65) + ((ambosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["peso"]-65)/0.55) + ambosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["capacidadAtletica"]*1.2 + ambosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["defensaInterna"]*2;
        }
        //Si está medianamente cerca pero no tanto
        else if ((estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionX"] > 25) && (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionY"] == 5) || (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionX"] > 23) && (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionX"] < 27) && (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionY"] == 6) || (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionX"] == 24) && (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionY"] > 6) && (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionY"] < 10) || (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionX"] > 23) && (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionX"] < 27) && (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionY"] == 10) || (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionX"] > 25) && (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionY"] == 11)){
            iniciativaJugador1 = dadoDe20()*2 + ((ambosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["altura"]-165)/0.65)*0.75 + ((ambosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["peso"]-65)/0.55)*0.75 + ambosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["capacidadAtletica"]*1.2 + ambosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["defensaInterna"]*2*0.75 + ambosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["defensaPerimetral"]*2*0.25;
        }
        //Si está en media distancia
        else if ((estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionX"] > 27) && (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionY"] == 3) || (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionX"] > 24) && (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionY"] == 4) || (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionX"] > 23) && (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionX"] < 26) && (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionY"] == 5) || (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionX"] == 23) && (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionY"] > 5) && (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionY"] < 11) || (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionX"] > 23) && (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionX"] < 26) && (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicaciony"] == 11) || (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionX"] > 24) && (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionY"] == 12) || (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionX"] == 28) && (estadosAmbosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["ubicacionY"] == 13)){
            iniciativaJugador1 = dadoDe20()*2 + ((ambosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["altura"]-165)/0.65)*0.25 + ((ambosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["peso"]-65)/0.55)*0.25 + ambosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["capacidadAtletica"]*1.2 + ambosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["defensaInterna"]*2*0.25 + ambosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["defensaPerimetral"]*2*0.75;
        }
        //Si está lejos
        else {
            iniciativaJugador1 = dadoDe20()*2 + ambosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["capacidadAtletica"]*1.2 + ambosEquipos[equiposJugadoresElegidos[0]][rolJugadoresElegidos[0]-1]["defensaPerimetral"]*2*2;
        }
    
        //Cálculos para jugador atacante
        //Si está cerca del aro
        if ((estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionX"] > 26) && (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionY"] > 5) && (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionY"] < 11) || (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionX"] > 24) && (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionY"] > 6) && (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionY"] < 10)){
            iniciativaJugador2 = dadoDe20()*2 + ((ambosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["altura"]-165)/0.65) + ((ambosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["peso"]-65)/0.55) + ambosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["capacidadAtletica"]*1.2 + ambosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["anotacionInterior"] + ambosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["creacionDeJuego"];
        }
        //Si está medianamente cerca pero no tanto
        else if ((estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionX"] > 25) && (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionY"] == 5) || (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionX"] > 23) && (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionX"] < 27) && (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionY"] == 6) || (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionX"] == 24) && (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionY"] > 6) && (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionY"] < 10) || (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionX"] > 23) && (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionX"] < 27) && (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionY"] == 10) || (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionX"] > 25) && (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionY"] == 11)){
            iniciativaJugador2 = dadoDe20()*2 + ((ambosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["altura"]-165)/0.65)*0.75 + ((ambosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["peso"]-65)/0.55)*0.75 + ambosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["capacidadAtletica"]*1.2 + ambosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["anotacionInterior"]*0.75 + ambosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["anotacionExterior"]*0.25 + ambosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["creacionDeJuego"];
        }
        //Si está en media distancia
        else if ((estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionX"] > 27) && (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionY"] == 3) || (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionX"] > 24) && (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionY"] == 4) || (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionX"] > 23) && (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionX"] < 26) && (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionY"] == 5) || (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionX"] == 23) && (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionY"] > 5) && (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionY"] < 11) || (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionX"] > 23) && (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionX"] < 26) && (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicaciony"] == 11) || (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionX"] > 24) && (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionY"] == 12) || (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionX"] == 28) && (estadosAmbosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["ubicacionY"] == 13)){
            iniciativaJugador2 = dadoDe20()*2 + ((ambosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["altura"]-165)/0.65)*0.25 + ((ambosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["peso"]-65)/0.55)*0.25 + ambosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["capacidadAtletica"]*1.2 + ambosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["anotacionInterior"]*0.25 + ambosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["anotacionExterior"]*0.75 + ambosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["creacionDeJuego"];
        }
        //Si está lejos
        else {
            iniciativaJugador2 = dadoDe20()*2 + ambosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["capacidadAtletica"]*1.2 + ambosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["anotacionExterior"]*2*2 + ambosEquipos[equiposJugadoresElegidos[1]][rolJugadoresElegidos[1]-1]["creacionDeJuego"];
        }
    
        //Comparo las iniciativas
        comparoIniciativas = iniciativaJugador1 - iniciativaJugador2;
    }
    
    if (comparoIniciativas > 0){
        console.log("Le toca al que defiende");
        //AGREGAR función para que el jugador defensor elija su acción
        muestroPosiblesAccionesDefensa(equiposJugadoresElegidos[0], (rolJugadoresElegidos[0]-1));
    }
    else {
        console.log("Le toca al que ataca");
        //AGREGAR función para que el jugador atacante elija su acción
        muestroPosiblesAccionesAtaque(equiposJugadoresElegidos[1], (rolJugadoresElegidos[1]-1));
    }
}

//WORKING /*Función para que el jugador elija la acción que va a realizar*/
//Creo función para mostrar botones de acción posibles para cada jugador (Separar las acciones defensivas de las ofensivas).
//(Los parámetros son usados para cargar los datos de los jugadores elegidos)
const muestroPosiblesAccionesDefensa = (equipo, jugador)=>{
    //Resalto jugador seleccionado

    let botonConfirmar = document.querySelector("#confirmar");
    //Comprobar puntos de acción para saber cuáles son las posibles acciones. Poner obscuras las posibilidades que no alcanzan los puntos no ponerles eventos.
    if (estadosAmbosEquipos[equipo][jugador]["puntosDeAccion"] > 1){
        resaltoBotones("moverse");


        //TERMINAR
        let botonMoverse = document.getElementById("moverse");
        botonMoverse.addEventListener("click", ()=>{
            mostrarOpcionesDeDondeMoverse(equipo, jugador);
            permitoSeleccionarOpcionesDeDondeMoverse(equipo, jugador);
        })

        //----TERMINAR----



        resaltoBotones("intentarUnRoboAlPortadorDeLaPelota");
        resaltoBotones("intentarInterceptarPase");
        resaltoBotones("esperaAtosigante");
        resaltoBotones("esperaCautelosa");
        muestroBotonObscuro("confirmar");
    }
    else if (estadosAmbosEquipos[equipo][jugador]["puntosDeAccion"] > 0.5) {
        muestroBotonObscuro("moverse");
        muestroBotonObscuro("intentarUnRoboAlPortadorDeLaPelota");
        muestroBotonObscuro("intentarInterceptarPase");
        muestroBotonObscuro("esperaAtosigante");
        resaltoBotones("esperaCautelosa");
        muestroBotonObscuro("confirmar");
    }
}
    //Para moverse
        //ATENCIÓN! CUIDADO CON BORDES DE MAPA!
        //Pintar de verde las opciones de laterales si no están ocupadas por otros jugadores
        //Si le alcanzan los puntos para ir en diagonal pintar las diagonales también si no están ocupadas por otros jugadores.
        //Crear evento para seleccionar la casilla a la que quiero desplazar a mi jugador y que destaque el botón de confirmar (resetear las casillas verdes previo a pintar como seleccionada).
        //Crear evento en el botón "confirmar" que mueva al jugador a la posición indicada y despinte las casillas verdes.



// let posiblesLugaresALosQueMoverse;
// const mostrarOpcionesDeDondeMoverse = (equipo, jugador)=>{
//     //De cada jugador tomo sus posiciones X e Y y las junto para generar strings compatibles con los ID de los divs que representarán las casillas a las que se pueden mover los jugadores
//     let arrayIdDiv = []
//     //Creo un bucle para rellenar el array
//     for (let i = -1; i<2; i++){
//         iteradorPosicionesX : for (let u = -1; i<2; i++){
//             //No quiero que sume la posición actual de ninguno de los jugadores. Para eso hago un sistema para comprobar las ubicaciones.
//             for (equipoComparado in estadosAmbosEquipos) {
//                 for (jugadorComparado in estadosAmbosEquipos[equipoComparado]) {
//                     //Si coincide la posición de cualquier jugador con la posicón que estoy escaneando voy a la próxima iteración
//                     if ((estadosAmbosEquipos[equipoComparado][jugadorComparado]["ubicacionX"] == estadosAmbosEquipos[equipo][jugador][("ubicacionX")] + i) && (estadosAmbosEquipos[equipoComparado][jugadorComparado]["ubicacionY"] == estadosAmbosEquipos[equipo][jugador][("ubicacionY")] + u)){
//                         continue iteradorPosicionesX ;
//                     }
//                     //Introduzco valor al array
//                     arrayIdDiv.push(`${estadosAmbosEquipos[equipo][jugador][("ubicacionX")] + i }_${estadosAmbosEquipos[equipo][jugador][("ubicacionY")] + u}`);
//                 }
//             }
//         }
//     }
//     //A los valores que están en el array les pongo un fondo verde
//     for (posicionArray in arrayIdDiv){
//         posiblesLugaresALosQueMoverse = document.getElementById(arrayIdDiv[posicionArray]);
//         posiblesLugaresALosQueMoverse.className += " fondoVerde";
//     }
// }

// const permitoSeleccionarOpcionesDeDondeMoverse= (equipo, jugador)=>{
//     //Agrego eventos a los nuevos espacios en verde
//     posiblesLugaresALosQueMoverse = document.querySelector(".fondoVerde");
//     posiblesLugaresALosQueMoverse.addEventListener("click", (evt)=>{
//         //Muestro el botón llamado confirmar
//         resaltoBotones("confirmar");
//         //Reseteo las casillas que están en verde por si cambia de desición y selecciona otro
//         mostrarOpcionesDeDondeMoverse(equipo, jugador);
//         //Al jugador seleccionado lo muestro con otro color de fondo
//         evt.currentTarget.classList.remove("class", `fondoVerde`);
//         evt.currentTarget.classList.add("class", `fondoSeleccionado`);
//         let casillaSeleccionada = evt.currentTarget;
//         sessionStorage.setItem("casillaAMoverse", casillaSeleccionada);
//         // let botonConfirmar = document.getElementById("confirmar");
//         // botonConfirmar.addEventListener("click", ()=>{
    
//         // })
//     });
// }

    
// const muestroPosiblesAccionesAtaque = (equipo, jugador)=>{
//     if (estadosAmbosEquipos[equipo][jugador]["puntosDeAccion"] > 0.5) {
//         if (estadosAmbosEquipos[equipo][jugador]["conPelota"] == true) {
//             resaltoBotones("pase");
//             resaltoBotones("esperarEnTripleAmenaza");
//         }
//     }
//     if (estadosAmbosEquipos[equipo][jugador]["puntosDeAccion"] > 1){
//         if (estadosAmbosEquipos[equipo][jugador]["conPelota"] == true){
//             resaltoBotones("dribbling");
//             resaltoBotones("tiro");
//         }
//         else {
//             resaltoBotones("moverse");
//             resaltoBotones("esperarSinBalon");
//         }
//     }
// }



const guardoJugadorSeleccionado = [];
//Continúa el partido luego del salto lo pongo en búcle puesto que la dinámica del juego es cíclica
while (finDePartido == false) {
    muestroPosicionesEnCancha();
    comienzaInstante();
    
    //AGREGAR Hasta que acabe este medie tiempo bucle de:
    while(finDePeriodo == false){
        //Eleccion de jugadores que realizan accion este turno (Esto ya dispara una serie de funciones automáticamente)
        algunoTieneTurno();
        muestroJugadoresConTurno(queEquipoDefiendeNumero());
        coachElijeJugador(queEquipoDefiendeNumero());
        //AGREGAR función que elije la acción a realizar por parte de cada jugador elegido



        //AGREGAR función que realiza acción y sus consecuencias (Si es una acción de implementación inmediata o supeditada y ya se puede calcular)
        //AGREGAR bucle para repetir lo anterior hasta que no haya más turnos en este instante

        //AGREGAR función que calcula consecuencias de acciones de implementación tardía
        //AGREGAR función que cuenta cuánto tiempo de juego transcurrió
        
        finDePeriodo = true;//Cuando tenga terminada la estructura poner un if de si el tiempo llega a 0 cambiar esto a true
    }
    finDePartido = true;//Cuando tenga terminada la estructura poner un if de si el tiempo llega a 0 cambiar esto a true
}
