import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css'
})
export class InicioComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  // Cerrar sesión
  cerrarSesion() {
    this.authService.logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.error('Error al cerrar sesión:', error);
      });
  }

  // Comprobar token solamente en consola
  async comprobarToken() {
    try {
      const informacion =
        await this.authService.obtenerInfoToken();

      console.log('Información del token:', informacion);

    } catch (error) {
      console.error('Error al comprobar el token:', error);
    }
  }
}
