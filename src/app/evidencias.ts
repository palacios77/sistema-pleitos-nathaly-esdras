
import { Injectable } from '@angular/core';

import {
  Database,
  ref,
  push,
  set,
  onValue,
  remove
} from '@angular/fire/database';

import { Observable } from 'rxjs';

export interface Evidencia {
  id?: string;
  pleitoId: string;
  nombre: string;
  descripcion: string;
  contenido: string;
  tipo: string;
  fecha: string;
}

@Injectable({
  providedIn: 'root'
})
export class EvidenciasService {

  constructor(private database: Database) {}

  // Registrar evidencia relacionada con un pleito
  async registrarEvidencia(evidencia: Evidencia) {
    const referencia = push(
      ref(this.database, 'evidencias')
    );

    const datosEvidencia = { ...evidencia };
    delete datosEvidencia.id;

    await set(referencia, datosEvidencia);

    return referencia.key;
  }

  // Obtener todas las evidencias
  obtenerEvidencias(): Observable<Evidencia[]> {
    return new Observable(observer => {

      const referencia = ref(
        this.database,
        'evidencias'
      );

      const cancelar = onValue(
        referencia,
        snapshot => {
          const datos = snapshot.val();
          const evidencias: Evidencia[] = [];

          if (datos) {
            Object.keys(datos).forEach(id => {
              evidencias.push({
                ...datos[id],
                id
              });
            });
          }

          observer.next(evidencias);
        },
        error => observer.error(error)
      );

      return () => cancelar();
    });
  }

  // Obtener evidencias de un pleito específico
  obtenerEvidenciasPorPleito(
    pleitoId: string
  ): Observable<Evidencia[]> {

    return new Observable(observer => {

      const referencia = ref(
        this.database,
        'evidencias'
      );

      const cancelar = onValue(
        referencia,
        snapshot => {
          const datos = snapshot.val();
          const evidencias: Evidencia[] = [];

          if (datos) {
            Object.keys(datos).forEach(id => {

              const evidencia = datos[id];

              if (evidencia.pleitoId === pleitoId) {
                evidencias.push({
                  ...evidencia,
                  id
                });
              }

            });
          }

          observer.next(evidencias);
        },
        error => observer.error(error)
      );

      return () => cancelar();
    });
  }

  // Eliminar evidencia
  eliminarEvidencia(id: string) {
    return remove(
      ref(this.database, 'evidencias/' + id)
    );
  }
}
