import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MovieFacade, MovieItem } from '@stream-platform/movies-data-access';
import { PageEntity, PageQuery } from '@stream-platform/types';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-my-movies-list',
  standalone: false,
  templateUrl: './my-movies-list.component.html',
  styleUrl: './my-movies-list.component.css'
})
export class MyMoviesListComponent {

    myMovies$: Observable<PageEntity<MovieItem>>;

    selectedTabIndex = 0;

    pagequery: PageQuery = {
      page: 0,
      size: 16
    };

    constructor(private moviesFacade: MovieFacade, private router: Router) {

      this.moviesFacade.getMyMovies(this.pagequery);


      this.myMovies$ = this.moviesFacade.selectMyMovies$;
    }

    onPageChange(event: PageEvent) {
    const query: PageQuery = {
      page: event.pageIndex,
      size: event.pageSize,
    };

    this.moviesFacade.getMyMovies(query);

    this.pagequery = query;
  }

    buyMovieForPerson(movie: MovieItem){
      // this.router.navigateByUrl(`movies/${movieId}/payment`);
      // this.moviesFacade.addMovieForPerson(movieId);
    }

    filterByGenre(genre: string){
      console.log(genre);
    }
  }
