//Tomamos un elemento HTML para mostrar la temperatura, en este caso un h2
let titulo = document.querySelector('#tituloTemp')

setInterval(() => {
    //Colocamos la URL de la API a consumir, en este caso ultima temperatura
    fetch('https://huerta-api.onrender.com/ultimaTemperatura')
        .then(response => response.text())
        .then(data => {
            // Actualizar el contenido de temp con la última temperatura de la base de datos
            titulo.textContent = data + '°';
        })
        .catch(error => console.error('Error al obtener la última temperatura:', error));

    fetch('https://huerta-api.onrender.com/api/ultimaMedicion')
        .then(response => response.json())
        .then(data => {
            // Actualizar el contenido de temp con la última temperatura de la base de datos
            console.log(data[0].fecha + ': temperatura= '+data[0].temperatura + '° humedad= ' + data[0].humedad + '%')
        })
        .catch(error => console.error('Error al obtener la última temperatura:', error));
}, 1000);

