import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { UserService } from '../../services/user.service';
import { Products } from '../../interfaces/products';
import { User } from '../../interfaces/user';
import { inject } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [NgFor],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  // 1. INJECT de las dependencias a usar
    _products = inject(ProductsService)
  
    // 2. Declaracion de variables
    allProducts : Products[] = []; //Array de productos y la estructura la da la interfase
  
    // PETICION GET (OBTENER)
    obtenerProductos(){
      // Traer la dependencias del servicio y usar los metodos
      this._products.getProducts().subscribe(
        {
          // Gestionar la respuesta de la peticion
          // Manejo de errores
          next: (res:any) => {
            // Cuando sale correcto
            console.log (res.datos);
            // Guardar los datos en la variable
            this.allProducts = res.datos; 
            console.log (this.allProducts);
  
            // Llamar al método para mezclar los productos de forma aleatoria
          },
          error: (error: any) =>{
            // Cuando sale incorrecto
            console.log (error);
          }
  
        }
      );
    }

    // LOGICA PARA LOS USUARIOS
      // 1. INJECT de las dependencias a usar
      _users = inject(UserService)
        
      // 2. Declaracion de variables
      allUsers : User[] = []; //Array de productos y la estructura la da la interfase
    
      // PETICION GET (OBTENER)
      obtenerUsuarios(){
        // Traer la dependencias del servicio y usar los metodos
        this._users.getUsers().subscribe(
          {
            // Gestionar la respuesta de la peticion
            // Manejo de errores
            next: (res:any) => {
              // Cuando sale correcto
              console.log (res.datos);
              // Guardar los datos en la variable
              this.allUsers = res.datos; 
              console.log (this.allUsers);
    
              // Llamar al método para mezclar los productos de forma aleatoria
            },
            error: (error: any) =>{
              // Cuando sale incorrecto
              console.log (error);
            }
    
          }
        );
      }
    // Mostarlo al cargar el contenido de la pagina
    // Usar el metodo -> ngOnInit
    ngOnInit(){
      this.obtenerProductos();
    };
}
