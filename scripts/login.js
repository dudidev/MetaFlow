const form = document.getElementById('loginForm');
        const message = document.getElementById('message');

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const user = document.getElementById('username').value;
            message.textContent = `¡Bienvenido, ${user}! 🎉`;
        });