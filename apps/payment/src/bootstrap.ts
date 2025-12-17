import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { PaymentModule } from './app/payment.module';

platformBrowserDynamic()
  .bootstrapModule(PaymentModule)
  .catch(console.error);

