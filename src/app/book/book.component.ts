import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from "../page/page.component";

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule, PageComponent],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent {
  isCoverOpen = false;
  initialState = true;

  nextPage() {
    if (!this.isCoverOpen) {
      this.isCoverOpen = true;
      this.initialState = false;
    }
  }

  prevPage() {
    if (this.isCoverOpen) {
      this.isCoverOpen = false;
    }
  }
}
