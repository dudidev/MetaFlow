async function sendToIa() {
    document.getElementById('goal-form').style.height = '100%';
    document.getElementById('ia-btn').style.display = 'none';
    document.getElementById('responseContainer').style.display = 'block';
    const responseIa = document.getElementById('ia-answer');
    const inputTask = document.getElementById('inputTask').value;
    const reloadBtn = document.getElementById('reload-btn');
    const metaInput = document.querySelector('.userGoal');
    const addBtn = document.querySelector('.add-btn');
    const loader = document.getElementById('loader');
    const apiKeyGem = "AIzaSyDOizTOtPvrslQIC6_34RDE5gmJLgKzKgc";

    // Obtener usuario logueado
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));

    if (!inputTask.trim()) {
        responseIa.textContent = "Por favor, ingresa algún texto.";
        return;
    }

    responseIa.textContent = ""; // Limpiar respuesta anterior
    loader.style.display = 'block'; // Mostrar loader

    const API_URL_GEMINI = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKeyGem}`;
    const prompt = `Eres un experto en ayudar a las personas a cumplir sus metas. Tu tarea es analizar la meta proporcionada y ofrecer una recomendación clara para ayudar a alcanzarla. La meta es: "${inputTask}". Por favor, proporciona una respuesta concisa, completa y útil.`;

    const requestBody = {
        "contents": [
            {
                "parts": [
                    {
                        "text": prompt
                    }
                ]
            }
        ]
    };

    try {
        const response = await fetch(API_URL_GEMINI, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });

        const geminiData = await response.json();

        loader.style.display = 'none'; // Ocultar loader

        if (!response.ok) {
            // Manejo de errores para Gemini
            const errorData = await response.json();
            console.error("Error en la API Gemini:", errorData);
            responseIa.textContent = `Error: ${response.status} - ${errorData.error?.message || 'Error desconocido. Revisa la consola para más detalles.'}`;
            return;
        }
        
        // Procesar la respuesta de Google Gemini
        if (geminiData?.candidates?.[0]?.content?.parts?.[0]?.text) {
            let respuesta = geminiData.candidates[0].content.parts[0].text.trim();
            respuesta = respuesta.replace(/\*\*/g, '').replace(/\*/g, '');
            respuesta = respuesta.replace(/\n/g, '<br>');
            responseIa.innerHTML = respuesta;
        } else {
            responseIa.textContent = "Respuesta inválida de Gemini.";
        }

    } catch (error) {
        loader.style.display = 'none'; // Ocultar loader
        console.error("Error en la solicitud fetch:", error);
        responseIa.textContent = "Error al conectar con la API GEMINI. Revisa la consola para más detalles.";
    }

    // --- MODAL HTML DINÁMICO ---
    function showModal(message) {
        let modal = document.getElementById('meta-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'meta-modal';
            modal.style.position = 'fixed';
            modal.style.top = '0';
            modal.style.left = '0';
            modal.style.width = '100vw';
            modal.style.height = '100vh';
            modal.style.background = 'rgba(0,0,0,0.4)';
            modal.style.display = 'flex';
            modal.style.alignItems = 'center';
            modal.style.justifyContent = 'center';
            modal.style.zIndex = '9999';
            modal.style.color = 'black';
            modal.innerHTML = `
                <div style="background:#fff;padding:2rem 2.5rem;border-radius:12px;box-shadow:0 2px 16px #0002;text-align:center;min-width:250px;">
                    <span id="modal-message" style="font-size:1.1rem;">${message}</span>
                    <br><br>
                    <button id="close-modal" style="padding:0.5rem 1.5rem;border:none;background:#239e9b;color:#fff;border-radius:6px;cursor:pointer;">OK</button>
                </div>
            `;
            document.body.appendChild(modal);
            document.getElementById('close-modal').onclick = () => modal.remove();
        } else {
            document.getElementById('modal-message').textContent = message;
            modal.style.display = 'flex';
        }
    }

    // Guardar meta y mostrar modal (por usuario)
    function saveMeta() {
        const meta = metaInput.value.trim();
        if (meta === '') {
            showModal('Por favor, ingresa una meta');
            return;
        }
        if (!loggedUser || !loggedUser.email) {
            showModal('No se encontró usuario logueado.');
            return;
        }
        // Guardar metas por usuario
        let metasPorUsuario = JSON.parse(localStorage.getItem('metasPorUsuario')) || {};
        const userEmail = loggedUser.email;
        if (!metasPorUsuario[userEmail]) {
            metasPorUsuario[userEmail] = [];
        }
        metasPorUsuario[userEmail].push(meta);
        localStorage.setItem('metasPorUsuario', JSON.stringify(metasPorUsuario));
        showModal('¡Meta guardada con éxito!');
        metaInput.value = '';
    }

    addBtn.onclick = saveMeta;

    // Recargar respuesta IA
    reloadBtn.onclick = () => {
        sendToIa();
    }
}