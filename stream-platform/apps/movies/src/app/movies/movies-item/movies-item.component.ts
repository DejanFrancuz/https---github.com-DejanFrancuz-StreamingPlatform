import { Component, EventEmitter, Input, Output } from '@angular/core';
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

  @Output()
  buyMovie = new EventEmitter<number>();

  @Output()
  viewMovie = new EventEmitter<number>();

  onBuyMovie(){
    console.log("ee?");
    this.buyMovie.emit(this.movieItem.movieId);
  }

  onViewMovie(){
    this.viewMovie.emit(this.movieItem.movieId);
  }

  isTextOverflowing(element: HTMLElement): boolean {
  return element.offsetWidth < element.scrollWidth;
}


}
