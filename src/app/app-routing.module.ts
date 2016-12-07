import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TransportistasComponent } from './components/transportistas/transportistas.component';
import { CargasComponent } from './components/cargas/cargas.component';
import { CargaFormComponent } from './components/carga-form/carga-form.component';
import { HomeComponent } from './components/home/home.component';
import { MapaComponent } from './components/mapa/mapa.component';
import { LoginComponent } from './components/login/login.component';
import { TransportistaDetailComponent } from './components/transportista-detail/transportista-detail.component';
import { CargaDetailComponent } from './components/carga-detail/carga-detail.component';

import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'mapa', component: MapaComponent, canActivate: [AuthGuard] },
  { path: 'transportista-detail/:userid', component: TransportistaDetailComponent, canActivate: [AuthGuard] },
  { path: 'carga-detail/:codigo', component: CargaDetailComponent, canActivate: [AuthGuard] },
  { path: 'transportistas', component: TransportistasComponent, canActivate: [AuthGuard] },
  { path: 'cargas', component: CargasComponent, canActivate: [AuthGuard] },
  { path: 'carga-form', component: CargaFormComponent, canActivate: [AuthGuard] }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }

