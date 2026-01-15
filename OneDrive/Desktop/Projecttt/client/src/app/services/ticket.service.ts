import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class TicketService {
    private apiUrl = '/api/tickets';

    constructor(private http: HttpClient, private authService: AuthService) { }

    private getHeaders(): HttpHeaders {
        const token = this.authService.getToken();
        return new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
    }

    getTickets(): Observable<any[]> {
        // In a real app, we should send the token. 
        // For now, our backend is public, but let's practice good habits:
        return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() });
    }

    createTicket(ticket: any): Observable<any> {
        // We need to inject the userId manually until the backend extracts it from JWT
        const user = this.authService.getUser();
        if (user && user.id) {
            ticket.userId = user.id;
        }

        return this.http.post<any>(this.apiUrl, ticket, { headers: this.getHeaders() });
    }
}
