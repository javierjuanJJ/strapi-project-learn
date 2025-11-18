import qs from 'qs'; 
import { cache } from 'react';
import { cacheLive } from 'next/cache'; 

// Definición de la estructura JSON para la query de populate [17]
const queryHomepage = { 
    // Ejemplo de estructura requerida para secciones anidadas:
    populate: {
        sections: { 
            populate: {
                link: {
                    populate: '*', // Popula todos los campos de 'link' [19]
                },
                image: {
                    fields: ['url', 'alternativeText'], // Campos específicos de 'image' [16, 19]
                },
            },
        },
    },
};

// Se envuelve la función para cachearla
const getHomepage = cache(async () => {
    // Transforma el JSON de la query a un string [18]
    const query = qs.stringify(queryHomepage, { encodeValuesOnly: true }); 
    const url = `/api/homepages?${query}`; 

    const response = await getStrapiData(url); 
    
    // Devuelve directamente los atributos para simplificar el uso en el frontend [18]
    return response.data.attributes; 
}, {
    // Configuración del tiempo de vida de la caché (opcional, por defecto son 15 minutos) [10, 24]
    expire: 60, // Ejemplo: 60 segundos (1 minuto) [24]
});
