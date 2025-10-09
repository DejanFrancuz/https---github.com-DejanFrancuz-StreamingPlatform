import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
import { catchError, from, map, Observable, Subject, takeUntil } from 'rxjs';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmPaymentParams, PaymentFacade } from '@stream-platform/payment-data-access';
import { loadStripe, Stripe, StripeCardElement, StripeElements } from '@stripe/stripe-js';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieFacade, MovieItem } from '@stream-platform/movies-data-access';


@Component({
  selector: 'app-movie-payment',
  standalone: false,
  templateUrl: './movie-payment.component.html',
  styleUrl: './movie-payment.component.css',
})
export class MoviePaymentComponent implements OnInit{

  movieId!: number;
  movie!: MovieItem | null;
  stripe!: Stripe | null;
  card!: StripeCardElement;

  private unsubscribe$ = new Subject<void>();


  items = [{ id: "xl-tshirt", amount: 5000, currency: 'usd' }];

  amount = 5000;
  currency = 'usd';

  success$!: Observable<boolean>;
  clientSecret$!: Observable<string | null>;
  clientSecret!: string;
  error$!: Observable<string | null>;
  loading$!: Observable<boolean>;
  elements!: StripeElements;

  constructor( private route: ActivatedRoute, private movieFacade: MovieFacade, public paymentFacade: PaymentFacade, private router: Router) {
    this.success$ = this.paymentFacade.paymentSuccess$;
    this.clientSecret$ = this.paymentFacade.clientSecret$;
    this.error$ = this.paymentFacade.paymentError$;
    this.loading$ = this.paymentFacade.isProcessing$;
  }

  async ngOnInit() {
    this.movieId = Number(this.route.snapshot.paramMap.get('movieId'));

    this.movieFacade.getMovieById(this.movieId);

    this.movieFacade.selectMovie$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((movie) => {
        if (movie) {
          this.movie = movie;
        }
      });

    this.stripe = await loadStripe('pk_test_51S7dt7PHHbkxw0kucm8D5MBLMXzt0PXf1PQMJGfF4zSq1zEp9irq8LbcCRC1llav1Jq1dFDYfePGVR4zR3YnJnvy00FukXUTEy');

    if (this.stripe) {
      const elements = this.stripe.elements();
      this.card = elements.create('card');
      this.card.mount('#card-element');
    }

    this.paymentFacade.createPaymentIntent(this.items);

    this.clientSecret$.subscribe(clientSecret => {
      if (clientSecret) {
        this.clientSecret = clientSecret;
        this.initialize();
      }
    });

  }

  async initialize() {
    // let emailAddress = '';
    const clientSecret = this.clientSecret;

    const theme = 'stripe' as const;
    const appearance = { theme };



    if (this.stripe) {
      this.elements = this.stripe.elements({ clientSecret, appearance });


    // const linkAuthenticationElement =
    //   this.elements.create('linkAuthentication');
    // linkAuthenticationElement.mount('#link-authentication-element');
    // linkAuthenticationElement.on('change', (event) => {
    //   emailAddress = event.value.email;
    // });
    const paymentElementOptions = {
      layout: 'accordion',
    };
    const paymentElement = (this.elements as any).create(
        "payment", paymentElementOptions
    );
    // paymentElement.mount('#payment-element');

    const paymentForm = document.querySelector("#payment-form");
    if (paymentForm) {
      paymentForm.addEventListener("submit", this.handleSubmit.bind(this));
    }
  }
  }

  async handleSubmit(e: any) {
    e.preventDefault();
    if(this.stripe)
    from(this.stripe.confirmCardPayment(this.clientSecret, { payment_method: { card: this.card} })).subscribe({
    next: ({ error, paymentIntent }) => {
      if (error) {
        console.log("Error while trying to pay", error);
      } else if (paymentIntent?.status === 'succeeded') {
        this.movieFacade.addMovieForPerson(this.movieId);
        this.router.navigateByUrl('movies/list');
        console.log("Payment completed successfully", paymentIntent.id);
      }
    },
    error: err => console.error("Observable error:", err)
  });

    // this.paymentFacade.confirmPayment(this.clientSecret, this.card);
}


  // pay() {
  //   const confirmParams: ConfirmPaymentParams = {
  //     return_url: "http://localhost:4200/movies",
  //   };
  //   this.paymentFacade.confirmPayment(this.elements, this.clientSecret,confirmParams);
  // }
  // movieId?: number | null;

  // private unsubscribe$ = new Subject<void>();

  // paymentForm!: FormGroup;

  // constructor(private route: ActivatedRoute){}

  // ngOnInit(): void {
  //   this.movieId = Number(this.route.snapshot.paramMap.get('movieId'));

  //   this.paymentForm = new FormGroup(
  //   {
  //     name: new FormControl('', [Validators.required]),
  //     cardNumber: new FormControl('', [Validators.required]),
  //     cardDate: new FormControl('', [Validators.required]),
  //     cardCVV: new FormControl('', [Validators.required]),

  // },
  // );

  // }

  // ngOnDestroy(): void {
  //     this.unsubscribe$.next();
  //     this.unsubscribe$.complete();
  // }
}
