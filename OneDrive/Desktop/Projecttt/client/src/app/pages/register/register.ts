import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) { }

  onRegister() {
    const user = {
      username: this.username,
      email: this.email,
      password: this.password
    };

    this.authService.register(user).subscribe({
      next: (res) => {
        console.log('Register Success:', res);
        alert('Registration Successful! Please Login.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Register Failed:', err);
        this.errorMessage = err.error.message || 'Registration failed';
      }
    });
  }
}