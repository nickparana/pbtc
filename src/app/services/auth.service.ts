import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Headers, Http, Response, Request, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../services/usuario.service';
import { AuthHttp, JwtHelper, tokenNotExpired } from 'angular2-jwt';


@Injectable()
export class AuthService {

    private usuarios: Usuario[];
    private errorMessage: string;
    private jwtHelper: JwtHelper = new JwtHelper();

    constructor(
        private http: Http,
        private authHttp: AuthHttp,
        private router: Router,
        private usuarioService: UsuarioService
    ) { }

    logout() {
        localStorage.removeItem("id_token");
        this.router.navigate(['/login']);
    }

    login(userid: string, password: string): Observable<boolean> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({
            method: RequestMethod.Post,
            headers: headers
        });

        return this.http.post('http://localhost:8080/api/authenticate',
            JSON.stringify({ userid: userid, password: password }), options)
            .map((res: Response) => {
                let id_token = res.json().id_token;
                if (id_token) {
                    localStorage.setItem('id_token', id_token);
                    this.router.navigate(['/home']);
                    this.usuarioService.showMe.emit( this.usuarioService.me());
                    return true;
                }
                return false;
            })
            .catch(this.handleError);
    }

    loggedIn() {
        this.usuarioService.showMe.emit( this.usuarioService.me());
        return tokenNotExpired();
    }

    getUsuarios(): Observable<Usuario[]> {
        return this.authHttp
            .get('http://localhost:8080/api/usuarios')
            .map(res => res.json())
            .catch(this.handleError);
    }

    useJwtHelper() {
        let id_token = localStorage.getItem('id_token');

        console.log(
            'Decoded:',
            this.jwtHelper.decodeToken(id_token),
            'Exp Date:',
            this.jwtHelper.getTokenExpirationDate(id_token),
            'Is Expired?:',
            this.jwtHelper.isTokenExpired(id_token)
        );
    }

    private handleError(error: Response | any) {  // SACADO DE ANG2 DOC    
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }




}