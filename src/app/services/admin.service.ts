// Usar el INJECT
import { Injectable, inject } from '@angular/core';

// Uso del cliente HTTP para realizar las peticiones
import { HttpClient } from '@angular/common/http';

// Importar la INTERFAZ correspondiente
import { Admin } from '../interfaces/admin';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

   // INYECCION EL CLIENTE
   private _httpClient = inject(HttpClient);


  //  RUTAS DEL BACKEND
   // RUTA DE CONEXION CON EL BACKEND
   private URL_ADMIN = 'http://localhost:3000/administrador'; // -> En el backend esta como ADMINISTRADOR (REVISAR)

   // PETICIONES

   // PETICION POST
  postAdmin(administrador: Admin){
    return this._httpClient.post(this.URL_ADMIN + '/crear', administrador);
  };

  // PETICION GET
  getAdmin(){
    return this._httpClient.get(this.URL_ADMIN + '/obtener');
  };

  // PETICION PUT
  putAdmin(administradorActualized:Admin, idForUpdate:string){
    // Para actualizar se necesita el body y el ID del producto
    return this._httpClient.put(this.URL_ADMIN + '/actualizar/' + idForUpdate, administradorActualized);
  }

  // PETICION DELETE
  deleteAdmin(idForDelete: string){
    return this._httpClient.delete(this.URL_ADMIN + '/eliminar/' + idForDelete)
  }
}
