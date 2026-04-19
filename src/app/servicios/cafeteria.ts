import { Injectable } from '@angular/core';
import { db, Categoria, Producto, Pedido } from '../db';

@Injectable({
  providedIn: 'root'
})
export class CafeteriaService {

  constructor() { }

  // --- CRUD CATEGORIAS ---
  async obtenerCategorias() {
    return await db.categorias.toArray();
  }

  async guardarCategoria(categoria: Categoria) {
    return await db.categorias.add(categoria);
  }

  async eliminarCategoria(id: number) {
    return await db.categorias.delete(id);
  }

  // --- CRUD PRODUCTOS ---
  async obtenerProductos() {
    return await db.productos.toArray();
  }

  async guardarProducto(producto: Producto) {
    return await db.productos.add(producto);
  }

  async eliminarProducto(id: number) {
    return await db.productos.delete(id);
  }

  // --- CRUD PEDIDOS ---
  async obtenerPedidos() {
    return await db.pedidos.toArray();
  }

  async guardarPedido(pedido: Pedido) {
    return await db.pedidos.add(pedido);
  }

  // --- DENTRO DE LA CLASE CafeteriaService ---

async actualizarCategoria(id: number, cambios: Partial<Categoria>) {
  return await db.categorias.update(id, cambios);
}

async actualizarProducto(id: number, cambios: Partial<Producto>) {
  return await db.productos.update(id, cambios);
}
}