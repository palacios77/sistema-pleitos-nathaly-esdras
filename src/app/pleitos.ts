
import { Injectable } from '@angular/core';

import {
  Database,
  ref,
  push,
  set,
  update,
  remove,
  onValue,
  get
} from '@angular/fire/database';

import { Observable } from 'rxjs';

export interface Pleito {
  id?: string;
  persona1: string;
  persona2: string;
  motivo: string;
  fecha: string;
  descripcion: string;
  estado: string;
}

@Injectable({
  providedIn: 'root'
})
export class PleitosService {

  constructor(private database: Database) {}

  // Registrar un pleito
  async registrarPleito(pleito: Pleito) {
    const referencia = push(
      ref(this.database, 'pleitos')
    );

    const datosPleito = { ...pleito };
    delete datosPleito.id;

    await set(referencia, datosPleito);

    return referencia.key;
  }

  // Consultar todos los pleitos
  obtenerPleitos(): Observable<Pleito[]> {
    return new Observable(observer => {

      const referencia = ref(
        this.database,
        'pleitos'
      );

      const cancelar = onValue(
        referencia,
        snapshot => {
          const datos = snapshot.val();
          const pleitos: Pleito[] = [];

          if (datos) {
            Object.keys(datos).forEach(id => {
              pleitos.push({
                ...datos[id],
                id
              });
            });
          }

          observer.next(pleitos);
        },
        error => observer.error(error)
      );

      return () => cancelar();
    });
  }

  // Actualizar un pleito
  actualizarPleito(id: string, pleito: Pleito) {
    const datosPleito = { ...pleito };
    delete datosPleito.id;

    return update(
      ref(this.database, 'pleitos/' + id),
      datosPleito
    );
  }

  // Eliminar pleito y sus evidencias
  async eliminarPleito(id: string) {

    // Obtener todas las evidencias
    const referenciaEvidencias = ref(
      this.database,
      'evidencias'
    );

    const resultado = await get(
      referenciaEvidencias
    );

    const actualizaciones: Record<string, null> = {};

    // Buscar evidencias relacionadas
    if (resultado.exists()) {
      const datos = resultado.val();

      Object.keys(datos).forEach(idEvidencia => {

        if (datos[idEvidencia].pleitoId === id) {
          actualizaciones[
            'evidencias/' + idEvidencia
          ] = null;
        }

      });
    }

    // Eliminar el pleito
    actualizaciones['pleitos/' + id] = null;

    // Aplicar eliminaciones
    await update(
      ref(this.database),
      actualizaciones
    );
  }
}
