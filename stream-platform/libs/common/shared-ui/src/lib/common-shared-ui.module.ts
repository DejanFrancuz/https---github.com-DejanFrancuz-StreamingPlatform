import { NgModule } from '@angular/core';
import { ShellToolbarComponent } from './shell-toolbar/shell-toolbar.component';

@NgModule({
  exports: [ShellToolbarComponent],
  declarations: [ShellToolbarComponent],
})
export class CommonSharedUiModule {}
