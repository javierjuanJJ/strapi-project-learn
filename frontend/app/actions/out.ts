import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
"use server";

// Configuración de la cookie (httpOnly, duración, etc.) [34, 40]
const cookieConfig = {
    maxAge: 60 * 60 * 24 * 7, // 1 semana [34]
    path: '/',
    httpOnly: true, // Solo accesible desde el servidor [34]
    secure: process.env.NODE_ENV === 'production',
};


// La acción recibe el estado previo y los datos del formulario (FormData) [29]
export async function registerUserAction(prevState: FormState, formData: FormData) {

    // 1. Extracción de campos [30]
    const fields = {
        username: formData.get("username") as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    };

    // 2. Validación de campos [31]
    const validatedFields = signAppFormSchema.safeParse(fields);

    if (!validatedFields.success) {
        // Retorna errores aplanados de Zot si falla la validación [32]
        const flattenentErrors = validatedFields.error.flatten().fieldErrors;
        return { success: false, message: 'validation error', thoughtErrors: flattenentErrors, data: fields };
    }

    // Si la validación es exitosa:
    try {
        // 3. Llamada al servicio de Strapi (Registro) [33]
        const response = await registerUserService(validatedFields.data);

        // 4. Si es exitoso, manejar la sesión (cookies) [34]
        // ... (Ver sección de Cookies a continuación) ...

        const cookieStore = await cookies();
        cookieStore.set('jwt', response.jwt, cookieConfig); // Almacena el JWT [39]

        redirect('/dashboard'); // Redirige al dashboard

        // 5. Retorno de éxito
        return { success: true, message: 'Registro ha ido correctamente', data: fields };

    } catch (error) {
        // Manejo de errores de Strapi (e.g., usuario ya existe) [33, 35]
        return { success: false, message: 'registration error', strappyErrors: response.error, data: fields };
    }
}