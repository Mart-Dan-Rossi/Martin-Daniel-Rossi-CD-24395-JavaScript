//Pido cantidad de alumnos
let cantidad = prompt("Ingrese con número cuántos alumnos son");
let todosLosAlumnos = [];

//Creo un array con los nombres de los alumnos que son pedidos
for (i = 0; i < cantidad; i++) {
    todosLosAlumnos[i] = [prompt("Nombre del alumno" + (i+1)),0];
}

//Defno la función
const tomarAsistencia = (nombre,p)=>{
    let presencia = prompt(nombre);
    if (presencia == "p" || presencia == "P") {
        todosLosAlumnos[p][1]++;
    }
}

//Uso la función para que carguen las asistencias y ausencias
for (i = 0; i < 30; i++) {
    for (alumno in todosLosAlumnos) {
        tomarAsistencia(todosLosAlumnos[alumno][0],alumno)
    }
}

for (alumno in todosLosAlumnos) {
    let resultado = `${todosLosAlumnos[alumno][0]}:<br>
    _____________Presentes: ${todosLosAlumnos[alumno][1]} <br>
    _____________Ausentes: ${30 - todosLosAlumnos[alumno][1]}
    `;
    if (30 - todosLosAlumnos[alumno][1] > 18) {
        resultado+= "Reprobado por inasistencias <br>";
    } else {
        resultado+= "<br>"
    }
    document.write(resultado)
}