import { NgModule } from '@angular/core';
import './rxjs-extensions';
//Imports
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { PaginationModule } from 'ng2-bootstrap/components/pagination';
import { Ng2TableModule } from 'ng2-table/components/ng-table-module';
//Declarations
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { MapaComponent } from './components/mapa/mapa.component';
import { LoginComponent } from './components/login/login.component';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { CargasComponent } from './components/cargas/cargas.component';
import { CargaFormComponent } from './components/carga-form/carga-form.component';
import { CargaDetailComponent } from './components/carga-detail/carga-detail.component';
import { TransportistasComponent } from './components/transportistas/transportistas.component';
import { TransportistaDetailComponent } from './components/transportista-detail/transportista-detail.component';
import { MapComponent } from './components/map/map.component';
import { TableComponent } from './components/table/table.component';
//Providers
// import { AUTH_PROVIDERS,} from 'angular2-jwt';
import { AuthHttp, provideAuth } from 'angular2-jwt';
import { AuthGuard } from './guards/auth.guard';
import { UsuarioService } from './services/usuario.service';
import { CargaService } from './services/carga.service';
import { TransportistaService } from './services/transportista.service';
import { AuthService } from './services/auth.service';

@NgModule({
    imports: [
        AppRoutingModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        PaginationModule,
        Ng2TableModule,
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        MapaComponent,
        LoginComponent,
        NavComponent,
        FooterComponent,
        CargasComponent,
        CargaFormComponent,
        CargaDetailComponent,
        TransportistasComponent,
        TransportistaDetailComponent,
        MapComponent,
        TableComponent
    ],
    bootstrap: [AppComponent],
    providers: [
        AuthHttp,
        provideAuth({
            headerName: 'Authorization',
            headerPrefix: 'Bearer',
            tokenName: 'id_token',
            tokenGetter: (() => localStorage.getItem('id_token')),
            globalHeaders: [{ 'Content-Type': 'application/json' }],
            noJwtError: true
        }),
        AuthGuard,
        UsuarioService,
        CargaService,
        TransportistaService,        
        AuthService
    ]
})

export class AppModule { }

