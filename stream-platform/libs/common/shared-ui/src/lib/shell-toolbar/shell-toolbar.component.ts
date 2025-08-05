import { AuthFacade } from '@stream-platform/auth-data-access';
import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Person } from 'libs/auth/data-access/src/lib/models/Person';
import { trigger, style, transition, animate } from '@angular/animations';
import { MovieFacade } from '@stream-platform/movies-data-access';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-shell-toolbar',
  standalone: false,
  templateUrl: './shell-toolbar.component.html',
  styleUrl: './shell-toolbar.component.css',
})
export class ShellToolbarComponent{
  dark = false;
  selectedLanguage = 'en';

  person$: Observable<Person | null>;
  cartCount$: Observable<number | null>

  isOpen = false;

  constructor(private authFacade: AuthFacade, private moviesFacade: MovieFacade, private router: Router) {
    this.person$ = this.authFacade.selectedAuthPerson$
    this.cartCount$ = this.moviesFacade.selectCartMoviesLenght$
  }

  toggleAvatar(){
    this.isOpen = !this.isOpen;
  }

  closeDropdown() {
    this.isOpen = false;
  }

  toggleTheme() {
    this.dark = !this.dark;
    document.body.classList.toggle('dark-theme', this.dark);
  }

  onProfile(userId: number){
    this.router.navigateByUrl(`users/edit/${userId}`);
    this.isOpen = false;
  }

  changeLanguage(lang: string) {
    this.selectedLanguage = lang;
    // translateService.use(lang) …
  }
}
