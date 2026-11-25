
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PleitosService, Pleito } from '../pleitos';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historial.html',
  styleUrl: './historial.css'
})
export class HistorialComponent {

  pleitos: Pleito[] = [];

  constructor(private pleitosService: PleitosService) {
    this.pleitosService.obtenerPleitos().subscribe(datos => {
      this.pleitos = datos;
    });
  }
}
