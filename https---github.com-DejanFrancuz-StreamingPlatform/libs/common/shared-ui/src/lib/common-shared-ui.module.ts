import { NgModule } from '@angular/core';
import { ShellToolbarComponent } from './shell-toolbar/shell-toolbar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UiButtonComponent } from './ui-button/ui-button.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  exports: [ShellToolbarComponent, UiButtonComponent, NavbarComponent],
  declarations: [ShellToolbarComponent, UiButtonComponent, NavbarComponent],
  imports: [CommonModule, FormsModule, RouterModule]
})
export class CommonSharedUiModule {}
