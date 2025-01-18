import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

//Dependencia para conectar el backend con el frontend
import { provideHttpClient } from '@angular/common/http';

// Dependencia para gestionar mensajes de alerta
import { provideToastr } from 'ngx-toastr';

// Dependencia de proveedor de animaciones
import { provideAnimations } from '@angular/platform-browser/animations';

// Gestion de las rutas
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    
    // Proveedor para hacer peticiones al backend y conectarse al backend
    provideHttpClient(),

    // Proveedor para la gestion de mensajes
    provideToastr({
      timeOut: 2000, //Tiempo de duracion del mensaje en pantalla
      positionClass: 'toast-boton-left', //Posicion del mensaje
      preventDuplicates: true, //Previene fallos de duplicacion en el mensaje
      easeTime: 0, //Cuanto demora el mensaje en aparecer
      progressBar: true, //Permite manipular la barra de progreso
    }),

    // Proveedor para la gestion de animaciones (POSIBLE ERROR DE COMPATIBILIDAD)
    provideAnimations(),
  ]
};
