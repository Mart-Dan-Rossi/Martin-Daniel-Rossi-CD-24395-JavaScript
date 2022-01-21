//En este ejercicio creo una herramienta para ayudar a los estadistas de un equipo de básquet. Lo que hago es crear un bucle para que el usuario cargue el tipo de tiro y si lo encesta y le devuelva algunas estadísticas de lanzamiento.
//Declaro variables
let tirosLibresIntentados = 0;
let doblesIntentados = 0;
let triplesIntentados = 0;
let tirosLibresEncestados = 0;
let doblesEncestados = 0;
let triplesEncestados = 0;
let finDePartido = false;

//Creo bucle para pedir que carguen datos y se "guarden".
while (finDePartido != true){
    //Pido el dato
    alert(`Para cargar un dato utilice: ºTiro libre (L). ºDoble (D). ºTriple (T). Luego del tipo de tiro "Y" para encestado y "N" para errado. Por ejémplo para un Tiro libre errado sería: LN. Para chekear las estadísticas use "S". Cuando termine el partido use "END"`);
    let datoCargado = prompt("Cargue dato").toUpperCase();

    //"Guardo" el dato
    if ((datoCargado != "LN") && (datoCargado != "LY") && (datoCargado != "DN") && (datoCargado != "DY") && (datoCargado != "TN") && (datoCargado != "TY") && (datoCargado != "S") && (datoCargado != "END")) {
        alert("Dato mal cargado");
        continue
    }
    else if (datoCargado == "LN") {
        tirosLibresIntentados ++;
    }
    else if (datoCargado == "LY") {
        tirosLibresIntentados ++;
        tirosLibresEncestados ++;
    }
    else if (datoCargado == "DN") {
        doblesIntentados ++;
    }
    else if (datoCargado == "DY") {
        doblesIntentados ++;
        doblesEncestados ++;
    }
    else if (datoCargado == "TN") {
        triplesIntentados ++;
    }
    else if (datoCargado == "TY") {
        triplesIntentados ++;
        triplesEncestados ++;
    }
    //Doy un feedback de las estadísticas básicas hasta el momento (En las estadísticas de básquet los tiros de 3 se suman a los tiros de 2 en una estadística llamada Tiro de Campo. Los dobles no se muestran.);
    else if (datoCargado == "S"){
        alert(`De momento las estadisticas del equipo son las siguientes: ${tirosLibresEncestados}/${tirosLibresIntentados} TL, ${triplesEncestados}/${triplesIntentados} 3ple, ${triplesEncestados + doblesEncestados}/${triplesIntentados + doblesIntentados} TC y en total suman ${tirosLibresEncestados + doblesEncestados * 2 + triplesEncestados * 3} puntos`);
    }
    //Respuesta a "END"
    else if (datoCargado == "END"){
        let checkeo = prompt('Por favor, confirme que el partido haya terminado. Si el partido terminó ponga "Y". Si el partido continúa ponga "N"').toUpperCase();
        if ((checkeo != "Y") && (checkeo != "N")){
            alert("Dato mal cargado");
        }
        else if (checkeo == "Y"){
            finDePartido = true;
        }
        else {
            alert('Por favor, no se humille frente a sus compañeros poniendo "end" si el partido no terminó.'/*Chistesito jaja*/);
        }
    }
}
/*Devuelvo las estadísticas finales relacionadas al tiro.(Sumo ese número con muchos 0 para que no me quede una división por 0 que matemáticamente no se puede calcular.
Sé que lo puedo salvar con el uso de if pero es un márgen de error muy pequeño y más que tolerable para este tipo de datos a mi criterio por lo que elijo ahorrar código.);
*/alert(
    `Total ${tirosLibresEncestados + doblesEncestados * 2 + triplesEncestados * 3} pts.

Efectividad por tipo de tiro:
    ${triplesEncestados + doblesEncestados}/${triplesIntentados + doblesIntentados} TC (%${((triplesEncestados + doblesEncestados)/(triplesIntentados + doblesIntentados+0.00000000000000000000000000000000000000000000001))*100}),
    ${triplesEncestados}/${triplesIntentados} 3ples (%${(triplesEncestados/(triplesIntentados+0.00000000000000000000000000000000000000000000001))*100}),
    ${tirosLibresEncestados}/${tirosLibresIntentados} TL (%${tirosLibresEncestados/(tirosLibresIntentados+0.00000000000000000000000000000000000000000000001)}).
    
Cantidad de puntos por tipo de tiro:
    ${doblesEncestados * 2} dobles (%${(doblesEncestados * 2/((tirosLibresEncestados + doblesEncestados * 2 + triplesEncestados * 3)+0.00000000000000000000000000000000000000000000001))*100}).
    ${triplesEncestados * 3} triples (%${(triplesEncestados * 3/((tirosLibresEncestados + doblesEncestados * 2 + triplesEncestados * 3)+0.00000000000000000000000000000000000000000000001))*100}).
    ${tirosLibresEncestados} tiros libres (%${(tirosLibresEncestados/((tirosLibresEncestados + doblesEncestados * 2 + triplesEncestados * 3)+0.00000000000000000000000000000000000000000000001))*100}).`)