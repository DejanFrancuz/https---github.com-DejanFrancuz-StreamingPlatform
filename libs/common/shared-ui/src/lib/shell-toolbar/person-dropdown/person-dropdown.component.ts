import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFacade } from '@stream-platform/auth-data-access';

@Component({
  selector: 'lib-person-dropdown',
  standalone: false,
  templateUrl: './person-dropdown.component.html',
  styleUrl: './person-dropdown.component.css',

})
export class PersonDropdownComponent {

  constructor(private authFacade: AuthFacade, private router: Router) {}

  @Output()
  closeDropdown = new EventEmitter<void>();


  @Output()
  goToProfile = new EventEmitter<void>();

  @Output()
  goToMovies = new EventEmitter<void>();

  onFind() {
    this.goToMovies.emit();
  }

  onLogout(){
    this.authFacade.logout();
    this.closeDropdown.emit();
  }

  onProfile(){
    this.goToProfile.emit();
    // this.closeDropdown.emit();
  }

}
