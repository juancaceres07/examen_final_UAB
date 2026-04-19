import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { db, Producto, Categoria } from '../../db'; 

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './productos.html',
  styleUrl: './productos.css'
})
export class ProductosComponent implements OnInit {
  
  listaProductos: any[] = [];
  listaCategorias: Categoria[] = [];

  
  idEnEdicion: number | undefined = undefined;

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
    this.listaProductos = await db.productos.toArray();
    this.listaCategorias = await db.categorias.toArray();
    this.cdr.detectChanges(); 
  }

  
  async agregar() {
    if (this.nuevoProducto.nombre && this.nuevoProducto.nombre.trim().length > 0) {
      try {
        
        await db.productos.put({
          id: this.idEnEdicion, 
          nombre: this.nuevoProducto.nombre,
          precio: Number(this.nuevoProducto.precio) || 0,
          categoriaId: Number(this.nuevoProducto.categoriaId) || 0
        });

        
        this.nuevoProducto = { nombre: '', precio: 0, categoriaId: 0 };
        this.idEnEdicion = undefined;
        
        await this.cargarDatos();
        alert("¡Operación realizada con éxito!");
      } catch (error) {
        console.error("Error al guardar:", error);
      }
    } else {
      alert("Por favor, llena el nombre del producto.");
    }
  }

  
  async editar(prod: any) {
    
    this.idEnEdicion = prod.id;
    this.nuevoProducto.nombre = prod.nombre;
    this.nuevoProducto.precio = prod.precio;
    this.nuevoProducto.categoriaId = prod.categoriaId;
    
    
    console.log("Editando producto ID:", prod.id);
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

  getNombreCategoria(id: number): string {
    const cat = this.listaCategorias.find(c => c.id === Number(id));
    return cat ? cat.nombre : 'Sin categoría';
  }
}