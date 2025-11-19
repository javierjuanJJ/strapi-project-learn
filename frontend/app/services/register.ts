const registerUserUrl = `${strapiBaseURL}/api/auth/local/register`; // Endpoint de registro de Strapi [36]

async function registerUserService(userData: object) {
    const response = await fetch(registerUserUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData), // Envío de datos [36]
    });

    if (!response.ok) {
        // Manejo de errores de HTTP o del servidor [37]
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
    }
    
    return response.json(); // Devuelve el JWT y datos del usuario [38]
}