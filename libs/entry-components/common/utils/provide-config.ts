import { InjectionToken, Provider } from '@angular/core';

export const createInjectionToken = <T>(defaultValue: T): InjectionToken<T> => new InjectionToken<T>(defaultValue?.constructor.name ?? 'DefaultToken',
    {
      providedIn: 'root',
      factory: () => defaultValue
    }
  );

export const provideConfig = <T>(token: InjectionToken<T>, factory: () => T): Provider => ({
    provide: token,
    useFactory: factory
  });
