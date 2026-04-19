import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importante para los formularios
import { CafeteriaService } from '../../servicios/cafeteria';
import { Categoria } from '../../db';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categorias.html', // <--- QUÍTALE el ".component"
  styleUrl: './categorias.css'     // <--- QUÍTALE el ".component"
})
export class CategoriasComponent implements OnInit {
  listaCategorias: Categoria[] = [];
  nuevaCategoria: string = '';

  constructor(private servicio: CafeteriaService) {}

  async ngOnInit() {
    this.cargarCategorias();
  }

  async cargarCategorias() {
    this.listaCategorias = await this.servicio.obtenerCategorias();
  }

  async agregar() {
    if (this.nuevaCategoria.trim()) {
      await this.servicio.guardarCategoria({ nombre: this.nuevaCategoria });
      this.nuevaCategoria = '';
      this.cargarCategorias();
    }
  }

  async borrar(id?: number) {
    if (id) {
      await this.servicio.eliminarCategoria(id);
      this.cargarCategorias();
    }
  }
}