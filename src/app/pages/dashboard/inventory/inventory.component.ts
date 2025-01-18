import { Component, inject } from '@angular/core';

// DEPENDENCIAS NECESARIAS
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { ProductsService } from '../../../services/products.service';
import { Products } from '../../../interfaces/products';
import { NgFor } from '@angular/common';
import { TableInventoryComponent } from '../../../components/table-inventory/table-inventory.component';
import { CardInventoryComponent } from "../../../components/card-inventory/card-inventory.component";

import { FormsModule } from '@angular/forms';

// IMPORTAR ADMIN
import { AdminService } from '../../../services/admin.service';
import { Admin } from '../../../interfaces/admin';


@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgFor, TableInventoryComponent, CardInventoryComponent, FormsModule],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})

export class InventoryComponent {
  // 1. INJECT de las dependencias a usar
  _products = inject(ProductsService)

  // 2. Declaracion de variables
  allProducts : Products[] = []; //Array de productos y la estructura la da la interfase

  // VARIABLES PARA LAS PETICIONES
  nombre: string = '';
  precio: number = 0;
  imagen: string = '';
  coleccion: string = '';
  tallas: string ='';
  descripcion?: string = '';
  showDiv: boolean = false;
  editMode: boolean = false;  
  editProductId: string | undefined | null= null;

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

  // PETICION POST
  crearProducto() {
    if (this.nombre === '' || this.imagen === '' || this.precio === 0 || this.coleccion === '' || this.tallas === '' || this.descripcion === '') {
      alert('Ingrese todos los campos');
    } else {
      const nuevoProducto: Products = {
        Nombre: this.nombre,
        Imagen: this.imagen,
        Precio: this.precio,
        Coleccion: this.coleccion,
        Tallas: this.tallas,
        Descripcion: this.descripcion
      };

      this._products.postProducts(nuevoProducto).subscribe({
        next: (res: any) => {
          if (res) {
            console.log('res', res);
            alert('Producto creado satisfactoriamente');
            this.obtenerProductos();
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

  //MODIFICAR PRODUCTOS
  identificarId(id: string | undefined ) {
    this.editProductId = id;
    this.editMode = true;
    this.showDiv = true;
    console.log(this.editProductId);
  }

  // PETICION PUT
  modificarProducto() {
    console.log('Entré');
    console.log(this.editProductId, this.nombre, this.imagen, this.precio);

    if (!this.nombre || !this.imagen || this.precio <= 0) {
        alert('Ingrese todos los campos');
    } else if (this.editProductId) {
        const productoActualizado: Products = {
          Nombre: this.nombre,
          Imagen: this.imagen,
          Precio: this.precio,
          Coleccion: this.coleccion,
          Tallas: this.tallas
        };

        this._products.putProducts(productoActualizado, this.editProductId).subscribe({
            next: (res: any) => {
                if (res) {
                    console.log('res', res);
                    alert('Producto actualizado satisfactoriamente');
                    this.obtenerProductos();
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
  borrarProducto(idForDelete: any) {
    console.log('Producto a borrar:', idForDelete);

    this._products.deleteProducts(idForDelete).subscribe({
        next: (res: any) => {
            if (res) {
                console.log('res', res);
                alert('Producto eliminado satisfactoriamente')
                this.obtenerProductos();
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
      this.imagen = '';
      this.precio = 0;
      this.coleccion = '';
      this.tallas='';
      this.editMode = false;
      this.editProductId = null;
    }
  }

  // Mostarlo al cargar el contenido de la pagina
  // Usar el metodo -> ngOnInit
  ngOnInit(){
    this.obtenerProductos();
  };
}
