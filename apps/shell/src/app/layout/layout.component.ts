import { Component, OnInit } from '@angular/core';
import { AuthFacade } from '@stream-platform/auth-data-access';

@Component({
  selector: 'app-shell-layout',
  standalone: false,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class ShellLayoutComponent implements OnInit{


  constructor(private authFacade: AuthFacade) {}

  // poziv facade da se ucita osoba pri inicijalizaciji layouta iz layout.component.ts
  ngOnInit(): void {
    this.authFacade.loadPerson();
  }
}
