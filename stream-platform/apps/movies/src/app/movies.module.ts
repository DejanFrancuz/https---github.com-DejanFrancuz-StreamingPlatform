import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import { MoviesListComponent } from './movies/movies-list/movies-list.component';
import { MoviesItemComponent } from './movies/movies-item/movies-item.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [MoviesListComponent, MoviesItemComponent],
  imports: [CommonModule, RouterModule.forChild(appRoutes)],
  providers: [],
  exports: [MoviesListComponent],
})
export class MoviesModule {}
