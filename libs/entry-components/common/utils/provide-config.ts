import { InjectionToken, Provider } from '@angular/core';

export function createInjectionToken<T>(defaultValue: T): InjectionToken<T> {
  return new InjectionToken<T>(defaultValue?.constructor.name ?? 'DefaultToken',
    {
      providedIn: 'root',
      factory: () => defaultValue
    }
  );
}

export function provideConfig<T>(token: InjectionToken<T>, factory: () => T): Provider {
  return {
    provide: token,
    useFactory: factory
  };
}
