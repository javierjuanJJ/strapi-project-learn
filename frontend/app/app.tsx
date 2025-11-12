// Componente de Servidor Asíncrono
async function HomePage() {
    // Uso del endpoint para el contenido singular 'homepage' [13]
    const strapiData = await getStrapiData("/api/homepages"); 

    // Acceso a los atributos (corrigiendo la estructura que incluye .data) [14]
    const title = strapiData.data.attributes.title;
    const description = strapiData.data.attributes.description;

    // ... código de renderizado (H1, descripción, etc.) [13]
}