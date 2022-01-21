//En este ejercicio creo una herramienta para ayudar a los estadistas de un equipo de básquet. Lo que hago es crear un bucle para que el usuario cargue el tipo de tiro y si lo encesta y le devuelva algunas estadísticas de lanzamiento.
//Declaro variables
let tirosLibresIntentados = 0;
let doblesIntentados = 0;
let triplesIntentados = 0;
let tirosLibresEncestados = 0;
let doblesEncestados = 0;
let triplesEncestados = 0;
let finDePartido = false;
let datoCargado;

//Declaro función para mostrar encestados/total de tiros
const muestroTipoDeTiroBruto = (tipoDeTiro)=>{
    if (tipoDeTiro == "TL"){
        return `${tirosLibresEncestados}/${tirosLibresIntentados} TL`;
    }
    else if (tipoDeTiro == "3ple"){
        return `${triplesEncestados}/${triplesIntentados} 3ple`;
    }
    else if (tipoDeTiro == "TC") {
        return `${triplesEncestados + doblesEncestados}/${triplesIntentados + doblesIntentados} TC`;
    }    
}
const puntosTotales = ()=>{return (tirosLibresEncestados + doblesEncestados * 2 + triplesEncestados * 3);}

//Creo bucle para pedir que carguen datos y se "guarden".
while (finDePartido != true){
    //Pido el dato
    alert(`Para cargar un dato utilice: ºTiro libre (L). ºDoble (D). ºTriple (T). Luego del tipo de tiro "Y" para encestado y "N" para errado. Por ejémplo para un Tiro libre errado sería: LN. Para chekear las estadísticas use "S". Cuando termine el partido use "END"`);
    datoCargado = prompt("Cargue dato").toUpperCase();
    
    //Devuelvo si se cargó mal el dato
    if ((datoCargado != "LN") && (datoCargado != "LY") && (datoCargado != "DN") && (datoCargado != "DY") && (datoCargado != "TN") && (datoCargado != "TY") && (datoCargado != "S") && (datoCargado != "END")) {  
        alert("Dato mal cargado");
    }
    //Cuento cantidad de lanzamientos por tipo de tiro
    if ((datoCargado == "LN") || (datoCargado == "LY")) {
        tirosLibresIntentados++;
    }
    else if ((datoCargado == "DN") || (datoCargado == "DY")) {
        doblesIntentados++;
    }
    else if ((datoCargado == "TN") || (datoCargado == "TY")) {
        triplesIntentados++;
    }
    //Cuento cantidad de lanzamientos encestados por tipo de tiro
    if (datoCargado == "LY") {
        tirosLibresEncestados++;
    }
    else if (datoCargado == "DY") {
        doblesEncestados++;
    }
    else if (datoCargado == "TY") {
        triplesEncestados++;
    }
    
    //Doy un feedback de las estadísticas básicas hasta el momento (En las estadísticas de básquet los tiros de 3 se suman a los tiros de 2 en una estadística llamada Tiro de Campo. Los dobles no se muestran.);
    if (datoCargado == "S"){
        alert("De momento las estadisticas del equipo son las siguientes: " + muestroTipoDeTiroBruto("TL") + ", " + muestroTipoDeTiroBruto("3ple") + ", " + muestroTipoDeTiroBruto("TC") + " y en total suman " + puntosTotales() + " puntos.");
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

/*Declaro funcion para calcular porcentajes de tiro y de proporción de puntos por tipo de tiro con relación al total (Sumo ese número con muchos 0 para que no me quede
 una división por 0 que matemáticamente no se puede calcular. Sé que lo puedo salvar con el uso de if pero es un márgen de error muy pequeño y más que tolerable para este
 tipo de datos a mi criterio por lo que elijo ahorrar código.);
*/
const porcentajeTiro = (tipoDeTiro)=>{
    if (tipoDeTiro == "3ple") {
        return (((triplesEncestados + doblesEncestados)/(triplesIntentados + doblesIntentados+0.00000000000000000000000000000000000000000000001))*100);
    }
    else if (tipoDeTiro == "TC"){
        return ((triplesEncestados/(triplesIntentados+0.00000000000000000000000000000000000000000000001))*100);
    }
    else if (tipoDeTiro == "TL"){
        return ((tirosLibresEncestados/(tirosLibresIntentados+0.00000000000000000000000000000000000000000000001))*100);
    }
}
const puntosPorTipoDeTiro = (tipoDeTiro)=>{
    if (tipoDeTiro == "2pts") {
        return (doblesEncestados * 2);
    }
    else if (tipoDeTiro == "3ple") {
        return (triplesEncestados * 3);
    }
    else if (tipoDeTiro == "TL") {
        return (tirosLibresEncestados);
    }
}
//Devuelvo las estadísticas finales relacionadas al tiro.
alert(`Total ` + puntosTotales() + ` puntos.

Efectividad por tipo de tiro:
    ` + muestroTipoDeTiroBruto("TC") + " (%" + porcentajeTiro("TC") + `),
    ` + muestroTipoDeTiroBruto("3ple") + " (%" + porcentajeTiro("3ple") + `),
    ` + muestroTipoDeTiroBruto("TL") + " (%" + porcentajeTiro("TL") + `).
    Cantidad de puntos por tipo de tiro:
    ` + `Dobles: ` + puntosPorTipoDeTiro("2pts") + `pts (%` + (puntosPorTipoDeTiro("2pts")/(puntosTotales()+0.00000000000000000000000000000000000000000000001))*100 + `).
    ` + `Triples: ` + puntosPorTipoDeTiro("3ple") + `pts (%` + (puntosPorTipoDeTiro("3ple")/(puntosTotales()+0.00000000000000000000000000000000000000000000001))*100 + `).
    ` + `Tiros libres: ` + puntosPorTipoDeTiro("TL") + `pts (%` + (puntosPorTipoDeTiro("TL")/(puntosTotales()+0.00000000000000000000000000000000000000000000001))*100 + `).`);