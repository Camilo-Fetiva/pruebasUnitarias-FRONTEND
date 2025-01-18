// EN ESTE SERVICIO SE GENERA LA LOGICA PARA LA GESTION DEL INICIO DE SESION

// INYECTAR -> inject para las dependencias
import { Injectable, inject } from '@angular/core';

// Importar el protocolo HTTP
import { HttpClient } from '@angular/common/http';

// Importar el Router para poder navegar en el aplicativo
import { Router } from '@angular/router';

// Importar la dependencia para la gestion de mensajes
import { ToastrService } from 'ngx-toastr';

// Importar la dependencia que decodifica el token
import { jwtDecode, JwtDecodeOptions } from "jwt-decode";

// Importar la INTERFAZ conectada al servicio de login
import { Login } from '../interfaces/login';

// Importar las RUTAS
import { routes } from '../app.routes';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // Inyectar las dependencias (PRIVATE OR PUBLIC)
  private _httpClient = inject (HttpClient); //Varialble para el HTTP
  private _router = inject (Router); //Varialble para el Router
  public _toastrService = inject (ToastrService); //Varialble para el gestor de mensajes

  // Ruta de conexion con el backend (VARIABLE DE ENTORNO)
  private URL_LOGIN = 'http://localhost:3000/login'; //Esta ruta parte del backend para el inicio de sesion del usuario

  // LOGICA PARA LAS PETICIONES
  // 1. Inicio de sesion (PETICION POST)
  inicioSesion(credencialesIngreso: Login){
    // PETICION POST
    return this._httpClient.post(this.URL_LOGIN, credencialesIngreso)
  };

  // 2. Obtener el token
  // Token -> Se almacenan de forma local (TEMPORAL) LocalStorage
  obtenerToken(){
    return localStorage.getItem('token'); //Si existe token -> Inicio de sesion exitoso
  };

   // 3. Validacion de si es administrador
  // Funcion que retorna verdadero (ADMIN) o falso
  esAdmin(){
    const token = this.obtenerToken();

    // si hay token -> decodificarlo
    if(token){
      // Decodificar la info del token
      const tokenDecodificado: any = jwtDecode(token);

      // CONDICIONAL TERNARIO
      return tokenDecodificado.role === 'admin'?  true : false;

    }else{
      console.error('No existe token');
      return false
    }
  }

  // 4. Redireccionar al panel de control o al pag de inicio
  redireccionar(){
    // ES ADMIN -> redireccionar al panel de control
    if(this.esAdmin()){
      this._router.navigate(['/Dashboard']);
    }else{
      // Si no lo es redireccionar a la pag de inicio
      this._router.navigate(['/']);
    }
  }

  // 5. Inicio de sesion satisfactorio
  isLoged(){
    return this.obtenerToken()? true : false;
  }

  // 6. Cierre de sesion
  logOut(){
    this._toastrService.info('Cierre de sesion exitosa');

    // Eliminar el token del local storage
    localStorage.removeItem('token');
    // redireccionar
    this._router.navigate(['/']);
  }
}
