import { Component } from '@angular/core';

// IMPORTAR EL SERVICIO DE CONEXION
import { ProductsService } from '../../services/products.service';

// IMPOTAR EL INJECT
import { inject } from '@angular/core';

// IMPORTAR LA INTERFAZ
import { Products } from '../../interfaces/products';

// IMPORTAR EL NGFOR PARA USAR EL CICLO
import { NgFor } from '@angular/common';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [NgFor, NgIf], //<- USO EN EL COMPONENT
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
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
        this.shuffleProducts();
        },
        error: (error: any) =>{
          // Cuando sale incorrecto
          console.log (error);
        }
      }
    );
  }

  // MODAL
  // Variable para almacenar el producto seleccionado
  // PROBAR EL TRAER PRODUCTO
  productoEspecifico(id:string | undefined){
    console.log(id)
    return this.allProducts.find(producto => producto._id === id);
  }
  
  selectedProducto: any;

  // Variable para controlar si el modal está visible
  showModal: boolean = false;


  handleClick2(id: string | undefined) {
    this.selectedProducto = this.productoEspecifico(id);  // Asignar el producto seleccionado
    // Si el producto es encontrado, mostrar el modal
    if (this.selectedProducto) {
      this.showModal = true;
    } else {
      console.log("Producto no encontrado");
      alert('Producto no encontrado');
    }
  }

  // Método para cerrar el modal
  closeModal() {
    this.showModal = false;  // Ocultar el modal
  }

  // Método para mezclar el arreglo de productos de forma aleatoria (Fisher-Yates Shuffle)
  shuffleProducts() {
    for (let i = this.allProducts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.allProducts[i], this.allProducts[j]] = [this.allProducts[j], this.allProducts[i]]; // Swap
    }
  }


  // Mostarlo al cargar el contenido de la pagina
  // Usar el metodo -> ngOnInit
  ngOnInit(){
    this.obtenerProductos();
  };
  

}
