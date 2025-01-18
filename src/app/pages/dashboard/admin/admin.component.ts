import { Component, inject } from '@angular/core';

// DEPENDENCIAS NECESARIAS
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';

// IMPORTAR ADMIN
import { AdminService } from '../../../services/admin.service';
import { Admin } from '../../../interfaces/admin';

// IMPORTAR EL NGFOR PARA USAR EL CICLO
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgFor],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
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
}
