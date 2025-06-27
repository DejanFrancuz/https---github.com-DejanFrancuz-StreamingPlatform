import { NgModule } from '@angular/core';
import { ShellToolbarComponent } from './shell-toolbar/shell-toolbar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UiButtonComponent } from './ui-button/ui-button.component'

@NgModule({
  exports: [ShellToolbarComponent, UiButtonComponent],
  declarations: [ShellToolbarComponent, UiButtonComponent],
  imports: [CommonModule, FormsModule]
})
export class CommonSharedUiModule {}
