import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { Producto } from '../models/producto';

@Injectable()
export class ProductoService {

    private apiUrl = 'http://localhost:8080/PBTC-backend/producto/';
    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) { }

    //GET ALL

    // getProductos(): Observable<Producto[]> {
    getProductos(): Observable<Producto[]> {
        return this.http
            .get(this.apiUrl)
            .map(res => res.json())
            .catch(this.handleError);
    }

    //FIND BY ID

    getProducto(id: number): Observable<Producto> {       
        return this.http
            .get(this.apiUrl + id)
            .map(res => res.json())
            .catch(this.handleError);
    }

    //GET DISPONIBLES

    getProductosDisponibles(): Observable<Producto[]> {
        return this.http
            .get(this.apiUrl + 'disponibles')
            .map(res => res.json())
            .catch(this.handleError);
    }

    // CREAR PRODUCTO

    createProducto(body: Producto): Observable<Producto> {
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

    // UPDATE PRODUCTO

    updateProducto(body: Producto): Observable<Producto> {
        let bodyString = JSON.stringify(body);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({
            method: RequestMethod.Put,
            headers: headers
        });

        return this.http
            .put(this.apiUrl + body.id, bodyString, options)
            .map(res => res.json())
            .catch(this.handleError)

    }

    // DELETE CARGA

    deleteProducto(body: Producto): Observable<Producto> {
        let bodyString = JSON.stringify(body);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({
            method: RequestMethod.Delete,
            headers: headers
        });

        return this.http
            .delete(this.apiUrl + body.id, options)
            .map(res => res.json())
            .catch(this.handleError)
    }

    // HANDLE ERROR

    private handleError(error: Response | any) {
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
