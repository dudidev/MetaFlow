const userName = document.getElementById('mostrarNom');

// Obtener usuario logueado desde localStorage
const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));

if (loggedUser && loggedUser.name) {
    userName.textContent = `Bienvenido ${loggedUser.name}`;
} else {
    userName.textContent = 'Bienvenido Usuario';
}

document.addEventListener('DOMContentLoaded', () => {
    const inputMeta1 = document.getElementById('metaInput1');

    if (!inputMeta1) return;

    // Obtener metas por usuario
    const metasPorUsuario = JSON.parse(localStorage.getItem('metasPorUsuario')) || {};
    let metasGuardadas = [];

    if (loggedUser && loggedUser.email && metasPorUsuario[loggedUser.email]) {
        metasGuardadas = metasPorUsuario[loggedUser.email];
    }

    if (metasGuardadas.length > 0) {
        const listaDeMetas = metasGuardadas.join('\n');
        inputMeta1.value = listaDeMetas;
    } else {
        inputMeta1.value = '';
    }
});




