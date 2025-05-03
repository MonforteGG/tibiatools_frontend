import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BackgroundComponent } from "../../components/background/background.component";
import { LayoutComponent } from '../../components/layout/layout.component';

type Category = 'blue' | 'green' | 'rashid';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule, BackgroundComponent, LayoutComponent],
  templateUrl: './loot-classifier.component.html',
  styleUrls: ['./loot-classifier.component.css'],
})
export class LootClassifierComponent {
  selectedFile: File | null = null;
  processedImageUrl: string | null = null;
  loading = false;
  dragOver = false;
  currentYear: number = new Date().getFullYear();

  lootDetected: Record<string, LootItem> = {};

  groupedLoot: Record<Category, { name: string; item: LootItem }[]> = {
    blue: [],
    green: [],
    rashid: [],
  };
  

  readonly categories: Category[] = ['green', 'blue', 'rashid'];

  constructor(private http: HttpClient) {}


  getDjinnGif(category: string): string {
    switch (category) {
      case 'blue':
        return 'https://tibiopedia.pl/images/static/monsters/blue_djinn.gif';
      case 'green':
        return 'https://tibiopedia.pl/images/static/monsters/green_djinn.gif';
      case 'rashid':
        return 'https://tibiapal.com/images/Rashid.gif'; 
      default:
        return '';
    }
  }
  
  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.dragOver = true;
  }

  onDragLeave() {
    this.dragOver = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.dragOver = false;
    const file = event.dataTransfer?.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onUpload() {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.loading = true;

    this.http
      .post<{ detections: Record<string, LootItem> }>(
        '/api/process-json',
        formData
      )
      .subscribe({
        next: (response) => {
          this.processLootResponse(response.detections);
          this.loading = false;
        },
        error: (err) => {
          console.error('Upload failed', err);
          alert('Error processing image.');
          this.loading = false;
        },
      });

    this.http
      .post('/api/process-image', formData, {
        responseType: 'blob',
      })
      .subscribe({
        next: (blob) => {
          this.processedImageUrl = URL.createObjectURL(blob);
        },
        error: (err) => {
          console.error('Failed to fetch processed image', err);
        },
      });
  }

  processLootResponse(detections: Record<string, LootItem>) {
    this.lootDetected = detections;
    this.groupedLoot = { blue: [], green: [], rashid: [] };

    for (const [name, item] of Object.entries(detections)) {
      if (item.category === 'blue') {
        this.groupedLoot.blue.push({ name, item });
      } else if (item.category === 'green') {
        this.groupedLoot.green.push({ name, item });
      } else if (item.category === 'rashid') {
        this.groupedLoot.rashid.push({ name, item });
      }
    }
  }

  resetForm() {
    this.selectedFile = null;
    this.processedImageUrl = null;
    this.lootDetected = {};
    this.groupedLoot = { blue: [], green: [], rashid: [] };
  }

  formatFileSize(bytes: number): string {
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(2)} KB`;
    return `${(kb / 1024).toFixed(2)} MB`;
  }

  calculateTotal(items: { name: string; item: LootItem }[]): number {
    return items.reduce(
      (sum, current) => sum + current.item.price * current.item.quantity,
      0
    );
  }

  calculateGrandTotal(): number {
    let total = 0;
    for (const category of this.categories) {
      total += this.calculateTotal(this.groupedLoot[category]);
    }
    return total;
  }
  

  downloadImage() {
    if (!this.processedImageUrl) return;

    const link = document.createElement('a');
    link.href = this.processedImageUrl;
    link.download = 'processed_loot.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

interface LootItem {
  price: number;
  quantity: number;
  category: 'blue' | 'green' | 'rashid' | 'unknown';
}
