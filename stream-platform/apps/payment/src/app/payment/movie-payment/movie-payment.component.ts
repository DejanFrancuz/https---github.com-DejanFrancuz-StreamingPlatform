import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-movie-payment',
  standalone: false,
  templateUrl: './movie-payment.component.html',
  styleUrl: './movie-payment.component.css',
})
export class MoviePaymentComponent implements OnInit, OnDestroy{
  movieId?: number | null;

  private unsubscribe$ = new Subject<void>();

  paymentForm!: FormGroup;

  constructor(private route: ActivatedRoute){}

  ngOnInit(): void {
    this.movieId = Number(this.route.snapshot.paramMap.get('movieId'));

    this.paymentForm = new FormGroup(
    {
      name: new FormControl('', [Validators.required]),
      cardNumber: new FormControl('', [Validators.required]),
      cardDate: new FormControl('', [Validators.required]),
      cardCVV: new FormControl('', [Validators.required]),

  },
  );

  }

  ngOnDestroy(): void {
      this.unsubscribe$.next();
      this.unsubscribe$.complete();
  }
}
