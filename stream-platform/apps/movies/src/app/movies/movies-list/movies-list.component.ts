import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MovieFacade, MovieItem } from '@stream-platform/movies-data-access';
import { PageEntity, PageQuery } from '@stream-platform/types';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-movies-list',
  standalone: false,
  templateUrl: './movies-list.component.html',
  styleUrl: './movies-list.component.css'
})
export class MoviesListComponent  {

  movies$: Observable<PageEntity<MovieItem>>;

  myMovies$: Observable<PageEntity<MovieItem>>;

  selectedTabIndex = 0;

  pagequery: PageQuery = {
    page: 0,
    size: 16
  };

  genres = ["Drama", "Comedy", "War", "Romantic Drama"];
  dates = ["50s", "60s", "70s", "80s", "90s", "00s", "10s", "20s"];

  constructor(private moviesFacade: MovieFacade, private router: Router) {

    this.moviesFacade.getMyMovies(this.pagequery);

    this.moviesFacade.getMovies(this.pagequery);

    this.myMovies$ = this.moviesFacade.selectMyMovies$;
    this.movies$ = this.moviesFacade.selectMovies$;
  }

  onPageChange(event: PageEvent) {
  const query: PageQuery = {
    page: event.pageIndex,
    size: event.pageSize,
  };

  if(this.selectedTabIndex === 0) this.moviesFacade.getMovies(query)
  else this.moviesFacade.getMyMovies(query);

  this.pagequery = query;
}

  buyMovieForPerson(movieId: number){
    this.router.navigateByUrl(`movies/payment/${movieId}`);
    // this.moviesFacade.addMovieForPerson(movieId);
  }

  viewMovie(movieId: number){
    this.router.navigateByUrl(`movies/view-movie/${movieId}`);
  }

  filterByGenre(genre: string){
    console.log(genre);
  }
  filterByDate(date: string){
    console.log(date);
  }
}
