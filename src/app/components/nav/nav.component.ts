import { Component, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UsuarioService } from '../../services/usuario.service';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';

@Component({
    selector: 'nav-root',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css']
})

export class NavComponent {

    @Input()
    me: any;

    constructor(
        private authService: AuthService,
        private usuarioService: UsuarioService) {
        this.usuarioService.showMe
            .subscribe((me:any) => this.me = me);
    }

    private jwtHelper: JwtHelper = new JwtHelper();

    // @Input()
    // private me: string = localStorage.getItem('id_token') ? this.jwtHelper.decodeToken(localStorage.getItem('id_token'))._doc : "N.N.";

    logOut() {
        this.authService.logout();
    }


}