import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {PROIZVOD_URI} from '../constants';
import { Proizvod } from '../models/proizvod';

@Injectable
({
    providedIn: 'root'
})
export class ProizvodService
{
    constructor(private httpClient: HttpClient){}

    public getAllProizvod(): Observable<any>
    {
        return this.httpClient.get(`${PROIZVOD_URI}`);
    }
    public addProizvod(proizvod: Proizvod): Observable<any> 
    {
        proizvod.id=0;
        return this.httpClient.post (`${PROIZVOD_URI}`, proizvod);
    }
    public updateProizvod(proizvod: Proizvod): Observable<any> 
    {
        return this.httpClient.put (`${PROIZVOD_URI}`, proizvod);
    }
    public deleteProizvod(id: number): Observable<any> 
    {
        return this.httpClient.delete (`${PROIZVOD_URI}/${id}`);
    }
}