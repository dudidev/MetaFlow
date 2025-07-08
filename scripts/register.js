const userName = document.getElementById('username');
const userMail = document.getElementById('email');
const userPasswrd = document.getElementById('password');
const stat = document.getElementById('stat');
const registerBtn = document.getElementById('registerBtn');
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

function saveUser() {
    const name = userName.value.trim();
    const email = userMail.value.trim();
    const pass = userPasswrd.value.trim();

    if (name === '' || email === '' || pass === '') {
        showMessage('Por favor, completa los campos', true);
        return;
    }

    // Obtener usuarios existentes o array vacío
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Verificar si el correo ya está registrado
    if (users.some(user => user.email === email)) {
        showMessage('Este correo ya está registrado.', true);
        return;
    }

    // Agregar nuevo usuario
    users.push({ name, email, password: pass });
    localStorage.setItem('users', JSON.stringify(users));
    showMessage('¡Usuario registrado con éxito!', false);


    // Limpiar los campos
    userName.value = '';
    userMail.value = '';
    userPasswrd.value = '';
}


form.addEventListener('submit', function (e) {
    e.preventDefault();
    message.textContent = `¡Bienvenid@, ${userName.value.trim()}! Ahora eres de la familia MetaFlow🎉`;
    saveUser();
});