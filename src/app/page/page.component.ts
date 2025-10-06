import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page.component.html',
  styleUrl: './page.component.css',
})
export class PageComponent {
  @Input({ required: true }) position!: string; // 'left' or 'right'
  @Input() isCollage!: boolean;
  @Input() images!: string[];
  @Input() content!: string;
}
