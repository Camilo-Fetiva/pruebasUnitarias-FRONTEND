import { Component } from '@angular/core';

// DEPENDENCIAS NECESARIAS
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';

// Importar la card
import { ProductCardComponent } from '../../components/product-card/product-card.component';

// Importar el NAVBAR y el FOOTER
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [RouterOutlet, RouterLink, ProductCardComponent, NavBarComponent, FooterComponent], //<- USO EN EL COMPONENT
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent {
  handleClick(){
    console.log('Identificar el ID')
  }
}
