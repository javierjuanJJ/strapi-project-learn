const baseURL = "http://localhost:1337"; 

async function getStrapiData(url: string) {
    try {
        const response = await fetch(baseURL + url); // Fetch de datos [11]

        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`); 
        }

        const data = await response.json();
        return data; // Devuelve los datos de la API [11]
    } catch (error) {
        console.error("Error fetching", error);
        return null;
    }
}
// Nota: Este código es base; se adapta después para manejar el formato de datos de Strapi [11].