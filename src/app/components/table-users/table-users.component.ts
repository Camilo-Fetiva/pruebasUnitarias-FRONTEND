import { Component, inject } from '@angular/core';

// USERS
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';

// METODO 
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-table-users',
  standalone: true,
  imports: [NgFor],
  templateUrl: './table-users.component.html',
  styleUrl: './table-users.component.css'
})
export class TableUsersComponent {
  // 1. INJECT de las dependencias a usar
    _users = inject(UserService)
    
    // 2. Declaracion de variables
    allUsers : User[] = []; //Array de productos y la estructura la da la interfase
  
    // PETICION GET (OBTENER)
    obtenerProductos(){
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
