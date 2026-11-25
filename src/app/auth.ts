
import { Injectable } from '@angular/core';

import {
  Auth,
  authState,
  browserLocalPersistence,
  setPersistence,
  signInWithEmailAndPassword,
  signOut
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) {}

  // Iniciar sesión
  login(correo: string, password: string) {
    return setPersistence(
      this.auth,
      browserLocalPersistence
    ).then(() => {
      return signInWithEmailAndPassword(
        this.auth,
        correo,
        password
      );
    });
  }

  // Cerrar sesión
  logout() {
    return signOut(this.auth);
  }

  // Obtener usuario actual
  obtenerUsuario() {
    return authState(this.auth);
  }

  // Obtener información del token
  async obtenerInfoToken() {
    const usuario = this.auth.currentUser;

    if (!usuario) {
      return null;
    }

    const resultado = await usuario.getIdTokenResult();

    return {
      tokenExiste: resultado.token !== '',
      fechaExpiracion: resultado.expirationTime
    };
  }
}

