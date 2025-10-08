import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-access',
  imports: [CommonModule, FormsModule],
  templateUrl: './access.component.html',
  styleUrl: './access.component.css'
})
export class AccessComponent {
  password: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    if (!this.password.trim()) {
      this.errorMessage = 'Por favor ingresa la clave';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    // Simulate a small delay for better UX
    setTimeout(() => {
      const isAuthenticated = this.authService.login(this.password);

      if (isAuthenticated) {
        this.router.navigate(['/fotos-de-las-fotos']);
      } else {
        this.errorMessage = 'Clave incorrecta. Intenta nuevamente.';
        this.password = '';
      }

      this.isLoading = false;
    }, 800);
  }

  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.onSubmit();
    }
  }
}
