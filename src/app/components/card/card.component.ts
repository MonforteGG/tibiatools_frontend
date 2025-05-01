import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  imports: [CommonModule],
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input() title: string = '';
}
