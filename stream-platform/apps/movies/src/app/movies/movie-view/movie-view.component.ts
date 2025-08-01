import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieFacade, MovieItem } from '@stream-platform/movies-data-access';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-movie-view',
  standalone: false,
  templateUrl: './movie-view.component.html',
  styleUrl: './movie-view.component.css'
})
export class MovieViewComponent implements OnInit{

  movieId!: number;
  movie$!: Observable<MovieItem | null>;

  constructor(private movieFacade: MovieFacade, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.movieId = Number(this.route.snapshot.paramMap.get('movieId'));

    this.movieFacade.getMovieById(this.movieId);

    this.movie$ = this.movieFacade.selectMovie$;
  }

}
