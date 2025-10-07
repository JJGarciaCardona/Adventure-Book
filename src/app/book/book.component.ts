import { AfterViewInit, Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css',
})
export class BookComponent implements AfterViewInit {
  private currentPage = 0;
  private totalPages = 5;
  isModalOpen = false;
  modalContent: HTMLElement | null = null;
  @ViewChild('modalBody', { static: false }) modalBody!: ElementRef;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    // Remove the click event listener to disable book clicking
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePageState();
    }
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.updatePageState();
    }
  }

  openModal(pageNumber: number): void {
    const pageIds = ['one', 'two', 'three', 'four', 'five'];
    const pageId = `page${pageNumber}`;
    const checkboxId = pageIds[pageNumber - 1];

    const pageElement = document.getElementById(pageId);
    const checkbox = document.getElementById(checkboxId) as HTMLInputElement;

    if (pageElement) {
      const sideToShow = checkbox.checked ? '.back' : '.front';
      const contentElement = pageElement.querySelector(sideToShow);
      if (contentElement) {
        this.modalContent = contentElement.cloneNode(true) as HTMLElement;
        this.isModalOpen = true;
        // Use timeout to ensure modalBody is available in the DOM
        setTimeout(() => {
          this.renderer.appendChild(this.modalBody.nativeElement, this.modalContent);
        });
      }
    }
  }

  closeModal(): void {
    this.isModalOpen = false;
    if (this.modalBody && this.modalBody.nativeElement) {
      this.renderer.setProperty(this.modalBody.nativeElement, 'innerHTML', '');
    }
    this.modalContent = null;
  }

  private updatePageState(): void {
    const pageIds = ['one', 'two', 'three', 'four', 'five'];

    pageIds.forEach((pageId, index) => {
      const checkbox = document.getElementById(pageId) as HTMLInputElement;
      if (checkbox) {
        checkbox.checked = index < this.currentPage;
      }
    });
  }
}
