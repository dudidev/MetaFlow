const userName = document.getElementById('username');
const userMail = document.getElementById('email');
const userPasswrd = document.getElementById('password');
const stat = document.getElementById('status')
const registerBtn = document.getElementById('registerBtn')
//const form = document.getElementById('registerForm');
const message = document.getElementById('message');

/*form.addEventListener('submit', function (e) {
    e.preventDefault();
    const user = document.getElementById('username').value;
    message.textContent = `¡Bienvenid@, ${user}! Ahora eres de la familia MetaFlow🎉`;
});
*/

function showMessage(msg, isError = false) {
    message.textContent = msg;
    message.style.color = isError ? 'red' : 'green';
    message.style.display = 'block'; // Mostrar el mensaje
    setTimeout(() => {
        messageElement.style.display = 'none'; // Ocultar después de 3 segundos
    }, 3000);
}

function saveName() {
    const name = userName.value.trim();
    const email = userMail.value.trim();
    const pass = userPasswrd.value.trim();

    if (name === '' || email === '' || pass === '') {
        showMessage('Por favor, completa los campos', true);
        return;
    }

    localStorage.setItem('userName', name);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userPass', pass);
    showMessage('¡Nombre guardado con éxito!', false);

    // Actualizar la visualización en la página
    displayData();

    // Limpiar el input después de guardar
    userName.value = '';
    userMail.value = '';
    userPasswrd.value = '';
}

function displayData(){
    const dataName = localStorage.getItem('userName');
    const dataEmail = localStorage.getItem('userEmail');
    const dataPass = localStorage.getItem('userPass');

    if(dataName && dataEmail && dataPass){
        stat.textContent = `Registro exitoso ${dataName}`;
    }else{
        stat.textContent = `No se pudo validar el registo, revisa tu info`
    }
}

registerBtn.addEventListener('click', saveName);
document.addEventListener('DOMContentLoaded', displayData)