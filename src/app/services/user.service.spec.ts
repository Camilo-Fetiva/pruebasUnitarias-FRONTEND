import { TestBed } from '@angular/core/testing';
import { User } from '../interfaces/user';
import { UserService } from './user.service';

// IMPORTAR EL PROVEEDOR PARA PETICIONES HTTP 
import { provideHttpClient } from '@angular/common/http';

// IMPORTAR HERRAMIENTAS QUE PERMITAN SIMULAR INTERACCIONES CON LAS PETICIONES
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';

describe(
  'Pruebas de peticiones a USUARIOS',
  () => {
    let _service: UserService;
    let _httpMock: HttpTestingController;
    let _userMock: User;

    const urlTest = 'http://localhost:3000/usuarios';

    const nameTest = 'Joe Burrow'
    const emailTest = 'burrow@user';
    const phoneTest = 1234567;
    const passwordTest = '123';
    const tokenTest = 'sdkjhfshkfjg';


    // CONFIGURACION GLOBAL
    beforeEach(() => {
      TestBed.configureTestingModule({
        //Lo que se necesite INJECTAR => importaciones, componenetes, etc. 
        providers: [
          UserService,
          provideHttpClient(),
          provideHttpClientTesting()
        ]
      });

      _service = TestBed.inject(UserService); //INJECTAR
      _httpMock = TestBed.inject(HttpTestingController);
    })


    afterAll(
      () => {
        _httpMock.verify(); //Evalua que despues de todas las pruebas no queden peticiones pendientes   
      }
    )

    // DEFINIR CASOS DE PRUEBA

    // POST 
    it(
      'Peticion POST para crear un usuario',
      () => {
        // CREAR EL USUARIO
        const newUser = { Nombre: nameTest, Correo: emailTest, Telefono: phoneTest, Contrasena: passwordTest };

        // SIMULAR LA PETICION POST
        _service.postUsers(newUser).subscribe(
          (user) => {
            expect(user).toEqual(newUser);
          }
        )

        // CREAR LA FUNCION CON LA SIMULACION
        const peticion = _httpMock.expectOne(urlTest + '/crear') //RUTA
        expect(peticion.request.method).toBe('POST') //PETICION
        expect(peticion.request.body).toEqual(newUser); //RESPUESTA

        // SIMULAR EL SERVIDOR
        peticion.flush(newUser)

      }
    )

    // GET
    it(
      'Peticion GET para obtener los usuarios',
      ()=>{
        // SIMULAR EL USUARIO
        const getUser = { nameTest, emailTest, phoneTest, passwordTest };

        // SIMULAR LA PETICION GET
        _service.getUsers().subscribe(
          (user) => {
            expect(user).toEqual(getUser);
          }
        )

        // CREAR LA FUNCION CON LA SIMULACION
        const peticion = _httpMock.expectOne(urlTest + '/obtener') //RUTA
        expect(peticion.request.method).toBe('GET') //PETICION
        
        // SIMULAR EL SERVIDOR
        peticion.flush(getUser)
      }
    )

    // PUT
    it(
      'Peticion PUT para actualizar un usuario',
      ()=>{
        // CREAR EL USUARIO
        const newUser = { Nombre: nameTest, Correo: emailTest, Telefono: phoneTest, Contrasena: passwordTest, _id: 'ahfsdjfhsfj' };

        // CAMBIAR UN DATO
        const updatedUser = { ...newUser, Nombre: 'Jose' };

        // SIMULAR LA PETICION PUT
        _service.putUsers(updatedUser, newUser._id).subscribe(
          (user) => {
            expect(user).toEqual(updatedUser);
          }
        )

        // CREAR LA FUNCION CON LA SIMULACION
        const peticion = _httpMock.expectOne(urlTest + '/actualizar/' + newUser._id) //RUTA
        expect(peticion.request.method).toBe('PUT') //PETICION
        
        // SIMULAR EL SERVIDOR
        peticion.flush(updatedUser)
      }
    )

    // DELETE
    it(
      'Peticion DELETE para eliminar un usuario',
      ()=>{
        // CREAR EL USUARIO
        const newUser = { Nombre: nameTest, Correo: emailTest, Telefono: phoneTest, Contrasena: passwordTest, _id: 'ahfsdjfhsfj' };

        // SIMULAR LA PETICION DELETE
        _service.deleteUsers(newUser._id).subscribe(
          (user) => {
            expect(user).toEqual(newUser);
          }
        )
        
        // CREAR LA FUNCION CON LA SIMULACION
        const peticion = _httpMock.expectOne(urlTest + '/eliminar/' + newUser._id) //RUTA
        expect(peticion.request.method).toBe('DELETE') //PETICION
        
        // SIMULAR EL SERVIDOR
        peticion.flush(newUser)
      }
    )

  });
