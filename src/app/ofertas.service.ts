import { Injectable } from '@angular/core'
import { HttpClient, HttpResponse, HttpEvent } from '@angular/common/http'
import { Oferta } from './shared/oferta.model'
import { Observable } from 'rxjs'

import { URL_API } from './app.api'

import 'rxjs/add/operator/toPromise'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/retry'

@Injectable()
export class OfertasService {

    constructor(private http: HttpClient){ }
    
    public getOfertas(): Promise<Oferta[]> {
        //efetuar uma requisicao http
        return this.http.get(`${URL_API}/ofertas?destaque=true`) 
            .toPromise()
            .then( (resposta: any) => resposta)
        //retornar uma promisse Oferta[]
    }

    public getOfertasPorCategoria(categoria: string) : Promise<Oferta[]> {
        return this.http.get(`${URL_API}/ofertas?categoria=${categoria}`)
            .toPromise()
            .then((resposta: any) => resposta)
    }

    public getOfertasPorId(id: number): Promise<Oferta> {
        return this.http.get(`${URL_API}/ofertas?id=${id}`)
            .toPromise()
            .then( (resposta: any) => {
                return resposta[0]
            })
    }

    public getComoUsarOfertaPorId(id: number): Promise<string> {
        return this.http.get(`${URL_API}/como-usar?id=${id}`)
            .toPromise()
            .then( (resposta: any) => {
                return resposta[0].descricao
        })
    }

    public getOndeFicaOfertaPorId(id: number): Promise<string> {
        return this.http.get(`${URL_API}/onde-fica?id=${id}`)
            .toPromise()
            .then( (resposta: any) => {
                return resposta[0].descricao
        })
    }
    
    public pesquisaOfertas(termo: string): Observable<Oferta[]> {
        return this.http.get(`${URL_API}/ofertas?descricao_oferta_like=${termo}`)
            .retry(10)
            .map( (resposta: any) => resposta )
    }
}