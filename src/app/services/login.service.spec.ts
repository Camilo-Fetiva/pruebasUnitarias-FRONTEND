// IMPORTAR LAS DEPENDENCIAS

import { TestBed } from '@angular/core/testing'; //CONFIGURAR EL ENTORNO DE PRUEBAS
import { LoginService } from './login.service';




// IMPORTAR EL PROVEEDOR PARA PETICIONES HTTP 
import { provideHttpClient } from '@angular/common/http';

// IMPORTAR HERRAMIENTAS QUE PERMITAN SIMULAR INTERACCIONES CON LAS PETICIONES
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';

describe(
  'Pruebas a Login Service',
  () => {
    let _loginService: LoginService;
    let _httpMock: HttpTestingController; //SIMULA INTERACCIONES HTTP
    const urlTest = "http://localhost:3000/login";

    const nameTest = 'Joe Burrow'
    const emailTest = 'burrow@user';
    const passwordTest = '123';
    const tokenTest = 'sdkjhfshkfjg';
    const phoneTest = 1234567;
    

    // CONFIGURACION GLOBAL
    beforeEach(() => {
      TestBed.configureTestingModule({
        //Lo que se necesite INJECTAR => importaciones, componenetes, etc. 
        providers: [
          LoginService,
          provideHttpClient(),
          provideHttpClientTesting()
        ]
      });

      _loginService = TestBed.inject(LoginService); //INJECTAR
      _httpMock = TestBed.inject(HttpTestingController);
    })

    afterAll(
      () => {
        _httpMock.verify(); //Evalua que despues de todas las pruebas no queden peticiones pendientes   
      }
    )

    // DEFINIR CASOS DE PRUEBA
    it(
      'Peticion POST para el inicio de sesion',
      () => {
        const mockRespuesta = { //SIMULACION DE RESPUESTA DEL BACKEND
          mensaje: 'Inicio de sesion exitoso',
          token: tokenTest
        }

        _loginService.inicioSesion(emailTest, passwordTest).subscribe(
          (res) => {
            expect(res).toEqual(mockRespuesta);
          }
        )

        const peticion = _httpMock.expectOne(urlTest)
        expect(peticion.request.method).toBe('POST')

        // SIMULAR EL SERVIDOR
        peticion.flush(mockRespuesta)
      }
    )

    it(
      'Peticion GET token para obtener el token almacenado en el local storage',
      () => {
        localStorage.setItem('token', tokenTest)
        expect(_loginService.obtenerToken()).toBe(tokenTest);
      }
    )

    it(
      'Peticion para verificar si el usuario esta LOGED',
      () => {
        localStorage.setItem('token', tokenTest)
        expect(_loginService.isLoged()).toBeTruthy(); //VALIDACION DE RESPUESTA BOOLEANA TRUE
      }
    )

    it(
      'Peticion para CERRAR',
      () => {
        _loginService.logOut();
        expect(localStorage.getItem('Token')).toBeNull(); // AL CERRAR SESION SE ELIMINA EL LOCALSTORAGE

        // PRUEBA DE MENSAJE DE CIERRE DE SESION
        spyOn(window, 'alert'); //SIMULAR EL ALERT
        _loginService.logOut();
        expect(window.alert).toHaveBeenCalledWith('Cierre de sesion exitosa');
      }
    )

    it(
      'Peticion de si es ADMIN',
      ()=>{
        // SIMULAR EL TOKEN DE ADMINISTRADOR
        const tokenAdmin = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJpZCI6ImFocmZzZGpmcyJ9.VHjPOHDh1QH5fOjWgYHjaBzeEq2WNozlkY7-7eUnQkA'; 
        
        // FUNCION PARA OBTENER EL TOKEN
        localStorage.setItem('token', tokenAdmin);

        // VERIFICAR QUE ES ADMIN
        expect(_loginService.esAdmin()).toBeTruthy();
      }
    )
  }
)