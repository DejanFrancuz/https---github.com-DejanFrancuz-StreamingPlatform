import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import { CollectionListComponent } from './collection/collection-list/collection-list.component';
import { CollectionItemComponent } from './collection/collection-item/collection-item.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    CollectionListComponent,
    CollectionItemComponent
  ],
  imports: [CommonModule, RouterModule.forChild(appRoutes)],
  providers: [],
  exports: [ CollectionListComponent ]
})
export class AppModule {}
