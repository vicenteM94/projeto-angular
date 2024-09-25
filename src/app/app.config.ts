import { ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { PoHttpRequestModule } from '@po-ui/ng-components';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom([PoHttpRequestModule]),
    provideHttpClient(withInterceptorsFromDi()),
              
  ]
};
