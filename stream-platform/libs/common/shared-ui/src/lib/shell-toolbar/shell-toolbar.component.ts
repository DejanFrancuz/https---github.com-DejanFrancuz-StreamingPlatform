import { Component } from '@angular/core';

@Component({
  selector: 'lib-shell-toolbar',
  standalone: false,
  templateUrl: './shell-toolbar.component.html',
  styleUrl: './shell-toolbar.component.scss',
})
export class ShellToolbarComponent {
  dark = false;
  selectedLanguage = 'en';

  toggleTheme() {
    this.dark = !this.dark;
    document.body.classList.toggle('dark-theme', this.dark);
  }

  changeLanguage(lang: string) {
    this.selectedLanguage = lang;
    // translateService.use(lang) …
  }
}
