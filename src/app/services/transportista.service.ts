import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { Producto } from '../models/producto';
import { Transportista } from '../models/transportista';
import { AuthHttp } from 'angular2-jwt';


@Injectable()
export class TransportistaService {

    private apiUrl = 'http://localhost:8000/api/transportistas/';
    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(
        private http: Http,
        private authHttp: AuthHttp
        ) { }

    //GET ALL

    getTransportistas(): Observable<Transportista[]> {
        return this.http
            .get(this.apiUrl)
            .map(res => res.json())
            .catch(this.handleError);
    }

    //FIND BY ID (USERID. NO _ID DE MONGO)

    getTransportista(id: string): Observable<Transportista> {
        return this.http
            .get(this.apiUrl + 'userid/' + id)
            .map(res => res.json())
            .catch(this.handleError);
    }   

    // ADD TRANSPORTISTA (CREATE)

    createTransportista(body: Transportista): Observable<Transportista> {
        let bodyString = JSON.stringify(body);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({
            method: RequestMethod.Post,
            headers: headers
        });

        return this.http
            .post(this.apiUrl, bodyString, options)
            .map(res => res.json())
            .catch(this.handleError)
    }

    // UPDATE TRANSPORTISTA

    updateTransportista(body: Transportista): Observable<Transportista> {      
        let bodyString = JSON.stringify(body);    
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({
            method: RequestMethod.Put,
            headers: headers
        });

        return this.authHttp
            .put(this.apiUrl + body._id, bodyString, options)
            .map(res => res.json())
            .catch(this.handleError);
    }

    // DELETE TRANSPORTISTA

    deleteTransportista(body: Transportista): Observable<Transportista> {
        let bodyString = JSON.stringify(body);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({
            method: RequestMethod.Delete,
            headers: headers
        });

        return this.http
            .delete(this.apiUrl + body._id, options)
            .map(res => res.json())
            .catch(this.handleError);
    }    


    // HANDLE ERROR OBSERVABLES

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
