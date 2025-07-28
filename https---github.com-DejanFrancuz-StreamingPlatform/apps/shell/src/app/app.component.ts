import { Component } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";

@Component({
  selector: 'app-root',
  standalone: false,
  template: `<app-shell-layout></app-shell-layout>`,
})
export class AppComponent {
}