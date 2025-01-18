export interface User {

    // Basado en el modelo de datos de USERS
    _id?: string;
    Nombre: string;
    Correo: string;
    Telefono: number;
    Contrasena: string;
    Imagen?: string;
    roleUser?: string;
}
