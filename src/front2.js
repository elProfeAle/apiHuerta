//Definición de variables
let titulo = document.querySelector('#tituloTemp')
let boton = document.querySelector('button')
let tituloEjemplo = document.querySelector('#tituloEjemplo')
let datosAMostrar = document.querySelector('#datos')
let info = document.querySelector('#info')


//Cambio de temperatura cada 10 segundos
setInterval(() => {
    //Colocamos la URL de la API a consumir, en este caso ultima temperatura
    fetch('https://huerta-api.onrender.com/api/ultimaTemperatura')
        .then(response => response.text())
        .then(data => {
            // Actualizar el contenido de temp con la última temperatura de la base de datos
            titulo.textContent = data + '°';
            if(data>30){
                
            }
        })
        .catch(error => console.error('Error al obtener la última temperatura:', error));

}, 10000);


//Mostrar ejemplos
function showExample(number) {
    document.querySelectorAll('.code-container').forEach(container => {
        container.classList.remove('active');
    });
    document.getElementById(`example${number}`).classList.add('active');
    
    //Mostramos diferente info dependiendo del boton a utilizar 
    if (number == 2) {
        tituloEjemplo.textContent = '¿Cómo mostrar la temperatura y humedad?'
        info.innerHTML = 'Utilizando este enlace <a target="_blank" href="https://huerta-api.onrender.com/api/ultimaMedicion">https://huerta-api.onrender.com/api/ultimaMedicion</a>, podemos obtener los últimos datos sensados (fecha, temperatura y humedad).'
        fetch('https://huerta-api.onrender.com/api/ultimaMedicion')
            .then(response => response.json())
            .then(data => {
                //Convertimos la fecha en formato fecha para JS
                let fecha = new Date(data[0].fecha)
                //El metodo .toLocaleDateString() sirve para mostrar solo el dia, mes y año
                datosAMostrar.textContent = fecha.toLocaleDateString() + ': temperatura= ' + data[0].temperatura + '° humedad= ' + data[0].humedad + '%'
            })
            .catch(error => console.error('Error al obtener la última medición:', error));
    } else if (number == 3) {
        tituloEjemplo.textContent = '¿Cómo mostrar un promedio de temperaturas por dia?'
        info.innerHTML = 'En este enlace <a target="_blank" href="https://huerta-api.onrender.com/api/promedioSemanal">https://huerta-api.onrender.com/api/promedioSemanal</a>, podemos obtener un promedio de los datos de temperatura, por día.'
        fetch('https://huerta-api.onrender.com/api/promedioSemanal')
            .then(response => response.json())
            //Recibimos la respuesta de la API de tipo jSON y la guardamos en data
            .then(data => {
                //Creamos una variable para mostrar correctamente la fecha
                let fecha
                /*
                    Utilizamos foreach para recorrer la variable data, ahora utilizaremos
                    item para acceder a las diferentes partes del mismo. 
                    Ej: para la fecha seria item.fecha
                */
                datosAMostrar.textContent = ''
                data.forEach(item => {
                    fecha = new Date(item.fecha)
                    //El metodo .toLocaleDateString() sirve para mostrar solo el dia, mes y año   
                    datosAMostrar.innerHTML = datosAMostrar.innerHTML + fecha.toLocaleDateString() + ': temperatura= ' + item.promedio_temperatura.toFixed(1) + 'º' + '<br>'
                });
            })
            .catch(error => console.error('Error al mostrar el promedio semanal: ', error));
    } else {
        tituloEjemplo.textContent = '¿Cómo mostrar la temperatura?'
        info.innerHTML = 'Con este enlace:  <a target="_blank" href="https://huerta-api.onrender.com/api/ultimaTemperatura">https://huerta-api.onrender.com/api/ultimaTemperatura</a>, podemos obtener la última temperatura registrada 🌡️.'

        //fetch nos permite tomar datos de una api, en este caso huerta-api
        fetch('https://huerta-api.onrender.com/api/ultimaTemperatura')
            //El valor solicitado en este caso es un texto
            .then(response => response.text())
            //y lo almacenamos en data
            .then(data => {
                // Actualizar el contenido de temp con la última temperatura de la base de datos
                datosAMostrar.textContent = data + '°';
            })
            .catch(error => console.error('Error al obtener la última temperatura:', error));
    }
    
    Prism.highlightAll(); // Resalta el código al cambiar de pestaña
}

/*
function runCode(code) {
    try {
        eval(code);
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
}
    
*/
