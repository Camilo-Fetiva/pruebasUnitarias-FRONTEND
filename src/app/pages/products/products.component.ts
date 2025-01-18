import { Component } from '@angular/core';

import { ProductSpecificComponent } from '../../components/product-specific/product-specific.component';

import { ProductCardComponent } from '../../components/product-card/product-card.component';

// Importar el NAVBAR y el FOOTER
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductSpecificComponent, ProductCardComponent, NavBarComponent, FooterComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

}
