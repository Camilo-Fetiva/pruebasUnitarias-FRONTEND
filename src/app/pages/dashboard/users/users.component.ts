import { Component, inject } from '@angular/core';

// DEPENDENCIAS NECESARIAS
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { TableUsersComponent } from "../../../components/table-users/table-users.component";

// USERS
import { UserService } from '../../../services/user.service';
import { User } from '../../../interfaces/user';

// IMPORTAR ADMIN
import { AdminService } from '../../../services/admin.service';
import { Admin } from '../../../interfaces/admin';

// METODO 
import { NgFor } from '@angular/common';

// FORMULARIO
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [RouterOutlet, RouterLink, TableUsersComponent, NgFor, FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  // 1. INJECT de las dependencias a usar
  _users = inject(UserService)
    
  // 2. Declaracion de variables
  allUsers : User[] = []; //Array de productos y la estructura la da la interfase

  // VARIABLES PARA LAS PETICIONES
  nombre: string = '';
  correo: string = "";
  telefono: number = 0;
  contrasena: string = '';
  showDiv: boolean = false;
  editMode: boolean = false;  
  editUserId: string | undefined | null= null;

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

  //MODIFICAR USUARIOS
  identificarId(id: string | undefined ) {
    this.editUserId = id;
    this.editMode = true;
    this.showDiv = true;
    console.log(this.editUserId);
  }
  
    // PETICION PUT
    modificarUsuario() {
      console.log('Entré');
      console.log( this.editUserId, this.nombre, this.correo, this.telefono,);
  
      if (!this.nombre || !this.correo || this.telefono <= 0) {
          alert('Ingrese todos los campos');
      } else if (this.editUserId) {
          const usuarioActualizado: User = {
            Nombre: this.nombre,
            Correo: this.correo,
            Telefono: this.telefono,
            Contrasena: this.contrasena
          };
  
          this._users.putUsers(usuarioActualizado, this.editUserId).subscribe({
              next: (res: any) => {
                  if (res) {
                      console.log('res', res);
                      alert('Usuario actualizado satisfactoriamente');
                      this.obtenerUsuarios();
                      this.toggleDiv();
                  } else {
                      console.error('Hubo un error');
                  }
              },
              error: (err) => {
                  console.error('Hubo un error', err);
              }
          });
      }
    }
  
    // PETICION DELETE
    borrarUsuario(idForDelete: any) {
      console.log('Usuario a borrar:', idForDelete);
  
      this._users.deleteUsers(idForDelete).subscribe({
          next: (res: any) => {
              if (res) {
                  console.log('res', res);
                  alert('Usuario eliminado satisfactoriamente')
                  this.obtenerUsuarios();
              } else {
                  console.error('Hubo un error');
              }
          },
          error: (err) => {
              console.error('Hubo un error', err);
          }
      });
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
  
    // MOSTRAR EL FORMULARIO
    toggleDiv() {
      this.showDiv = !this.showDiv;
      if (!this.showDiv) {
        this.nombre = '';
        this.correo = '';
        this.telefono = 0;
        this.editMode = false;
        this.editUserId = null;
      }
    }
  
  // Mostarlo al cargar el contenido de la pagina
  // Usar el metodo -> ngOnInit
  ngOnInit(){
    this.obtenerUsuarios();
  };
}
