export interface Admin {

    // Basado en el modelo de datos de ADMIN
    Nombre:string;
    Correo:string;
    Telefono: number;
    Contrasena:string;
    Imagen?: string;
    roleUser?:string;
}
