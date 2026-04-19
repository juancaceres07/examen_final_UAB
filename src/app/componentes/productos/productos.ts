import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { db, Producto, Categoria } from '../../db'; // Ajusta la ruta si es necesario

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './productos.html',
  styleUrl: './productos.css'
})
export class ProductosComponent implements OnInit {
  // Lista para mostrar en la tabla
  listaProductos: any[] = [];
  listaCategorias: Categoria[] = [];

  // Objeto para el formulario
  nuevoProducto: Producto = {
    nombre: '',
    precio: 0,
    categoriaId: 0
  };

  constructor(private cdr: ChangeDetectorRef) {}

  async ngOnInit() {
    await this.cargarDatos();
  }

  async cargarDatos() {
    // Cargamos productos y categorías de la base de datos
    this.listaProductos = await db.productos.toArray();
    this.listaCategorias = await db.categorias.toArray();
    this.cdr.detectChanges(); // Forzamos actualización de la vista
  }

  async agregar() {
    // Forzamos a Angular a leer los inputs antes de validar
    this.cdr.detectChanges();

    if (this.nuevoProducto.nombre && this.nuevoProducto.nombre.trim().length > 0) {
      try {
        await db.productos.add({
          nombre: this.nuevoProducto.nombre,
          precio: Number(this.nuevoProducto.precio) || 0,
          categoriaId: Number(this.nuevoProducto.categoriaId) || 0
        });

        // Limpiamos los campos
        this.nuevoProducto = { nombre: '', precio: 0, categoriaId: 0 };
        
        // Refrescamos la tabla y la vista
        await this.cargarDatos();
        this.cdr.detectChanges();

        alert("¡Producto guardado con éxito!");
      } catch (error) {
        console.error("Error al guardar:", error);
      }
    } else {
      alert("Por favor, llena el nombre del producto.");
    }
  }

  async editar(prod: any) {
    const nuevoNombre = prompt("Editar nombre:", prod.nombre);
    const nuevoPrecio = prompt("Editar precio:", prod.precio);

    if (nuevoNombre && nuevoPrecio && prod.id) {
      await db.productos.update(prod.id, { 
        nombre: nuevoNombre, 
        precio: Number(nuevoPrecio) 
      });
      await this.cargarDatos();
      alert("Producto actualizado");
    }
  }

  async borrar(id?: number) {
    if (id) {
      const confirmar = confirm("¿Estás seguro de eliminar este producto?");
      if (confirmar) {
        await db.productos.delete(id);
        await this.cargarDatos();
      }
    }
  }

  // Función para mostrar el nombre de la categoría en lugar del ID en la tabla
  getNombreCategoria(id: number): string {
    const cat = this.listaCategorias.find(c => c.id === Number(id));
    return cat ? cat.nombre : 'Sin categoría';
  }
}