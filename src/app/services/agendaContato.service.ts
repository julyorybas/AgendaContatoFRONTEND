import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgendaContato } from '../models/AgendaContato';
import { Observable } from 'rxjs';

@Injectable()
export class agendaContatoService {
    //elementApiUrl = 'https://localhost:44334/api/Contato';
    elementApiUrl = "api/Contato";
    constructor(private http: HttpClient) { }

    getElements(): Observable<AgendaContato[]> {
        return this.http.get<AgendaContato[]>(this.elementApiUrl);
    }

    creatElements(element: AgendaContato): Observable<AgendaContato> {
        return this.http.post<AgendaContato>(this.elementApiUrl, element);
    }

    editElement(element: AgendaContato): Observable<AgendaContato> {
        return this.http.put<AgendaContato>(this.elementApiUrl, element);
    }

    deleteElement(id: number): Observable<any> {
        return this.http.delete<any>(`${this.elementApiUrl}?id=${id}`);
    }
}