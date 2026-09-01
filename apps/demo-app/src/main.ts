import { platformBrowser } from '@angular/platform-browser';
import { AppModule } from './app/app.module';

platformBrowser().bootstrapModule(AppModule)
  // eslint-disable-next-line no-console
  .catch(err => console.error(err));
