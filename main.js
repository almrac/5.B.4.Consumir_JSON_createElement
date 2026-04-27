// Referencias a los elementos HTML que vamos a modificar con JavaScript.
const nombreProducto = document.getElementById("nombre-producto");
const listaPropiedades = document.getElementById("lista-propiedades");
const mensaje = document.getElementById("mensaje");

// Convierte nombres de propiedades como "cancelacionRuido" en "Cancelacion Ruido".
function formatearClave(clave) {
  return clave
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (letra) => letra.toUpperCase());
}

// Adapta el valor para mostrarlo de forma más clara en pantalla.
function formatearValor(valor) {
  // Si la propiedad es un array, unimos sus valores en un solo texto.
  if (Array.isArray(valor)) {
    return valor.join(", ");
  }

  // Si la propiedad es booleana, la mostramos como Sí o No.
  if (typeof valor === "boolean") {
    return valor ? "Sí" : "No";
  }

  // En el resto de casos devolvemos el valor tal cual.
  return valor;
}

// Crea un elemento <li> con el texto "Propiedad: valor".
function crearElementoLista(clave, valor) {
  const item = document.createElement("li");
  const valorTexto = formatearValor(valor);

  item.textContent = `${formatearClave(clave)}: ${valorTexto}`;
  return item;
}

/*
  Esta función:
  1. Solicita el archivo producto.json con fetch().
  2. Comprueba si la respuesta del servidor es correcta.
  3. Convierte la respuesta a objeto JavaScript con response.json().
  4. Recorre las propiedades del objeto.
  5. Crea un <li> por cada propiedad usando createElement().
*/
function cargarProducto() {
  fetch("./producto.json")
    .then(function(response) {
      // Si el archivo no se pudo leer, lanzamos un error manualmente.
      if (!response.ok) {
        throw new Error("No se pudo cargar el archivo JSON.");
      }

      // Convertimos la respuesta a JSON.
      return response.json();
    })
    .then(function(data) {
      // Mostramos el nombre del producto en el encabezado de la tarjeta.
      nombreProducto.textContent = data.nombre;

      // Limpiamos la lista por si la función se ejecuta más de una vez.
      listaPropiedades.innerHTML = "";

      // Quitamos la clase de error si la hubiera de un intento anterior.
      mensaje.classList.remove("error");

      // Recorremos el objeto JSON propiedad a propiedad.
      Object.entries(data).forEach(function(entrada) {
        // Cada "entrada" es un array de 2 posiciones: [clave, valor].
        // Ejemplo: ["marca", "SoundWave"].

        // La posición 0 del array guarda el nombre de la propiedad.
        const clave = entrada[0];

        // La posición 1 del array guarda el valor de esa propiedad.
        const valor = entrada[1];

        // Creamos un nuevo <li> para esa propiedad.
        const item = crearElementoLista(clave, valor);

        // Añadimos el <li> dentro de la lista ordenada del HTML.
        listaPropiedades.appendChild(item);
      });

      // Informamos al usuario de que todo ha ido bien.
      mensaje.textContent = "Producto cargado correctamente.";
    })
    .catch(function(error) {
      // Si ocurre un error, actualizamos la interfaz con un mensaje visible.
      nombreProducto.textContent = "Error al cargar el producto";
      mensaje.textContent = error.message;
      mensaje.classList.add("error");

      // También lo mostramos en consola para facilitar la depuración.
      console.error("Se produjo un error al cargar el archivo JSON:", error);
    });
}

// Llamamos a la función al cargar la página para iniciar el proceso automáticamente.
cargarProducto();
