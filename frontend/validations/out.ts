import { z } from 'zod';

// Esquema de registro
export const signAppFormSchema = z.object({
    username: z.string()
        .min(3, { message: "Username must be at least three characters" }) // Ejemplo de validación mínima [26]
        .max(20),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string().min(6).max(100),
});

// Definición del tipo de estado del formulario (para Typescript) [27]
// export type FormState = z.infer<typeof signAppFormSchema> & { success: boolean, /* ... */ }; 