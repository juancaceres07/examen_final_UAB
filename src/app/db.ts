import Dexie, { Table } from 'dexie';

export interface Categoria { id?: number; nombre: string; }
export interface Producto { id?: number; nombre: string; precio: number; categoriaId: number; }
export interface Pedido { id?: number; cliente: string; fecha: string; productoId: number; cantidad: number; }

export class CafeteriaDatabase extends Dexie {
  categorias!: Table<Categoria>;
  productos!: Table<Producto>; 
  pedidos!: Table<Pedido>;

  constructor() {
    super('CafeteriaDB');
    this.version(1).stores({
      categorias: '++id, nombre',
      productos: '++id, nombre, precio, categoriaId', 
      pedidos: '++id, cliente, productoId'
    });
  }
}

export const db = new CafeteriaDatabase();