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
    const emailTest = 'burrow@user';
    const passwordTest = '123';
    const tokenTest = 'sdkjhfshkfjg';

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
      ()=>{
          const mockRespuesta = { //SIMULACION DE RESPUESTA DEL BACKEND
              mensaje: 'Inicio de sesion exitoso',
              token: tokenTest
          }

          _loginService.inicioSesion(emailTest, passwordTest).subscribe(
              (res)=>{
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
      ()=>{
          localStorage.setItem('token', tokenTest)
          expect(_loginService.obtenerToken()).toBe(tokenTest);
      }
  )

  it(
      'Peticion para verificar si el usuarios esta LOGED',
      ()=>{
          localStorage.setItem('token', tokenTest)
          expect(_loginService.isLoged()).toBeTruthy(); //VALIDACION DE RESPUESTA BOOLEANA TRUE
      }
  )

  it(
      'Peticion para CERRAR',
      ()=>{
          _loginService.logOut();
          expect(localStorage.getItem('Token')).toBeNull(); // AL CERRAR SESION SE ELIMINA EL LOCALSTORAGE
      }
  )
  }
)