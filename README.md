# Juego de tablero - Caza del tesoro

Este proyecto contiene un juego de tablero hecho con HTML, CSS y JavaScript.

# Instrucciones para ejecutar el proyecto

Para ejecutar el proyecto solo hay que abrir la pagina index.html en un navegador.

# Instrucciones de uso

Inicialmente el juego pide un nombre de usuario que habra que introducir en el campo de texto. Una vez elegido el nombre hay que pulsar el boton 'Introducir nombre' que aparece a su derecha. El nombre debe tener al menos 4 caracteres y no contener numeros.

Una vez introducido un nombre valido aparecera un mensaje de bienvenida y se activara el boton 'Jugar' para iniciar la partida.

# Instrucciones de juego

El heroe aparece en la esquina superior izquierda. El objetivo del juego es llevar al heroe hasta el tesoro, que aparece en la esquina opuesta del tablero.

Para ello el usuario puede pulsar el boton con el dado que aparece bajo el tablero. Al pulsarlo se tira un dado de 6 caras que indica el numero de pasos que puede realizar el heroe en ese turno. Las casillas que se pueden alcanzar en ese numero de movimientos se resaltan con un borde rojo. El usuario puede hacer click sobre alguna de estas casillas para mover al heroe a esa posicion.

El juego termina cuando el heroe alcanza la casilla con el tesoro. En ese momento se comprobara la puntuacion del jugador (numero de pasos para alcanzar la meta) contra el record de pasos hasta entonces. Si se supera el record (es decir, si el numero de pasos para llegar a la meta ha sido menor que el record) se actualiza el record y se muestra un mensaje.
