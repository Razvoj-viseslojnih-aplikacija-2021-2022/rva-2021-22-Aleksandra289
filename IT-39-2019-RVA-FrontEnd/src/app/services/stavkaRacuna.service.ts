import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { STAVKA_FOR_RACUN_URI, STAVKA_RACUNA_URI } from "../constants";
import { StavkaRacuna } from "../models/stavkaRacuna";

@Injectable
({
    providedIn: 'root'
})
export class StavkaRacunaService
{
    constructor(private httpClient: HttpClient){}

    public getStavkaRacunaByRacun(idRacuna: number): Observable<any>
    {
        return this.httpClient.get(`${STAVKA_FOR_RACUN_URI}/${idRacuna}`);
    }
    public addStavkaRacuna(stavkaRacuna: StavkaRacuna): Observable<any> 
    {
        stavkaRacuna.id=0;
        return this.httpClient.post (`${STAVKA_RACUNA_URI}`, stavkaRacuna);
    }
    public updateStavkaRacuna(stavkaRacuna: StavkaRacuna): Observable<any> 
    {
        return this.httpClient.put (`${STAVKA_RACUNA_URI}`, stavkaRacuna);
    }
    public deleteStavkaRacuna(id: number): Observable<any> 
    {
        return this.httpClient.delete (`${STAVKA_RACUNA_URI}/${id}`);
    }
}