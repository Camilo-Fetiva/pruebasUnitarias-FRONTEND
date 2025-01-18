import { Component } from '@angular/core';

@Component({
  selector: 'app-product-specific',
  standalone: true,
  imports: [],
  templateUrl: './product-specific.component.html',
  styleUrl: './product-specific.component.css'
})
export class ProductSpecificComponent {
  // abrir=document.getElementById('abrir-modal');
  // popup_container=document.getElementById('popup_container');
  // salir=document.getElementById('salir');

  // modal(){
  //   this.abrir?.addEventListener('click',()=>{
  //     this.popup_container?.classList.add('show');
  //   })

  //   this.salir?.addEventListener('click',()=>{
  //     this.popup_container?.classList.remove('show');
  //   })
  // }

  // this.abrir.addEventListener('click', () =>{
  //     this.popup_container.classList.add('show');
  // });

  // this.salir.addEventListener('click', () =>{
  //     this.popup_container.classList.remove('show');
  // });
}
