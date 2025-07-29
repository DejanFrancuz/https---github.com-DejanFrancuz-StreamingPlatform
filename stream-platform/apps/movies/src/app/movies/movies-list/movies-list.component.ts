import { Component, OnInit } from '@angular/core';
import { MovieFacade, MovieItem } from '@stream-platform/movies-data-access';

@Component({
  selector: 'app-movies-list',
  standalone: false,
  templateUrl: './movies-list.component.html',
  styleUrl: './movies-list.component.css'
})
export class MoviesListComponent implements OnInit {

  movies: MovieItem[] | null = [];

  constructor(private moviesFacade: MovieFacade) {}

  ngOnInit(): void {
    this.moviesFacade.getMovies();

    this.moviesFacade.selectMovies$.subscribe(( movies ) => {
      this.movies = movies
    });
  }
}
