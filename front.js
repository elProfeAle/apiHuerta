/*let temp = document.querySelector('.temp')
setInterval(() => {
    fetch('http://localhost:3000/temperatura')
        .then(response => response.text())  // Convertir la respuesta a texto
        .then(data => {

            // Actualizar el contenido del <h1> con la temperatura recibida
            temp.textContent = data;
        })
        .catch(error => console.error('Error al obtener la temperatura:', error));

}, 1000)
*/
let temp = document.querySelector('.temp');
let titulo = document.querySelector('#tituloTemp')
let numero = document.querySelector('#numeroTemp')
setInterval(() => {
    fetch('http://localhost:3000/ultimaTemperatura')
        .then(response => response.text())
        .then(data => {
            // Actualizar el contenido de temp con la última temperatura de la base de datos
            //temp.textContent = data + '°';

            if(data > 24) 
            {
                titulo.textContent = 'Necesita agua'
                numero.textContent = data
            }else{
                titulo.textContent = 'No necesita agua'
                numero.textContent = data
            }
        })
        .catch(error => console.error('Error al obtener la última temperatura:', error));
}, 15000);
