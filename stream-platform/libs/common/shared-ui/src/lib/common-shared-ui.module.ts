import { NgModule } from '@angular/core';
import { ShellToolbarComponent } from './shell-toolbar/shell-toolbar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'

@NgModule({
  exports: [ShellToolbarComponent],
  declarations: [ShellToolbarComponent],
  imports: [CommonModule, FormsModule]
})
export class CommonSharedUiModule {}
