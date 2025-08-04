import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { AuthFacade, Person } from '@stream-platform/auth-data-access';
import { MovieFacade, MovieItem } from '@stream-platform/movies-data-access';
import { PageEntity, PageQuery } from '@stream-platform/types';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-movies-list',
  standalone: false,
  templateUrl: './movies-list.component.html',
  styleUrl: './movies-list.component.css'
})
export class MoviesListComponent implements OnInit, OnDestroy {

  movies$: Observable<PageEntity<MovieItem>>;

  myMovies$: Observable<PageEntity<MovieItem>>;

  person!: Person | null;

    private unsubscribe$ = new Subject<void>();


  selectedTabIndex = 0;

  pagequery: PageQuery = {
    page: 0,
    size: 16
  };

  genres = ["Drama", "Comedy", "War", "Romantic Drama"];
  dates = ["1950s", "1960s", "1970s", "1980s", "1990s", "2000s", "2010s", "2020s"];

  constructor(private moviesFacade: MovieFacade, private router: Router, private authFacade: AuthFacade) {

    this.moviesFacade.getMyMovies(this.pagequery);

    this.moviesFacade.getMovies(this.pagequery);

    this.myMovies$ = this.moviesFacade.selectMyMovies$;
    this.movies$ = this.moviesFacade.selectMovies$;
  }

  ngOnInit(): void {
    this.authFacade.selectedAuthPerson$
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((data) => {
      this.person = data;
    });
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

  buyMovieForPerson(movie: MovieItem){
    // this.router.navigateByUrl(`movies/payment/${movieId}`);
    this.moviesFacade.addCartMovie(movie);
  }

  viewMovie(movieId: number){
    this.router.navigateByUrl(`movies/view-movie/${movieId}`);
  }

  deleteMovie(movieId: number){
    this.moviesFacade.deleteMovie(movieId);
  }

  watchMovie(movieId: number){
    this.router.navigateByUrl(`movies/watch-movie/${movieId}`);
  }

  filterByGenre(genre: string){
    console.log(genre);
  }
  filterByDate(date: string){
    console.log(date);
  }

  get isAdmin(): boolean {
    return this.person?.permissions.includes('ADMIN') || false;
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
