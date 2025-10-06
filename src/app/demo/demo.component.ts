import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [],
  templateUrl: './demo.component.html',
  styleUrl: './demo.component.css'
})
export class DemoComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    const book = document.getElementById('book');
    if (book) {
      book.addEventListener('click', function() {
        this.style.pointerEvents = "none";
        setTimeout(() => {
          this.style.pointerEvents = "";
        }, 2000);
      });
    }
  }
}
