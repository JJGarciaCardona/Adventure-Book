import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent {
  isCoverOpen = false;
  currentPage = 0;
  totalPages = 6;
  closingPage: number | null = null;

  toggleCover() {
    this.isCoverOpen = !this.isCoverOpen;
    if (this.isCoverOpen) {
      this.currentPage = 1;
    } else {
      this.currentPage = 0;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.closingPage = null; // Resetea la página que se cierra
      if (this.currentPage === 0) {
        // Si el libro está cerrado, primero lo abrimos
        this.isCoverOpen = true;
      }
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.closingPage = this.currentPage; // Marca la página actual para la animación de cierre
      if (this.currentPage === 1) {
        // Si estamos en la primera página, cerramos la cubierta
        this.isCoverOpen = false;
      }
      this.currentPage--;
    }
  }

  // Método para determinar si una página específica debe voltearse
  shouldTurn(pageIndex: number): boolean {
    return this.isCoverOpen && pageIndex <= this.currentPage;
  }

  // Método para determinar si una página se está cerrando
  isClosing(pageIndex: number): boolean {
    return this.closingPage === pageIndex;
  }
}
