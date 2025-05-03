import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  currentImage: string = '';
  darkMode: boolean = true;
  showMenu = false;


  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  toggleImage(): void {
    this.darkMode = !this.darkMode;
    this.applyTheme();
    localStorage.setItem('theme', this.darkMode ? 'dark' : 'light');
  }

  ngOnInit(): void {
    const savedTheme = localStorage.getItem('theme');
    this.darkMode = savedTheme === 'dark' || savedTheme === null; // Por defecto, oscuro
    this.applyTheme();
  }

  private applyTheme(): void {
    const root = document.documentElement;
    if (this.darkMode) {
      root.classList.remove('dark');
      this.currentImage = 'assets/images/torch_on.gif';
    } else {
      root.classList.add('dark');
      this.currentImage = 'assets/images/torch_off.gif';
    }
  }
}
