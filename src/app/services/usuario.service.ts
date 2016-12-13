import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http, Response, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { Usuario } from '../models/usuario';
import { AuthHttp, JwtHelper, tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class UsuarioService {

    private apiUrl = 'http://localhost:8000/api/usuarios/';
    private jwtHelper: JwtHelper = new JwtHelper();

    public showMe: EventEmitter<any> = new EventEmitter();

    constructor(private authHttp: AuthHttp) { }

    getUsuarios(): Observable<Usuario[]> {
        return this.authHttp
            .get(this.apiUrl)
            .map(res => res.json())
            .catch(this.handleError);
    }
    

    me() {
        let token: any;
        let me: any;
        if (tokenNotExpired()) {
            token = localStorage.getItem('id_token');
            me = this.jwtHelper.decodeToken(token)._doc;            
        }
        //console.log(me);    
        return me;
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
