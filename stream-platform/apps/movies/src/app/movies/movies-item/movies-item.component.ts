import { Component, Input } from '@angular/core';
import { MovieItem } from '@stream-platform/movies-data-access';

@Component({
  selector: 'app-movies-item',
  standalone: false,
  templateUrl: './movies-item.component.html',
  styleUrl: './movies-item.component.css'
})
export class MoviesItemComponent {

  @Input()
  movieItem!: MovieItem;

  isTextOverflowing(element: HTMLElement): boolean {
  return element.offsetWidth < element.scrollWidth;
}


}
