
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PersonasService, Persona } from '../personas';

@Component({
  selector: 'app-personas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './personas.html',
  styleUrl: './personas.css'
})
export class PersonasComponent {

  personas: Persona[] = [];

  persona: Persona = {
    nombre: '',
    edad: 0,
    descripcion: ''
  };

  idEditar: string = '';

  constructor(private personasService: PersonasService) {
    this.cargarPersonas();
  }

  cargarPersonas() {
    this.personasService.obtenerPersonas().subscribe(datos => {
      this.personas = datos;
    });
  }

  async guardarPersona() {
    if (this.idEditar) {
      await this.personasService.actualizarPersona(
        this.idEditar,
        this.persona
      );
    } else {
      await this.personasService.registrarPersona(this.persona);
    }

    this.limpiarFormulario();
  }

  editarPersona(persona: Persona) {
    this.idEditar = persona.id || '';

    this.persona = {
      nombre: persona.nombre,
      edad: persona.edad,
      descripcion: persona.descripcion
    };
  }

  async eliminarPersona(id: string) {
    if (confirm('¿Deseas eliminar esta persona?')) {
      await this.personasService.eliminarPersona(id);
    }
  }

  limpiarFormulario() {
    this.idEditar = '';

    this.persona = {
      nombre: '',
      edad: 0,
      descripcion: ''
    };
  }
}
