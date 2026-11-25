import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PleitosService, Pleito } from '../pleitos';

@Component({
  selector: 'app-pleitos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pleitos.html',
  styleUrl: './pleitos.css'
})
export class PleitosComponent {

  pleitos: Pleito[] = [];

  pleito: Pleito = {
    persona1: 'Nathaly',
    persona2: 'Esdras',
    motivo: '',
    fecha: '',
    descripcion: '',
    estado: 'Pendiente'
  };

  idEditar: string = '';

  constructor(private pleitosService: PleitosService) {
    this.cargarPleitos();
  }

  cargarPleitos() {
    this.pleitosService.obtenerPleitos().subscribe(datos => {
      this.pleitos = datos;
    });
  }

  async guardarPleito() {
    if (this.idEditar) {
      await this.pleitosService.actualizarPleito(
        this.idEditar,
        this.pleito
      );
    } else {
      await this.pleitosService.registrarPleito(this.pleito);
    }

    this.limpiarFormulario();
  }

  editarPleito(pleito: Pleito) {
    this.idEditar = pleito.id || '';

    this.pleito = {
      persona1: pleito.persona1,
      persona2: pleito.persona2,
      motivo: pleito.motivo,
      fecha: pleito.fecha,
      descripcion: pleito.descripcion,
      estado: pleito.estado
    };
  }

  async eliminarPleito(id: string) {
    if (confirm('¿Deseas eliminar este pleito?')) {
      await this.pleitosService.eliminarPleito(id);
    }
  }

  limpiarFormulario() {
    this.idEditar = '';

    this.pleito = {
      persona1: 'Nathaly',
      persona2: 'Esdras',
      motivo: '',
      fecha: '',
      descripcion: '',
      estado: 'Pendiente'
    };
  }
}
