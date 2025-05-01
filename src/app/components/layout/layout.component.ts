import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-layout',
  imports: [CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  @Input() headerImage: string = '';
  @Input() headerTitle: string = '';
  @Input() headerSubtitle: string = '';
  
  currentYear: number = new Date().getFullYear();
}



