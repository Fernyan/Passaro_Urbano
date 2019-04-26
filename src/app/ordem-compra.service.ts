import { Injectable } from '@angular/core' 
import { HttpClient, HttpRequest, HttpHeaders  } from '@angular/common/http'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { URL_API } from './app.api' 

import { Pedido } from './shared/pedido.model' 

@Injectable()
export class OrdemCompraService {

    constructor(private http: HttpClient){ }

    public efetivarCompra(pedido: Pedido): Observable<number> {
        
        let headers: HttpHeaders = new HttpHeaders()
 
        headers.append('Content-type','applicartion.json')
        
        return this.http.post<any>(
            `${URL_API}/pedidos`,
            (pedido),
            ({headers: headers})
        )
        .pipe(map( (resposta: any) => resposta.id ))
    }
}