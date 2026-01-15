import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TicketService } from '../../services/ticket.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {
  tickets: any[] = [];
  newTicket = { title: '', description: '' };
  username = '';

  constructor(
    private ticketService: TicketService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    const user = this.authService.getUser();
    if (user) {
      this.username = user.username;
    }
    this.loadTickets();
  }

  loadTickets() {
    this.ticketService.getTickets().subscribe({
      next: (data) => this.tickets = data,
      error: (err) => console.error('Failed to fetch tickets', err)
    });
  }

  createTicket() {
    this.ticketService.createTicket(this.newTicket).subscribe({
      next: (res) => {
        console.log('Ticket Created:', res);
        this.newTicket = { title: '', description: '' }; // Reset form
        this.loadTickets(); // Refresh list
      },
      error: (err) => console.error('Failed to create ticket', err)
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}