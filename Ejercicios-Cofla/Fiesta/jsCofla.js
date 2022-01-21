
let entradaGratuita = false;

function autorizo (hora){
    let edad = prompt("Por favor, intoduzca su edad con números");
    if (isNaN(edad)==true) {
        alert ("Datos mal cargargados");
    } 
    else if (edad >= 18) {
        if (hora >=2 && hora <7 && entradaGratuita==false) {
            alert("Puede pasar y la entrada es gratuita porque es la primer persona pasadas las 2am")
            entradaGratuita = true;
        } else if (hora <7) {
            alert("Puede pasar, pero debe pagar la entrada")    
        } else {
            alert("La fiesta ya terminó")
        }
    } else {
        alert("Para ingresar debe tener mayoría de edad, lo siento.");
    }  
}

autorizo(1);
autorizo(1);
autorizo(2);
autorizo(2);
autorizo(3);
autorizo(3);
autorizo(8);