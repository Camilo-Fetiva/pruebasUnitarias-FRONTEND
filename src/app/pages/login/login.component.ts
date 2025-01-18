import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { FooterComponent } from '../../components/footer/footer.component';

// IMPORTAR EL MODELO DE DATOS O EL SERVICIO DONDE SE CONECTA CON EL BACKEND
import { AdminService } from '../../services/admin.service';
import { UserService } from '../../services/user.service';

// IMPORTAR LAS INTERFASES
import { Admin } from '../../interfaces/admin';
import { User } from '../../interfaces/user';
import { Login } from '../../interfaces/login';
import { userInfo } from 'os';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NavBarComponent, FooterComponent, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})


export class LoginComponent {
  // Métodos de inyección (Angular inject)
  _router = inject(Router);
  _users = inject(UserService);

  // INFORMACION OBTENIDA DEL FORMULARIO
  formLogin = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });


  // Almacenar usuarios obtenidos de la base de datos
  allUsers: User[] = [];
  Correo: string = '';
  Contrasena: string = '';

  // Datos del administrador
  admin = {
    Correo: "ecoclosetAdmin",
    Contrasena: "ecocloset",
    Nombre: 'Camilo',
  };

  // Función para obtener los usuarios desde la base de datos
  obtenerUsuarios() {
    this._users.getUsers().subscribe({
      next: (res: any) => {
        this.allUsers = res.datos;
        console.log(this.allUsers);
      },
      error: (error: any) => {
        console.error('Error al obtener los usuarios', error);
        alert('Error al obtener los usuarios');
      }
    });
  }

  // Función de inicio de sesión
  iniciarSesion() {
    // Verificar si los campos están vacíos
    if (!this.Correo || !this.Contrasena) {
      alert('Por favor ingresa tu correo y contraseña');
      return;
    }

    // Verificar si es el inicio de sesión del administrador
    if (this.Correo === this.admin.Correo && this.Contrasena === this.admin.Contrasena) {
      // Redirigir al panel de administración
      alert('Bienvenido a Ecocloset ' + this.admin.Nombre);
      this._router.navigate(['/Dashboard']);
      return;
    }

    // VERIFICAR SI ES USUARIO
    const usuarioEncontrado = this.allUsers.find(user => user.Correo === this.formLogin.value.email);

    if (usuarioEncontrado) {
      // El usuario fue encontrado
      console.log('Usuario encontrado:', usuarioEncontrado);
    } else {
      // El usuario no fue encontrado
      console.log('Correo no registrado');
    }
    //   // Llamar a obtener los usuarios y validar las credenciales
    //   this.obtenerUsuarios();

    //   const usuario = this.allUsers.find(user => user.Correo === this.Correo && user.Contrasena === this.Contrasena);


    //   // Si el usuario es encontrado, redirigir a la página principal
    //   if (usuario) {
    //     alert('Bienvenido Usuario a Ecocloset');
    //     this._router.navigate(['/']);
    //   } else {
    //     // Si no se encuentra el usuario, mostrar un mensaje de error
    //     alert('Correo o contraseña incorrectos');
    //   }
    // }
  }
}


