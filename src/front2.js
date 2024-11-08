//Tomamos un elemento HTML para mostrar la temperatura, en este caso un h2
let titulo = document.querySelector('#tituloTemp')

setInterval(() => {
    //Colocamos la URL de la API a consumir, en este caso ultima temperatura
    fetch('https://huerta-api.onrender.com//ultimaTemperatura')
        .then(response => response.text())
        .then(data => {
            // Actualizar el contenido de temp con la última temperatura de la base de datos
            titulo.textContent = data + '°';
        })
        .catch(error => console.error('Error al obtener la última temperatura:', error));
}, 1000);
