
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  correo: string = '';
  password: string = '';
  mensaje: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  async iniciarSesion() {

    this.mensaje = '';

    try {

      await this.authService.login(
        this.correo,
        this.password
      );

      this.router.navigate(['/inicio']);

    } catch (error) {

      this.mensaje = 'Correo o contraseña incorrectos';

    }

  }

}
