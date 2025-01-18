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
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterLink, ProductCardComponent, NavBarComponent, FooterComponent], //<- USO EN EL COMPONENT
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}

