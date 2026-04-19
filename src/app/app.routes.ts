import { Routes } from '@angular/router';
import { CategoriasComponent } from './componentes/categorias/categorias';
import { ProductosComponent } from './componentes/productos/productos';
import { PedidosComponent } from './componentes/pedidos/pedidos';

export const routes: Routes = [
  { path: 'categorias', component: CategoriasComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'pedidos', component: PedidosComponent },
  { path: '', redirectTo: '/categorias', pathMatch: 'full' } // Redirige al inicio
];