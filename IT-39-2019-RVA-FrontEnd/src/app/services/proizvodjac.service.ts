import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {PROIZVODJAC_URI} from '../constants';
import { Proizvodjac } from '../models/proizvodjac';

@Injectable
({
    providedIn: 'root'
})
export class ProizvodjacService
{
    constructor(private httpClient: HttpClient){}

    public getAllProizvodjac(): Observable<any>
    {
        return this.httpClient.get(`${PROIZVODJAC_URI}`);
    }
    public addProizvodjac(proizvodjac: Proizvodjac): Observable<any> 
    {
        proizvodjac.id=0;
        return this.httpClient.post (`${PROIZVODJAC_URI}`, proizvodjac);
    }
    public updateProizvodjac(proizvodjac: Proizvodjac): Observable<any> 
    {
        return this.httpClient.put (`${PROIZVODJAC_URI}`, proizvodjac);
    }
    public deleteProizvodjac(id: number): Observable<any> 
    {
        return this.httpClient.delete (`${PROIZVODJAC_URI}/${id}`);
    }
     
    
}