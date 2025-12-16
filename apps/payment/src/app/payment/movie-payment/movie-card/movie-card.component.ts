import { Component, Input } from '@angular/core';
import { MovieItem } from '@stream-platform/movies-data-access';
import { environment } from '@stream-platform/env';


@Component({
  selector: 'app-movie-card',
  standalone: false,
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css',
})
export class MovieCardComponent {
  environment = environment;

  @Input() movie!: MovieItem;
}
