import { Component } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { Products } from '../../../interfaces/products';
import { inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { User } from '../../../interfaces/user';

// DEPENDENCIAS NECESARIAS
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';

// IMPORTAR ADMIN
import { AdminService } from '../../../services/admin.service';
import { Admin } from '../../../interfaces/admin';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgFor,],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
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

  // 1. INJECT de las dependencias a usar
  _administrador = inject(AdminService)

  // 2. Declaracion de variables
  allAdmin : Admin[] = []; //Array de productos y la estructura la da la interfase

  // PETICION GET (OBTENER)
  obtenerAdmin(){
    // Traer la dependencias del servicio y usar los metodos
    this._administrador.getAdmin().subscribe(
      {
        // Gestionar la respuesta de la peticion
        // Manejo de errores
        next: (res:any) => {
          // Cuando sale correcto
          console.log (res.datos);
          // Guardar los datos en la variable
          this.allAdmin = res.datos; 
          console.log (this.allAdmin);}
      }
    );
  }

  // Método para mezclar el arreglo de productos de forma aleatoria (Fisher-Yates Shuffle)
  shuffleUsers() {
    for (let i = this.allUsers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.allUsers[i], this.allUsers[j]] = [this.allUsers[j], this.allUsers[i]]; // Swap
    }
  }
  // Mostarlo al cargar el contenido de la pagina
  // Usar el metodo -> ngOnInit
  ngOnInit(){
    this.obtenerUsuarios();
    this.obtenerProductos();
  };
}
