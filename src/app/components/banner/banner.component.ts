import { Component } from '@angular/core';

// DEPENDENCIAS NECESARIAS
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [RouterOutlet], //<- USO EN EL COMPONENT
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent {

}
