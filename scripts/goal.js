async function sendToIa() {
    document.getElementById('goal-form').style.height = '100%';
    document.getElementById('responseContainer').style.display = 'block';
    const responseIa = document.getElementById('ia-answer');
    const inputTask = document.getElementById('inputTask').value;

    const loader = document.getElementById('loader');
    const apiKeyGem = "AIzaSyDOizTOtPvrslQIC6_34RDE5gmJLgKzKgc";

    if (!inputTask.trim()) {
        responseIa.textContent = "Por favor, ingresa algún texto.";
        return;
    }

    if (apiKeyGem === "YOUR_API_KEY") {
        responseIa.innerHTML = "<strong>Error:</strong> Por favor, reemplaza 'YOUR_API_KEY' con tu clave de API real en el código JavaScript.";
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


    const response = await fetch(API_URL_GEMINI, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
    });

    try {
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
            responseIa.textContent = geminiData.candidates[0].content.parts[0].text.trim();
        } else {
            responseIa.textContent = "Respuesta inválida de Gemini.";
        }


    } catch (error) {
        loader.style.display = 'none'; // Ocultar loader
        console.error("Error en la solicitud fetch:", error);
        responseIa.textContent = "Error al conectar con la API GEMINI. Revisa la consola para más detalles.";
    }
}