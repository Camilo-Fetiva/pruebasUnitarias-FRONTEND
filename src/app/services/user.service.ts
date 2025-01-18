// Usar el INJECT
import { Injectable, inject } from '@angular/core';

// Uso del cliente HTTP para realizar las peticiones
import { HttpClient } from '@angular/common/http';

// Importar la INTERFAZ correspondiente
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // INYECCION EL CLIENTE
  private _httpClient = inject(HttpClient);

  // RUTA DE CONEXION CON EL BACKEND
  private URL_USERS = 'http://localhost:3000/usuarios'; //404 no esta creado

  // PETICIONES

  // PETICION POST
  postUsers(user: User){
    return this._httpClient.post(this.URL_USERS + '/crear', user);
  };

  // PETICION GET
  getUsers(){
    return this._httpClient.get(this.URL_USERS + '/obtener');
  };

  // PETICION PUT
  putUsers(userActualized:User, idForUpdate:string){
    // Para actualizar se necesita el body y el ID del usuario
    return this._httpClient.put(this.URL_USERS + '/actualizar/' + idForUpdate, userActualized);
  }

  // PETICION DELETE
  deleteUsers(idForDelete: string){
    return this._httpClient.delete(this.URL_USERS + '/eliminar/' + idForDelete)
  }

}
