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
  ngAfterViewInit(): void {
    const book = document.getElementById('book');
    if (book) {
      book.addEventListener('click', function () {
        this.style.pointerEvents = 'none';
        setTimeout(() => {
          this.style.pointerEvents = '';
        }, 2000);
      });
    }
  }
}
