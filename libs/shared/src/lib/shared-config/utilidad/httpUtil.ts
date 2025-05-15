import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class HttpUtil {
    constructor(public http:HttpClient) {}
    
    getHeaders(): HttpHeaders {
        const token = sessionStorage.getItem('token');
        return new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
    }
    
    // Método general para GET
    get<T>(url: string): Observable<T> {
        const headers = this.getHeaders();
        return this.http.get<T>(url, { headers });
    }
    
    // Método general para POST
    post<T>(url: string, body: any): Observable<T> {
        const headers = this.getHeaders();
        return this.http.post<T>(url, body, { headers });
    }

    // Método general para PUT
    put<T>(url: string, body: any): Observable<T> {
        const headers = this.getHeaders();
        return this.http.put<T>(url, body, { headers });
    }
}