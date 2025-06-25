const userName = document.getElementById('mostrarNom');

const savedNombre = localStorage.getItem('userName');

userName.textContent = `Bienvenido ${savedNombre}`;
