import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import { MoviesListComponent } from './movies/movies-list/movies-list.component';
import { MoviesItemComponent } from './movies/movies-item/movies-item.component';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MoviesPaymentComponent } from './movies/movies-payment/movies-payment.component';
import { MatTabsModule } from '@angular/material/tabs'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatMenuModule } from '@angular/material/menu';
import { MyMoviesListComponent } from './movies/my-movies-list/my-movies-list.component';
import { MovieViewComponent } from './movies/movie-view/movie-view.component'
import { CommonSharedUiModule } from '@stream-platform/common-shared-ui';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [MoviesListComponent, MoviesItemComponent, MoviesPaymentComponent, MyMoviesListComponent, MovieViewComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, CommonSharedUiModule, RouterModule.forChild(appRoutes), MatTooltipModule, MatTabsModule, MatPaginatorModule, MatMenuModule],
  providers: [],
  exports: [MoviesListComponent],
})
export class MoviesModule {}
