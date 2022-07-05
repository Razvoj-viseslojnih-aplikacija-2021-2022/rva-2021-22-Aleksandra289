import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {RACUN_URI} from '../constants';
import { Racun } from '../models/racun';

@Injectable
({
    providedIn: 'root'
})
export class RacunService
{
    constructor(private httpClient: HttpClient){}

    public getAllRacun(): Observable<any>
    {
        return this.httpClient.get(`${RACUN_URI}`);
    }
    public addRacun(racun: Racun): Observable<any> 
    {
        racun.id=0;
        return this.httpClient.post (`${RACUN_URI}`, racun);
    }
    public updateRacun(racun: Racun): Observable<any> 
    {
        return this.httpClient.put (`${RACUN_URI}`, racun);
    }
    public deleteRacun(id: number): Observable<any> 
    {
        return this.httpClient.delete (`${RACUN_URI}/${id}`);
    }
}