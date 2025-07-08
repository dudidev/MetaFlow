const userName = document.getElementById('mostrarNom');

const savedNombre = localStorage.getItem('userName');

userName.textContent = `Bienvenido ${savedNombre}`;


document.addEventListener('DOMContentLoaded', () => {
    const inputMeta1 = document.getElementById('metaInput1');

    if (!inputMeta1) return;

    const metasGuardadas = JSON.parse(localStorage.getItem('metas')) || [];

    if (metasGuardadas.length > 0) {
        const listaDeMetas = metasGuardadas.join('\n');
        inputMeta1.value = listaDeMetas;
    }
});




