// Copiar al portapapeles

let boton = document.querySelector('.copiado')
let icon = document.querySelector('#cambiar')
let code = document.querySelector('pre');
boton.onclick = function() {
    navigator.clipboard.writeText(code.textContent);

    icon.classList.remove('bi-clipboard')
    icon.classList.add('bi-clipboard-check')

}