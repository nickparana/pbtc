import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TransportistasComponent } from './components/transportistas/transportistas.component';
import { ProductosComponent } from './components/productos/productos.component';
import { ProductoFormComponent } from './components/producto-form/producto-form.component';
import { HomeComponent } from './components/home/home.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { MapaComponent } from './components/mapa/mapa.component';
import { LoginComponent } from './components/login/login.component';
import { TransportistaDetailComponent } from './components/transportista-detail/transportista-detail.component';
import { ProductoDetailComponent } from './components/producto-detail/producto-detail.component';

import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard] },
  { path: 'mapa', component: MapaComponent, canActivate: [AuthGuard] },
  { path: 'transportista-detail/:userid', component: TransportistaDetailComponent, canActivate: [AuthGuard] },
  { path: 'producto-detail/:id', component: ProductoDetailComponent, canActivate: [AuthGuard] },
  { path: 'transportistas', component: TransportistasComponent, canActivate: [AuthGuard] },
  { path: 'productos', component: ProductosComponent, canActivate: [AuthGuard] },
  { path: 'producto-form', component: ProductoFormComponent, canActivate: [AuthGuard] }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }

