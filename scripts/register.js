const userName = document.getElementById('username');
const userMail = document.getElementById('email');
const userPasswrd = document.getElementById('password');
const stat = document.getElementById('stat')
const registerBtn = document.getElementById('registerBtn')
const form = document.getElementById('registerForm');
const message = document.getElementById('message');



function showMessage(msg, isError = false) {
    message.textContent = msg;
    message.style.color = isError ? 'red' : 'green';
    message.style.display = 'block'; // Mostrar el mensaje
    setTimeout(() => {
        message.style.display = 'none'; // Ocultar después de 3 segundos
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
    showMessage('¡Usuario registrado con éxito!', false);


    // Limpiar el input después de guardar
    userName.value = '';
    userMail.value = '';
    userPasswrd.value = '';
}


form.addEventListener('submit', function (e) {
    e.preventDefault();
    const userName = document.getElementById('username').value;
    message.textContent = `¡Bienvenid@, ${userName}! Ahora eres de la familia MetaFlow🎉`;
    saveName();
});