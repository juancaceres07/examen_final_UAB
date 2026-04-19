import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CafeteriaService } from '../../servicios/cafeteria';
import { Producto, Pedido } from '../../db';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pedidos.html'
})
export class PedidosComponent implements OnInit {
  listaPedidos: Pedido[] = [];
  listaProductos: Producto[] = [];

  // Objeto para el formulario
  nuevoPedido: Pedido = {
    cliente: '',
    fecha: new Date().toLocaleDateString(),
    productoId: 0,
    cantidad: 1
  };

  constructor(private servicio: CafeteriaService) {}

  async ngOnInit() {
    this.cargarDatos();
  }

  async cargarDatos() {
    this.listaPedidos = await this.servicio.obtenerPedidos();
    this.listaProductos = await this.servicio.obtenerProductos();
  }

  async registrarPedido() {
    if (this.nuevoPedido.cliente && this.nuevoPedido.productoId > 0) {
      await this.servicio.guardarPedido({ ...this.nuevoPedido });
      // Reiniciar formulario
      this.nuevoPedido = { 
        cliente: '', 
        fecha: new Date().toLocaleDateString(), 
        productoId: 0, 
        cantidad: 1 
      };
      this.cargarDatos();
    } else {
      alert("Faltan datos para el pedido");
    }
  }

  getNombreProducto(id: number) {
    return this.listaProductos.find(p => p.id === id)?.nombre || 'Producto no encontrado';
  }
}