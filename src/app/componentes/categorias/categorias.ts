import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { CafeteriaService } from '../../servicios/cafeteria';
import { Categoria } from '../../db';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categorias.html', 
  styleUrl: './categorias.css'     
})
export class CategoriasComponent implements OnInit {
  listaCategorias: Categoria[] = [];
  nuevaCategoria: string = '';
  
  
  idEnEdicion: number | undefined = undefined;

  
  constructor(
    private servicio: CafeteriaService, 
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    await this.cargarCategorias();
  }

  async cargarCategorias() {
    this.listaCategorias = await this.servicio.obtenerCategorias();
    this.cdr.detectChanges(); 
  }

  async agregar() {
    if (this.nuevaCategoria.trim()) {
      try {
        
        const categoriaData: Categoria = {
          nombre: this.nuevaCategoria
        };

        if (this.idEnEdicion) {
          categoriaData.id = this.idEnEdicion;
        }

        
        await this.servicio.guardarCategoria(categoriaData);

        
        this.nuevaCategoria = '';
        this.idEnEdicion = undefined;

        
        await this.cargarCategorias();
        
        alert(categoriaData.id ? "¡Categoría actualizada!" : "¡Categoría agregada!");
      } catch (error) {
        console.error("Error al procesar categoría:", error);
        alert("Error al guardar los cambios.");
      }
    } else {
      alert("El nombre no puede estar vacío.");
    }
  }

  editar(cat: Categoria) {
    
    this.idEnEdicion = cat.id;
    this.nuevaCategoria = cat.nombre;
    this.cdr.detectChanges();
  }

  async borrar(id?: number) {
    if (id) {
      const confirmar = confirm("¿Seguro que quieres eliminar esta categoría?");
      if (confirmar) {
        await this.servicio.eliminarCategoria(id);
        await this.cargarCategorias();
      }
    }
  }
}