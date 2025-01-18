import { TestBed } from '@angular/core/testing';
import { Products } from '../interfaces/products';
import { ProductsService } from './products.service';

// IMPORTAR EL PROVEEDOR PARA PETICIONES HTTP 
import { provideHttpClient } from '@angular/common/http';

// IMPORTAR HERRAMIENTAS QUE PERMITAN SIMULAR INTERACCIONES CON LAS PETICIONES
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';

describe(
  'Pruebas de peticiones a PRODUCTOS',
  () => {
    let _service: ProductsService;
    let _httpMock: HttpTestingController;

    const urlTest = 'http://localhost:3000/productos';

    const nameTest = 'Saco'
    const imageTest = 'dhahfbsdbfshshbg';
    const colectionTest = 'Verano';
    const sizeTest = 'M';
    const priceTest = 120000;

    // CONFIGURACION GLOBAL
    beforeEach(() => {
      TestBed.configureTestingModule({
        //Lo que se necesite INJECTAR => importaciones, componenetes, etc. 
        providers: [
          ProductsService,
          provideHttpClient(),
          provideHttpClientTesting()
        ]
      });

      _service = TestBed.inject(ProductsService);
      _httpMock = TestBed.inject(HttpTestingController);
    });


    afterAll(
      () => {
        _httpMock.verify(); //Evalua que despues de todas las pruebas no queden peticiones pendientes   
      }
    )

    // DEFINIR CASSOS DE PRUEBA

    // POST
    it(
      'Peticion POST para crear un producto',
      () => {
        // CREAR EL PRODUCTO
        const newProduct = { Nombre: nameTest, Imagen: imageTest, Coleccion: colectionTest, Tallas: sizeTest, Precio: priceTest };

        // SIMULAR LA PETICION POST
        _service.postProducts(newProduct).subscribe(
          (products) => {
            expect(products).toEqual(newProduct);
          }
        )

        // CREAR LA FUNCION CON LA SIMULACION
        const peticion = _httpMock.expectOne(urlTest + '/crear') //RUTA
        expect(peticion.request.method).toBe('POST') //PETICION
        expect(peticion.request.body).toEqual(newProduct); //RESPUESTA

        // SIMULAR EL SERVIDOR
        peticion.flush(newProduct)
      }
    );

    // GET
    it(
      'Peticion GET para obtener los productos',
      ()=>{
        // SIMULAR EL PRODUCTO
        const getProducts = { nameTest, imageTest, colectionTest, sizeTest, priceTest };

        // SIMULAR LA PETICION GET
        _service.getProducts().subscribe(
          (products) => {
            expect(products).toEqual(getProducts);
          }
        )

        // CREAR LA FUNCION CON LA SIMULACION
        const peticion = _httpMock.expectOne(urlTest + '/obtener') //RUTA
        expect(peticion.request.method).toBe('GET') //PETICION
        
        // SIMULAR EL SERVIDOR
        peticion.flush(getProducts)
      }
    )

    // PUT
    it(
      'Peticion PUT para actualizar un producto',
      ()=>{
        // CREAR EL PRODUCTO
        const newProduct = { Nombre: nameTest, Imagen: imageTest, Coleccion: colectionTest, Tallas: sizeTest, Precio: priceTest, _id: 'jasnfjadf' };

        // CAMBIAR UN DATO
        const updatedProduct = { ...newProduct, Nombre: 'Camisa' };

        // SIMULAR LA PETICION PUT
        _service.putProducts(updatedProduct, newProduct._id).subscribe(
          (products) => {
            expect(products).toEqual(updatedProduct);
          }
        )

        // CREAR LA FUNCION CON LA SIMULACION
        const peticion = _httpMock.expectOne(urlTest + '/actualizar/' + updatedProduct._id) //RUTA
        expect(peticion.request.method).toBe('PUT') //PETICION
        
        // SIMULAR EL SERVIDOR
        peticion.flush(updatedProduct)
      }
    )

    // DELETE
    it(
      'Peticion DELETE para eliminar un producto',
      ()=>{
        // CREAR EL PRODUCTO
        const newProduct = { Nombre: nameTest, Imagen: imageTest, Coleccion: colectionTest, Tallas: sizeTest, Precio: priceTest, _id: 'jasnfjadf' };

        // SIMULAR LA PETICION DELETE
        _service.deleteProducts(newProduct._id).subscribe(
          (products) => {
            expect(products).toEqual(newProduct);
          }
        )
        
        // CREAR LA FUNCION CON LA SIMULACION
        const peticion = _httpMock.expectOne(urlTest + '/eliminar/' + newProduct._id) //RUTA
        expect(peticion.request.method).toBe('DELETE') //PETICION
        
        // SIMULAR EL SERVIDOR
        peticion.flush(newProduct)
      }
    )
  }
);

  
