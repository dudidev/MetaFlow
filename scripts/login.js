const userPasswrd = document.getElementById('password');
const userName = document.getElementById('username');
const form = document.getElementById('loginForm');
const message = document.getElementById('message');
const stat = document.getElementById('stat');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (validateLogin()) {
        setTimeout(() => {
            window.location.href = './vistaCreate.html';
        }, 2000);
    }
});

function showMessage(msg, isError = false) {
    message.textContent = msg;
    message.style.color = isError ? 'red' : 'green';
    message.style.display = 'block'; // Mostrar el mensaje
    setTimeout(() => {
        message.style.display = 'none'; // Ocultar después de 3 segundos
    }, 2000);
}

function validateLogin() {
    const name = userName.value.trim();
    const pass = userPasswrd.value.trim();

    if (name === '' || pass === '') {
        showMessage('Por favor, completa los campos', true);
        return false;
    }

    // Obtener usuarios del localStorage (debe ser un array de objetos {email, password})
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Buscar usuario por email y password
    const userFound = users.find(user => user.name === name && user.password === pass);
    localStorage.setItem('loggedUser', JSON.stringify(userFound));

    if (userFound) {
        showMessage(`¡Bienvenido de nuevo, ${name}! Ingresando...`, false);
        return true;
    } else {
        showMessage('Credenciales incorrectas. Inténtalo de nuevo.', true);
        return false;
    }
}