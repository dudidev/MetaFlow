const userPasswrd = document.getElementById('password');
const userName = document.getElementById('username');

const form = document.getElementById('loginForm');
const message = document.getElementById('message');
const stat = document.getElementById('stat');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (validateLogin()) {
        // Redirigir a la página de inicio o dashboard
        window.location.href = './userPanel.html';
    }
});

function showMessage(msg, isError = false) {
    message.textContent = msg;
    message.style.color = isError ? 'red' : 'green';
    message.style.display = 'block'; // Mostrar el mensaje
    setTimeout(() => {
        message.style.display = 'none'; // Ocultar después de 3 segundos
    }, 3000);
}

function validateLogin() {
    const name = userName.value.trim();
    const pass = userPasswrd.value.trim();

    if (name === '' || pass === '') {
        showMessage('Por favor, completa los campos', true);
        return false;
    }

    const storedName = localStorage.getItem('userName');
    const storedPass = localStorage.getItem('userPass');

    if (name === storedName && pass === storedPass) {
        showMessage(`¡Bienvenido de nuevo, ${name}!`, false);
        return true;
    } else {
        showMessage('Credenciales incorrectas. Inténtalo de nuevo.', true);
        return false;
    }
}