import { Component } from '@angular/core';
import { MovieFacade, MovieItem } from '@stream-platform/movies-data-access';
import { PageEntity, PageQuery } from '@stream-platform/types';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-collection-list',
  standalone: false,
  templateUrl: './collection-list.component.html',
  styleUrl: './collection-list.component.css'
})
export class CollectionListComponent {

  myMovies$: Observable<PageEntity<MovieItem>>;

  pagequery: PageQuery = {
    page: 0,
    size: 16
  };

  constructor(private moviesFacade: MovieFacade){
    this.moviesFacade.getMyMovies(this.pagequery);

    this.myMovies$ = this.moviesFacade.selectMyMovies$

  }

}
