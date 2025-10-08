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
  private totalPages = 18; // Increased to 18 pages
  isModalOpen = false;
  modalContent: HTMLElement | null = null;
  currentImageIndex = 0;
  totalImages = 0;
  isCarouselModal = false;
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
    const pageIds = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen'];
    const pageId = `page${pageNumber}`;
    const checkboxId = pageIds[pageNumber - 1];

    const pageElement = document.getElementById(pageId);
    const checkbox = document.getElementById(checkboxId) as HTMLInputElement;

    if (pageElement) {
      const sideToShow = checkbox.checked ? '.back' : '.front';
      const contentElement = pageElement.querySelector(sideToShow);
      if (contentElement) {
        this.modalContent = contentElement.cloneNode(true) as HTMLElement;

        // Check if this is a page with carousel mode (pages 2, 3, 4, 5 back)
        this.isCarouselModal = ((pageNumber === 2 || pageNumber === 3 || pageNumber === 4 || pageNumber === 5) && checkbox.checked) ||
                             ((pageNumber >= 6 && pageNumber <= 17) && checkbox.checked);

        if (this.isCarouselModal) {
          const images = this.modalContent.querySelectorAll('img');
          this.totalImages = images.length;
          this.currentImageIndex = 0;
        }

        this.isModalOpen = true;
        setTimeout(() => {
          this.renderer.appendChild(this.modalBody.nativeElement, this.modalContent);
          if (this.isCarouselModal) {
            this.updateCarousel();
          }
        });
      }
    }
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.isCarouselModal = false;
    this.currentImageIndex = 0;
    this.totalImages = 0;
    if (this.modalBody && this.modalBody.nativeElement) {
      this.renderer.setProperty(this.modalBody.nativeElement, 'innerHTML', '');
    }
    this.modalContent = null;
  }

  nextImage(): void {
    if (this.isCarouselModal && this.currentImageIndex < this.totalImages - 1) {
      this.currentImageIndex++;
      this.updateCarousel();
    }
  }

  previousImage(): void {
    if (this.isCarouselModal && this.currentImageIndex > 0) {
      this.currentImageIndex--;
      this.updateCarousel();
    }
  }

  private updateCarousel(): void {
    if (this.modalBody && this.modalBody.nativeElement) {
      const images = this.modalBody.nativeElement.querySelectorAll('img');
      images.forEach((img: HTMLElement, index: number) => {
        if (index === this.currentImageIndex) {
          this.renderer.setStyle(img, 'display', 'block');
        } else {
          this.renderer.setStyle(img, 'display', 'none');
        }
      });
    }
  }

  private updatePageState(): void {
    const pageIds = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen'];

    pageIds.forEach((pageId, index) => {
      const checkbox = document.getElementById(pageId) as HTMLInputElement;
      if (checkbox) {
        checkbox.checked = index < this.currentPage;
      }
    });
  }
}
