import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';

@Component({
    selector: 'perfil',
    templateUrl: './perfil.component.html',
    styleUrls: ['./perfil.component.css']
})

export class PerfilComponent implements OnInit {

    constructor(
        private usuarioService: UsuarioService) { }

    private me: Usuario;

    ngOnInit() {
        this.me = this.usuarioService.me()
    }

}
