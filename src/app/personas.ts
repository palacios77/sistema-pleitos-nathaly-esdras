
import { Injectable } from '@angular/core';

import {
  Database,
  ref,
  push,
  set,
  update,
  remove,
  onValue
} from '@angular/fire/database';

import { Observable } from 'rxjs';

export interface Persona {
  id?: string;
  nombre: string;
  edad: number;
  descripcion: string;
}

@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  constructor(private database: Database) { }

  // Registrar persona
  async registrarPersona(persona: Persona) {
    const referencia = push(ref(this.database, 'personas'));

    await set(referencia, persona);

    return referencia.key;
  }

  // Consultar personas
  obtenerPersonas(): Observable<Persona[]> {
    return new Observable(observer => {

      const referencia = ref(this.database, 'personas');

      const cancelar = onValue(
        referencia,
        snapshot => {
          const datos = snapshot.val();
          const personas: Persona[] = [];

          if (datos) {
            Object.keys(datos).forEach(id => {
              personas.push({
                id: id,
                ...datos[id]
              });
            });
          }

          observer.next(personas);
        },
        error => observer.error(error)
      );

      return () => cancelar();
    });
  }

  // Actualizar persona
  actualizarPersona(id: string, persona: Persona) {
    return update(
      ref(this.database, 'personas/' + id),
      persona
    );
  }

  // Eliminar persona
  eliminarPersona(id: string) {
    return remove(
      ref(this.database, 'personas/' + id)
    );
  }
}
