import { InjectionToken } from '@angular/core';
import { IMediaSrcProvider } from './services/media-src-provider.service';

export const MEDIA_SRC_PROVIDER = new InjectionToken<IMediaSrcProvider>('MEDIA_SRC_PROVIDER');
