import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { AuthService } from '../../services/auth.service';

import { Headers, Http, Response, Request, RequestOptions, RequestMethod } from '@angular/http';

@Component({
    selector: 'login-form',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent {

    private usuario = new Usuario('', '', '', '', '');
    private loginError: boolean;

    private id_token: any;

    constructor(
        private authService: AuthService,
        private router: Router) {
        this.loginError = false;
    }

    ngOnInit() {
        if (localStorage.getItem("id_token") !== null)
            this.router.navigate(['/home']);
    }

    login() {
        this.authService.login(this.usuario.userid, this.usuario.password)
            .subscribe(result => {
                if (result === true) {
                    (id_token: any) => this.id_token = id_token;
                    () => this.authService.useJwtHelper()
                }
                else {
                    this.loginError = true;
                }
            },
            error => console.log(error));
    }
}