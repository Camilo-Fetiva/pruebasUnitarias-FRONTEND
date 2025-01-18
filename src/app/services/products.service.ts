// Usar el INJECT
import { Injectable, inject } from '@angular/core';

// Uso del cliente HTTP para realizar las peticiones
import { HttpClient } from '@angular/common/http';

// Importar la INTERFAZ correspondiente
import { Products } from '../interfaces/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  // INYECCION EL CLIENTE
  private _httpClient = inject(HttpClient);

  // RUTA DE CONEXION CON EL BACKEND
  private URL_PRODUCTS = 'http://localhost:3000/productos';

  // PETICIONES

  // PETICION POST
  postProducts(products: Products){
    return this._httpClient.post(this.URL_PRODUCTS + '/crear', products);
  };

  // PETICION GET
  getProducts(){
    return this._httpClient.get(this.URL_PRODUCTS + '/obtener');
  };

  // PETICION PUT
  putProducts(productActualized:Products, idForUpdate:string){
    // Para actualizar se necesita el body y el ID del producto
    return this._httpClient.put(this.URL_PRODUCTS + '/actualizar/' + idForUpdate, productActualized);
  }

  // PETICION DELETE
  deleteProducts(idForDelete: string){
    return this._httpClient.delete(this.URL_PRODUCTS + '/eliminar/' + idForDelete)
  }
}
