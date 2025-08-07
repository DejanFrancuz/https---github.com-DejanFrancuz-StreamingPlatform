export interface MovieItem {
  movieId: number,
  title: string,
  description?: string,
  year: number,
  posterUrl?: string,
  videoPreviewUrl?: string,
  genre: string,
}

export interface MovieFilter {
  like?: boolean,
  decade?: string,
  genre?: string,
  sort?: boolean,
}
