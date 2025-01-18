// Usar el INJECT
import { Injectable, inject } from '@angular/core';

// Uso del cliente HTTP para realizar las peticiones
import { HttpClient } from '@angular/common/http';

// Importar la INTERFAZ correspondiente
import { Orders } from '../interfaces/orders';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

    // INYECCION EL CLIENTE
  private _httpClient = inject(HttpClient);

  // RUTA DE CONEXION CON EL BACKEND
  private URL_ORDERS = 'http://localhost:3000/ordenes';

  // PETICIONES

  // PETICION POST
  postOrders(orders: Orders){
    return this._httpClient.post(this.URL_ORDERS + '/crear', orders);
  };

  // PETICION GET
  getOrders(){
    return this._httpClient.get(this.URL_ORDERS + '/obtener');
  };

  // PETICION PUT
  putOrders(orderActualized:Orders, idForUpdate:string){
    // Para actualizar se necesita el body y el ID del producto
    return this._httpClient.put(this.URL_ORDERS + '/actualizar/' + idForUpdate, orderActualized);
  }

  // PETICION DELETE
  deleteOrders(idForDelete: string){
    return this._httpClient.delete(this.URL_ORDERS + '/eliminar/' + idForDelete)
  }
}
