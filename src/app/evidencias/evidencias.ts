
import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  EvidenciasService,
  Evidencia
} from '../evidencias';

import {
  PleitosService,
  Pleito
} from '../pleitos';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-evidencias',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './evidencias.html',
  styleUrl: './evidencias.css'
})
export class EvidenciasComponent
  implements OnInit, OnDestroy {

  evidencias: Evidencia[] = [];

  pleitos: Pleito[] = [];

  pleitoIdSeleccionado: string = '';

  archivo: File | null = null;
  contenido: string = '';
  descripcion: string = '';
  mensaje: string = '';

  private suscripcionPleitos?: Subscription;
  private suscripcionEvidencias?: Subscription;

  constructor(
    private evidenciasService: EvidenciasService,
    private pleitosService: PleitosService
  ) {}

  ngOnInit() {
    this.cargarPleitos();
  }

  ngOnDestroy() {
    this.suscripcionPleitos?.unsubscribe();
    this.suscripcionEvidencias?.unsubscribe();
  }

  // Cargar pleitos desde Firebase
  cargarPleitos() {
    this.suscripcionPleitos =
      this.pleitosService.obtenerPleitos()
        .subscribe({
          next: datos => {
            this.pleitos = datos;
          },
          error: error => {
            console.error(error);
            this.mensaje = 'Error al cargar los pleitos';
          }
        });
  }

  // Seleccionar pleito y cargar sus evidencias
  seleccionarPleito() {
    this.mensaje = '';

    this.suscripcionEvidencias?.unsubscribe();

    if (!this.pleitoIdSeleccionado) {
      this.evidencias = [];
      return;
    }

    this.suscripcionEvidencias =
      this.evidenciasService
        .obtenerEvidenciasPorPleito(
          this.pleitoIdSeleccionado
        )
        .subscribe({
          next: datos => {
            this.evidencias = datos;
          },
          error: error => {
            console.error(error);
            this.mensaje = 'Error al cargar las evidencias';
          }
        });
  }

  // Seleccionar archivo
  seleccionarArchivo(evento: Event) {
    const input = evento.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    const archivoSeleccionado = input.files[0];

    // Validar tamaño máximo de 5 MB
    if (archivoSeleccionado.size > 5 * 1024 * 1024) {
      this.mensaje = 'El archivo debe pesar menos de 5 MB';

      this.archivo = null;
      this.contenido = '';

      input.value = '';
      return;
    }

    this.archivo = archivoSeleccionado;
    this.mensaje = '';

    const lector = new FileReader();

    lector.onload = () => {
      this.contenido = lector.result as string;
    };

    lector.onerror = () => {
      this.mensaje = 'No se pudo leer el archivo';
      this.archivo = null;
      this.contenido = '';
    };

    lector.readAsDataURL(archivoSeleccionado);
  }

  // Guardar evidencia asociada al pleito
  async guardarEvidencia() {

    if (!this.pleitoIdSeleccionado) {
      this.mensaje = 'Primero selecciona un pleito';
      return;
    }

    if (!this.archivo || !this.contenido) {
      this.mensaje = 'Selecciona un archivo';
      return;
    }

    if (!this.descripcion.trim()) {
      this.mensaje = 'Escribe una descripción';
      return;
    }

    const evidencia: Evidencia = {
      pleitoId: this.pleitoIdSeleccionado,
      nombre: this.archivo.name,
      descripcion: this.descripcion.trim(),
      contenido: this.contenido,
      tipo: this.archivo.type,
      fecha: new Date().toISOString().substring(0, 10)
    };

    try {
      await this.evidenciasService.registrarEvidencia(
        evidencia
      );

      this.archivo = null;
      this.contenido = '';
      this.descripcion = '';

      this.mensaje = 'Evidencia guardada correctamente';

    } catch (error) {
      console.error(error);
      this.mensaje = 'Error al guardar la evidencia';
    }
  }

  // Eliminar evidencia
  async eliminarEvidencia(id: string) {
    if (!confirm('¿Deseas eliminar esta evidencia?')) {
      return;
    }

    try {
      await this.evidenciasService.eliminarEvidencia(id);

      this.mensaje = 'Evidencia eliminada correctamente';

    } catch (error) {
      console.error(error);
      this.mensaje = 'Error al eliminar la evidencia';
    }
  }
}
