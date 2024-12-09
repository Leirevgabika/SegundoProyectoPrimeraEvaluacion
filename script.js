// funcion que valida el nombre del usuario
// si el nombre que se pasa como parametro no es valido devuelve false
// si es correcto devuelve true
function validarNombre(nombre) {
    //expresion regular para buscar un numero en un string
    let regex_nums = /\d/;

    // comprobar la longitud minima del nombre
    if(nombre.length < 4) {
        alert("El nombre debe contener 4 letras o mas");
        return false;
    }
    // comprobar que haya numeros en el nombre
    if(regex_nums.test(nombre)) {
        alert("Numeros no permitidos");
        return false;
    }
    // si no se detecta ningun problema devuelve false
    return true;
}

// funcion que valida el nombre y activa los botones de juego
function iniciarJuego() {
    // leer el nombre del formulario y validarlo
    let nombre = document.getElementById("nombre").value;
    let nombreValido = validarNombre(nombre);

    // si el nombre es valido se activan el boton de juego
    if(nombreValido == true) {
        // mostrar mensaje de lucha
        let label = document.getElementById("labelAJugar");
        label.textContent = `A luchar heroe: ${nombre}`;
        // activar el boton de juego
        let boton = document.getElementById("botonJugar");
        boton.disabled = false;
        // guardar el nombre de usuario en localStorage
        localStorage.setItem("nombre", nombre);
    }
}

// inicia el juego de caza del tesoro
function iniciarPartida() {
    // esconde la seccion de introduccion de datos iniciales
    let datos = document.getElementById("datosUsuario");
    datos.style.display = "none";
    // muestra la seccion del tablero de juego
    let juego = document.getElementById("areaJuego");
    juego.style.display = "block";

    // crear la tabla del mapa
    mapa.generarTablero();
    // dibujar el tesoro en su posicion
    meta.dibujar();
    // dibujar el jugador en su posicion inicial
    jugador.dibujar();
    // guardar el record inicial
    localStorage.setItem("recordTiradas", Infinity);
}

// el objeto mapa
let mapa = {
    // dimensiones del mapa
    num_filas: 10,
    num_columnas: 10,
    // imagen que representa el suelo
    img_suelo: "img/suelo.jpg",
    img_suelo_rojo: "img/suelo_rojo.jpg",
    // funcion que crea una tabla de num_filas x num_columnas
    generarTablero: function () {
        // acceder al nodo tabla
        let tabla = document.getElementById("mapa");

        // recorrer la cantidad de filas
        for(let i = 0; i < this.num_filas; i++) {

            // crear un nodo tr
            let fila = document.createElement("tr");

            // recorrer la cantidad de columnas
            for(let j = 0; j < this.num_columnas; j++) {
                // crear un nodo td
                let columna = document.createElement("td");
                // agregar el nodo td a la fila
                fila.appendChild(columna);

                let imagen = document.createElement("img");
                imagen.src = this.img_suelo;
                columna.appendChild(imagen);
            }
            // agregar la fila a la tabla
            tabla.appendChild(fila);
        }
    }
};

// el objeto jugador
let jugador = {
    // coordenadas x, y
    x: 0,
    y: 0,
    // numero de tiradas que ha hecho el jugador
    numeroTiradas: 0,
    // imagen del jugador
    imagen: "img/heroe.jpg",
    // metodo dibujar
    dibujar: function() {
        // poner la imagen del jugador en las coordenadas del jugador
        ponerImagen(this.x, this.y, this.imagen);

    }
};

// el objeto meta
let meta = {
    // coordenadas x, y
    x: 9,
    y: 9,
    // imagen
    imagen: "img/tesoro.jpg",
    // metodo dibujar
    dibujar: function() {
        ponerImagen(this.x, this.y, this.imagen);
    }
}

// quita una imagen de la tabla de una casilla
function borrarImagen(fila, columna) {
    let tabla = document.getElementById("mapa");
    let casilla = tabla.rows[columna].cells[fila];
    // borrar el primer hijo de la casilla seleccionada
    casilla.firstElementChild.src = mapa.img_suelo;
}

// pone una imagen en la tabla en una casilla
function ponerImagen(fila, columna, imagen) {
    // acceder al nodo tabla
    let tabla = document.getElementById("mapa");
    // acceder a la casilla indicada por los parametros
    let casilla = tabla.rows[columna].cells[fila];
    // establecer la imagen al nodo img de la casilla
    casilla.firstElementChild.src = imagen;
}

function marcarCasillas(dado) {
    let x = jugador.x;
    let y = jugador.y;

    // comprobar si se ha de resaltar la casilla a la derecha
    if(x + dado < mapa.num_columnas) {
        
        resaltar(x + dado, y); 
    }
    // comprobar si se ha de resaltar la casilla a la izquierda
    if(x - dado >= 0) {
        resaltar(x - dado, y); 
    }
    // comprobar si se ha de resaltar la casilla hacia arriba
    if(y + dado < mapa.num_filas) {
        resaltar(x, y + dado); 
    }
    // comprobar si se ha de resaltar la casilla hacia arriba
    if(y - dado >= 0) {
        resaltar(x, y - dado); 
    }
}

// elimina el resalte del movimiento del tablero
function borrarResalte() {
    // acceder al nodo tabla
    let tabla = document.getElementById("mapa");
    // recorrer filas y columnas de la tabla
    for(let i = 0; i < mapa.num_filas; i++) {
        for(let j = 0; j < mapa.num_columnas; j++) {
            // acceder a la casilla indicada por los parametros
            let casilla = tabla.rows[i].cells[j];
            // cambiar el color de fondo
            casilla.style.background = "white";
            // cambiar la imagen de la casilla por la del suelo normal
            casilla.firstElementChild.src = mapa.img_suelo;
            // quitar el event listener moverHeroe de todas las casillas
            casilla.removeEventListener("click", moverHeroe);
        }
    }
    // redibujar el jugador y la meta
    jugador.dibujar();
    meta.dibujar();
}


function tirarDado() {
    // calcular el valor aleatorio del dado del 1 al 6
    let tirada = Math.round(Math.random() * 5 + 1);
    // mostrar el valor de la tirada en el boton del dado
    let dado = document.getElementById("valorDado");
    dado.textContent = `${tirada}`;
    // incrementar el numero de tiradas
    jugador.numeroTiradas++;
    // mostrar la informacion de la partida en el marcador
    let marcador = document.getElementById("marcador");
    marcador.textContent = `Numero de tiradas: ${jugador.numeroTiradas}`;
    // eliminar el resalte previo
    borrarResalte();
    // poner el resalte correspondiente a la tirada actual
    marcarCasillas(tirada);
}

// resaltar una casilla concreta
function resaltar(fila, columna) {
    // acceder al nodo tabla
    let tabla = document.getElementById("mapa");
    // acceder a la casilla indicada por los parametros
    let casilla = tabla.rows[columna].cells[fila];
    // cambiar el color de fondo
    casilla.style.background = "red";
    // evitar cambiar la imagen del tesoro cuando se resalta la casilla meta
    if(!(fila == meta.y && columna == meta.x)) {
        // poner la imagen con suelo rojo en la casilla
        casilla.firstElementChild.src = mapa.img_suelo_rojo;
    }
    // agregar el event listener de movimiento a la casilla resaltada
    casilla.addEventListener("click", moverHeroe);
}

// mover al heroe a la casilla indicada en el evento
function moverHeroe(ev) {
    // borrar el resalte previo
    borrarResalte();
    // borrar la imagen del jugador de la tabla
    borrarImagen(jugador.x, jugador.y);
    // cambiar las coordenadas del jugador a las coordenadas de la casilla
    jugador.x = this.cellIndex;
    jugador.y = this.parentNode.rowIndex;
    
    // dibujar el jugador en la nueva posicion
    jugador.dibujar();

    // comprobar si el jugador ha alcanzado la meta
    if(jugador.x == meta.x && jugador.y == meta.y) {
        // acceder al nodo marcador de la mision
        let mision = document.getElementById("mision");
        // cambiar el texto de la mision al mensaje de victoria
        alert(`Has conseguido el tesoro en ${jugador.numeroTiradas} tiradas! Enhorabuena!`);

        // leer el record de tiradas de localStorage
        let record = localStorage.getItem("recordTiradas");
        // si se ha superado el record
        if(jugador.numeroTiradas < record) {
            alert("Has batido el record!");
            // se actualiza el valor del record con la partida actual
            localStorage.setItem("recordTiradas", jugador.numeroTiradas);
        } else {
            alert(`Record no superado, el actual record es ${record}`);
        }
    }
}

// ejecutar al cargar la pagina
window.onload = function() {
    // asociar la funcion iniciarPartida al botonJugar
    let botonJugar = document.getElementById("botonJugar");
    botonJugar.addEventListener("click", iniciarPartida );
    // inicialmente el boton esta desactivado
    botonJugar.disabled = true;
    // asociar la funcion tirarDado al botonDado
    let botonDado = document.getElementById("dado");
    botonDado.addEventListener("click", tirarDado);

}
