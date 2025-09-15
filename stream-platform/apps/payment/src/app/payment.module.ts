import { NgModule } from '@angular/core';
import { MoviePaymentComponent } from './payment/movie-payment/movie-payment.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonSharedUiModule } from '@stream-platform/common-shared-ui';

@NgModule({
  declarations: [MoviePaymentComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatCheckboxModule,
    CommonSharedUiModule,
    RouterModule.forChild([])],
  providers: [],
  exports: [ MoviePaymentComponent ],
})
export class PaymentModule {}
