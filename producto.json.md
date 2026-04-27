# Explicacion de `producto.json`

El archivo `producto.json` guarda un unico objeto con la informacion del producto que se muestra en la pagina.

## Estructura general

El contenido del archivo es un objeto JSON formado por pares `clave: valor`.

```json
{
  "nombre": "Auriculares Bluetooth",
  "marca": "SoundWave"
}
```

## Significado de cada propiedad

- `nombre`: nombre principal del producto.
- `marca`: empresa o fabricante.
- `precio`: precio numerico del producto.
- `color`: color del producto.
- `autonomia`: tiempo aproximado de uso o duracion de bateria.
- `cancelacionRuido`: valor booleano. `true` significa que si tiene esa caracteristica.
- `conectividad`: array con los tipos de conexion disponibles.

## Por que no se comenta dentro del propio JSON

JSON no admite comentarios como `// comentario` o `/* comentario */`.
Si se añadieran, `fetch(...).then(response => response.json())` fallaria al intentar leer el archivo.

Por eso la documentacion del JSON se deja en este archivo aparte, mientras que `producto.json` se mantiene limpio y valido para que JavaScript pueda cargarlo sin errores.
