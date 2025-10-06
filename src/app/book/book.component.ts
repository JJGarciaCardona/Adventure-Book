import { AfterViewInit, Component } from '@angular/core';
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
